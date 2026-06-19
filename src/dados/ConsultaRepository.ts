import { IConsultaRepository } from "./interfaces/IConsultaRepository";
import { ConsultaRequestDto } from "../service/Dtos/Requests/ConsultaRequestDto";
import { ConsultaResponseDto } from "../service/Dtos/Responses/ConsultaResponseDto";
import { ProdutoDto } from "./entities/ProdutoDto";
import express, { Request, Response } from 'express';



export class ConsultaRepository implements IConsultaRepository{
    constructor(){

    }

    async buscaProduto(consultaRequest: ConsultaRequestDto): Promise<ConsultaResponseDto>{
        const resultado = await fetch('https://servicoprodutos/api/listprodutos'); // Trocar aqui pelo endpoint da equipe produtos
        if(!resultado.ok) throw new Error('Erro ao buscar dados');

        const json = await resultado.json();

        try{
            //const produtos: ProdutoDto[] = json.filter((item: any) => item.codProduto && item.precoProduto).map((item: any) => new ProdutoDto(item.codProduto, item.precoProduto));

        } catch(error){
            throw new Error('Erro ao converter dados');
        }
        const aa: ProdutoDto[] = [new ProdutoDto(1, 2)];
        const a: ConsultaResponseDto = new ConsultaResponseDto(aa);

        return a;
    }

    async buscaEstoque(codProduto: number): Promise<number>{

        return 0;
    }
    
}