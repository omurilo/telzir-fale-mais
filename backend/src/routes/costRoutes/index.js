import Joi from "joi";
import Boom from "@hapi/boom";

import BaseRoute from "../base/baseRoute";

export default class CostRoute extends BaseRoute {
  constructor(db) {
    super();
    this.db = db;

    this.costSchema = Joi.object({
      origin: Joi.number()
        .min(0)
        .max(99)
        .required()
        .description("Origin of cost"),
      destiny: Joi.number()
        .min(0)
        .max(99)
        .required()
        .description("Destiny of cost"),
      cost: Joi.number()
        .min(0)
        .required()
        .description("Cost per minute eg: ($0.9 --> 0.9)"),
    }).label("Cost");

    this.idSchema = Joi.object({
      id: Joi.string()
        .required()
        .description("The cost ID to be update/delete"),
    }).label("Cost Id");
  }

  list() {
    const querySchema = Joi.object({
      limit: Joi.number()
        .integer()
        .default(10)
        .description("Amount to limit results"),
      skip: Joi.number()
        .integer()
        .default(0)
        .description("Amount to skip for pagination"),
      origin: Joi.number().min(0).max(99).description("Origin of cost"),
      destiny: Joi.number().min(0).max(99).description("Destiny of cost"),
    });

    const responseSchema = Joi.object({
      totalCosts: Joi.number().min(0).description("Total of costs on database"),
      costs: Joi.array()
        .items(
          this.costSchema.append({
            id: Joi.string().description(
              "Unique identification (uuid) of cost",
            ),
          }),
        )
        .label("costsArray"),
    }).label("List Costs");

    return {
      path: "/costs",
      method: "GET",
      options: {
        tags: ["api", "costs"],
        description: "Should list costs",
        notes: "Results can be paged and filtered by origin and/or destiny",
        validate: {
          failAction: (request, headers, error) => {
            throw error;
          },
          query: querySchema,
        },
        plugins: {
          "hapi-swagger": {
            responses: {
              400: { description: "Bad Request" },
              200: { description: "Sucessful" },
            },
          },
        },
        response: { schema: responseSchema },
      },
      handler: async (request) => {
        try {
          const { origin, destiny, skip, limit } = request.query;
          const filter = {};
          if (origin) {
            Object.assign(filter, {
              origin: parseInt(origin, 10),
            });
          }
          if (destiny) {
            Object.assign(filter, {
              destiny: parseInt(destiny, 10),
            });
          }

          const { count: totalCosts, rows: costs } = await this.db.index(
            filter,
            skip,
            limit,
          );

          return { totalCosts, costs };
        } catch (error) {
          return error;
        }
      },
    };
  }

  create() {
    return {
      path: "/costs",
      method: "POST",
      options: {
        tags: ["api", "costs"],
        description: "Should register costs",
        notes: "Should register cost by origin, destiny and cost",
        validate: {
          failAction: (request, headers, error) => {
            throw error;
          },
          payload: this.costSchema,
        },
      },
      handler: (request) => {
        try {
          const data = request.payload;

          return this.db.store(data);
        } catch (error) {
          return Boom.internal(error.message, error);
        }
      },
    };
  }

  update() {
    const payloadSchema = Joi.object({
      origin: Joi.number()
        .min(0)
        .max(99)
        .description("Origin of cost (without 0, eg: (011 --> 11)"),
      destiny: Joi.number()
        .min(0)
        .max(99)
        .description("Destiny of cost (without 0, eg: (018 --> 18)"),
      cost: Joi.number()
        .min(0)
        .description("Cost per minute eg: ($0.9 --> 0.9)"),
    }).label("Update Costs");

    return {
      path: "/costs/{id}",
      method: "PATCH",
      options: {
        tags: ["api", "costs"],
        description: "Should update cost by id",
        notes: "Should update any field of cost by id",
        validate: {
          failAction: (request, headers, error) => {
            throw error;
          },
          params: this.idSchema,
          payload: payloadSchema,
        },
      },
      handler: async (request) => {
        try {
          const { payload } = request;
          const { id } = request.params;

          const data = JSON.parse(JSON.stringify(payload));

          const [updates, result] = await this.db.update(id, data);
          if (!updates) {
            return Boom.preconditionFailed("Cost id not exist");
          }
          return result;
        } catch (error) {
          return Boom.internal(error.message, error);
        }
      },
    };
  }

  delete() {
    return {
      path: "/costs/{id}",
      method: "DELETE",
      options: {
        tags: ["api", "costs"],
        description: "Should remove cost by id",
        notes: "Should remove cost by id",
        validate: {
          failAction: (request, headers, error) => {
            throw error;
          },
          params: this.idSchema,
        },
      },
      handler: async (request) => {
        try {
          const { id } = request.params;

          const result = await this.db.delete({ id });

          if (!result) {
            return Boom.preconditionFailed("Cost id not exist");
          }

          return result;
        } catch (error) {
          return Boom.internal(error.message, error);
        }
      },
    };
  }
}
