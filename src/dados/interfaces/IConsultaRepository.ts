import { ConsultaRequestDto } from "../../service/Dtos/Requests/ConsultaRequestDto"
import { Estoque, EstoqueResponseDto } from "../entities/produtos/EstoqueDto";
import { PaginatedProductResponseDto } from "../entities/produtos/ProdutoDto";

export interface IConsultaRepository{
    buscaProduto(consultaRequest: ConsultaRequestDto): Promise<PaginatedProductResponseDto>;
    buscaEstoque(codProduto: number): Promise<Estoque>;
    buscaProdutoMock(): Promise<PaginatedProductResponseDto>;
    buscaEstoqueMock(codProduto: string): Promise<Estoque>;
}