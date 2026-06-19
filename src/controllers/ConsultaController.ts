import { IConsultaService } from "../service/interfaces/IConsultaService";
import { ConsultaRequestDto } from "../service/Dtos/Requests/ConsultaRequestDto";
import { ConsultaResponseDto } from "../service/Dtos/Responses/ConsultaResponseDto";
import express, { Request, Response } from 'express';

export class ConsultaController{
    constructor(consultaService: IConsultaService){
        this.consultaService = consultaService;
    }

    consultaService: IConsultaService;

    async consultarProdutos(req: Request, res: Response){
        try{
            const consultaRequestDto = new ConsultaRequestDto(
                Number(req.query.codProduto),
                String(req.query.nome),
                String(req.query.tamanho),
                String(req.query.cor),
                String(req.query.tipo),
                Number(req.query.lojaId),
                req.query.apenasComEstoque === "true",
                Number(req.query.precoIni),
                Number(req.query.precoFim)
            );

            const resultado = await this.consultaService.consultarProdutos(consultaRequestDto);

            return res.status(200).json(resultado);

        }
        catch(error){

            return res.status(500).json({erro : "Erro interno do servidor"})
        }
    }
    
}