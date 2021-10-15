import { UrlService } from './url.service';
import { Request } from 'express';
import { URLEntity } from './entities/URL.entity';
import { AddURLDto } from './DTO/Add-URL.dto';
import { UpdateUrlDto } from './DTO/update-url.dto';
export declare class UrlController {
    private boutiqueService;
    constructor(boutiqueService: UrlService);
    getAllcvs(): Promise<URLEntity[]>;
    addCv(addCvDto: AddURLDto, request: Request): Promise<URLEntity>;
    updateUrl(updateUserDto: UpdateUrlDto, id: number): Promise<any>;
}
