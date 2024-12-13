import {
  createNewData,
  deleteDataAll,
  updateDataByAny,
  deleteDataByAny,
} from "@/services/serviceOperations";

export default async function handler(req, res) {
  const tableName = "Banner";

  if (req.method === "POST") {
    try {
      const body = req.body;

      // Admin rol kontrolü
      if (!body || body.role !== "admin") {
        return res.status(403).json({
          status: "error",
          message: "Yetkisiz erişim. Admin rolü gerekli.",
        });
      }

      delete body.role;

      // Tüm veriyi sil ve yeni banner oluştur
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

  // Diğer metodlar (PUT, DELETE) benzer şekilde güncellenecek
}
