// config/database.js
// Este archivo sirve para conectar la aplicación con la base de datos.
// Toma los datos de conexión que están guardados en el archivo .env (como usuario, contraseña y nombre de la base de datos).
// Con eso crea la conexión usando Sequelize.
// Luego intenta conectarse para verificar que todo esté bien.
// Si la conexión funciona, muestra un mensaje de éxito; si no, muestra el error.

import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error);
  });