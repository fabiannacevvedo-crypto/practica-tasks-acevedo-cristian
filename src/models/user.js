
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Task from "./task.js";

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  password: { type: DataTypes.STRING(100), allowNull: false }
});

// Relación: un usuario tiene muchas tareas
User.hasMany(Task, { foreignKey: "userId", onDelete: "CASCADE" });

export default User;
