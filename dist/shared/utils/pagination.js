"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = void 0;
const paginate = async (model, query = {}, page = 1, limit = 10, sort = { createdAt: -1 }) => {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
        model.find(query).sort(sort).skip(skip).limit(limit).lean().exec(),
        model.countDocuments(query).exec(),
    ]);
    const totalPages = Math.ceil(total / limit);
    return {
        data: data,
        total,
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
    };
};
exports.paginate = paginate;
//# sourceMappingURL=pagination.js.map