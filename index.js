// index.js
// Este archivo es el punto de entrada de la aplicación.
// Aquí se configura el servidor, los middlewares y las rutas principales.
// También se sincronizan los modelos con la base de datos antes de iniciar el servidor.

import express from "express";
import cors from "cors";

import productRoutes from "./routers/productRouters.js";
import categoryRoutes from "./routers/categoryRouters.js";

import { modelApp } from "./config/models.app.js";

const app = express();

// Permite que la API sea consumida desde otros dominios (frontend)
app.use(cors());

// Permite recibir y leer datos en formato JSON
app.use(express.json());

// Sincroniza los modelos con la base de datos
modelApp();

// Rutas principales de la API
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

// Inicia el servidor en el puerto 3001
app.listen(3001, () => {
  console.log("Servidor corriendo en puerto 3001");
});