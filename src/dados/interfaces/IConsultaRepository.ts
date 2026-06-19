import { ConsultaRequestDto } from "../../service/Dtos/Requests/ConsultaRequestDto"
import { ConsultaResponseDto } from "../../service/Dtos/Responses/ConsultaResponseDto";

export interface IConsultaRepository{
    buscaProduto(consultaRequest: ConsultaRequestDto): Promise<ConsultaResponseDto>;
    buscaEstoque(codProduto: number): Promise<number>;
    
}