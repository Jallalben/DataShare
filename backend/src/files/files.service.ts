import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { join } from 'path';
import { unlink } from 'fs/promises';
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
    expirationDays = 7,
  ): Promise<File> {
    const downloadToken = crypto.randomUUID();
    const days = Math.min(Math.max(1, expirationDays), 7);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + days);

    const fileEntity = this.filesRepository.create({
      originalName: multerFile.originalname,
      filename: multerFile.filename,
      mimetype: multerFile.mimetype,
      size: multerFile.size,
      userId,
      downloadToken,
      expiresAt,
    });
    return this.filesRepository.save(fileEntity);
  }

  async findByToken(token: string): Promise<File | null> {
    return this.filesRepository.findOne({ where: { downloadToken: token } });
  }

  getFilePath(filename: string): string {
    return join(process.cwd(), 'uploads', filename);
  }

  async findByUserId(userId: string): Promise<File[]> {
    return this.filesRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async deleteFile(fileId: string, userId: string): Promise<void> {
    const file = await this.filesRepository.findOne({ where: { id: fileId } });
    if (!file) throw new NotFoundException('Fichier introuvable');
    if (file.userId !== userId) throw new ForbiddenException('Accès refusé');

    const filePath = this.getFilePath(file.filename);
    await this.filesRepository.delete(fileId);
    await unlink(filePath).catch(() => null);
  }
}
