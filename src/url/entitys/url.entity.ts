import { AnalyticsEntity } from 'src/analytics/entitys/analytics.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('urls')
export class UrlEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'original_url' })
    originalUrl: string;

    @Column({ name: 'short_url', length: 20, unique: true })
    shortUrl: string;

    @Column({ type: 'timestamptz', name: 'expires_at', nullable: true })
    expiresAt: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @OneToMany(() => AnalyticsEntity, (analytics) => analytics.urlId)
    analytics: AnalyticsEntity[];
}
