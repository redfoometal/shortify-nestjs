import { ConflictException, GoneException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UrlRepository } from './url.repository';
import { AnalyticsRepository } from 'src/analytics/analytics.repository';

@Injectable()
export class UrlService {
    constructor(
        private readonly urlRepository: UrlRepository,
        private readonly analyticsRepository: AnalyticsRepository,
    ) {}
    async createUrl(createUrlDto: CreateUrlDto) {
        const { originalUrl, expiresAt, alias } = createUrlDto;
        const shortUrl = alias || (await import('nanoid')).nanoid(6);

        return await this.urlRepository.createUrl({ originalUrl, expiresAt, shortUrl }).catch((error) => {
            if (error?.code === '23505') {
                throw new ConflictException('Alias already exists');
            }
            throw new InternalServerErrorException();
        });
    }

    async redirectUrl(shortUrl: string, ip: string): Promise<{ originalUrl: string }> {
        const url = await this.urlRepository.findOneByShortUrl(shortUrl);
        if (!url) {
            throw new NotFoundException('shortUrl not found');
        }

        if (url.expiresAt && url.expiresAt < new Date()) {
            throw new GoneException();
        }

        this.analyticsRepository.createAnalytics({ userIp: ip, urlId: url });
        return { originalUrl: url.originalUrl };
    }

    async getUrlInfo(shortUrl: string) {
        const [url, count] = await Promise.all([
            this.urlRepository.findOneByShortUrl(shortUrl),
            this.analyticsRepository.getCountClicks(shortUrl),
        ]);

        if (!url) {
            throw new NotFoundException('shortUrl not found');
        }
        return {
            originalUrl: url.originalUrl,
            createdAt: url.createdAt,
            clickCount: count,
        };
    }

    async deleteUrl(shortUrl: string) {
        const url = await this.urlRepository.findOneByShortUrl(shortUrl);
        if (!url) {
            throw new NotFoundException('shortUrl not found');
        }
        return await this.urlRepository.deleteUrl(url.id);
    }
}
