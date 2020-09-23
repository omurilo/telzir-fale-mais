export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("TB_COSTS", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      origin: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      destiny: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cost: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('TB_COSTS');
  },
};
