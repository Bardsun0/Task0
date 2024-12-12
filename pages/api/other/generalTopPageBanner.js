import { getAllData } from "@/services/serviceOperations";

export default async function handler(req, res) {
  const tableName = "GeneralTopPageBanner";

  if (req.method === "GET") {
    try {
      const data = await getAllData(tableName);

      if (!data || data.length === 0) {
        return res.status(404).json({
          status: "error",
          message: "Veri bulunamadı.",
        });
      }

      return res.status(200).json({
        status: "success",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  res.setHeader("Allow", ["GET"]);
  return res
    .status(405)
    .json({ status: "error", message: `Metod ${req.method} desteklenmiyor.` });
}
