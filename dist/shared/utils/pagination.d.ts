export interface PaginationResult<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}
export declare const paginate: <T>(model: any, query?: any, page?: number, limit?: number, sort?: any) => Promise<PaginationResult<T>>;
