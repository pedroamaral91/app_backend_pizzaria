import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        description: Sequelize.STRING,
        duration: Sequelize.STRING,
        icon: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Product;
