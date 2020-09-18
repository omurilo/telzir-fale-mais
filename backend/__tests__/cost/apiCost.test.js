import assert from "assert";
import api from "../../src";

let app = {};
const MOCK_COST_REGISTER = { origin: 11, destiny: 17, cost: 1.7 };
const MOCK_COST_INITIAL = {
  origin: 11,
  destiny: 18,
  cost: 0.9,
};
const MOCK_NONEXISTENT_ID = "88bd067a-e5f9-4464-be84-171a37f67906";
let MOCK_ID = "";

describe("cost api test suite", () => {
  beforeAll(async () => {
    app = await api;
    const result = await app.inject({
      method: "POST",
      url: "/costs",
      payload: MOCK_COST_INITIAL,
    });

    const data = JSON.parse(result.payload);
    MOCK_ID = data.id;
  });

  afterEach(() => {
    app.stop({ timeout: 100 });
  });

  it("list /costs", async () => {
    const result = await app.inject({
      method: "GET",
      url: "/costs",
    });

    const { totalCosts, costs: data } = JSON.parse(result.payload);
    const { statusCode } = result;

    assert.deepEqual(statusCode, 200);
    assert.ok(totalCosts >= 0);
    assert.ok(Array.isArray(data));
  });

  it("list /costs should return max 10 registers", async () => {
    const LENGTH_LIMIT = 10;
    const result = await app.inject({
      method: "GET",
      url: `/costs?limit=${LENGTH_LIMIT}`,
    });

    const { costs: data } = JSON.parse(result.payload);
    const { statusCode } = result;

    assert.deepEqual(statusCode, 200);
    assert.ok(data.length <= 10);
  });

  it("list /costs should filter by origin and destiny", async () => {
    const LENGTH_LIMIT = 10;
    const result = await app.inject({
      method: "GET",
      url: `/costs?limit=${LENGTH_LIMIT}&origin=${MOCK_COST_INITIAL.origin}&destiny=${MOCK_COST_INITIAL.destiny}`,
    });

    const { costs: data } = JSON.parse(result.payload);
    const { statusCode } = result;

    assert.deepEqual(statusCode, 200);
    assert.deepEqual(data[0].origin, MOCK_COST_INITIAL.origin);
  });

  it("list /costs should return error on validation parameters", async () => {
    const LENGTH_LIMIT = "i5";
    const result = await app.inject({
      method: "GET",
      url: `/costs?limit=${LENGTH_LIMIT}`,
    });

    const { statusCode } = result;

    assert.deepEqual(statusCode, 400);
  });

  it("create /costs", async () => {
    const result = await app.inject({
      method: "POST",
      url: "/costs",
      payload: MOCK_COST_REGISTER,
    });

    const data = JSON.parse(result.payload);
    const { statusCode } = result;

    assert.deepEqual(statusCode, 200);
    assert.deepEqual(data.origin, 11);
  });

  it("update /costs", async () => {
    const result = await app.inject({
      method: "PATCH",
      url: `/costs/${MOCK_ID}`,
      payload: { cost: 1.2 },
    });

    const [{ origin, cost }] = JSON.parse(result.payload);
    const { statusCode } = result;

    assert.deepEqual(statusCode, 200);
    assert.deepEqual(
      { cost, origin },
      { cost: 1.2, origin: MOCK_COST_INITIAL.origin },
    );
  });

  it("update /costs shouldn't update cost with id not exist", async () => {
    const result = await app.inject({
      method: "PATCH",
      url: `/costs/${MOCK_NONEXISTENT_ID}`,
      payload: { cost: 1.2 },
    });

    const data = JSON.parse(result.payload);
    const { statusCode } = result;
    const expected = {
      statusCode: 412,
      error: "Precondition Failed",
      message: "Cost id not exist",
    };
    assert.deepEqual(statusCode, 412);
    assert.deepEqual(data, expected);
  });

  it("delete /costs should remove cost", async () => {
    const result = await app.inject({
      method: "DELETE",
      url: `/costs/${MOCK_ID}`,
    });

    const data = JSON.parse(result.payload);
    const { statusCode } = result;

    assert.deepEqual(statusCode, 200);
    assert.ok(data);
  });

  it("delete /costs shouldn't remove cost with id not exist", async () => {
    const result = await app.inject({
      method: "DELETE",
      url: `/costs/${MOCK_NONEXISTENT_ID}`,
    });

    const data = JSON.parse(result.payload);
    const { statusCode } = result;
    const expected = {
      statusCode: 412,
      error: "Precondition Failed",
      message: "Cost id not exist",
    };
    assert.deepEqual(statusCode, 412);
    assert.deepEqual(data, expected);
  });

  it("delete /costs shouldn't remove cost with invalid id", async () => {
    const id = `${MOCK_NONEXISTENT_ID}1`;
    const result = await app.inject({
      method: "DELETE",
      url: `/costs/${id}`,
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
