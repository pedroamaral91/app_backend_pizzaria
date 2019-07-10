import * as Yup from 'yup';
import Order from '../models/Order';
import OrderDetail from '../models/OrderDetail';

class OrderController {
  async index(req, res) {
    try {
      if (!req.userId) {
        return res.status(400).json({ error: 'Parametro não informado' });
      }
      const response = await Order.findAll({ where: { user_id: req.userId } });

      return res.json(response);
    } catch (err) {
      return res.status(400).json({ error: 'Não foi possível concluir ação.' });
    }
  }

  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        notes: Yup.string(),
        cep: Yup.number().required(),
        street: Yup.string().required(),
        number_house: Yup.number().required(),
        full_price: Yup.number().required(),
        neighborhood: Yup.string().required(),
        order: Yup.array()
          .of(
            Yup.object().shape({
              type_id: Yup.number().required(),
              size_id: Yup.number().required(),
            })
          )
          .required(),
      });
      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Erro de validação' });
      }
      const newOrder = await Order.create({ ...req.body, user_id: req.userId });
      const { id } = newOrder;
      const { order } = req.body;
      order.map(myOrder =>
        OrderDetail.create({
          type_id: myOrder.type_id,
          size_id: myOrder.size_id,
          order_id: id,
        })
      );

      return res.json(order);
    } catch (err) {
      return res.status(400).json(err);
    }
  }
}

export default new OrderController();
