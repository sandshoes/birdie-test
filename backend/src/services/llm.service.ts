import { Injectable } from '@nestjs/common';
import { SqlDatabaseChain } from 'langchain/chains';
import { OpenAI } from 'langchain';
import { DataSource } from 'typeorm';
import { SqlDatabase } from 'langchain/sql_db';
import { config } from 'dotenv';
config();

@Injectable()
export class LLMService {
  async getLLMQuery(query: string): Promise<any> {
    const datasource = new DataSource({
      type: 'postgres',
      host: process.env.PGHOST,
      port: parseInt(process.env.PGPORT),
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
    });

    const db = await SqlDatabase.fromDataSourceParams({
      appDataSource: datasource,
    });

    const chain = new SqlDatabaseChain({
      llm: new OpenAI({ temperature: 0.1 }),
      database: db,
    });

    const res = await chain.run(query);
    return res;
  }
}
