import { ConsultaRequestDto } from "../../service/Dtos/Requests/ConsultaRequestDto"
import { PaginatedProductResponseDto } from "../entities/produtos/ProdutoDto";

export interface IConsultaRepository{
    buscaProduto(consultaRequest: ConsultaRequestDto): Promise<PaginatedProductResponseDto>;
    buscaEstoque(codProduto: number): Promise<number>;
    buscaProdutoMock(): Promise<PaginatedProductResponseDto>;
}