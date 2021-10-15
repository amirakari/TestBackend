import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../utilisateur/entities/user.entity';
import { TimestampEntities } from '../../Generics/Timestamp.entities';
import { IsDecimal, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
@Entity('Url')
export class URLEntity extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  full: string;
  @Column()
  short: string;
  @Column()
  clicks: number;
  @ManyToOne((type) => UserEntity, (user) => user.urls, {
    cascade: ['soft-remove', 'remove', 'update', 'insert'],
    nullable: true,
    eager: true,
  })
  user: UserEntity;
}
