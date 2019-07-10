import cep from 'cep-promise';

class CepController {
  async searchCep(req, res) {
    try {
      const response = await cep(req.params.cep);
      return res.json(response);
    } catch (err) {
      return res.status(400).json({ error: 'CEP Não encontrado' });
    }
  }
}

export default new CepController();
