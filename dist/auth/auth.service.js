"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const firebase_service_1 = require("./firebase.service");
const resend_service_1 = require("../shared/services/resend.service");
const bcrypt = __importStar(require("bcrypt"));
const crypto = __importStar(require("crypto"));
let AuthService = class AuthService {
    usersService;
    jwtService;
    firebaseService;
    resendService;
    constructor(usersService, jwtService, firebaseService, resendService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.firebaseService = firebaseService;
        this.resendService = resendService;
    }
    async forgotPassword(email) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException('User with this email does not exist');
        }
        const token = crypto.randomBytes(32).toString('hex');
        const expires = new Date();
        expires.setHours(expires.getHours() + 1);
        await this.usersService.update(user._id.toString(), {
            resetPasswordToken: token,
            resetPasswordExpires: expires,
        });
        const resetLink = `http://localhost:3002/auth/reset-password?token=${token}`;
        await this.resendService.sendEmail(email, 'Reset Your Password - Dobi Cakes', `
      <div style="font-family: serif; padding: 40px; color: #1a1a1a;">
        <h2 style=" letter-spacing: 2px;">Password Reset Request</h2>
        <p style="font-size: 14px; line-height: 1.6; color: #666;">
          You requested to reset your password for your Dobi Cakes account. Click the button below to proceed.
        </p>
        <a href="${resetLink}" style="display: inline-block; padding: 16px 32px; background: #c5a059; color: white; text-decoration: none; font-size: 10px; font-weight: bold;  letter-spacing: 2px; margin-top: 20px;">
          Reset My Password
        </a>
        <p style="font-size: 12px; color: #999; margin-top: 40px;">
          If you didn't request this, you can safely ignore this email. The link will expire in 1 hour.
        </p>
      </div>
      `);
        return { message: 'Password reset link sent to your email' };
    }
    async resetPassword(token, newPassword) {
        const user = await this.usersService.findByResetToken(token);
        if (!user) {
            throw new common_1.BadRequestException('Invalid or expired reset token');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.usersService.update(user._id.toString(), {
            password: hashedPassword,
            resetPasswordToken: null,
            resetPasswordExpires: null,
        });
        return { message: 'Password has been reset successfully' };
    }
    async validateUser(email, pass) {
        const user = await this.usersService.findByEmail(email);
        if (user && user.password && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user.toObject();
            return result;
        }
        return null;
    }
    async login(user) {
        const payload = { email: user.email, sub: user._id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user,
        };
    }
    async register(userData) {
        const existingUser = await this.usersService.findByEmail(userData.email);
        if (existingUser) {
            throw new common_1.ConflictException('Email already exists');
        }
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = await this.usersService.create({
            ...userData,
            password: hashedPassword,
        });
        return this.login(user);
    }
    async adminLogin(credentials) {
        const user = await this.usersService.findByEmail(credentials.email);
        if (!user || user.role !== 'ADMIN') {
            throw new common_1.UnauthorizedException('Access denied');
        }
        const isPasswordValid = user.password ? await bcrypt.compare(credentials.password, user.password) : false;
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const otp = '123456';
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 10);
        await this.usersService.update(user._id.toString(), {
            otp,
            otpExpires: expires,
        });
        return { message: 'OTP sent to registered administrator email' };
    }
    async verifyAdminOtp(credentials) {
        const user = await this.usersService.findByEmail(credentials.email);
        if (!user || user.role !== 'ADMIN') {
            throw new common_1.UnauthorizedException('Access denied');
        }
        if (user.otp !== credentials.otp || !user.otpExpires || new Date() > user.otpExpires) {
            throw new common_1.UnauthorizedException('Invalid or expired OTP');
        }
        await this.usersService.update(user._id.toString(), {
            otp: null,
            otpExpires: null,
        });
        return this.login(user);
    }
    async firebaseLogin(token) {
        const decodedToken = await this.firebaseService.verifyIdToken(token);
        let user = await this.usersService.findByFirebaseUid(decodedToken.uid);
        if (!user && decodedToken.email) {
            user = await this.usersService.findByEmail(decodedToken.email);
            if (user) {
                user = await this.usersService.update(user._id.toString(), { firebaseUid: decodedToken.uid });
            }
            else {
                const [firstName, ...lastNameParts] = (decodedToken.name || '').split(' ');
                user = await this.usersService.create({
                    email: decodedToken.email,
                    firstName: firstName || 'User',
                    lastName: lastNameParts.join(' ') || '',
                    firebaseUid: decodedToken.uid,
                    avatar: decodedToken.picture,
                });
            }
        }
        return this.login(user);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        firebase_service_1.FirebaseService,
        resend_service_1.ResendService])
], AuthService);
//# sourceMappingURL=auth.service.js.map