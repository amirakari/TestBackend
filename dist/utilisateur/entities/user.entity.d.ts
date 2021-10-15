import { TimestampEntities } from '../../Generics/Timestamp.entities';
import { URLEntity } from '../../URL/entities/URL.entity';
export declare class UserEntity extends TimestampEntities {
    id: number;
    nom: string;
    salt: string;
    prenom: string;
    numtel: number;
    adresse: string;
    mail: string;
    password: string;
    urls: URLEntity[];
}
