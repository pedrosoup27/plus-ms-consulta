import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
import swaggerDocs from './swagger';
import { ok } from 'node:assert';
import cors from 'cors';
import userRoutes from './app-routes';
import { DefaultDao } from './dados/DefaultDao';
import { DefaultService } from './service/DefaultService';
import { DefaultController } from './controllers/DefaultController';

dotenv.config();
const app = express();
app.use(cors({
  origin: 'http://localhost:3000' // O leão de chácara só deixa entrar quem vier desta URL exata!
}));
app.use(express.json());

const PORT = Number(process.env.PORT ?? 3001); // const PORT = process.env.PORT || 3001;

// swaggerDocs(app, PORT);

// // Possivelmente passar as rotas para um arquivo authRoute.ts no futuro
const router = Router();
const defaultDao = new DefaultDao();
const defaultService = new DefaultService(defaultDao);
const defaultController = new DefaultController(defaultService);

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

// /**
//  * @openapi
//  * /auth/getUserByEmail:
//  *   get:
//  *     tags:
//  *       - User
//  *     summary: Get user info by email
//  *     parameters:
//  *       - in: query
//  *         name: email
//  *         required: true
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: OK
//  */
// router.get('/getUserByEmail', (req, res) => defaultController.getUserById(req, res));

/**
 * @openapi
 * /consulta/buscarPeca:
 *   get:
 *     tags:
 *       - Produtos
 *     summary: Busca produtos e disponibilidade de estoque
 *     description: Consulta o estoque das lojas utilizando múltiplos filtros opcionais para auxiliar os funcionários no atendimento.
 *     
 *     parameters:
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
router.get('/buscarPeca', (req, res) => defaultController.buscaPeca(req, res));

//app.use('/auth', router);
app.use('/auth', userRoutes);

app.listen(PORT, () => { 
  console.log(`plus-ms-auth rodando na porta ${PORT}`)

  swaggerDocs(app, PORT);
});
