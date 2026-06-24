/// <reference types="jest" />
import { ConsultaService } from '../service/ConsultaService';
import { IConsultaRepository } from '../dados/interfaces/IConsultaRepository';
import { ConsultaRequestDto } from '../service/Dtos/Requests/ConsultaRequestDto';

// Mock do repository
const mockConsultaRepository: jest.Mocked<IConsultaRepository> = {
  buscaProdutoMock: jest.fn(),
  buscaEstoqueMock: jest.fn(),
} as any;

describe('ConsultaService', () => {
  let consultaService: ConsultaService;

  beforeEach(() => {
    consultaService = new ConsultaService(mockConsultaRepository);
  });

  describe('consultarProdutos', () => {
    it('deve retornar produtos sem filtros', async () => {
      const mockData = {
        page: 1,
        pageSize: 10,
        totalItems: 2,
        totalPages: 1,
        total: 2,
        items: [
          { id: '1', nome: 'Produto A', preco: 100, marca: 'Brand A', variantes: [] },
          { id: '2', nome: 'Produto B', preco: 200, marca: 'Brand B', variantes: [] },
        ],
      };
      
      mockConsultaRepository.buscaProdutoMock.mockResolvedValue(mockData as any);

      const request = new ConsultaRequestDto();
      const result = await consultaService.consultarProdutos(request);

      expect(result.items).toHaveLength(2);
      expect(mockConsultaRepository.buscaProdutoMock).toHaveBeenCalled();
    });

    it('deve filtrar produtos por ID', async () => {
      const mockData = {
        page: 1,
        pageSize: 10,
        totalItems: 2,
        totalPages: 1,
        total: 2,
        items: [
          { id: '1', nome: 'Produto A', preco: 100, marca: 'Brand A', variantes: [] },
          { id: '2', nome: 'Produto B', preco: 200, marca: 'Brand B', variantes: [] },
        ],
      };
      
      mockConsultaRepository.buscaProdutoMock.mockResolvedValue(mockData as any);

      const request = new ConsultaRequestDto();
      request.idProduto = '1';
      const result = await consultaService.consultarProdutos(request);

      expect(result.items).toHaveLength(1);
      expect(result.items[0].id).toBe('1');
    });

    it('deve filtrar produtos por nome', async () => {
      const mockData = {
        page: 1,
        pageSize: 10,
        totalItems: 2,
        totalPages: 1,
        total: 2,
        items: [
          { id: '1', nome: 'Camiseta Azul', preco: 100, marca: 'Brand A', variantes: [] },
          { id: '2', nome: 'Calça Preta', preco: 200, marca: 'Brand B', variantes: [] },
        ],
      };
      
      mockConsultaRepository.buscaProdutoMock.mockResolvedValue(mockData as any);

      const request = new ConsultaRequestDto();
      request.nome = 'Camiseta';
      const result = await consultaService.consultarProdutos(request);

      expect(result.items).toHaveLength(1);
      expect(result.items[0].nome).toContain('Camiseta');
    });

    it('deve filtrar produtos por marca (tipo)', async () => {
      const mockData = {
        page: 1, pageSize: 10, totalItems: 2, totalPages: 1, total: 2,
        items: [
          { id: '1', nome: 'Camisa', preco: 100, marca: 'Nike', variantes: [] },
          { id: '2', nome: 'Camisa', preco: 200, marca: 'Adidas', variantes: [] },
        ],
      };
      
      mockConsultaRepository.buscaProdutoMock.mockResolvedValue(mockData as any);

      const request = new ConsultaRequestDto();
      request.tipo = 'adidas'; // Testando também se o toLowerCase funciona
      const result = await consultaService.consultarProdutos(request);

      expect(result.items).toHaveLength(1);
      expect(result.items[0].marca).toBe('Adidas');
    });

    it('deve filtrar produtos por faixa de preço', async () => {
      const mockData = {
        page: 1, pageSize: 10, totalItems: 3, totalPages: 1, total: 3,
        items: [
          { id: '1', nome: 'Barato', preco: 50, marca: 'A', variantes: [] },
          { id: '2', nome: 'Médio', preco: 150, marca: 'A', variantes: [] },
          { id: '3', nome: 'Caro', preco: 300, marca: 'A', variantes: [] },
        ],
      };
      
      mockConsultaRepository.buscaProdutoMock.mockResolvedValue(mockData as any);

      const request = new ConsultaRequestDto();
      request.precoIni = 100;
      request.precoFim = 200;
      const result = await consultaService.consultarProdutos(request);

      expect(result.items).toHaveLength(1);
      expect(result.items[0].preco).toBe(150);
      expect(result.items[0].nome).toBe('Médio');
    });

    it('deve filtrar produtos por tamanho e cor nas variantes', async () => {
      const mockData = {
        page: 1, pageSize: 10, totalItems: 2, totalPages: 1, total: 2,
        items: [
          { 
            id: '1', nome: 'Camisa A', preco: 100, marca: 'A', 
            variantes: [
              { cor: 'Azul', tamanho: { nome: 'M' } },
              { cor: 'Preto', tamanho: { nome: 'G' } }
            ] 
          },
          { 
            id: '2', nome: 'Camisa B', preco: 100, marca: 'B', 
            variantes: [
              { cor: 'Vermelho', tamanho: { nome: 'M' } }
            ] 
          },
        ],
      };
      
      mockConsultaRepository.buscaProdutoMock.mockResolvedValue(mockData as any);

      const request = new ConsultaRequestDto();
      request.cor = 'azul';
      request.tamanho = 'M';
      const result = await consultaService.consultarProdutos(request);

      // Deve sobrar apenas o Produto 1
      expect(result.items).toHaveLength(1);
      expect(result.items[0].id).toBe('1');
      // A variante preta tamanho G deve ter sido removida do array do produto
      expect(result.items[0].variantes).toHaveLength(1);
      expect(result.items[0].variantes[0].cor).toBe('Azul');
    });

    it('deve retornar apenas produtos com estoque (com variantes)', async () => {
      const mockData = {
        page: 1, pageSize: 10, totalItems: 2, totalPages: 1, total: 2,
        items: [
          { id: '1', nome: 'Sem Estoque', preco: 100, marca: 'A', variantes: [] },
          { id: '2', nome: 'Com Estoque', preco: 200, marca: 'B', variantes: [{ cor: 'Azul', tamanho: { nome: 'M' } }] },
        ],
      };
      
      mockConsultaRepository.buscaProdutoMock.mockResolvedValue(mockData as any);

      const request = new ConsultaRequestDto();
      request.apenasComEstoque = true;
      const result = await consultaService.consultarProdutos(request);

      expect(result.items).toHaveLength(1);
      expect(result.items[0].id).toBe('2');
      expect(result.items[0].nome).toBe('Com Estoque');
    });

  });

  describe('consultarEstoque', () => {
    it('deve retornar estoque de um produto', async () => {
      const mockData = [
        {
          produtoId: '1',
          roupaId: 'R123',
          tamanho: 'M',
          cor: 'Azul',
          saldo: 50,
          atualizadoEm: new Date().toISOString(),
        }
      ];
      
      mockConsultaRepository.buscaEstoqueMock.mockResolvedValue(mockData[0]);

      const result = await consultaService.consultarEstoque('1');

      expect(result.saldo).toBe(50);
      expect(result.tamanho).toBe('M');
    });
    it('deve mapear corretamente os dados do estoque e fixar a filial (lojaId) como 0', async () => {
      const mockData = {
        produtoId: '1',
        roupaId: 'R123',
        tamanho: 'M',
        cor: 'Azul',
        saldo: 50,
        atualizadoEm: new Date().toISOString(),
      };
      
      mockConsultaRepository.buscaEstoqueMock.mockResolvedValue(mockData);

      const result = await consultaService.consultarEstoque('1');

      // Valida o mapeamento exato e a injeção do ID da filial
      expect(result.lojaId).toBe(0);
      expect(result.saldo).toBe(50);
      expect(result.roupaId).toBe('R123');
      expect(mockConsultaRepository.buscaEstoqueMock).toHaveBeenCalledWith('1');
    });

    it('deve processar corretamente um produto com saldo zerado (out of stock)', async () => {
      const mockData = {
        produtoId: '2',
        roupaId: 'R999',
        tamanho: 'G',
        cor: 'Preto',
        saldo: 0, // Saldo zerado
        atualizadoEm: new Date().toISOString(),
      };
      
      mockConsultaRepository.buscaEstoqueMock.mockResolvedValue(mockData);

      const result = await consultaService.consultarEstoque('2');

      expect(result.saldo).toBe(0);
      expect(result.lojaId).toBe(0);
    });

    it('deve lançar um erro se o repositório falhar (ex: API de estoque fora do ar)', async () => {
      // Força o mock a simular um erro de rede ou 500 da API
      mockConsultaRepository.buscaEstoqueMock.mockRejectedValue(new Error('Serviço indisponível'));

      // Quando testamos exceções assíncronas no Jest, usamos o reject e toThrow
      await expect(consultaService.consultarEstoque('3')).rejects.toThrow('Serviço indisponível');
    });

    it('deve lidar adequadamente quando o produto não existir no estoque', async () => {
      // Simula o cenário onde o repositório retorna null ou undefined
      mockConsultaRepository.buscaEstoqueMock.mockResolvedValue(undefined as any);

      await expect(consultaService.consultarEstoque('4')).rejects.toThrow();
    });

  });
});