import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "lettedb.sqlite",
});

export default sequelize;
