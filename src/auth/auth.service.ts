import { Injectable, UnauthorizedException, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { FirebaseService } from './firebase.service';
import { ResendService } from '../shared/services/resend.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private firebaseService: FirebaseService,
    private resendService: ResendService,
  ) {}

  // ... (previous methods)

  async forgotPassword(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User with this email does not exist');
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date();
    expires.setHours(expires.getHours() + 1); // Token valid for 1 hour

    await this.usersService.update(user._id.toString(), {
      resetPasswordToken: token,
      resetPasswordExpires: expires,
    });

    const resetLink = `http://localhost:3002/auth/reset-password?token=${token}`;
    
    await this.resendService.sendEmail(
      email,
      'Reset Your Password - Dobi Cakes',
      `
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
      `
    );

    return { message: 'Password reset link sent to your email' };
  }

  async resetPassword(token: string, newPassword: any) {
    const user = await this.usersService.findByResetToken(token);
    if (!user) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await this.usersService.update(user._id.toString(), {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    });

    return { message: 'Password has been reset successfully' };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    // ... rest of the service
    const user = await this.usersService.findByEmail(email);
    if (user && user.password && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async register(userData: any) {
    const existingUser = await this.usersService.findByEmail(userData.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.usersService.create({
      ...userData,
      password: hashedPassword,
    });
    return this.login(user);
  }

  async firebaseLogin(token: string) {
    const decodedToken = await this.firebaseService.verifyIdToken(token);
    let user = await this.usersService.findByFirebaseUid(decodedToken.uid);

    if (!user && decodedToken.email) {
      user = await this.usersService.findByEmail(decodedToken.email);
      if (user) {
        user = await this.usersService.update(user._id.toString(), { firebaseUid: decodedToken.uid });
      } else {
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
}
