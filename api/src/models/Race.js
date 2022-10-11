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
    height: {
      type: DataTypes.STRING, // cm
      allowNull: false,
      // validate: {
      //   min: 5,
      //   max: 500
      // }
    },
    weight: {
      type: DataTypes.STRING, // kg
      allowNull: false,
      // validate: {
      //   min: 0.5,
      //   max: 200
      // }
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: true,
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
