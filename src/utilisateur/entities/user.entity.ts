import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimestampEntities } from '../../Generics/Timestamp.entities';
import { URLEntity } from '../../URL/entities/URL.entity';
@Entity('utilisateur')
export class UserEntity extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nom: string;
  @Column()
  salt: string;
  @Column()
  prenom: string;
  @Column()
  numtel: number;
  @Column()
  adresse: string;
  @PrimaryColumn()
  @Column({
    unique: true,
  })
  mail: string;
  @Column({
    name: 'mot de passe',
  })
  password: string;
  @OneToMany((type) => URLEntity, (url) => url.user, {
    nullable: true,
  })
  urls: URLEntity[];
}
