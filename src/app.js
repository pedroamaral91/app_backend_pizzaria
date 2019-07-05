import express from 'express';
import routes from './routes';
import authMiddleware from './app/middlewares/auth';
import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use('/app', authMiddleware);
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
