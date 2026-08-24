import { matchedData } from "express-validator";
import { User, Task, Profile } from "../models/index.js";

// Crear un nuevo usuario
export const createUser = async (req, res) => {
  try {
    const validatedData = matchedData(req);
    const user = await User.create(validatedData);
    
    // Retornamos los datos del usuario sin exponer la contraseña
    const responseUser = {
      id: user.id,
      name: user.name,
      email: user.email
    };

    res.status(201).json({
      msg: "Usuario creado exitosamente",
      user: responseUser
    });
  } catch (err) {
    res.status(500).json({
      msg: "Error al crear usuario",
      error: err.message
    });
  }
};

// Obtener todos los usuarios con sus tareas y perfil (eager loading sin password)
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Task,
          as: "tasks",
          attributes: ["id", "title", "description", "is_Complete"]
        },
        {
          model: Profile,
          as: "profile",
          attributes: ["id", "address", "phone"]
        }
      ]
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      msg: "Error al obtener usuarios",
      error: err.message
    });
  }
};

// Obtener un usuario especifico por ID con sus tareas y perfil
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Task,
          as: "tasks",
          attributes: ["id", "title", "description", "is_Complete"]
        },
        {
          model: Profile,
          as: "profile",
          attributes: ["id", "address", "phone"]
        }
      ]
    });

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      msg: "Error al obtener usuario",
      error: err.message
    });
  }
};

// Actualizar usuario
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    const validatedData = matchedData(req);
    await user.update(validatedData);

    const updatedUser = {
      id: user.id,
      name: user.name,
      email: user.email
    };

    res.status(200).json({
      msg: "Usuario actualizado exitosamente",
      user: updatedUser
    });
  } catch (err) {
    res.status(500).json({
      msg: "Error al actualizar usuario",
      error: err.message
    });
  }
};

// Eliminar usuario
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    await user.destroy();
    res.status(200).json({
      msg: "Usuario eliminado exitosamente"
    });
  } catch (err) {
    res.status(500).json({
      msg: "Error al eliminar usuario",
      error: err.message
    });
  }
};
