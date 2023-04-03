import { GetLast } from "@/controllers/RendimentosController";

export default async (req, res) => {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      const resultGetAll = await GetLast(id);
      res.status(200).json(resultGetAll);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};