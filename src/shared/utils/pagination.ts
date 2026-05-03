export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export const paginate = async <T>(
  model: any,
  query: any = {},
  page: number = 1,
  limit: number = 10,
  sort: any = { createdAt: -1 }
): Promise<PaginationResult<T>> => {
  const skip = (page - 1) * limit;
  
  const [data, total] = await Promise.all([
    model.find(query).sort(sort).skip(skip).limit(limit).lean().exec(),
    model.countDocuments(query).exec(),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    data: data as T[],
    total,
    page,
    limit,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
};
