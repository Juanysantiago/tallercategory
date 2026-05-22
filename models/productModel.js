// models/productModel.js

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

    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categories",
        key: "id",
      },
    },

    status: {
      type: DataTypes.ENUM(
        "active",
        "inactive",
        "out_of_stock"
      ),
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

// Relación Product -> Category
productModel.belongsTo(categoryModel, {
  foreignKey: "category_id",
  as: "category",
});

categoryModel.hasMany(productModel, {
  foreignKey: "category_id",
  as: "products",
});