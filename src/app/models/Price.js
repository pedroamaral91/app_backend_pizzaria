import Sequelize, { Model } from 'sequelize';

class Price extends Model {
  static init(sequelize) {
    super.init(
      {
        price: Sequelize.DECIMAL(10, 2),
        type_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Type',
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
    this.belongsTo(models.Type, { foreignKey: 'type_id' });

    this.belongsTo(models.Size, { foreignKey: 'size_id', as: 'size' });
  }
}

export default Price;
