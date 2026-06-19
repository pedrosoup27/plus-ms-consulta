import { IConsultaService } from "./interfaces/IConsultaService";
import { IConsultaRepository } from "../dados/interfaces/IConsultaRepository";
import { ConsultaRequestDto } from "./Dtos/Requests/ConsultaRequestDto";
import { ConsultaResponseDto } from "./Dtos/Responses/ConsultaResponseDto";
import { ProdutoDto } from "../dados/entities/ProdutoDto";

export class ConsultaService implements IConsultaService{
    constructor(consultaRepository: IConsultaRepository){
        this.consultaRepository = consultaRepository;
    }

    consultaRepository: IConsultaRepository;

    async consultarProdutos(consultaRequestDto: ConsultaRequestDto): Promise<ConsultaResponseDto>{
        const resultado = await this.consultaRepository.buscaProduto(consultaRequestDto);

        return resultado;
    }
}