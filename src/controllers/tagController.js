import { matchedData } from "express-validator";
import { Tag, Task } from "../models/index.js";

// Crear una nueva etiqueta
export const createTag = async (req, res) => {
  try {
    const validatedData = matchedData(req);
    const tag = await Tag.create(validatedData);

    res.status(201).json({
      msg: "Etiqueta creada exitosamente",
      tag
    });
  } catch (err) {
    res.status(500).json({
      msg: "Error al crear etiqueta",
      error: err.message
    });
  }
};

// Obtener todas las etiquetas con sus tareas asociadas (Relacion N:M)
export const getTags = async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [
        {
          model: Task,
          as: "tasks",
          through: { attributes: [] },
          attributes: ["id", "title", "description", "isComplete"]
        }
      ]
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json({
      msg: "Error al obtener etiquetas",
      error: err.message
    });
  }
};

// Obtener etiqueta por ID con sus tareas asociadas
export const getTagById = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findByPk(id, {
      include: [
        {
          model: Task,
          as: "tasks",
          through: { attributes: [] },
          attributes: ["id", "title", "description", "isComplete"]
        }
      ]
    });

    if (!tag) {
      return res.status(404).json({ msg: "Etiqueta no encontrada" });
    }

    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json({
      msg: "Error al obtener etiqueta",
      error: err.message
    });
  }
};

// Actualizar etiqueta
export const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findByPk(id);

    if (!tag) {
      return res.status(404).json({ msg: "Etiqueta no encontrada" });
    }

    const validatedData = matchedData(req);
    await tag.update(validatedData);

    res.status(200).json({
      msg: "Etiqueta actualizada exitosamente",
      tag
    });
  } catch (err) {
    res.status(500).json({
      msg: "Error al actualizar etiqueta",
      error: err.message
    });
  }
};

// Eliminar etiqueta
export const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findByPk(id);

    if (!tag) {
      return res.status(404).json({ msg: "Etiqueta no encontrada" });
    }

    await tag.destroy();
    res.status(200).json({
      msg: "Etiqueta eliminada exitosamente"
    });
  } catch (err) {
    res.status(500).json({
      msg: "Error al eliminar etiqueta",
      error: err.message
    });
  }
};
