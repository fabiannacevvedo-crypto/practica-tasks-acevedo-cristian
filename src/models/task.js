import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js"; // 👈 importa User

const Task = sequelize.define("Task", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  description: { type: DataTypes.STRING(100), allowNull: false },
  isComplete: { type: DataTypes.BOOLEAN, defaultValue: false }
});

// Relación: cada tarea pertenece a un usuario
Task.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Task, { foreignKey: "userId", onDelete: "CASCADE" });

export default Task;
