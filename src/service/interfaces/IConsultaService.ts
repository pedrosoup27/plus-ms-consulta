import { IConsultaRepository } from "../../dados/interfaces/IConsultaRepository"
import { ConsultaRequestDto } from "../Dtos/Requests/ConsultaRequestDto";
import { PaginatedProductResponseDto } from "../../dados/entities/produtos/ProdutoDto";

export interface IConsultaService{
    consultaRepository: IConsultaRepository;

    consultarProdutos(consultaRequestDto: ConsultaRequestDto): Promise<PaginatedProductResponseDto>;
    
}