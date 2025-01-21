import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { UrlRepository } from './url.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlEntity } from './entitys/url.entity';
import { ShortUrlSequenceEntity } from './entitys/short-url-sequence.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UrlEntity, ShortUrlSequenceEntity])],
  controllers: [UrlController],
  providers: [UrlService, UrlRepository],
})
export class UrlModule {}
