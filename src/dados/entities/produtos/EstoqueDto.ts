export type TipoMovimento = 'entrada' | 'saida' | 'ajuste';

export interface Estoque {
  roupaId: string;
  produtoId: string;
  tamanho?: string | undefined;
  cor?: string | undefined;
  saldo: number;
  atualizadoEm: string;
}

// Estoque filial é um dto criado para considerar a possibilidade de múltiplas lojas diferentes
export interface EstoqueFilial {
  lojaId: number;
  roupaId: string;
  produtoId: string;
  tamanho?: string | undefined;
  cor?: string | undefined;
  saldo: number;
  atualizadoEm: string;
}

export interface FiltroEstoquePayload {
  tamanho?: string | undefined;
  cor?: string | undefined;
}