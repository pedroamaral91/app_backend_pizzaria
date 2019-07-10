import * as Yup from 'yup';
import Price from '../models/Price';
import Size from '../models/Size';
import Type from '../models/Type';

class PriceController {
  async index(req, res) {
    const { type_id } = req.params;
    if (!type_id) {
      return res.status(400).json({ error: 'Parametro não informado' });
    }

    const price = await Price.findAll({
      where: { type_id },
      include: [
        {
          model: Size,
          as: 'size',
        },
        {
          model: Type,
          as: 'type',
        },
      ],
    });
    if (!price.length) {
      return res.status(404).json({ error: 'Produto sem valores' });
    }
    return res.json(price);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      price: Yup.number().required(),
      type_id: Yup.number().required(),
      size_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro de validação' });
    }

    const { type_id, size_id } = req.body;

    const price = await Price.findOne({ where: { type_id, size_id } });

    if (price) {
      return res
        .status(400)
        .json({ error: 'Valor já cadastrado para este item' });
    }

    const newPrice = await Price.create(req.body);

    return res.json(newPrice);
  }
}

export default new PriceController();
