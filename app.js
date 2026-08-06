import express from "express";
import dotenv from "dotenv";
import userRoutes from "./src/routes/userRoutes.js";
import taskRoutes from "./src/routes/taskRoutes.js";
import { sequelize } from "./src/config/database.js";

dotenv.config();
const app = express();
app.use(express.json());

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

// Conexión DB
sequelize.sync()
  .then(() => {
    console.log("Base de datos sincronizada");
    app.listen(3000, () => console.log("Servidor en http://localhost:3000"));
  })
  .catch(err => console.error("Error al conectar DB:", err));
