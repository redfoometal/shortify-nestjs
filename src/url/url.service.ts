import { Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UrlRepository } from './url.repository';

@Injectable()
export class UrlService {
    constructor(private readonly urlRepository: UrlRepository) {}
    async createUrl(createUrlDto: CreateUrlDto) {
        return await this.urlRepository.createUrl(createUrlDto);
    }
}
