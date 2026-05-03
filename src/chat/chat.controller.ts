import { Controller, Get, Post, Param, Patch, UseInterceptors, UploadedFile, BadRequestException, Logger } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ChatService } from './chat.service';
import { CloudinaryService } from '../shared/services/cloudinary.service';

@Controller('chat')
export class ChatController {
  private readonly logger = new Logger(ChatController.name);

  constructor(
    private chatService: ChatService,
    private cloudinaryService: CloudinaryService
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
    fileFilter: (_req, file, cb) => {
      if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/') || file.mimetype === 'application/pdf') {
        cb(null, true);
      } else {
        cb(new Error('Only images, videos, and PDFs are allowed'), false);
      }
    },
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided. Send a file with field name "file" as multipart/form-data.');
    }

    this.logger.log(`Upload received: ${file.originalname} (${file.mimetype}, ${file.size} bytes)`);

    try {
      const url = await this.cloudinaryService.uploadImage(file);
      this.logger.log(`Upload successful: ${url}`);
      return { url, originalName: file.originalname, size: file.size };
    } catch (error: any) {
      this.logger.error(`Upload failed: ${error.message}`);
      throw new BadRequestException(`Upload failed: ${error.message}`);
    }
  }

  @Get('rooms')
  async getActiveRooms() {
    return this.chatService.getAllActiveChats();
  }

  @Get('history/:roomId')
  async getHistory(@Param('roomId') roomId: string) {
    return this.chatService.getMessages(roomId);
  }

  @Patch('read/:roomId')
  async markAsRead(@Param('roomId') roomId: string) {
    return this.chatService.markAsRead(roomId);
  }
}
