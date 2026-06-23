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

    async buscaProdutoMock(): Promise<PaginatedProductResponseDto>{
    return {
        items: [
            {
                id: "1",
                nome: "Camiseta Básica Vermelha",
                descricao: "Camiseta 100% algodão confortável",
                marca: "Nike",
                preco: 49.90,
                ativo: true,
                categoriaId: "cat-001",
                fornecedorId: "forn-001",
                criadoEm: "2024-01-10",
                atualizadoEm: "2024-06-23",
                variantes: [
                    {
                        id: "var-1-1",
                        produtoId: "1",
                        tamanhoId: "tam-1",
                        tamanho: { id: "tam-1", nome: "P", descricao: "Pequeno", ativo: true },
                        cor: "Vermelho",
                        sku: "SKU-001-P-VM",
                        ativo: true,
                        criadoEm: "2024-01-10",
                        atualizadoEm: "2024-06-23"
                    },
                    {
                        id: "var-1-2",
                        produtoId: "1",
                        tamanhoId: "tam-2",
                        tamanho: { id: "tam-2", nome: "M", descricao: "Médio", ativo: true },
                        cor: "Vermelho",
                        sku: "SKU-001-M-VM",
                        ativo: true,
                        criadoEm: "2024-01-10",
                        atualizadoEm: "2024-06-23"
                    }
                ]
            },
            {
                id: "2",
                nome: "Calça Jeans Azul",
                descricao: "Calça jeans premium com stretch",
                marca: "Adidas",
                preco: 159.90,
                ativo: true,
                categoriaId: "cat-002",
                fornecedorId: "forn-002",
                criadoEm: "2024-02-15",
                atualizadoEm: "2024-06-23",
                variantes: [
                    {
                        id: "var-2-1",
                        produtoId: "2",
                        tamanhoId: "tam-2",
                        tamanho: { id: "tam-2", nome: "M", descricao: "Médio", ativo: true },
                        cor: "Azul",
                        sku: "SKU-002-M-AZ",
                        ativo: true,
                        criadoEm: "2024-02-15",
                        atualizadoEm: "2024-06-23"
                    }
                ]
            },
            {
                id: "3",
                nome: "Tênis Esportivo Branco",
                descricao: "Tênis leve para corrida e academia",
                marca: "Puma",
                preco: 299.90,
                ativo: true,
                categoriaId: "cat-003",
                fornecedorId: "forn-001",
                criadoEm: "2024-03-20",
                atualizadoEm: "2024-06-23",
                variantes: [
                    {
                        id: "var-3-1",
                        produtoId: "3",
                        tamanhoId: "tam-4",
                        tamanho: { id: "tam-4", nome: "37", descricao: "Tamanho 37", ativo: true },
                        cor: "Branco",
                        sku: "SKU-003-37-BR",
                        ativo: true,
                        criadoEm: "2024-03-20",
                        atualizadoEm: "2024-06-23"
                    },
                    {
                        id: "var-3-2",
                        produtoId: "3",
                        tamanhoId: "tam-5",
                        tamanho: { id: "tam-5", nome: "38", descricao: "Tamanho 38", ativo: true },
                        cor: "Branco",
                        sku: "SKU-003-38-BR",
                        ativo: true,
                        criadoEm: "2024-03-20",
                        atualizadoEm: "2024-06-23"
                    }
                ]
            },
            {
                id: "4",
                nome: "Jaqueta Puffer Preta",
                descricao: "Jaqueta impermeável e isolante térmica",
                marca: "The North Face",
                preco: 499.90,
                ativo: true,
                categoriaId: "cat-004",
                fornecedorId: "forn-003",
                criadoEm: "2024-04-05",
                atualizadoEm: "2024-06-23",
                variantes: [
                    {
                        id: "var-4-1",
                        produtoId: "4",
                        tamanhoId: "tam-1",
                        tamanho: { id: "tam-1", nome: "P", descricao: "Pequeno", ativo: true },
                        cor: "Preto",
                        sku: "SKU-004-P-PR",
                        ativo: true,
                        criadoEm: "2024-04-05",
                        atualizadoEm: "2024-06-23"
                    },
                    {
                        id: "var-4-2",
                        produtoId: "4",
                        tamanhoId: "tam-3",
                        tamanho: { id: "tam-3", nome: "G", descricao: "Grande", ativo: true },
                        cor: "Preto",
                        sku: "SKU-004-G-PR",
                        ativo: true,
                        criadoEm: "2024-04-05",
                        atualizadoEm: "2024-06-23"
                    }
                ]
            },
            {
                id: "5",
                nome: "Meias Esportivas Cinza",
                descricao: "Kit com 3 pares de meias de algodão",
                marca: "Uniqlo",
                preco: 39.90,
                ativo: true,
                categoriaId: "cat-005",
                fornecedorId: "forn-002",
                criadoEm: "2024-05-12",
                atualizadoEm: "2024-06-23",
                variantes: [
                    {
                        id: "var-5-1",
                        produtoId: "5",
                        tamanhoId: "tam-6",
                        tamanho: { id: "tam-6", nome: "Único", descricao: "Tamanho único", ativo: true },
                        cor: "Cinza",
                        sku: "SKU-005-UN-CZ",
                        ativo: true,
                        criadoEm: "2024-05-12",
                        atualizadoEm: "2024-06-23"
                    }
                ]
            }
        ],
        page: 1,
        pageSize: 5,
        totalItems: 5,
        totalPages: 1
    };
}

    async buscaEstoque(codProduto: number): Promise<number>{

        return 0;
    }
    
}