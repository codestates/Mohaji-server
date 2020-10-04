'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(db) {
      this.belongsTo(db.user, { foreignKey: "user_id", targetKey: "id" });
    }
  }
  comment.init({
    message: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    playspot_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};