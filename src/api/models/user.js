const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    UserID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Email: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Password: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Age: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    Gender: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user',
    schema: 'foodwaste',
    timestamps: false,
    indexes: [
      {
        name: "user_pkey",
        unique: true,
        fields: [
          { name: "UserID" },
        ]
      },
    ]
  });
};
