import { body, param } from "express-validator";
import { Task, User } from "../models/index.js";

export const createTaskValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("El titulo es requerido")
    .isLength({ min: 3, max: 100 })
    .withMessage("El titulo debe tener entre 3 y 100 caracteres")
    .custom(async (title) => {
      const existingTask = await Task.findOne({ where: { title } });
      if (existingTask) {
        throw new Error("Ya existe una tarea con este titulo");
      }
      return true;
    }),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("La descripcion es requerida")
    .isLength({ min: 3, max: 255 })
    .withMessage("La descripcion debe tener entre 3 y 255 caracteres"),
  body("isComplete")
    .optional()
    .isBoolean()
    .withMessage("isComplete debe ser un valor booleano (true o false)"),
  body("userId")
    .notEmpty()
    .withMessage("El userId es obligatorio para crear una tarea")
    .isInt()
    .withMessage("El userId debe ser un numero entero")
    .custom(async (userId) => {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error("El usuario especificado no existe en la base de datos");
      }
      return true;
    }),
  body("tags")
    .optional()
    .isArray()
    .withMessage("tags debe ser un array de IDs de etiquetas")
];

export const updateTaskValidation = [
  param("id")
    .isInt()
    .withMessage("El ID de tarea debe ser un numero entero"),
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El titulo no puede estar vacio")
    .isLength({ min: 3, max: 100 })
    .withMessage("El titulo debe tener entre 3 y 100 caracteres")
    .custom(async (title, { req }) => {
      const existingTask = await Task.findOne({ where: { title } });
      if (existingTask && existingTask.id !== parseInt(req.params.id)) {
        throw new Error("Ya existe otra tarea con este titulo");
      }
      return true;
    }),
  body("description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("La descripcion no puede estar vacia")
    .isLength({ min: 3, max: 255 })
    .withMessage("La descripcion debe tener entre 3 y 255 caracteres"),
  body("isComplete")
    .optional()
    .isBoolean()
    .withMessage("isComplete debe ser un valor booleano (true o false)"),
  body("userId")
    .optional()
    .isInt()
    .withMessage("El userId debe ser un numero entero")
    .custom(async (userId) => {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error("El usuario especificado no existe en la base de datos");
      }
      return true;
    }),
  body("tags")
    .optional()
    .isArray()
    .withMessage("tags debe ser un array de IDs de etiquetas")
];

export const getByIdTaskValidation = [
  param("id")
    .isInt()
    .withMessage("El ID de tarea debe ser un numero entero")
];

export const assignTagsValidation = [
  param("id")
    .isInt()
    .withMessage("El ID de tarea debe ser un numero entero"),
  body("tagIds")
    .isArray({ min: 1 })
    .withMessage("tagIds debe ser un array con al menos un ID de etiqueta")
];
