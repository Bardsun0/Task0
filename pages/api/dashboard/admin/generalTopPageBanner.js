import { createNewData, deleteDataAll } from "@/services/serviceOperations";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const body = req.body;

      // Admin kontrolü
      if (body.role !== "admin") {
        return res
          .status(403)
          .json({ status: "error", message: "Yetkisiz erişim" });
      }

      // Mevcut verileri sil
      await deleteDataAll("GeneralTopPageBanner");

      // Yeni veriyi oluştur
      delete body.role; // role alanını kaldır
      const data = await createNewData("GeneralTopPageBanner", body);

      return res.status(200).json({
        status: "success",
        message: "Banner başarıyla güncellendi",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({ status: "error", error: error.message });
    }
  }

  res.setHeader("Allow", ["POST"]);
  return res.status(405).end(`Method ${req.method} İzin Verilmedi`);
}
