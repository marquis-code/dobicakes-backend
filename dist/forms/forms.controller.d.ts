import { FormsService } from './forms.service';
export declare class FormsController {
    private readonly formsService;
    constructor(formsService: FormsService);
    create(createFormDto: any): Promise<import("../schemas/form.schema").FormDocument>;
    findAll(): Promise<import("../schemas/form.schema").FormDocument[]>;
    findOne(id: string): Promise<import("../schemas/form.schema").FormDocument>;
    submitResponse(id: string, responseData: any): Promise<import("../schemas/form.schema").FormDocument>;
    update(id: string, updateFormDto: any): Promise<import("../schemas/form.schema").FormDocument>;
    remove(id: string): Promise<any>;
    seed(): Promise<any>;
}
