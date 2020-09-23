// eslint-disable-next-line import/no-extraneous-dependencies
const uuid = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("TB_PLANS", [
      {
        id: uuid.v4(),
        name: "Fale Mais 30",
        quota: 30,
      },
      {
        id: uuid.v4(),
        name: "Fale Mais 60",
        quota: 60,
      },
      {
        id: uuid.v4(),
        name: "Fale Mais 120",
        quota: 120,
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("TB_PLANS", null, {});
  },
};
