import { Body, Controller, Delete, Get, Ip, Param, Post, Redirect, Req, Res } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';

@Controller()
export class UrlController {
    constructor(private readonly urlService: UrlService) {}

    @Post('/shorten')
    async createUrl(@Body() createUrlDto: CreateUrlDto) {
        return await this.urlService.createUrl(createUrlDto);
    }

    @Get('/:shortUrl')
    @Redirect()
    async redirectUrl(@Ip() ip: string, @Param("shortUrl") shortUrl: string) {
        const url = await this.urlService.redirectUrl(shortUrl, ip);
        return { url: url.originalUrl };
    }

    @Get('/info/:shortUrl')
    async getUrlInfo(@Param("shortUrl") shortUrl: string) {
        return await this.urlService.getUrlInfo(shortUrl);
    }

    @Delete('/delete/:shortUrl')
    async deleteUrl(@Param("shortUrl") shortUrl: string) {
        return await this.urlService.deleteUrl(shortUrl);
    }
}
