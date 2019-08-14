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
    preCheck: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false
    },
    postCheck: DataTypes.ARRAY(DataTypes.JSON),
    userId: {
      type: DataTypes.INTEGER,
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
