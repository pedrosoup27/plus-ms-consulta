import { IConsultaRepository } from "../../dados/interfaces/IConsultaRepository"
import { ConsultaRequestDto } from "../Dtos/Requests/ConsultaRequestDto";
import { ConsultaResponseDto } from "../Dtos/Responses/ConsultaResponseDto";

export interface IConsultaService{
    consultaRepository: IConsultaRepository;

    consultarProdutos(consultaRequestDto: ConsultaRequestDto): Promise<ConsultaResponseDto>;
    
}