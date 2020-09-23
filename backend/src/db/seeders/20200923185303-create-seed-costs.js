// eslint-disable-next-line import/no-extraneous-dependencies
const uuid = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("TB_COSTS", [
      {
        id: uuid.v4(),
        origin: 11,
        destiny: 16,
        cost: 1.9,
      },
      {
        id: uuid.v4(),
        origin: 16,
        destiny: 11,
        cost: 2.9,
      },
      {
        id: uuid.v4(),
        origin: 11,
        destiny: 17,
        cost: 1.7,
      },
      {
        id: uuid.v4(),
        origin: 17,
        destiny: 11,
        cost: 2.7,
      },
      {
        id: uuid.v4(),
        origin: 11,
        destiny: 18,
        cost: 0.9,
      },
      {
        id: uuid.v4(),
        origin: 18,
        destiny: 11,
        cost: 1.9,
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("People", null, {});
  },
};
