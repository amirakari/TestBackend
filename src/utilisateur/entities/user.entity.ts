import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimestampEntities } from '../../Generics/Timestamp.entities';
import { BoutiqueEntity } from '../../boutique/entities/boutique.entity';
import { type } from 'os';
import { CommentaireEntity } from '../../commentaire/entities/commentaire.entity';
import { EvaluationproduitEntity } from '../../evaluationproduit/entities/evaluationproduit.entity';
import { CommandeEntity } from '../../commande/entities/commande.entity';
import { PanierEntity } from '../../listefavoris/entities/panier.entity';
import { UserTypeEnum } from '../../enums/user.type.enum';

@Entity('utilisateur')
export class UserEntity extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nom: string;
  @Column()
  prenom: string;
  @Column()
  numtel: number;
  @Column()
  adresse: string;
  @Column({ nullable: true })
  photodeprofil: string;
  @Column({ type: 'enum', enum: UserTypeEnum, default: UserTypeEnum.USER })
  type: string;
  @Column()
  salt: string;
  @PrimaryColumn()
  @Column({
    unique: true,
  })
  mail: string;
  @Column({
    name: 'mot de passe',
  })
  password: string;
  @OneToMany((type) => BoutiqueEntity, (boutique) => boutique.user, {
    nullable: true,
  })
  boutiques: BoutiqueEntity[];
  @OneToMany((type) => PanierEntity, (panier) => panier.user, {
    cascade: true,
    nullable: true,
  })
  panier: PanierEntity[];
  @OneToMany((type) => CommentaireEntity, (commentaire) => commentaire.user, {
    cascade: true,
    nullable: true,
  })
  commentaires: CommentaireEntity[];
  @OneToMany(
    (type) => EvaluationproduitEntity,
    (evaluationproduit) => evaluationproduit.user,
    {
      cascade: true,
      nullable: true,
    },
  )
  evaluationproduit: EvaluationproduitEntity[];
  @OneToMany((type) => CommandeEntity, (commande) => commande.user, {
    cascade: true,
    nullable: true,
  })
  commandes: CommandeEntity[];
}
