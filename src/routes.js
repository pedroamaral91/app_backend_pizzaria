import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ProductController from './app/controllers/ProductController';
import TypeController from './app/controllers/TypeController';
import SizeController from './app/controllers/SizeController';
import PriceController from './app/controllers/PriceController';
import CepController from './app/controllers/CepController';
import OrderController from './app/controllers/OrderController';

const routes = new Router();

routes.post('/register/user', UserController.store);
routes.post('/login', SessionController.store);

routes.post('/store/product', ProductController.store);
routes.post('/store/type', TypeController.store);
routes.post('/store/size', SizeController.store);
routes.post('/store/price', PriceController.store);
routes.post('/app/store/order', OrderController.store);

routes.get('/app/getproducts', ProductController.index);
routes.get('/app/gettypes/:product_id', TypeController.index);
routes.get('/app/getprices/:type_id', PriceController.index);
routes.get('/app/getorders', OrderController.index);

// api externa
routes.get('/app/searchcep/:cep', CepController.searchCep);

export default routes;
