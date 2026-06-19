export class ConsultaRequestDto{
    constructor(codProduto: number,
    nome: string, tamanho: string, cor: string, tipo: string, lojaId: number, apenasComEstoque: boolean, precoIni: number, precoFim: number){
        this.codProduto = codProduto;
        this.nome = nome;
        this.tamanho = tamanho;
        this.cor = cor;
        this.tipo = tipo;
        this.lojaId = lojaId;
        this.apenasComEstoque = apenasComEstoque;
        this.precoIni = precoIni;
        this.precoFim = precoFim;

    }

    // Todos os tipos devem ser opcionais como são parâmetros de pesquisa
    codProduto?: number;
    nome?: string;
    tamanho?: string;
    cor?: string;
    tipo?: string;
    lojaId?: number;
    apenasComEstoque?: boolean;
    precoIni?: number;
    precoFim?: number;

}