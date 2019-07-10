import Sequelize, { Model } from 'sequelize';

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        full_price: Sequelize.DECIMAL(10, 2),
        cep: Sequelize.INTEGER,
        street: Sequelize.STRING,
        number_house: Sequelize.INTEGER,
        neighborhood: Sequelize.STRING,
        notes: Sequelize.STRING,
        user_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'User',
            key: 'id',
          },
        },
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}

export default Order;
