import { matchedData } from "express-validator";
import { Task, User, Tag } from "../models/index.js";

// Crear una nueva tarea vinculada a un usuario
export const createTask = async (req, res) => {
  try {
    const validatedData = matchedData(req, { locations: ["body"] });
    const { tags, ...taskData } = validatedData;

    const task = await Task.create(taskData);

    // Si se enviaron etiquetas asociadas, vincularlas a través de la tabla intermedia
    if (tags && Array.isArray(tags) && tags.length > 0) {
      await task.setTags(tags);
    }

    // Obtener la tarea con sus relaciones cargadas
    const createdTask = await Task.findByPk(task.id, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"]
        },
        {
          model: Tag,
          as: "tags",
          through: { attributes: [] },
          attributes: ["id", "name"]
        }
      ]
    });

    res.status(201).json({
      msg: "Tarea creada exitosamente",
      task: createdTask
    });
  } catch (err) {
    res.status(500).json({
      msg: "Error al crear tarea",
      error: err.message
    });
  }
};

// Obtener todas las tareas con el usuario creador y sus etiquetas
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"]
        },
        {
          model: Tag,
          as: "tags",
          through: { attributes: [] },
          attributes: ["id", "name"]
        }
      ]
    });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({
      msg: "Error al obtener tareas",
      error: err.message
    });
  }
};

// Obtener una tarea especifica por ID con el usuario creador y sus etiquetas
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"]
        },
        {
          model: Tag,
          as: "tags",
          through: { attributes: [] },
          attributes: ["id", "name"]
        }
      ]
    });

    if (!task) {
      return res.status(404).json({ msg: "Tarea no encontrada" });
    }

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({
      msg: "Error al obtener tarea",
      error: err.message
    });
  }
};

// Actualizar una tarea
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ msg: "Tarea no encontrada" });
    }

    const validatedData = matchedData(req, { locations: ["body"] });
    const { tags, ...taskData } = validatedData;

    await task.update(taskData);

    if (tags && Array.isArray(tags)) {
      await task.setTags(tags);
    }

    const updatedTask = await Task.findByPk(task.id, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"]
        },
        {
          model: Tag,
          as: "tags",
          through: { attributes: [] },
          attributes: ["id", "name"]
        }
      ]
    });

    res.status(200).json({
      msg: "Tarea actualizada exitosamente",
      task: updatedTask
    });
  } catch (err) {
    res.status(500).json({
      msg: "Error al actualizar tarea",
      error: err.message
    });
  }
};

// Eliminar una tarea (eliminacion logica mediante paranoid)
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ msg: "Tarea no encontrada" });
    }

    await task.destroy();
    res.status(200).json({
      msg: "Tarea eliminada exitosamente"
    });
  } catch (err) {
    res.status(500).json({
      msg: "Error al eliminar tarea",
      error: err.message
    });
  }
};

// Asignar etiquetas a una tarea
export const assignTagsToTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { tagIds } = matchedData(req, { locations: ["body"] });

    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ msg: "Tarea no encontrada" });
    }

    await task.setTags(tagIds);

    const taskWithTags = await Task.findByPk(id, {
      include: [
        {
          model: Tag,
          as: "tags",
          through: { attributes: [] },
          attributes: ["id", "name"]
        }
      ]
    });

    res.status(200).json({
      msg: "Etiquetas asignadas exitosamente a la tarea",
      task: taskWithTags
    });
  } catch (err) {
    res.status(500).json({
      msg: "Error al asignar etiquetas a la tarea",
      error: err.message
    });
  }
};
