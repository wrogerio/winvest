import { GetUltimosResultados } from "@/controllers/DashboardController";

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      const resultGetAll = await GetUltimosResultados();
      res.status(200).json(resultGetAll);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};