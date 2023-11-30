import pg from "pg";

export class PG {
  public client: pg.Client
  private static _instance: PG
  private configDefault={
    user: 'postgres',
    host: 'login-aws-serverless.cwprsw7zepte.sa-east-1.rds.amazonaws.com',
    database: 'login_serverless',
    password: 'admin123',
    port: 5432,
    // ssl: true,
    // connectionTimeoutMillis: 1000
  }
  private configDemo={
    user: 'postgres',
    host: 'localhost',
    database: 'gorm',
    password: 'sa',
    port: 5432,
    // ssl: true,
    // connectionTimeoutMillis: 1000
  }

  private constructor() {
    this.connectDB()
  }

  private connectDB() {
    console.log("conectando a la bd")
    try {
      this.client = globalThis.pgClient
      if (!this.client) {
        this.client = new pg.Client(this.configDefault)
      }
      globalThis.pgClient = this.client
    } catch (e) {
      console.log("error al conectar a postgres")
      throw e
    }
  }


  async Query(text: string, params?: any[], rawQuery?: any) {
    try {

      await this.client.connect()
      console.log("Ejecutando consulta", {query: text, params: params || []})
      const result = await this.client.query({
        text: text,
        values: params || [],
        rowMode: rawQuery
      })
      console.log("resultado obtenido::", result)
      await this.client.end()
      return result.rows
    } catch (e) {
      console.log("error al ejecutar consulta", e)
      throw e
    }
  }


  static get Instance() {
    if (!PG._instance) {
      PG._instance = new PG()
    }
    return PG._instance
  }
}