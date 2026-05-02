import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    create(userData: Partial<User>): Promise<UserDocument>;
    findByEmail(email: string): Promise<UserDocument | null>;
    findByFirebaseUid(firebaseUid: string): Promise<UserDocument | null>;
    findById(id: string): Promise<UserDocument | null>;
    findByResetToken(token: string): Promise<UserDocument | null>;
    update(id: string, updateData: Partial<User>): Promise<UserDocument | null>;
}
