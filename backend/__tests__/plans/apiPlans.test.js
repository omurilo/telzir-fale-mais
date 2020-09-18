import assert from "assert";
import api from "../../src";

let app = {};
const MOCK_PLAN_REGISTER = { name: "Fale Mais 30", quota: 30 };
const MOCK_PLAN_INITIAL = {
  name: "Fale Mais 60",
  quota: 60,
};
const MOCK_NONEXISTENT_ID = "88bd067a-e5f9-4464-be84-171a37f67906";
let MOCK_ID = "";

describe("plan api test suite", () => {
  beforeAll(async () => {
    app = await api;
    const result = await app.inject({
      method: "POST",
      url: "/plans",
      payload: MOCK_PLAN_INITIAL,
    });

    const data = JSON.parse(result.payload);
    MOCK_ID = data.id;
  });

  afterEach(() => {
    app.stop({ timeout: 100 });
  });

  it("list /plans", async () => {
    const result = await app.inject({
      method: "GET",
      url: "/plans",
    });

    const { totalPlans, plans: data } = JSON.parse(result.payload);
    const { statusCode } = result;

    assert.deepEqual(statusCode, 200);
    assert.ok(totalPlans >= 0);
    assert.ok(Array.isArray(data));
  });

  it("list /plans should return max 10 registers", async () => {
    const LENGTH_LIMIT = 10;
    const result = await app.inject({
      method: "GET",
      url: `/plans?limit=${LENGTH_LIMIT}`,
    });

    const { plans: data } = JSON.parse(result.payload);
    const { statusCode } = result;

    assert.deepEqual(statusCode, 200);
    assert.ok(data.length <= 10);
  });

  it("list /plans should filter by name", async () => {
    const LENGTH_LIMIT = 10;
    const result = await app.inject({
      method: "GET",
      url: `/plans?limit=${LENGTH_LIMIT}&quota=${MOCK_PLAN_INITIAL.quota}`,
    });

    const { plans: data } = JSON.parse(result.payload);
    const { statusCode } = result;

    assert.deepEqual(statusCode, 200);
    assert.deepEqual(data[0].name, MOCK_PLAN_INITIAL.name);
  });

  it("list /plans should return error on validation parameters", async () => {
    const LENGTH_LIMIT = "i5";
    const result = await app.inject({
      method: "GET",
      url: `/plans?limit=${LENGTH_LIMIT}`,
    });

    const { statusCode } = result;

    assert.deepEqual(statusCode, 400);
  });

  it("create /plans", async () => {
    const result = await app.inject({
      method: "POST",
      url: "/plans",
      payload: MOCK_PLAN_REGISTER,
    });

    const data = JSON.parse(result.payload);
    const { statusCode } = result;

    assert.deepEqual(statusCode, 200);
    assert.deepEqual(data.name, "Fale Mais 30");
  });

  it("update /plans", async () => {
    const result = await app.inject({
      method: "PATCH",
      url: `/plans/${MOCK_ID}`,
      payload: { quota: 80 },
    });

    const [{ name, quota }] = JSON.parse(result.payload);
    const { statusCode } = result;

    assert.deepEqual(statusCode, 200);
    assert.deepEqual(
      { quota, name },
      { quota: 80, name: MOCK_PLAN_INITIAL.name },
    );
  });

  it("update /plans shouldn't update plan with id not exist", async () => {
    const result = await app.inject({
      method: "PATCH",
      url: `/plans/${MOCK_NONEXISTENT_ID}`,
      payload: { quota: 80 },
    });

    const data = JSON.parse(result.payload);
    const { statusCode } = result;
    const expected = {
      statusCode: 412,
      error: "Precondition Failed",
      message: "Plan id not exist",
    };
    assert.deepEqual(statusCode, 412);
    assert.deepEqual(data, expected);
  });

  it("delete /plans should remove plan", async () => {
    const result = await app.inject({
      method: "DELETE",
      url: `/plans/${MOCK_ID}`,
    });

    const data = JSON.parse(result.payload);
    const { statusCode } = result;

    assert.deepEqual(statusCode, 200);
    assert.ok(data);
  });

  it("delete /plans shouldn't remove plan with id not exist", async () => {
    const result = await app.inject({
      method: "DELETE",
      url: `/plans/${MOCK_NONEXISTENT_ID}`,
    });

    const data = JSON.parse(result.payload);
    const { statusCode } = result;
    const expected = {
      statusCode: 412,
      error: "Precondition Failed",
      message: "Plan id not exist",
    };
    assert.deepEqual(statusCode, 412);
    assert.deepEqual(data, expected);
  });

  it("delete /plans shouldn't remove plan with invalid id", async () => {
    const id = `${MOCK_NONEXISTENT_ID}1`;
    const result = await app.inject({
      method: "DELETE",
      url: `/plans/${id}`,
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
});
