import { Controller, Get } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Controller('health')
export class HealthController {
  constructor(private dataSource: DataSource) {}

  @Get()
  async check() {
    const isConnected = this.dataSource.isInitialized;
    return {
      status: 'ok',
      database: isConnected ? 'connected' : 'disconnected',
    };
  }
}
