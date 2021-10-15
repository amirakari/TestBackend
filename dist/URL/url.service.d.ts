import { Repository } from 'typeorm';
import { URLEntity } from './entities/URL.entity';
import { AddURLDto } from './DTO/Add-URL.dto';
import { UpdateUrlDto } from "./DTO/update-url.dto";
export declare class UrlService {
    private boutiqueRepository;
    constructor(boutiqueRepository: Repository<URLEntity>);
    getBoutique(): Promise<URLEntity[]>;
    addBoutique(boutique: AddURLDto, user: any): Promise<URLEntity>;
    updateUrl(id: number, user: UpdateUrlDto): Promise<URLEntity>;
}
