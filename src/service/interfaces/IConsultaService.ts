import { IConsultaRepository } from "../../dados/interfaces/IConsultaRepository"
import { ConsultaRequestDto } from "../Dtos/Requests/ConsultaRequestDto";
import { PaginatedConsultaProdutoResponseDto } from "../Dtos/Responses/ConsultaProdutoResponseDto";
import { EstoqueFilial, EstoqueResponseDto } from "../../dados/entities/produtos/EstoqueDto";

export interface IConsultaService{
    consultaRepository: IConsultaRepository;

    consultarProdutos(consultaRequestDto: ConsultaRequestDto): Promise<PaginatedConsultaProdutoResponseDto>;
    consultarEstoque(idProduto: string): Promise<EstoqueResponseDto>;
    
}