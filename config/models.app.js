// config/models.app.js
// Este archivo se encarga de cargar todos los modelos de la aplicación (como categorías y productos)
// y sincronizarlos con la base de datos.
// Básicamente asegura que las tablas existan y estén actualizadas según los modelos definidos.

import { sequelize } from "./database.js";

// IMPORTAR MODELOS
import "../models/categoryModel.js";
import "../models/productModel.js";

export const modelApp = async () => {
  try {

    // Sincroniza los modelos con la base de datos
    // Si hay cambios en los modelos, los ajusta automáticamente
    await sequelize.sync({ alter: true });

    console.log("Models synchronized");

  } catch (error) {

    console.log(error);

  }
};