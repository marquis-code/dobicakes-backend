import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(body: any): Promise<{
        message: string;
    }>;
}
