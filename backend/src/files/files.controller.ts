import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
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

const FORBIDDEN_MIMETYPES = [
  'application/x-msdownload',
  'application/x-executable',
  'application/x-sh',
  'application/x-bat',
  'application/x-msdos-program',
];

const FORBIDDEN_EXTENSIONS = ['.exe', '.bat', '.sh', '.cmd', '.com', '.msi', '.ps1', '.vbs'];

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
  fileFilter: (_req: any, file: Express.Multer.File, cb: any) => {
    const ext = extname(file.originalname).toLowerCase();
    if (FORBIDDEN_EXTENSIONS.includes(ext) || FORBIDDEN_MIMETYPES.includes(file.mimetype)) {
      return cb(new BadRequestException('Ce type de fichier n\'est pas autorisé.'), false);
    }
    cb(null, true);
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
    @Body('expirationDays') expirationDays?: string,
  ) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const days = expirationDays ? parseInt(expirationDays, 10) : 7;
    const saved = await this.filesService.saveFile(file, req.user.userId, days);

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
