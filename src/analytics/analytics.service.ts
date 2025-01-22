import { Injectable, NotFoundException } from '@nestjs/common';
import { AnalyticsRepository } from './analytics.repository';

@Injectable()
export class AnalyticsService {
    constructor(private readonly analyticsRepository: AnalyticsRepository) {}

    async getAnalytics(shortUrl: string) {
        const analyticsResult = await this.analyticsRepository.getAnalytics(shortUrl);
        if (!analyticsResult) {
            throw new NotFoundException('shortUrl not found');
        }
        return analyticsResult;
    }
}
