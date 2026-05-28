import { IDefaultDao } from "../../dados/interfaces/IDefaultDao";
import { DefaultDto } from "../Dtos/DefaultDto";

export interface IDefaultService{
    defaultDao: IDefaultDao;

    getById(id: number): Promise<DefaultDto>;
}