import Joi from "joi";
import Boom from "@hapi/boom";

import BaseRoute from "../base/baseRoute";

class PlansRoutes extends BaseRoute {
  constructor(db) {
    super();
    this.db = db;

    this.planSchema = Joi.object({
      name: Joi.string()
        .min(3)
        .required()
        .description("Plan name eg: (Fale Mais 60)"),
      quota: Joi.number()
        .min(0)
        .required()
        .description("Quota of plan eg: (120 minutes --> 120)"),
    }).label("Plan");

    this.idSchema = Joi.object({
      id: Joi.string()
        .required()
        .description("The cost ID to be update/delete"),
    }).label("Plan Id");
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
      quota: Joi.number()
        .min(0)
        .description("Quota of plan eg: (120 minutes --> 120)"),
    });

    const responseSchema = Joi.object({
      totalPlans: Joi.number().min(0).description("Total of plans on database"),
      plans: Joi.array()
        .items(
          this.planSchema.append({
            id: Joi.string().description(
              "Unique identification (uuid) of plan",
            ),
          }),
        )
        .label("plansArray"),
    }).label("List Plans");

    return {
      path: "/plans",
      method: "GET",
      options: {
        tags: ["api", "plans"],
        description: "Should list plans",
        notes: "Results can be paged and filtered by quota",
        validate: {
          failAction: (request, headers, error) => {
            throw error;
          },
          query: querySchema,
        },
        response: { schema: responseSchema },
      },
      handler: async (request) => {
        try {
          const { quota, skip, limit } = request.query;
          const filter = {};
          if (quota) {
            Object.assign(filter, {
              quota: parseInt(quota, 10),
            });
          }

          const { count: totalPlans, rows: plans } = await this.db.index(
            filter,
            skip,
            limit,
          );

          return { totalPlans, plans };
        } catch (error) {
          return Boom.internal(error.message, error);
        }
      },
    };
  }

  create() {
    return {
      path: "/plans",
      method: "POST",
      options: {
        tags: ["api", "plans"],
        description: "Should register plans",
        notes: "Should register plans by name and quota",
        validate: {
          failAction: (request, headers, error) => {
            throw error;
          },
          payload: this.planSchema,
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
      plan: Joi.string().min(3).description("Plan name eg: (Fale Mais 60)"),
      quota: Joi.number()
        .min(0)
        .description("Quota of plan eg: (120 minutes --> 120)"),
    }).label("Update Plans");

    return {
      path: "/plans/{id}",
      method: "PATCH",
      options: {
        tags: ["api", "plans"],
        description: "Should update plan by id",
        notes: "Should update any field of plan by id",
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
            return Boom.preconditionFailed("Plan id not exist");
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
      path: "/plans/{id}",
      method: "DELETE",
      options: {
        tags: ["api", "plans"],
        description: "Should remove plan by id",
        notes: "Should remove plan by id",
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
            return Boom.preconditionFailed("Plan id not exist");
          }

          return result;
        } catch (error) {
          return Boom.internal(error.message, error);
        }
      },
    };
  }
}

export default PlansRoutes;
