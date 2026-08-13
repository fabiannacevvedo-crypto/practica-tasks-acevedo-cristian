import { Tag } from "../models/Tag.js";
import { Task } from "../models/Task.js";

// Crear etiqueta
export const createTag = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ msg: "Nombre requerido" });

    const exists = await Tag.findOne({ where: { name } });
    if (exists) return res.status(400).json({ msg: "Etiqueta ya existe" });

    const tag = await Tag.create({ name });
    res.status(201).json({ msg: "Etiqueta creada", tag });
  } catch (err) {
    res.status(500).json({ msg: "Error al crear etiqueta", error: err.message });
  }
};

// Obtener todas las etiquetas con sus tareas
export const getTags = async (req, res) => {
  try {
    const tags = await Tag.findAll({ include: Task });
    res.json(tags);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener etiquetas" });
  }
};
