import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UrlEntity } from './entitys/url.entity';
import { CreateUrlDto } from './dto/create-url.dto';

@Injectable()
export class UrlRepository {
    constructor(@InjectRepository(UrlEntity) private urlRepository: Repository<UrlEntity>) {}

    async createUrl(createUrlDto: { originalUrl: string; expiresAt: Date; shortUrl: string }) {
        const url = this.urlRepository.create(createUrlDto);
        return await this.urlRepository.save(url);
    }

    async findOneByShortUrl(shortUrl: string) {
        return await this.urlRepository.findOneBy({ shortUrl });
    }

    async updateUrl(id: number, updateUrlDto: Partial<UrlEntity>) {
        return await this.urlRepository.update(id, updateUrlDto);
    }

    async deleteUrl(id: number) {
        return await this.urlRepository.delete(id);
    }
}
