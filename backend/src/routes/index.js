import CostRoute from "./costRoutes";
import PlansRoute from "./plansRoutes";

import ContextStrategy from "../db/strategies/base/context/strategy";
import CostSchema from "../db/strategies/postgres/schemas/costSchema";
import PlansSchema from "../db/strategies/postgres/schemas/plansSchema";
import PostgreSQL from "../db/strategies/postgres";

export default class Routes {
  constructor() {
    this.generateRoutes();
  }

  async _generateContext(connection, schema) {
    const model = await PostgreSQL.defineModel(connection, schema);
    const context = new ContextStrategy(new PostgreSQL(connection, model));
  
    return context;
  }

  async _mapRoutes(db, Route, schema) {
    const connection = await db.connect();
    const context = await this._generateContext(connection, schema);
    const instance = new Route(context);
    const methods = Route.methods();
    
    return methods.map((method) => instance[method]());
  }

  async generateRoutes() {
    const costRoutes = await this._mapRoutes(PostgreSQL, CostRoute, CostSchema);
    const plansRoutes = await this._mapRoutes(PostgreSQL, PlansRoute, PlansSchema);
  
    return [
      ...costRoutes,
      ...plansRoutes,
    ];
  }
}
