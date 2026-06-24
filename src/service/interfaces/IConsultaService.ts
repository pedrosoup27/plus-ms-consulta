import { IConsultaRepository } from "../../dados/interfaces/IConsultaRepository"
import { ConsultaRequestDto } from "../Dtos/Requests/ConsultaRequestDto";
import { PaginatedProductResponseDto } from "../../dados/entities/produtos/ProdutoDto";
import { EstoqueFilial, EstoqueResponseDto } from "../../dados/entities/produtos/EstoqueDto";

export interface IConsultaService{
    consultaRepository: IConsultaRepository;

    consultarProdutos(consultaRequestDto: ConsultaRequestDto): Promise<PaginatedProductResponseDto>;
    consultarEstoque(idProduto: string): Promise<EstoqueResponseDto>;
    
}