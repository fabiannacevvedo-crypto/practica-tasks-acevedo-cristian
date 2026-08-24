import { DataTypes } from "sequelize";
import {sequelize} from "../config/database.js";

export const Tag = sequelize.define(
  "Tag",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    }
  },
  {
    timestamps: false
  }
);

export default Tag;

