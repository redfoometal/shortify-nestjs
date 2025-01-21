import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('urls')
@Unique(['shortUrl', 'alias'])
export class UrlEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'original_url' })
    originalUrl: string;

    @Column({ name: 'short_url', length: 6, unique: true })
    shortUrl: string;

    @Column({ name: 'alias', length: 20, nullable: true })
    alias: string;

    @Column({ name: 'expires_at', nullable: true })
    expiresAt: Date;

    @Column({ name: 'click_count', default: 0 })
    clickCount: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
