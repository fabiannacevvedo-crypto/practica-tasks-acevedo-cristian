import { User } from "../models/User.js";
import { Task } from "../models/Task.js"; // importa Task para incluirlo

// Crear usuario
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Datos incompletos" });
    }

    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ msg: "Email ya registrado" });

    const user = await User.create({ name, email, password });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ msg: "Error al crear usuario", error: err.message });
  }
};

// Obtener todos los usuarios con sus tareas
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ include: Task });
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener usuarios" });
  }
};

// Obtener usuario por ID con sus tareas
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, { include: Task });

    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener usuario", error });
  }
};

// Actualizar usuario
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    await user.update(req.body);
    res.json({ msg: "Usuario actualizado", user });
  } catch (err) {
    res.status(500).json({ msg: "Error al actualizar usuario" });
  }
};

// Eliminar usuario
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    await user.destroy();
    res.json({ msg: "Usuario eliminado" });
  } catch (err) {
    res.status(500).json({ msg: "Error al eliminar usuario" });
  }
};
