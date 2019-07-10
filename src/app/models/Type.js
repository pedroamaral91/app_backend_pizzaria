import Sequelize, { Model } from 'sequelize';

class Type extends Model {
  static init(sequelize) {
    super.init(
      {
        type: Sequelize.STRING,
        description: Sequelize.STRING,
        product_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Product',
          },
          key: 'id',
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Type;
