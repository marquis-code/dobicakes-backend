"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ChatController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const chat_service_1 = require("./chat.service");
const cloudinary_service_1 = require("../shared/services/cloudinary.service");
let ChatController = ChatController_1 = class ChatController {
    chatService;
    cloudinaryService;
    logger = new common_1.Logger(ChatController_1.name);
    constructor(chatService, cloudinaryService) {
        this.chatService = chatService;
        this.cloudinaryService = cloudinaryService;
    }
    async uploadFile(file) {
        if (!file) {
            throw new common_1.BadRequestException('No file provided. Send a file with field name "file" as multipart/form-data.');
        }
        this.logger.log(`Upload received: ${file.originalname} (${file.mimetype}, ${file.size} bytes)`);
        try {
            const url = await this.cloudinaryService.uploadImage(file);
            this.logger.log(`Upload successful: ${url}`);
            return { url, originalName: file.originalname, size: file.size };
        }
        catch (error) {
            this.logger.error(`Upload failed: ${error.message}`);
            throw new common_1.BadRequestException(`Upload failed: ${error.message}`);
        }
    }
    async getActiveRooms() {
        return this.chatService.getAllActiveChats();
    }
    async getHistory(roomId) {
        return this.chatService.getMessages(roomId);
    }
    async markAsRead(roomId) {
        return this.chatService.markAsRead(roomId);
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.memoryStorage)(),
        limits: { fileSize: 10 * 1024 * 1024 },
        fileFilter: (_req, file, cb) => {
            if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/') || file.mimetype === 'application/pdf') {
                cb(null, true);
            }
            else {
                cb(new Error('Only images, videos, and PDFs are allowed'), false);
            }
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)('rooms'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getActiveRooms", null);
__decorate([
    (0, common_1.Get)('history/:roomId'),
    __param(0, (0, common_1.Param)('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getHistory", null);
__decorate([
    (0, common_1.Patch)('read/:roomId'),
    __param(0, (0, common_1.Param)('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "markAsRead", null);
exports.ChatController = ChatController = ChatController_1 = __decorate([
    (0, common_1.Controller)('chat'),
    __metadata("design:paramtypes", [chat_service_1.ChatService,
        cloudinary_service_1.CloudinaryService])
], ChatController);
//# sourceMappingURL=chat.controller.js.map