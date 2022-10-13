const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('race', {
    id: {
      type: DataTypes.UUID,             // Tipo de dato predeterminado que ya trae sequelize, es un codigo auto-incremental hexadecimal
      defaultValue: DataTypes.UUIDV4,   // Lo uso para que no se me pisen los id de la api externa con los id de mi base de datos.
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    min_height: {
      type: DataTypes.INTEGER, // cm
      allowNull: false,
      validate: {
        min: 1,
        max: 500
      }
    },
    max_height: {
      type: DataTypes.INTEGER, // cm
      allowNull: false,
      validate: {
        min: 1,
        max: 500
      }
    },
    min_weight: {
      type: DataTypes.INTEGER, // kg
      allowNull: false,
      validate: {
        min: 1,
        max: 200
      }
    },
    max_weight: {
      type: DataTypes.INTEGER, // kg
      allowNull: false,
      validate: {
        min: 1,
        max: 200
      }
    },
    min_life_span: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 99
      }
    },
    max_life_span: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 99
      }
    },
    img : {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "https://tinyurl.com/4e893cj9"
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  },{
    timestamps: false,
  });
};
