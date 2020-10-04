'use strict';
const { hooksController } = require('../moduleStorage')

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(db) {
      this.hasMany(db.comment, { foreignKey: "user_id", sourceKey: "id" })
      this.hasMany(db.user_tag, { foreignKey: "user_id", sourceKey: "id" })
    }
  }
  user.init({
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    nickname: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING
    },
    social: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    social_id: {
      type: DataTypes.STRING,
      unique: true
    }
  },

    {
      hooks: {
        beforeCreate: (data) => {
          if (data.password) {
            data.password = hooksController.password(data.password);
          }
        },
        beforeFind: (data) => {
          if (data.where.password) {
            console.log(data.where.password)
            data.where.password = hooksController.password(data.where.password);
          }
        }
      },
      sequelize, modelName: 'user',
    });
  return user;
};
