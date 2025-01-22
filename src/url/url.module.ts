import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { UrlRepository } from './url.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlEntity } from './entitys/url.entity';
import { AnalyticsService } from 'src/analytics/analytics.service';
import { AnalyticsModule } from 'src/analytics/analytics.module';

@Module({
    imports: [TypeOrmModule.forFeature([UrlEntity]), AnalyticsModule],
    controllers: [UrlController],
    providers: [UrlService, UrlRepository, AnalyticsService],
})
export class UrlModule {}
