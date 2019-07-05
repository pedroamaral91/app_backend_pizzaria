import jwt from 'jsonwebtoken';

import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não eccontrado' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Credenciais incorretas.' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id, email, name }, 'secret', {
        expiresIn: '7d',
      }),
    });
  }
}

export default new SessionController();
