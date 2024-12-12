import { NextApiRequest, NextApiResponse } from "next";
import {
  getAllData,
  createNewData,
  deleteDataAll,
} from "@/services/serviceOperations";

export default async function handler(req, res) {
  const tableName = "GeneralTopPageBanner";

  try {
    if (req.method === "GET") {
      const data = await getAllData(tableName);
      if (!data || data.length === 0) {
        return res.status(404).json({
          status: "error",
          message: "Banner verisi bulunamadı.",
        });
      }
      return res.status(200).json({
        status: "success",
        data: data,
      });
    }

    if (req.method === "POST") {
      const body = req.body;

      if (!body) {
        return res.status(400).json({
          status: "error",
          message: "Geçersiz istek. Veriler eksik.",
        });
      }

      // Eski banner verilerini sil.
      await deleteDataAll(tableName);

      // Yeni banner oluştur.
      const newBanner = await createNewData(tableName, body);

      return res.status(201).json({
        status: "success",
        message: "Banner başarıyla güncellendi.",
        data: newBanner,
      });
    }

    // Desteklenmeyen metodlar
    res.setHeader("Allow", ["GET", "POST"]);
    return res
      .status(405)
      .json({
        status: "error",
        message: `Metod ${req.method} desteklenmiyor.`,
      });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Sunucu hatası: " + error.message,
    });
  }
}
