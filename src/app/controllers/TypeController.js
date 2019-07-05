import * as Yup from 'yup';
import Type from '../models/Type';

class TypeController {
  async index(req, res) {
    const { product_id } = req.params;
    if (!product_id) {
      return res.status(400).json({ error: 'Produto não informado' });
    }
    const types = await Type.findAll({ where: { product_id } });

    if (!types.length) {
      return res.status(404).json({ error: 'Tipo de produto não encontrado' });
    }

    return res.json(types);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      type: Yup.string().required(),
      product_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro na validação de dados.' });
    }

    const type = await Type.findOne({ where: { type: req.body.type } });

    if (type) {
      return res.status(400).json({ error: 'Tipo já cadastrado' });
    }
    const newType = await Type.create(req.body);

    return res.json(newType);
  }
}

export default new TypeController();
