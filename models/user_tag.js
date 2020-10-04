'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(db) {
      this.belongsTo(db.user, { foreignKey: "user_id", targetKey: "id" });
      this.belongsTo(db.tag, { foreignKey: "tag_id", targetKey: "id" });
    }
  };
  user_tag.init({
    tag_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_tag',
  });
  return user_tag;
};