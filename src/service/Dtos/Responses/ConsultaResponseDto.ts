import { ProdutoDto } from "../../../dados/entities/ProdutoDto"

export class ConsultaResponseDto{
    constructor(produtosList: ProdutoDto[]){
        this.produtosList = produtosList;
    }

    produtosList: ProdutoDto[];

}