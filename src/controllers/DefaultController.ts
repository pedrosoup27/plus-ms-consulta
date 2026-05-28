import { IDefaultService } from "../service/interfaces/IDefaultService";
import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';


export class DefaultController{
    constructor(defaultService: IDefaultService){
        this.defaultService = defaultService;
    }

    defaultService: IDefaultService;

    async getUserById(req: Request, res: Response){
    try{
      const id = Number(req.query.id);

      if (!id) {
        return res.status(400).json({ error: "Email é obrigatório" });
      }

      const resultado = await this.defaultService.getById(id);

      return res.status(200).json(resultado);
    } catch(error){

      console.error("Erro no Controller:", error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  async buscaPeca(req: Request, res: Response){
    return res.status(500).json({ error: "Não implementado" });
  }

}