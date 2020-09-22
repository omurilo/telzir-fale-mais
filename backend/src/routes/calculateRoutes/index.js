import Joi from "joi";
import Boom from "@hapi/boom";
import BaseRoute from "../base/baseRoute";

export default class CalculateRoute extends BaseRoute {
  constructor(planDB, costDB) {
    super();
    this.planDB = planDB;
    this.costDB = costDB;
  }

  calculate() {
    return {
      path: "/calculate",
      method: "POST",
      options: {
        tags: ["api", "calculate"],
        description: "Should calculate costs of telephone call",
        notes:
          "Calculate the cost of the call by informing the plan id, speak more, the origin, destination and time of the call.",
        validate: {
          failAction: (request, headers, error) => {
            throw error;
          },
          payload: Joi.object().keys({
            planId: Joi.string().required().description("Id of Fale Mais plan"),
            origin: Joi.number()
              .min(0)
              .max(99)
              .required()
              .description("Origin of call"),
            destiny: Joi.number()
              .min(0)
              .max(99)
              .required()
              .description("Destiny of call"),
            time: Joi.number().min(0).required().description("Time of call"),
          }),
        },
        /* response: { schema: "" }, */
      },
      handler: async (request) => {
        try {
          const { planId, origin, destiny, time } = request.payload;
          const filter = {
            origin: parseInt(origin, 10),
            destiny: parseInt(destiny, 10),
          };
          const {
            count: totalCosts,
            rows: [costObj],
          } = await this.costDB.index(filter, 0, 1);
          const {
            count: totalPlans,
            rows: [planObj],
          } = await this.planDB.index({ id: planId }, 0, 1);

          if (!totalCosts) {
            return Boom.preconditionFailed("Origin -> Destiny not found!");
          }

          if (!totalPlans) {
            return Boom.preconditionFailed("Plan Id not found!");
          }

          const extraTime = time - planObj.quota;

          let faleMaisCost = 0;
          const withoutFaleMaisCost = time * costObj.cost;

          if (extraTime > 0) {
            faleMaisCost = extraTime * (costObj.cost * 1.1);
          }

          return {
            minuteCost: costObj.cost,
            faleMaisCost,
            withoutFaleMaisCost,
          };
        } catch (error) {
          return Boom.internal(error.message, error);
        }
      },
    };
  }
}
