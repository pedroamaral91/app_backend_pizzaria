import * as Yup from 'yup';

import Product from '../models/Product';

class ProductController {
  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      description: Yup.string().required(),
      duration: Yup.string().required(),
      icon: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro na validação de dados.' });
    }
    const { product } = req.body;

    const hasProduct = await Product.findOne({
      where: { product },
    });

    if (hasProduct) {
      return res.status(400).json({ error: 'Produto já cadastrado' });
    }

    const newProduct = await Product.create(req.body);

    return res.json(newProduct);
  }

  async index(req, res) {
    const products = await Product.findAll();

    return res.json(products);
  }
}

export default new ProductController();
