import { ConfereQtdSigla } from "@/controllers/CarteirasController";

export default async (req, res) => {
  const { method } = req;
  const { ano, mes, sigla } = req.query;

  switch (method) {
    case "GET":
      const resultConfere = await ConfereQtdSigla(ano, mes, sigla);
      res.status(200).json(resultConfere);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};