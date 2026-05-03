import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    getProfile(req: any): Promise<any>;
    register(userData: any): Promise<{
        access_token: string;
        user: any;
    }>;
    login(credentials: any): Promise<{
        access_token: string;
        user: any;
    }>;
    firebaseLogin(token: string): Promise<{
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
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(body: any): Promise<{
        message: string;
    }>;
}
