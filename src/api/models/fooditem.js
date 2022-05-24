const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('fooditem', {
    FoodItemID: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    CategoryID: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'category',
        key: 'CategoryID'
      }
    },
    UserID: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'user',
        key: 'UserID'
      }
    },
    ExpiryDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    NotifyDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    ImageSrc: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'fooditem',
    schema: 'foodwaste',
    timestamps: false,
    indexes: [
      {
        name: "fooditem_pkey",
        unique: true,
        fields: [
          { name: "FoodItemID" },
        ]
      },
    ]
  });
};
