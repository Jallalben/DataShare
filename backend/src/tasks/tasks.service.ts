import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { unlink } from 'fs/promises';
import { join } from 'path';
import { File } from '../files/file.entity';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(File)
    private filesRepository: Repository<File>,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async purgeExpiredFiles(): Promise<void> {
    const now = new Date();
    const expired = await this.filesRepository.find({
      where: { expiresAt: LessThan(now) },
    });

    if (expired.length === 0) return;

    this.logger.log(`Purge : ${expired.length} fichier(s) expiré(s) à supprimer`);

    for (const file of expired) {
      const filePath = join(process.cwd(), 'uploads', file.filename);
      await this.filesRepository.delete(file.id);
      await unlink(filePath).catch(() => null);
    }

    this.logger.log(`Purge terminée — ${expired.length} fichier(s) supprimé(s)`);
  }
}
