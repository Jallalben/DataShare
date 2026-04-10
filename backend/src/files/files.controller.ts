import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
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
@UseGuards(AuthGuard('jwt'))
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
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
}
