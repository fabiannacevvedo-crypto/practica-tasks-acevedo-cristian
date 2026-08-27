import { body, param } from "express-validator";
import { Tag } from "../models/index.js";

export const createTagValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre de la etiqueta es requerido")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .custom(async (name) => {
      const existingTag = await Tag.findOne({ where: { name } });
      if (existingTag) {
        throw new Error("Ya existe una etiqueta con este nombre");
      }
      return true;
    })
];

export const updateTagValidation = [
  param("id")
    .isInt()
    .withMessage("El ID de etiqueta debe ser un numero entero"),
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El nombre de la etiqueta no puede estar vacio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .custom(async (name, { req }) => {
      const existingTag = await Tag.findOne({ where: { name } });
      if (existingTag && existingTag.id !== parseInt(req.params.id)) {
        throw new Error("Ya existe otra etiqueta con este nombre");
      }
      return true;
    })
];

export const getByIdTagValidation = [
  param("id")
    .isInt()
    .withMessage("El ID de etiqueta debe ser un numero entero")
];
