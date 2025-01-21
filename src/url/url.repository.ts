import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UrlEntity } from './entitys/url.entity';
import { CreateUrlDto } from './dto/create-url.dto';
import * as crypto from 'crypto';

import * as base62 from 'base62';
import { ShortUrlSequenceEntity } from './entitys/short-url-sequence.entity';

@Injectable()
export class UrlRepository {
    constructor(
        @InjectRepository(UrlEntity) private urlRepository: Repository<UrlEntity>,
        @InjectRepository(ShortUrlSequenceEntity) private shortUrlSequenceRepository: Repository<ShortUrlSequenceEntity>,
    ) {}

    async createUrl(createUrlDto: CreateUrlDto) {
        // Хешируем автоинкрементируемое значение с помощью SHA-256
        const result = await this.shortUrlSequenceRepository.insert({});

        const shortUrl = result.identifiers[0].id.toString();

        const hash = crypto.createHash('sha256');
        hash.update(shortUrl);

        // Получаем хеш в шестнадцатеричном формате
        const hashHex = hash.digest('hex');

        // Берем первые 16 символов хеша для преобразования в число
        const partOfHash = hashHex.substring(0, 16); // 16 символов достаточно для числа

        // Преобразуем в число
        const hashNumber = parseInt(partOfHash, 16);

        // Преобразуем число в base62
        const hashBase62 = base62.encode(hashNumber);

        // Обрезаем до первых 6 символов
        return hashBase62.substring(0, 6);

        // const url = this.urlRepository.create({ ...createUrlDto, shortUrl });
        // return await this.urlRepository.save(url);
    }

    async findOneByShortUrl(shortUrl: string) {
        return await this.urlRepository.findOneBy({ shortUrl });
    }
}
