import { GetItem, UpdateItem, RemoveItem } from "@/controllers/InstituicoesController";

export default async (req, res) => {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      const resultGetAll = await GetItem(id);
      res.status(200).json(resultGetAll);
      break;
    case "PUT":
      const resultPost = await UpdateItem(req.body);
      res.status(200).json(resultPost);
      break;
    case "DELETE":
      const resultDelete = await RemoveItem(id);
      res.status(200).json(resultDelete);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};