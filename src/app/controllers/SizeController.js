import * as Yup from 'yup';
import Size from '../models/Size';

class SizeController {
  async store(req, res) {
    const schema = Yup.object().shape({
      size: Yup.string().required(),
      description: Yup.string().required(),
      type_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro na validação de dados.' });
    }

    const { size, type_id } = req.body;
    const hasSize = await Size.findOne({
      where: { size, type_id },
    });

    if (hasSize) {
      return res.status(400).json({ error: 'Tamanho já cadastrado' });
    }

    const newSize = await Size.create(req.body);
    return res.json(newSize);
  }
}

export default new SizeController();
