import { DataTypes } from 'sequelize';

export default function initCounter(sequelize) {
  return sequelize.define('Counter', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    value: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
}
