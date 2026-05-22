// config/models.app.js

import { sequelize } from "./database.js";

// IMPORTAR MODELOS
import "../models/categoryModel.js";
import "../models/productModel.js";

export const modelApp = async () => {
  try {

    await sequelize.sync({ alter: true });

    console.log("Models synchronized");

  } catch (error) {

    console.log(error);

  }
};