import { Pool } from 'pg';
import { IDefaultDao } from './interfaces/IDefaultDao';
import { DefaultDto } from '../service/Dtos/DefaultDto';
import 'dotenv/config';

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 15432,
  user: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_NAME,
});

console.log(
  "Host: ", process.env.DB_HOST,
  "Port: ", process.env.DB_PORT,
  "User: ", process.env.DB_USER,
  "Password: ", process.env.DB_PASSWORD,
  "Database: ", process.env.DB_NAME
);

export class DefaultDao implements IDefaultDao{
    constructor(){
  }

  async get(userId: number): Promise<DefaultDto>{
      try {
      const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [ userId ]);
      
      if (rows.length === 0) {
        throw new Error("Usuário não encontrado");
      }
      
      const { id, email: userEmail, password_hash, role, is_active } = rows[0];
      return new DefaultDto(id, userEmail);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      throw error;
    }
  }

  async post(userDto: DefaultDto): Promise<boolean>{
    try{
      const query = 'INSERT INTO users (email, password_hash, role, is_active) VALUES ($1, $2, $3, $4)';

      const params = [ userDto.id, userDto.nome ];

      const resultado = await pool.query(query, params);

      return resultado.rowCount === 1;

    } catch(error){
      console.error("Erro ao incluir usuário:", error);
      throw error;
    }

  }

  async put(userDto: DefaultDto): Promise<boolean>{
    try{
      const query = 'UPDATE users SET email = $1, password_hash = $2, role = $3, is_active = $4 WHERE id = $5';

      const params = [ userDto.id, userDto.nome ];

      const resultado = await pool.query(query, params);

      return resultado.rowCount === 1;
    } catch(error){
      console.error("Erro ao alterar usuário:", error);
      throw error;
    }
  }

  async delete(userId: number): Promise<boolean>{
    try{
      const query = "UPDATE users SET is_active = $1 WHERE id = $2";

      const params = [ false, userId ];

      const resultado = await pool.query(query, params);

      return resultado.rowCount === 1;
    } catch(error){
      console.error("Erro ao excluir usuário:", error);
      throw error;
    }
  }

}