'use strict';
module.exports = (sequelize, DataTypes) => {
  const CheckIn = sequelize.define('CheckIn', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    exercise: {
      type: DataTypes.STRING,
      allowNull: false
    },
    feelings: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false
    },
    comment: DataTypes.STRING
  }, {});
  CheckIn.associate = function(models) {
    CheckIn.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
  };
  return CheckIn;
};