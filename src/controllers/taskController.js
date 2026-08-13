import { Task } from "../models/Task.js";
import { User } from "../models/User.js"; // importa el modelo User

// Crear tarea vinculada a un usuario con validaciones
export const createTask = async (req, res) => {
  try {
    const { title, description, isComplete, userId } = req.body;

    // Validaciones básicas
    if (!title || !description || !userId) {
      return res.status(400).json({ msg: "Datos incompletos" });
    }

    // Verificar si ya existe una tarea con el mismo título
    const exists = await Task.findOne({ where: { title } });
    if (exists) return res.status(400).json({ msg: "Título ya registrado" });

    // Verificar si el usuario existe
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    // Crear la tarea vinculada al usuario
    const task = await Task.create({ title, description, isComplete, userId });
    res.status(201).json({ msg: "Tarea creada", task });
  } catch (err) {
    res.status(500).json({ msg: "Error al crear tarea", error: err.message });
  }
};

// Obtener todas las tareas con su usuario
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ include: User });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener tareas" });
  }
};

// Obtener tarea por ID con su usuario
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id, { include: User });
    if (!task) return res.status(404).json({ msg: "Tarea no encontrada" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener tarea" });
  }
};

// Actualizar tarea
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ msg: "Tarea no encontrada" });

    await task.update(req.body);
    res.json({ msg: "Tarea actualizada", task });
  } catch (err) {
    res.status(500).json({ msg: "Error al actualizar tarea" });
  }
};

// Eliminar tarea
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ msg: "Tarea no encontrada" });

    await task.destroy();
    res.json({ msg: "Tarea eliminada" });
  } catch (err) {
    res.status(500).json({ msg: "Error al eliminar tarea" });
  }
};
