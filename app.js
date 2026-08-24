import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./src/config/database.js"
import userRoutes from "./src/routes/userRoutes.js";
import taskRoutes from "./src/routes/taskRoutes.js";
import profileRoutes from "./src/routes/profileRoutes.js";
import tagRoutes from "./src/routes/tagRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(express.json());

// Montaje de Rutas de la API
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/tags", tagRoutes);

// Manejo de rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({
    msg: "Ruta no encontrada"
  });
});

// Sincronizacion de la base de datos y arranque del servidor
sequelize
  .sync({force: true})
  .then(() => {
    console.log("Base de datos sincronizada correctamente");
    app.listen(PORT, () => {
      console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error al conectar o sincronizar la Base de Datos:", err.message);
  });

export default app;
