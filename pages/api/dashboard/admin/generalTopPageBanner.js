import { createNewData, deleteDataAll } from "@/services/serviceOperations";

export default async function handler(req, res) {
  const tableName = "GeneralTopPageBanner";

  if (req.method === "POST") {
    try {
      const body = req.body;

      if (!body || body.role !== "admin") {
        return res.status(403).json({
          status: "error",
          message: "Yetkisiz erişim. Admin rolü gerekli.",
        });
      }

      delete body.role; // Role kontrolünden sonra kaldırıyoruz.

      // Tüm veriyi sil ve yeni banner oluştur.
      await deleteDataAll(tableName);
      const newBanner = await createNewData(tableName, body);

      return res.status(201).json({
        status: "success",
        message: "Banner başarıyla güncellendi.",
        data: newBanner,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  res.setHeader("Allow", ["POST"]);
  return res
    .status(405)
    .json({ status: "error", message: `Metod ${req.method} desteklenmiyor.` });
}
