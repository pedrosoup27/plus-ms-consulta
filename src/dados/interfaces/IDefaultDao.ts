import { DefaultDto } from "../../service/Dtos/DefaultDto"

export interface IDefaultDao{
    get(userId: number): Promise<DefaultDto>
    post(defaultDto: DefaultDto): Promise<boolean>
    put(defaultDto: DefaultDto): Promise<boolean>
    delete(userId: number): Promise<boolean>
}