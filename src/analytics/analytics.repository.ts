import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnalyticsEntity } from './entitys/analytics.entity';
import { UrlEntity } from 'src/url/entitys/url.entity';

@Injectable()
export class AnalyticsRepository {
    constructor(@InjectRepository(AnalyticsEntity) private analyticsRepository: Repository<AnalyticsEntity>) {}

    async createAnalytics(createAnalyticsDto: { userIp: string; urlId: UrlEntity }) {
        const analytic = this.analyticsRepository.create(createAnalyticsDto);
        return await this.analyticsRepository.save(analytic);
    }

    async getAnalytics(shortUrl: string) {
        const countPromise = this.getCountClicks(shortUrl);
        const lastIpsPromise = this.analyticsRepository
            .createQueryBuilder('analytics')
            .innerJoinAndSelect('analytics.urlId', 'urls')
            .where('urls.shortUrl = :shortUrl', { shortUrl })
            .orderBy('analytics.createdAt', 'DESC')
            .limit(5)
            .select(['analytics.userIp AS "userIp"', 'analytics.createdAt AS "createdAt"', 'urls.shortUrl AS "shortUrl"'])
            .getRawMany()
            .then((result) => result.map((item) => item.userIp));

        const [clickCount, lastIpsResult] = await Promise.all([countPromise, lastIpsPromise]);

        return {
            clickCount,
            lastIps: lastIpsResult,
        };
    }

    async getCountClicks(shortUrl: string) {
        return await this.analyticsRepository.count({ where: { urlId: { shortUrl } } });
    }
}
