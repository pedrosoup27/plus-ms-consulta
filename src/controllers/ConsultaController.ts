import { IConsultaService } from "../service/interfaces/IConsultaService";
import { ConsultaRequestDto } from "../service/Dtos/Requests/ConsultaRequestDto";
import { PaginatedProductResponseDto } from "../dados/entities/produtos/ProdutoDto";

import express, { Request, Response } from 'express';

export class ConsultaController{
    constructor(consultaService: IConsultaService){
        this.consultaService = consultaService;
    }

    consultaService: IConsultaService;

    async consultarProdutos(req: Request, res: Response){
        try{
            const consultaRequestDto = new ConsultaRequestDto(
                req.query.idProduto ? String(req.query.idProduto) : undefined,
                req.query.nome ? String(req.query.nome) : undefined,
                req.query.tamanho ? String(req.query.tamanho) : undefined,
                req.query.cor ? String(req.query.cor) : undefined,
                req.query.tipo ? String(req.query.tipo) : undefined,
                req.query.lojaId ? Number(req.query.lojaId) : undefined,
                req.query.apenasComEstoque === "true",
                req.query.precoIni ? Number(req.query.precoIni) : undefined,
                req.query.precoFim ? Number(req.query.precoFim) : undefined
            );

            const resultado = await this.consultaService.consultarProdutos(consultaRequestDto);

            return res.status(200).json(resultado);

        }
        catch(error){

            return res.status(500).json({erro : "Erro interno do servidor"})
        }
    }
    
}