import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateUrlDto {
    @IsNotEmpty({ message: 'originalUrl is required' })
    @IsUrl()
    originalUrl: string;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    expiresAt: Date;

    @IsOptional()
    @IsString()
    @MaxLength(20)
    alias: string;
}
