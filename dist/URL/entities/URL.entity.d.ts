import { UserEntity } from '../../utilisateur/entities/user.entity';
import { TimestampEntities } from '../../Generics/Timestamp.entities';
export declare class URLEntity extends TimestampEntities {
    id: number;
    full: string;
    short: string;
    clicks: number;
    user: UserEntity;
}
