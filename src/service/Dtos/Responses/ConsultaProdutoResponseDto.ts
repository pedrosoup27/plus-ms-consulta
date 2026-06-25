import { ProductDetailResponseDto } from "../../../dados/entities/produtos/ProdutoDto";

export interface ConsultaProdutoResponseDto extends ProductDetailResponseDto {
    estoque?: number;
    lojaId?: number;
}

export interface PaginatedConsultaProdutoResponseDto {
    items: ConsultaProdutoResponseDto[];
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
}
