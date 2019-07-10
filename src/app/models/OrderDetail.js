import Sequelize, { Model } from 'sequelize';

class OrderDetail extends Model {
  static init(sequelize) {
    super.init(
      {
        type_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Type',
            key: 'id',
          },
        },
        order_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Order',
            key: 'id',
          },
        },
        size_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Size',
            key: 'id',
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Order, { foreignKey: 'order_id' });
  }
}
export default OrderDetail;
