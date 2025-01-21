import { Body, Controller, Post } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';

@Controller()
export class UrlController {
    constructor(private readonly urlService: UrlService) {}

    @Post('/shorten')
    async createUrl(@Body() createUrlDto: CreateUrlDto) {
        return await this.urlService.createUrl(createUrlDto);
    }
}
