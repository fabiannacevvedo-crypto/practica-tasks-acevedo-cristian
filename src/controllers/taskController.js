import { Task } from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, isComplete } = req.body;
    if (!title || !description) return res.status(400).json({ msg: "Datos incompletos" });

    const exists = await Task.findOne({ where: { title } });
    if (exists) return res.status(400).json({ msg: "Título ya registrado" });

    const task = await Task.create({ title, description, isComplete });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ msg: "Error al crear tarea", error: err.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener tareas" });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ msg: "Tarea no encontrada" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener tarea" });
  }
};

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
