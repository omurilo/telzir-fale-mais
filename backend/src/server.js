import Hapi from "@hapi/hapi";
import Sentry from "hapi-sentry";
import Swagger from "hapi-swagger";
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';

import Routes from "./routes";
import SentryConfig from "./config/sentry";
import SwaggerConfig from "./config/swagger";

class App {
  constructor() {
    this.app = new Hapi.Server({
      port: process.env.PORT,
    });
    
    this.app.register([
      Inert,
      Vision,
      this.sentry(),
      this.swagger()
    ]);
  }

  swagger() {
    return {
      plugin: Swagger,
      options: SwaggerConfig,
    };
  }

  sentry() {
    return {
      plugin: Sentry,
      options: {
        client: { dsn: SentryConfig.dsn },
      },
    };
  }

  async routes() {
    const routes = new Routes();
    const routesArray = await routes.generateRoutes();
    this.app.route(routesArray);
  }

  async run() {
    await this.app.start();
    console.log(`Aplicação rodando na porta ${process.env.PORT}`)
  }
}

export default App;
