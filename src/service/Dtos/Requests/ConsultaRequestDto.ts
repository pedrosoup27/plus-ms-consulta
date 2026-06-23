export class ConsultaRequestDto{
    constructor(idProduto?: string, nome?: string, tamanho?: string, cor?: string, tipo?: string, lojaId?: number, apenasComEstoque?: boolean, precoIni?: number, precoFim?: number){
        this.idProduto = idProduto;
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
    idProduto?: string;
    nome?: string;
    tamanho?: string;
    cor?: string;
    tipo?: string;
    lojaId?: number;
    apenasComEstoque?: boolean;
    precoIni?: number;
    precoFim?: number;

}