import "reflect-metadata";
import { DataSource } from "typeorm";
import { container } from "tsyringe";
import MeasureRepository from "./repositories/MeasureRepository";
import Measure from "./models/Measure";
import IMeasureRepository from "./repositories/IMeasureRepository";
import CreateMeasureService from "./services/CreateMeasureService";
import App from './app';

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || 'db',
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Measure],
  migrations: ["./src/migrations/*.ts"],
});

// Registro das injeções de dependencia
container.registerSingleton<CreateMeasureService>('CreateMeasureService', CreateMeasureService);

AppDataSource.initialize()
  .then(async () => {
    container.registerSingleton<IMeasureRepository>('MeasureRepository', MeasureRepository);
    console.log("✅ Data Source has been initialized!");

    try {
      console.log("⏳ Running migrations...");
      const migrations = await AppDataSource.runMigrations();
      console.log(`✅ Successfully ran ${migrations.length} migrations:`);
      migrations.forEach(migration => {
        console.log(` - ${migration.name}`);
      });
    } catch (err) {
      console.error("❌ Error running migrations:", err);
    }
    App.run();
  })
  .catch((err) => {
    console.error("❌ Error during Data Source initialization", err);
  });