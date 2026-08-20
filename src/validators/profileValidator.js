import { body, param } from "express-validator";
import { Profile, User } from "../models/index.js";

export const createProfileValidation = [
  body("address")
    .trim()
    .notEmpty()
    .withMessage("La direccion es requerida")
    .isLength({ min: 3, max: 100 })
    .withMessage("La direccion debe tener entre 3 y 100 caracteres"),
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("El telefono es requerido")
    .isLength({ min: 6, max: 20 })
    .withMessage("El telefono debe tener entre 6 y 20 caracteres"),
  body("userId")
    .notEmpty()
    .withMessage("El userId es obligatorio para crear un perfil")
    .isInt()
    .withMessage("El userId debe ser un numero entero")
    .custom(async (userId) => {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error("El usuario especificado no existe en la base de datos");
      }
      const existingProfile = await Profile.findOne({ where: { userId } });
      if (existingProfile) {
        throw new Error("El usuario ya cuenta con un perfil asignado (relacion 1:1)");
      }
      return true;
    })
];

export const updateProfileValidation = [
  param("id")
    .isInt()
    .withMessage("El ID de perfil debe ser un numero entero"),
  body("address")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("La direccion no puede estar vacia")
    .isLength({ min: 3, max: 100 })
    .withMessage("La direccion debe tener entre 3 y 100 caracteres"),
  body("phone")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El telefono no puede estar vacio")
    .isLength({ min: 6, max: 20 })
    .withMessage("El telefono debe tener entre 6 y 20 caracteres")
];

export const getByIdProfileValidation = [
  param("id")
    .isInt()
    .withMessage("El ID de perfil debe ser un numero entero")
];
