import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsEntity } from './entitys/analytics.entity';
import { AnalyticsRepository } from './analytics.repository';

@Module({
    imports: [TypeOrmModule.forFeature([AnalyticsEntity])],
    controllers: [AnalyticsController],
    providers: [AnalyticsService, AnalyticsRepository],
    exports: [AnalyticsService, AnalyticsRepository],
})
export class AnalyticsModule {}
