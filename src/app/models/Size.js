import Sequelize, { Model } from 'sequelize';

class Size extends Model {
  static init(sequelize) {
    super.init(
      {
        size: Sequelize.STRING,
        description: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Size;
