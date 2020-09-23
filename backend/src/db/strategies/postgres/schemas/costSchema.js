import Sequelize from "sequelize";

const CostSchema = {
  name: "Cost",
  schema: {
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
  },
  options: {
    tableName: "TB_COSTS",
  },
};

export default CostSchema;
