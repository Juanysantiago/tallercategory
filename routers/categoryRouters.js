// routers/categoryRouters.js
// Este archivo define las rutas relacionadas con categorías.
// Aquí se conecta cada ruta HTTP con su respectiva función del controlador.

import { Router } from "express";

import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const router = Router();

// Obtener todas las categorías
router.get("/", getCategories);

// Obtener una categoría por ID
router.get("/:id", getCategoryById);

// Crear una nueva categoría
router.post("/", createCategory);

// Actualizar una categoría por ID
router.put("/:id", updateCategory);

// Eliminar una categoría por ID
router.delete("/:id", deleteCategory);

export default router;