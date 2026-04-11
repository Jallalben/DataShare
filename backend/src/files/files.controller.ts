import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Res,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Request,
  BadRequestException,
  NotFoundException,
  GoneException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import type { Response } from 'express';
import { FilesService } from './files.service';

const multerOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (_req, file, cb) => {
      const uniqueName = `${crypto.randomUUID()}${extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  }),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50 MB
  },
};

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Request() req: any,
  ) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const saved = await this.filesService.saveFile(file, req.user.userId);

    return {
      id: saved.id,
      originalName: saved.originalName,
      size: Number(saved.size),
      mimetype: saved.mimetype,
      downloadToken: saved.downloadToken,
      createdAt: saved.createdAt,
    };
  }

  @Get('my')
  @UseGuards(AuthGuard('jwt'))
  async getMyFiles(@Request() req: any) {
    const files = await this.filesService.findByUserId(req.user.userId);
    return files.map((f) => ({
      id: f.id,
      originalName: f.originalName,
      size: Number(f.size),
      mimetype: f.mimetype,
      downloadToken: f.downloadToken,
      createdAt: f.createdAt,
      expiresAt: f.expiresAt,
    }));
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFile(@Param('id') id: string, @Request() req: any) {
    await this.filesService.deleteFile(id, req.user.userId);
  }

  @Get('info/:token')
  async getFileInfo(@Param('token') token: string) {
    const file = await this.filesService.findByToken(token);
    if (!file) throw new NotFoundException('Fichier introuvable');
    if (file.expiresAt && new Date() > file.expiresAt) {
      throw new GoneException('Ce lien a expiré');
    }
    return {
      originalName: file.originalName,
      size: Number(file.size),
      mimetype: file.mimetype,
      createdAt: file.createdAt,
      expiresAt: file.expiresAt,
    };
  }

  @Get('download/:token')
  async downloadFile(
    @Param('token') token: string,
    @Res() res: Response,
  ) {
    const file = await this.filesService.findByToken(token);
    if (!file) throw new NotFoundException('Fichier introuvable');
    if (file.expiresAt && new Date() > file.expiresAt) {
      throw new GoneException('Ce lien a expiré');
    }

    const filePath = this.filesService.getFilePath(file.filename);
    res.download(filePath, file.originalName);
  }
}
