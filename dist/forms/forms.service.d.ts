import { Model } from 'mongoose';
import { FormDocument } from '../schemas/form.schema';
export declare class FormsService {
    private formModel;
    constructor(formModel: Model<FormDocument>);
    create(formData: any): Promise<FormDocument>;
    findAll(): Promise<FormDocument[]>;
    findOne(id: string): Promise<FormDocument>;
    submitResponse(id: string, responseData: any): Promise<FormDocument>;
    update(id: string, updateData: any): Promise<FormDocument>;
    delete(id: string): Promise<any>;
    seedForms(): Promise<any>;
}
