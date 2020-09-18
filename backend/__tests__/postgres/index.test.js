import "../../src/config/env";
import assert from "assert";
import Postgres from "../../src/db/strategies/postgres";
import CostSchema from "../../src/db/strategies/postgres/schemas/costSchema";
import Context from "../../src/db/strategies/base/context/strategy";

const MOCK_COST_STORE = { origin: 11, destiny: 17, cost: 1.7 };
const MOCK_COST_UPDATE = { origin: 18, destiny: 11, cost: 1.9 };

let postgresContext = {};

describe("Postgres test", () => {
  beforeAll(async () => {
    const connection = await Postgres.connect();
    const model = await Postgres.defineModel(connection, CostSchema);
    postgresContext = new Context(new Postgres(connection, model));
    await postgresContext.delete({ areUCrazy: true });
    await postgresContext.store(MOCK_COST_UPDATE);
  });

  it("should don't connected to PostgreSQL", async () => {
    const context = new Context(new Postgres('', ''));
    const result = await context.isConnected();

    assert.equal(result, false);
  });

  it("should connect to PostgreSQL", async () => {
    const result = await postgresContext.isConnected();

    assert.equal(result, true);
  });

  it("should be store a cost", async () => {
    const result = await postgresContext.store(MOCK_COST_STORE);
    delete result.id;
    assert.deepEqual(result, MOCK_COST_STORE);
  });

  it("should be list a costs", async () => {
    const {
      rows: [results],
    } = await postgresContext.index({
      origin: MOCK_COST_STORE.origin,
    });
    delete results.id;
    assert.deepEqual(results, MOCK_COST_STORE);
  });

  it("should be search a cost by id", async () => {
    const {
      rows: [item],
    } = await postgresContext.index({
      origin: MOCK_COST_STORE.origin,
    });
    const result = await postgresContext.show(item.id);
    delete result.id;
    assert.deepEqual(result, MOCK_COST_STORE);
  });

  it("should be update a cost by id", async () => {
    const {
      rows: [item],
    } = await postgresContext.index({
      origin: MOCK_COST_UPDATE.origin,
    });
    const newItem = { ...MOCK_COST_UPDATE, origin: 17, cost: 2.7 };
    const [, [result]] = await postgresContext.update(item.id, newItem);
    delete result.id;
    assert.deepEqual(result.origin, newItem.origin);
  });

  it("should be upsert a cost", async () => {
    const newItem = { origin: 11, destiny: 18, cost: 0.9 };
    const [result] = await postgresContext.update('', newItem, true);

    delete result.id;
    assert.deepEqual(result.origin, newItem.origin);
  });

  it("should be delete a cost by id", async () => {
    const {
      rows: [item],
    } = await postgresContext.index({
      origin: MOCK_COST_STORE.origin,
    });
    const result = await postgresContext.delete({ id: item.id });
    assert.equal(result, true);
  });
});
