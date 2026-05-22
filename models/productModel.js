// models/productModel.js
// Este archivo define el modelo de productos en la base de datos.
// Aquí se describen los campos que tendrá cada producto, como nombre, precio, stock, imagen y estado.
// También se conecta cada producto con una categoría.

import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { categoryModel } from "./categoryModel.js";

export const productModel = sequelize.define(
  "products",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    // Relación con la categoría a la que pertenece el producto
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categories",
        key: "id",
      },
    },

    // Estado del producto
    status: {
      type: DataTypes.ENUM("active", "inactive", "out_of_stock"),
      defaultValue: "active",
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);

// Relación: un producto pertenece a una categoría
productModel.belongsTo(categoryModel, {
  foreignKey: "category_id",
  as: "category",
});

// Relación: una categoría puede tener muchos productos
categoryModel.hasMany(productModel, {
  foreignKey: "category_id",
  as: "products",
});