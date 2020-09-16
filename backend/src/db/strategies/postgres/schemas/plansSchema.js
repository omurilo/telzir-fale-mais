import Sequelize from "sequelize";

const PlansSchema = {
  name: "Cost",
  schema: {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    quota: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  options: {
    tableName: "TB_PLANS",
  },
};

export default PlansSchema;
