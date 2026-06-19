export class ProdutoDto{
    constructor(codProduto: number, precoProduto: number){
        this.codProduto = codProduto;
        this.precoProduto = precoProduto;
    }
    // Atributos devem ser atualizados de acordo com o retorno da equipe produto
    codProduto: number;
    precoProduto: number;

}