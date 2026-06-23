  //======================================//
 // DTOs PARA CONSUMO DA API DE PRODUTOS //        
//======================================//

export interface SizeResponseDto {
  id: string;
  nome: string; // Nome do tamanho????????
  descricao: string | null;
  ativo: boolean;
}

export interface VariantResponseDto {
  id: string;
  produtoId: string;
  tamanhoId: string;
  tamanho: SizeResponseDto | null;
  cor: string;
  sku: string;
  ativo: boolean;
  criadoEm: string | null;
  atualizadoEm: string | null;
}

export interface ProductDetailResponseDto {
  id: string;
  nome: string;
  descricao: string | null;
  marca: string | null;
  preco: number;
  ativo: boolean;
  categoriaId: string | null;
  fornecedorId: string | null;
  criadoEm: string;
  atualizadoEm: string;
  variantes: VariantResponseDto[];
}

export interface PaginatedProductResponseDto {
  items: ProductDetailResponseDto[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}