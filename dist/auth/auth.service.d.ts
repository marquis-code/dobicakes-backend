import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { FirebaseService } from './firebase.service';
import { ResendService } from '../shared/services/resend.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    private firebaseService;
    private resendService;
    constructor(usersService: UsersService, jwtService: JwtService, firebaseService: FirebaseService, resendService: ResendService);
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(token: string, newPassword: any): Promise<{
        message: string;
    }>;
    validateUser(email: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        user: any;
    }>;
    register(userData: any): Promise<{
        access_token: string;
        user: any;
    }>;
    adminLogin(credentials: any): Promise<{
        message: string;
    }>;
    verifyAdminOtp(credentials: any): Promise<{
        access_token: string;
        user: any;
    }>;
    firebaseLogin(token: string): Promise<{
        access_token: string;
        user: any;
    }>;
}
