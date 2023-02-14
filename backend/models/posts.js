"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  posts.init(
    {
      username: DataTypes.STRING,
      content: DataTypes.STRING,
      content_type: DataTypes.STRING,
      content_description: DataTypes.STRING,
      content_location: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
      tableName: "posts",
    }
  );
  return posts;
};
