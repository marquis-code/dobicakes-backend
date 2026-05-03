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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const chat_message_schema_1 = require("../schemas/chat-message.schema");
const notifications_service_1 = require("../notifications/notifications.service");
let ChatService = class ChatService {
    chatModel;
    notificationsService;
    constructor(chatModel, notificationsService) {
        this.chatModel = chatModel;
        this.notificationsService = notificationsService;
    }
    async saveMessage(data) {
        const newMessage = await new this.chatModel(data).save();
        if (data.senderType === 'USER') {
            await this.notificationsService.create({
                title: 'New Support Message',
                message: `You have a new message from ${data.userName}`,
                type: 'chat',
                link: `/admin/chat?room=${data.roomId}`
            });
        }
        return newMessage;
    }
    async getMessages(roomId) {
        return this.chatModel.find({ roomId }).sort({ createdAt: 1 }).exec();
    }
    async getAllActiveChats() {
        return this.chatModel.aggregate([
            { $sort: { createdAt: -1 } },
            {
                $group: {
                    _id: '$roomId',
                    lastMessage: { $first: '$message' },
                    attachments: { $first: '$attachments' },
                    userName: { $first: '$userName' },
                    userEmail: { $first: '$userEmail' },
                    createdAt: { $first: '$createdAt' },
                    unreadCount: {
                        $sum: { $cond: [{ $and: [{ $eq: ['$isRead', false] }, { $eq: ['$senderType', 'USER'] }] }, 1, 0] },
                    },
                },
            },
            { $addFields: {
                    displayMessage: {
                        $cond: [
                            { $and: [{ $eq: ['$lastMessage', ''] }, { $gt: [{ $size: { $ifNull: ['$attachments', []] } }, 0] }] },
                            '[Image]',
                            '$lastMessage'
                        ]
                    }
                }
            },
            { $sort: { createdAt: -1 } },
        ]);
    }
    async markAsRead(roomId) {
        return this.chatModel.updateMany({ roomId, senderType: 'USER' }, { isRead: true }).exec();
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(chat_message_schema_1.ChatMessage.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        notifications_service_1.NotificationsService])
], ChatService);
//# sourceMappingURL=chat.service.js.map