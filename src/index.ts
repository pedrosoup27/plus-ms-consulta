import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
import swaggerDocs from './swagger';
import { ok } from 'node:assert';
import cors from 'cors';
import { ConsultaRepository } from './dados/ConsultaRepository';
import { ConsultaService } from './service/ConsultaService';
import { ConsultaController } from './controllers/ConsultaController';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT ?? 3067); // const PORT = process.env.PORT || 3001;

// swaggerDocs(app, PORT);

// // Possivelmente passar as rotas para um arquivo authRoute.ts no futuro
const router = Router();
// const defaultDao = new DefaultDao();
// const defaultService = new DefaultService(defaultDao);
// const defaultController = new DefaultController(defaultService);

// Rotas para o serviço de consulta
const consultaRepository = new ConsultaRepository();
const consultaService = new ConsultaService(consultaRepository);
const consultaController = new ConsultaController(consultaService);

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @openapi
 * /auth/healthcheck:
 *   get:
 *     tags:
 *       - Healthcheck
 *     description: Responds if app is up and running
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/healthcheck', (req, res) => { res.status(200).send('OK') })

/**
 * @openapi
 * /consulta/buscarPecas:
 *   get:
 *     tags:
 *       - Produtos
 *     summary: Busca produtos e disponibilidade de estoque
 *     description: Consulta o estoque das lojas utilizando múltiplos filtros opcionais para auxiliar os funcionários no atendimento.
 *     
 *     parameters:
 *       - in: query
 *         name: codProduto
 *         required: false
 *         schema:
 *           type: int
 *         description: Código do produto (ex. 1, 25, 250)
 *       - in: query
 *         name: nome
 *         required: false
 *         schema:
 *           type: string
 *         description: Nome ou parte do nome da peça (ex. Camiseta Básica)
 *
 *       - in: query
 *         name: tamanho
 *         required: false
 *         schema:
 *           type: string
 *         description: Tamanho da peça (ex. P, M, G, 42, 44)
 *
 *       - in: query
 *         name: cor
 *         required: false
 *         schema:
 *           type: string
 *         description: Cor predominante do produto (ex. Azul, Preto, Mescla)
 *
 *       - in: query
 *         name: tipo
 *         required: false
 *         schema:
 *           type: string
 *         description: Categoria ou tipo da peça (ex. Calça, Camisa, Acessório)
 *
 *       - in: query
 *         name: lojaId
 *         required: false
 *         schema:
 *           type: integer
 *         description: ID da filial para checar a disponibilidade local
 *
 *       - in: query
 *         name: apenasComEstoque
 *         required: false
 *         schema:
 *           type: boolean
 *         description: Se true, filtra a busca para retornar apenas produtos com saldo positivo
 *
 *       - in: query
 *         name: precoIni
 *         required: false
 *         schema:
 *           type: number
 *           format: float
 *         description: Valor mínimo desejado (ex. 49.90)
 *
 *       - in: query
 *         name: precoFim
 *         required: false
 *         schema:
 *           type: number
 *           format: float
 *         description: Valor máximo desejado (ex. 199.90)
 *
 *     responses:
 *       200:
 *         description: Busca realizada com sucesso. Retorna um array de produtos.
 *
 *       400:
 *         description: Erro de validação nos parâmetros de busca.
 */
router.get('/buscarPecas', (req, res) => consultaController.consultarProdutos(req, res));

//app.use('/auth', router);
app.use('/consulta', router);

app.listen(PORT, () => { 
  console.log(`plus-ms-consulta rodando na porta ${PORT}`)

  swaggerDocs(app, PORT);
});