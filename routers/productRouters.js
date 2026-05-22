// routers/productRouters.js
// Este archivo define las rutas relacionadas con productos.
// Se encarga de conectar cada endpoint con su función correspondiente en el controlador.

import { Router } from "express";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = Router();

// Obtener todos los productos
router.get("/", getProducts);

// Obtener un producto por ID
router.get("/:id", getProductById);

// Crear un nuevo producto
router.post("/", createProduct);

// Actualizar un producto por ID
router.put("/:id", updateProduct);

// Eliminar un producto por ID
router.delete("/:id", deleteProduct);

export default router;