import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";

const Profile = sequelize.define("Profile", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  address: { type: DataTypes.STRING(100), allowNull: false },
  phone: { type: DataTypes.STRING(20), allowNull: false }
});

// Relación uno a uno con User
User.hasOne(Profile, { foreignKey: "userId", onDelete: "CASCADE" });
Profile.belongsTo(User, { foreignKey: "userId" });

export default Profile;
