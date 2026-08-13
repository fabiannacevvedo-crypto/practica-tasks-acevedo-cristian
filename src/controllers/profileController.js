import { Profile } from "../models/Profile.js";
import { User } from "../models/User.js";

// Crear perfil vinculado a un usuario
export const createProfile = async (req, res) => {
  try {
    const { address, phone, userId } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    const profile = await Profile.create({ address, phone, userId });
    res.status(201).json({ msg: "Perfil creado", profile });
  } catch (err) {
    res.status(500).json({ msg: "Error al crear perfil", error: err.message });
  }
};

// Obtener todos los perfiles con su usuario
export const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.findAll({ include: User });
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener perfiles" });
  }
};
