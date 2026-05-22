// models/categoryModel.js
// Este archivo define el modelo de categorías en la base de datos.
// Aquí se especifican los campos que tendrá la tabla, como nombre, descripción, imagen y estado.
// También permite que una categoría pueda tener una categoría padre (subcategorías).

import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const categoryModel = sequelize.define(
  "categories",
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

    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    // Relación consigo misma para manejar subcategorías
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "categories",
        key: "id",
      },
    },

    // Estado de la categoría (activa o inactiva)
    status: {
      type: DataTypes.ENUM("active", "inactive"),
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

// Relación: una categoría puede tener una categoría padre
categoryModel.belongsTo(categoryModel, {
  foreignKey: "parent_id",
  as: "parent",
});

// Relación: una categoría puede tener muchas subcategorías
categoryModel.hasMany(categoryModel, {
  foreignKey: "parent_id",
  as: "children",
});