// controllers/categoryController.js

import { categoryModel } from "../models/categoryModel.js";

/**
 * Mostrar todas las categorías
 */
export const getCategories = async (req, res) => {
  try {

    // Documento enviado por query
    const document = req.query.document;

    // Validar que exista
    if (!document) {
      return res.status(400).json({
        ok: false,
        message: "Debe enviar el número de documento",
      });
    }

    // Último número del documento
    const lastNumber = parseInt(
      document.toString().slice(-1)
    );

    // VALIDACIÓN
    // CATEGORY SOLO PARA PAR
    if (lastNumber % 2 !== 0) {
      return res.status(403).json({
        ok: false,
        message:
          "Este documento no puede acceder a CATEGORY porque termina en impar",
      });
    }

    const categories = await categoryModel.findAll();

    res.status(200).json({
      ok: true,
      module: "CATEGORY",
      categories,
    });

  } catch (error) {

    res.status(500).json({
      ok: false,
      message: error.message,
    });

  }
};

/**
 * Mostrar categoría por ID
 */
export const getCategoryById = async (req, res) => {
  try {

    const document = req.query.document;

    if (!document) {
      return res.status(400).json({
        ok: false,
        message: "Debe enviar el número de documento",
      });
    }

    const lastNumber = parseInt(
      document.toString().slice(-1)
    );

    // SOLO PAR
    if (lastNumber % 2 !== 0) {
      return res.status(403).json({
        ok: false,
        message:
          "Acceso denegado para CATEGORY",
      });
    }

    const id = req.params.id;

    const category = await categoryModel.findByPk(id);

    if (!category) {
      return res.status(404).json({
        ok: false,
        message: "Categoría no encontrada",
      });
    }

    res.status(200).json({
      ok: true,
      category,
    });

  } catch (error) {

    res.status(500).json({
      ok: false,
      message: error.message,
    });

  }
};

/**
 * Crear categoría
 */
export const createCategory = async (req, res) => {
  try {

    const { document, ...data } = req.body;

    const lastNumber = parseInt(
      document.toString().slice(-1)
    );

    // SOLO PAR
    if (lastNumber % 2 !== 0) {
      return res.status(403).json({
        ok: false,
        message:
          "Solo documentos pares pueden usar CATEGORY",
      });
    }

    const category = await categoryModel.create(data);

    res.status(201).json({
      ok: true,
      category,
    });

  } catch (error) {

    res.status(500).json({
      ok: false,
      message: error.message,
    });

  }
};

/**
 * Actualizar categoría
 */
export const updateCategory = async (req, res) => {
  try {

    const { document, ...data } = req.body;

    const lastNumber = parseInt(
      document.toString().slice(-1)
    );

    // SOLO PAR
    if (lastNumber % 2 !== 0) {
      return res.status(403).json({
        ok: false,
        message:
          "Solo documentos pares pueden actualizar CATEGORY",
      });
    }

    const id = req.params.id;

    const category = await categoryModel.findByPk(id);

    if (!category) {
      return res.status(404).json({
        ok: false,
        message: "Categoría no encontrada",
      });
    }

    await category.update(data);

    res.status(200).json({
      ok: true,
      message: "Categoría actualizada",
      category,
    });

  } catch (error) {

    res.status(500).json({
      ok: false,
      message: error.message,
    });

  }
};

/**
 * Eliminar categoría
 */
export const deleteCategory = async (req, res) => {
  try {

    const document = req.query.document;

    const lastNumber = parseInt(
      document.toString().slice(-1)
    );

    // SOLO PAR
    if (lastNumber % 2 !== 0) {
      return res.status(403).json({
        ok: false,
        message:
          "Solo documentos pares pueden eliminar CATEGORY",
      });
    }

    const id = req.params.id;

    const category = await categoryModel.findByPk(id);

    if (!category) {
      return res.status(404).json({
        ok: false,
        message: "Categoría no encontrada",
      });
    }

    await category.destroy();

    res.status(200).json({
      ok: true,
      message: "Categoría eliminada",
    });

  } catch (error) {

    res.status(500).json({
      ok: false,
      message: error.message,
    });

  }
};