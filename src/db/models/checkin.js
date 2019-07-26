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
    comment: DataTypes.STRING,
    pre: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {});
  CheckIn.associate = function(models) {
    CheckIn.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
  };

  CheckIn.addScope("lastTenFor", (userId) => {
    return {
      where: { userId: userId },
      limit: 10,
      order: [["createdAt", "DESC"]]
    }
  });

  return CheckIn;
};
