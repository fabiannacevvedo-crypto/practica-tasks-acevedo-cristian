import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const Profile = sequelize.define(
  "Profile",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    }
  },
  {
    timestamps: false
  }
);

export default Profile;

