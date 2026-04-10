import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './file.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private filesRepository: Repository<File>,
  ) {}

  async saveFile(
    multerFile: Express.Multer.File,
    userId: string,
  ): Promise<File> {
    const downloadToken = crypto.randomUUID();
    const fileEntity = this.filesRepository.create({
      originalName: multerFile.originalname,
      filename: multerFile.filename,
      mimetype: multerFile.mimetype,
      size: multerFile.size,
      userId,
      downloadToken,
    });
    return this.filesRepository.save(fileEntity);
  }
}
