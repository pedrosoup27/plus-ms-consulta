import { IConsultaService } from "./interfaces/IConsultaService";
import { IConsultaRepository } from "../dados/interfaces/IConsultaRepository";
import { ConsultaRequestDto } from "./Dtos/Requests/ConsultaRequestDto";
import { PaginatedProductResponseDto } from "../dados/entities/produtos/ProdutoDto";
import { EstoqueFilial, EstoqueResponseDto } from "../dados/entities/produtos/EstoqueDto";

export class ConsultaService implements IConsultaService{
    constructor(consultaRepository: IConsultaRepository){
        this.consultaRepository = consultaRepository;
    }

    consultaRepository: IConsultaRepository;

    async consultarProdutos(consultaRequestDto: ConsultaRequestDto): Promise<PaginatedProductResponseDto>{
        //const resultado = await this.consultaRepository.buscaProduto(consultaRequestDto);
        const resultadoMock = await this.consultaRepository.buscaProdutoMock();

        // var itemsFiltrados = resultado.items;
        var itemsFiltrados = resultadoMock.items;

        // Filtro por ID do Produto
        if (consultaRequestDto.idProduto) {
            itemsFiltrados = itemsFiltrados.filter(item => item.id === String(consultaRequestDto.idProduto));
        }

        // Filtro por Nome
        if (consultaRequestDto.nome && consultaRequestDto.nome.trim().length > 0) {
            itemsFiltrados = itemsFiltrados.filter(item => 
                item.nome.toLowerCase().includes(consultaRequestDto.nome!.toLowerCase())
            );
        }

        // Filtro por Marca/Tipo
        if (consultaRequestDto.tipo && consultaRequestDto.tipo.trim().length > 0) {
            itemsFiltrados = itemsFiltrados.filter(item => 
                item.marca?.toLowerCase().includes(consultaRequestDto.tipo!.toLowerCase())
            );
        }

        // Filtro por Faixa de Preço
        if (consultaRequestDto.precoIni !== undefined && consultaRequestDto.precoIni !== null) {
            itemsFiltrados = itemsFiltrados.filter(item => item.preco >= consultaRequestDto.precoIni!);
        }

        if (consultaRequestDto.precoFim !== undefined && consultaRequestDto.precoFim !== null) {
            itemsFiltrados = itemsFiltrados.filter(item => item.preco <= consultaRequestDto.precoFim!);
        }

        // Filtro por Tamanho e Cor (nas variantes)
        if (consultaRequestDto.tamanho || consultaRequestDto.cor) {
            itemsFiltrados = itemsFiltrados.map(item => ({
                ...item,
                variantes: item.variantes.filter(v => {
                    const tamanhoMatch = !consultaRequestDto.tamanho || 
                        v.tamanho?.nome === consultaRequestDto.tamanho;
                    const corMatch = !consultaRequestDto.cor || 
                        v.cor.toLowerCase() === consultaRequestDto.cor!.toLowerCase();
                    return tamanhoMatch && corMatch;
                })
            }))
            .filter(item => item.variantes.length > 0); // Remove produtos sem variantes correspondentes
        }

        // Filtro por Apenas com Estoque
        if (consultaRequestDto.apenasComEstoque) {
            itemsFiltrados = itemsFiltrados.filter(item => 
                item.variantes && item.variantes.length > 0
            );
        }

        // Filtro por LojaId (se necessário chamar serviço de estoque)
        if (consultaRequestDto.lojaId) {
            // TODO: Implementar filtro por loja via serviço de estoque
            // itemsFiltrados = await this.filtrarPorLoja(itemsFiltrados, consultaRequestDto.lojaId);
        }

        resultadoMock.items = itemsFiltrados;

        return resultadoMock;


    }

    // TODO: Serviço de consulta de estoque
    async consultarEstoque(idProduto: string): Promise<EstoqueResponseDto>{
        const mock = await this.consultaRepository.buscaEstoqueMock(idProduto);

        const responseMock: EstoqueResponseDto = {
            lojaId: 0, // Por hora fixamos a filial em id zero, pois não existe no contexto da equipe estoque
            roupaId: mock.roupaId,
            produtoId: mock.produtoId,
            tamanho: mock.tamanho,
            cor: mock.cor,
            saldo: mock.saldo,
            atualizadoEm: mock.atualizadoEm
        };

        return responseMock;
    }
}