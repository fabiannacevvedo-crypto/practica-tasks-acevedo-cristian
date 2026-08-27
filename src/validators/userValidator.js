import { body, param } from "express-validator";
import { User } from "../models/index.js";

export const createUserValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre es requerido")
    .isLength({ min: 2, max: 100 })
    .withMessage("El nombre debe tener entre 2 y 100 caracteres"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es requerido")
    .isEmail()
    .withMessage("Debe proporcionar un email valido")
    .custom(async (email) => {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error("El email ya se encuentra registrado");
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("La contrasena es requerida")
    .isLength({ min: 6 })
    .withMessage("La contrasena debe tener al menos 6 caracteres")
];

export const updateUserValidation = [
  param("id")
    .isInt()
    .withMessage("El ID de usuario debe ser un numero entero"),
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El nombre no puede estar vacio")
    .isLength({ min: 2, max: 100 })
    .withMessage("El nombre debe tener entre 2 y 100 caracteres"),
  body("email")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El email no puede estar vacio")
    .isEmail()
    .withMessage("Debe proporcionar un email valido")
    .custom(async (email, { req }) => {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser && existingUser.id !== parseInt(req.params.id)) {
        throw new Error("El email ya se encuentra registrado por otro usuario");
      }
      return true;
    }),
  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("La contrasena debe tener al menos 6 caracteres")
];

export const getByIdUserValidation = [
  param("id")
    .isInt()
    .withMessage("El ID de usuario debe ser un numero entero")
];
