import { UrlEntity } from 'src/url/entitys/url.entity';
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('analytics')
@Index('idx_analytics_url_id', ['urlId']) // Индекс на urlId
@Index('idx_analytics_url_id_created_at', ['urlId', 'createdAt']) // Композитный индекс на urlId и createdAt
export class AnalyticsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UrlEntity, (url) => url.analytics, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'url_id' })
    urlId: UrlEntity;

    @Column({ name: 'user_ip' })
    userIp: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
