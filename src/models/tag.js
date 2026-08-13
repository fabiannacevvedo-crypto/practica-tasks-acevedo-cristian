import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { Task } from "./Task.js";

const Tag = sequelize.define("Tag", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(50), allowNull: false, unique: true }
});

// Relación muchos a muchos con Task
Task.belongsToMany(Tag, { through: "TaskTags" });
Tag.belongsToMany(Task, { through: "TaskTags" });

export { Tag };
