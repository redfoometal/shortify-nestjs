import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('shortUrlSequence', { name: 'short_url_sequence' })
export class ShortUrlSequenceEntity {
    @PrimaryGeneratedColumn()
    id: number;
}
