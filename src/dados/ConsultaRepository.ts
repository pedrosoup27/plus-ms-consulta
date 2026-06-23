import { IConsultaRepository } from "./interfaces/IConsultaRepository";
import { ConsultaRequestDto } from "../service/Dtos/Requests/ConsultaRequestDto";
import express, { Request, Response } from 'express';
import { PaginatedProductResponseDto } from "./entities/produtos/ProdutoDto";
import { ProductDetailResponseDto } from "./entities/produtos/ProdutoDto";



export class ConsultaRepository implements IConsultaRepository{
    constructor(){
    }

    async buscaProduto(consultaRequest: ConsultaRequestDto): Promise<PaginatedProductResponseDto>{
        const resultado = await fetch('http://localhost:3002/products?page=1&pageSize=100'); // Endpoint da equipe produtos
        if(!resultado.ok) throw new Error('Erro ao buscar dados');

        const json = await resultado.json();

        try{
            const dadosPaginados = json as PaginatedProductResponseDto;

            return dadosPaginados; // Retorna páginas do repository para o service, trataremos os items depois

        } catch(error){
            throw new Error('Erro ao converter dados');
        }
    }

    async buscaEstoque(codProduto: number): Promise<number>{

        return 0;
    }
    
}