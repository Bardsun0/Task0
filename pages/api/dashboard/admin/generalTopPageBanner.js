import {
  createNewData,
  deleteDataAll,
  updateDataByAny,
  deleteDataByAny,
} from "@/services/serviceOperations";

export default async function handler(req, res) {
  const tableName = "Banner";

  // Post işlemi için API endpoint'i
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

  // PUT işlemi için güncelleme endpoint'i
  if (req.method === "PUT") {
    try {
      const { id, ...updatedData } = req.body;

      // ID kontrolü
      if (!id) {
        return res.status(400).json({
          status: "error",
          message: "Güncellenecek veri için geçerli bir ID gerekli.",
        });
      }

      // Veriyi güncelle
      const updatedBanner = await updateDataByAny(
        "Banner",
        { id },
        updatedData
      );

      return res.status(200).json({
        status: "success",
        message: "Banner başarıyla güncellendi.",
        data: updatedBanner,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

// DELETE işlemi için API endpoint'i
if (req.method === "DELETE") {
  try {
    const { id, role } = req.body;

    // Admin yetkisi kontrolü
    if (!role || role !== "admin") {
      return res.status(403).json({
        status: "error",
        message: "Yetkisiz erişim. Admin rolü gerekli.",
      });
    }

    // ID kontrolü
    if (!id) {
      return res.status(400).json({
        status: "error",
        message: "Silme işlemi için geçerli bir ID gerekli.",
      });
    }

    // Veriyi silme
    const deletedBanner = await deleteDataByAny("Banner", { id });

    return res.status(200).json({
      status: "success",
      message: "Banner başarıyla silindi.",
      data: deletedBanner,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}
