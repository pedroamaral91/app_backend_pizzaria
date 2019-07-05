import Sequelize from 'sequelize';

import User from '../app/models/User';
import Product from '../app/models/Product';
import Type from '../app/models/Type';
import Size from '../app/models/Size';
import Price from '../app/models/Price';

import databaseConfig from '../config/database';

const models = [User, Product, Type, Size, Price];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
