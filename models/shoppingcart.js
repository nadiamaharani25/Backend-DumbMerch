'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shoppingCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  shoppingCart.init({
    idProduct: DataTypes.INTEGER,
    idCategory: DataTypes.INTEGER,
    idBuyer: DataTypes.INTEGER,
    idSeller: DataTypes.INTEGER,
    name: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    price: DataTypes.BIGINT,
    total: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'shoppingCart',
  });
  return shoppingCart;
};