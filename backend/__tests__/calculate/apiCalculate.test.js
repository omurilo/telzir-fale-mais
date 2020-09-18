import assert from "assert";
import api from "../../src";

let app;

const MOCK_PLAN_INITIAL = {
  name: "Fale Mais 60",
  quota: 60,
};
const MOCK_NONEXISTENT_PLAN_ID = "88bd067a-e5f9-4464-be84-171a37f67906";
const MOCK_COST_INITIAL = {
  origin: 11,
  destiny: 18,
  cost: 0.9,
};
let MOCK_PLAN_ID = "";

describe("calculate cost api test suite", () => {
  beforeAll(async () => {
    app = await api;
    const plan = await app.inject({
      method: "POST",
      url: "/plans",
      payload: MOCK_PLAN_INITIAL,
    });

    const planData = JSON.parse(plan.payload);
    MOCK_PLAN_ID = planData.id;

    await app.inject({
      method: "POST",
      url: "/costs",
      payload: MOCK_COST_INITIAL,
    });
  });

  afterEach(() => {
    app.stop({ timeout: 100 });
  });

  it("should calculate cost of call by 35 minutes on Fale Mais 60", async () => {
    const result = await app.inject({
      method: "POST",
      url: "/calculate",
      payload: {
        planId: MOCK_PLAN_ID,
        origin: MOCK_COST_INITIAL.origin,
        destiny: MOCK_COST_INITIAL.destiny,
        time: 35,
      },
    });

    const data = JSON.parse(result.payload);
    const { statusCode } = result;

    assert.deepEqual(statusCode, 200);
    assert.deepEqual(data.faleMaisCost, 0);
    assert.deepEqual(data.withoutFaleMaisCost, 35 * MOCK_COST_INITIAL.cost);
  });

  it("should'nt calculate cost of call by a invalid/not found origin/destiny", async () => {
    const result = await app.inject({
      method: "POST",
      url: "/calculate",
      payload: {
        planId: MOCK_PLAN_ID,
        destiny: MOCK_COST_INITIAL.origin,
        origin: MOCK_COST_INITIAL.destiny,
        time: 35,
      },
    });

    const data = JSON.parse(result.payload);
    const { statusCode } = result;
    const expected = {
      statusCode: 412,
      error: "Precondition Failed",
      message: "Origin -> Destiny not found!",
    };

    assert.deepEqual(statusCode, 412);
    assert.deepEqual(data, expected);
  });

  it("should'nt calculate cost of call by a invalid plan id", async () => {
    const result = await app.inject({
      method: "POST",
      url: "/calculate",
      payload: {
        planId: `${MOCK_PLAN_ID}1`,
        origin: MOCK_COST_INITIAL.origin,
        destiny: MOCK_COST_INITIAL.destiny,
        time: 35,
      },
    });

    const data = JSON.parse(result.payload);
    const { statusCode } = result;
    const expected = {
      statusCode: 500,
      message: "An internal server error occurred",
      error: "Internal Server Error",
    };

    assert.deepEqual(statusCode, 500);
    assert.deepEqual(data, expected);
  });

  it("should'nt calculate cost of call by a not found plan id", async () => {
    const result = await app.inject({
      method: "POST",
      url: "/calculate",
      payload: {
        planId: MOCK_NONEXISTENT_PLAN_ID,
        origin: MOCK_COST_INITIAL.origin,
        destiny: MOCK_COST_INITIAL.destiny,
        time: 35,
      },
    });

    const data = JSON.parse(result.payload);
    const { statusCode } = result;
    const expected = {
      statusCode: 412,
      error: "Precondition Failed",
      message: "Plan Id not found!",
    };

    assert.deepEqual(statusCode, 412);
    assert.deepEqual(data, expected);
  });
});
