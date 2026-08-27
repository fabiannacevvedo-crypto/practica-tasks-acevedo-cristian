import { matchedData } from "express-validator";
import { Profile, User } from "../models/index.js";

// Crear perfil vinculado a un usuario (Relacion 1:1)
export const createProfile = async (req, res) => {
  try {
    const validatedData = matchedData(req, { locations: ["body"] });
    const profile = await Profile.create(validatedData);

    const createdProfile = await Profile.findByPk(profile.id, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"]
        }
      ]
    });

    res.status(201).json({
      msg: "Perfil creado exitosamente",
      profile: createdProfile
    });
  } catch (err) {
    res.status(500).json({
      msg: "Error al crear perfil",
      error: err.message
    });
  }
};

// Obtener todos los perfiles con su usuario asociado (eager loading sin password)
export const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"]
        }
      ]
    });
    res.status(200).json(profiles);
  } catch (err) {
    res.status(500).json({
      msg: "Error al obtener perfiles",
      error: err.message
    });
  }
};

// Obtener perfil por ID con su usuario asociado
export const getProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findByPk(id, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"]
        }
      ]
    });

    if (!profile) {
      return res.status(404).json({ msg: "Perfil no encontrado" });
    }

    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({
      msg: "Error al obtener perfil",
      error: err.message
    });
  }
};

// Actualizar perfil
export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findByPk(id);

    if (!profile) {
      return res.status(404).json({ msg: "Perfil no encontrado" });
    }

    const validatedData = matchedData(req, { locations: ["body"] });
    await profile.update(validatedData);

    const updatedProfile = await Profile.findByPk(profile.id, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"]
        }
      ]
    });

    res.status(200).json({
      msg: "Perfil actualizado exitosamente",
      profile: updatedProfile
    });
  } catch (err) {
    res.status(500).json({
      msg: "Error al actualizar perfil",
      error: err.message
    });
  }
};

// Eliminar perfil (eliminacion logica mediante paranoid)
export const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findByPk(id);

    if (!profile) {
      return res.status(404).json({ msg: "Perfil no encontrado" });
    }

    await profile.destroy();
    res.status(200).json({
      msg: "Perfil eliminado exitosamente"
    });
  } catch (err) {
    res.status(500).json({
      msg: "Error al eliminar perfil",
      error: err.message
    });
  }
};
