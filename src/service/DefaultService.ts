import { IDefaultService } from "./interfaces/IDefaultService";
import { IDefaultDao } from "../dados/interfaces/IDefaultDao";
import { DefaultDto } from "./Dtos/DefaultDto";

export class DefaultService implements IDefaultService{
    constructor(defaultDao : IDefaultDao){
        this.defaultDao = defaultDao;
    }

    defaultDao: IDefaultDao;

    async getById(id: number): Promise<DefaultDto> {
        
        var dados = await this.defaultDao.get(id);

        return new DefaultDto(dados.id, dados.nome);
    }
}