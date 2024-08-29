import 'reflect-metadata';
import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import { Connection, createConnection } from 'typeorm';
import AppError from './errors/AppError';
import routes from './routes/routes';
import path from 'path';

const { log } = console;
class App {
  public connection: Connection;

  public server: express.Application;

  public constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  private middlewares(): void {
    this.server.use(express.json({ limit: "50mb" }));
    this.server.use(express.text({ limit: "50mb" }));
    this.server.use(express.urlencoded({ limit: "50mb", extended: true }));
  }

  private routes(): void {
    this.server.use(routes);
    this.server.use("/temp", express.static(path.join(__dirname, "temp")));
  }

  public async startDB(): Promise<void> {
    this.connection = await createConnection();
  }

  public async close(): Promise<void> {
    await this.connection.close();
  }

  public async run(): Promise<void> {
    const PORT = process.env.PORT || 3000;
    this.server.listen(PORT, () => log(`🚀 Server is running on port ${PORT}`));
  }

  private exceptionHandler(): void {
    this.server.use(
      async (
        err: AppError | Error,
        req: Request,
        res: Response,
        _: NextFunction
      ) => {

          const error = err as AppError;
          return res
            .status(error.status)
            .json({ error_code: error.name, error_description: err.message });
   
      }
    );
  }
}

export default new App();
