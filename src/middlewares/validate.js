import { validationResult } from "express-validator";

/**
 * Middleware personalizado para verificar los resultados de validación de express-validator.
 * Si existen errores de validación, responde con status 400 y el listado de errores.
 * De lo contrario, cede el control al siguiente middleware o controlador.
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }
  next();
};

export default validate;
