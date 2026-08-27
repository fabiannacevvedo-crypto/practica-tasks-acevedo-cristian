import { sequelize } from "../config/database.js";
import User from "./user.js";
import Task from "./task.js";
import Profile from "./profile.js";
import Tag from "./tag.js";

// ==========================================
// 1. Relacion Uno a Muchos (1:N): User <-> Task
// Un usuario puede tener muchas tareas.
// Cada tarea pertenece a un unico usuario.
// ==========================================
User.hasMany(Task, {
  foreignKey: "userId",
  as: "tasks",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});
Task.belongsTo(User, {
  foreignKey: "userId",
  as: "user"
});

// ==========================================
// 2. Relacion Uno a Uno (1:1): User <-> Profile
// Un usuario tiene un unico perfil.
// Cada perfil pertenece a un unico usuario.
// ==========================================
User.hasOne(Profile, {
  foreignKey: "userId",
  as: "profile",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});
Profile.belongsTo(User, {
  foreignKey: "userId",
  as: "user"
});

// ==========================================
// 3. Relacion Muchos a Muchos (N:M): Task <-> Tag
// Una tarea puede tener muchas etiquetas.
// Una etiqueta puede asociarse a muchas tareas.
// Tabla intermedia: TaskTags
// ==========================================
Task.belongsToMany(Tag, {
  through: "TaskTags",
  as: "tags",
  foreignKey: "taskId",
  otherKey: "tagId",
  timestamps: false
});
Tag.belongsToMany(Task, {
  through: "TaskTags",
  as: "tasks",
  foreignKey: "tagId",
  otherKey: "taskId",
  timestamps: false
});

export { sequelize, User, Task, Profile, Tag };
export default {
  sequelize,
  User,
  Task,
  Profile,
  Tag
};
