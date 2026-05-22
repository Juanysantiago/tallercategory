import express from "express";
import cors from "cors";

import productRoutes from "./routers/productRouters.js";
import categoryRoutes from "./routers/categoryRouters.js";

import { modelApp } from "./config/models.app.js";

const app = express();

app.use(cors());

app.use(express.json());

// SINCRONIZAR MODELOS
modelApp();

// Rutas
app.use("/api/products", productRoutes);

app.use("/api/categories", categoryRoutes);

app.listen(3001, () => {
  console.log("Servidor corriendo en puerto 3001");
});