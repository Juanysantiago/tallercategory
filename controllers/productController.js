// controllers/productController.js

import { productModel } from "../models/productModel.js";

/**
 * Mostrar todos los productos
 */
export const getProducts = async (req, res) => {
  try {

    const document = req.query.document;

    if (!document) {
      return res.status(400).json({
        ok: false,
        message: "Debe enviar el documento",
      });
    }

    const lastNumber = parseInt(
      document.toString().slice(-1)
    );

    // PRODUCT SOLO IMPAR
    if (lastNumber % 2 === 0) {
      return res.status(403).json({
        ok: false,
        message:
          "Este documento no puede acceder a PRODUCT porque termina en par",
      });
    }

    const products = await productModel.findAll();

    res.status(200).json({
      ok: true,
      module: "PRODUCT",
      products,
    });

  } catch (error) {

    res.status(500).json({
      ok: false,
      message: error.message,
    });

  }
};

/**
 * Mostrar producto por ID
 */
export const getProductById = async (req, res) => {
  try {

    const document = req.query.document;

    const lastNumber = parseInt(
      document.toString().slice(-1)
    );

    // SOLO IMPAR
    if (lastNumber % 2 === 0) {
      return res.status(403).json({
        ok: false,
        message:
          "Acceso denegado para PRODUCT",
      });
    }

    const id = req.params.id;

    const product = await productModel.findByPk(id);

    if (!product) {
      return res.status(404).json({
        ok: false,
        message: "Producto no encontrado",
      });
    }

    res.status(200).json({
      ok: true,
      product,
    });

  } catch (error) {

    res.status(500).json({
      ok: false,
      message: error.message,
    });

  }
};

/**
 * Crear producto
 */
export const createProduct = async (req, res) => {
  try {

    const { document, ...data } = req.body;

    const lastNumber = parseInt(
      document.toString().slice(-1)
    );

    // SOLO IMPAR
    if (lastNumber % 2 === 0) {
      return res.status(403).json({
        ok: false,
        message:
          "Solo documentos impares pueden usar PRODUCT",
      });
    }

    const product = await productModel.create(data);

    res.status(201).json({
      ok: true,
      product,
    });

  } catch (error) {

    res.status(500).json({
      ok: false,
      message: error.message,
    });

  }
};

/**
 * Actualizar producto
 */
export const updateProduct = async (req, res) => {
  try {

    const { document, ...data } = req.body;

    const lastNumber = parseInt(
      document.toString().slice(-1)
    );

    // SOLO IMPAR
    if (lastNumber % 2 === 0) {
      return res.status(403).json({
        ok: false,
        message:
          "Solo documentos impares pueden actualizar PRODUCT",
      });
    }

    const id = req.params.id;

    const product = await productModel.findByPk(id);

    if (!product) {
      return res.status(404).json({
        ok: false,
        message: "Producto no encontrado",
      });
    }

    await product.update(data);

    res.status(200).json({
      ok: true,
      message: "Producto actualizado",
      product,
    });

  } catch (error) {

    res.status(500).json({
      ok: false,
      message: error.message,
    });

  }
};

/**
 * Eliminar producto
 */
export const deleteProduct = async (req, res) => {
  try {

    const document = req.query.document;

    const lastNumber = parseInt(
      document.toString().slice(-1)
    );

    // SOLO IMPAR
    if (lastNumber % 2 === 0) {
      return res.status(403).json({
        ok: false,
        message:
          "Solo documentos impares pueden eliminar PRODUCT",
      });
    }

    const id = req.params.id;

    const product = await productModel.findByPk(id);

    if (!product) {
      return res.status(404).json({
        ok: false,
        message: "Producto no encontrado",
      });
    }

    await product.destroy();

    res.status(200).json({
      ok: true,
      message: "Producto eliminado",
    });

  } catch (error) {

    res.status(500).json({
      ok: false,
      message: error.message,
    });

  }
};