import { getAllData } from "@/services/serviceOperations";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const data = await getAllData();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Veri alınırken hata oluştu" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
