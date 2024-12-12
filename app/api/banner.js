import { NextApiRequest, NextApiResponse } from "next";
import {
  getAllData,
  createNewData,
  deleteDataAll,
} from "@/services/serviceOperations";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const data = await getAllData("GeneralTopPageBanner");

      if (!data || data.length === 0) {
        return res
          .status(404)
          .json({ status: "error", message: "Banner verisi bulunamadı" });
      }

      return res.status(200).json({ status: "success", data: data[0] });
    } catch (error) {
      return res.status(500).json({ status: "error", error: error.message });
    }
  }

  if (req.method === "POST") {
    try {
      // Önce mevcut bannerları sil
      await deleteDataAll("GeneralTopPageBanner");

      // Yeni banner oluştur
      const newBanner = await createNewData("GeneralTopPageBanner", req.body);

      return res.status(200).json({
        status: "success",
        message: "Banner başarıyla güncellendi",
        data: newBanner,
      });
    } catch (error) {
      return res.status(500).json({ status: "error", error: error.message });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} İzin Verilmedi`);
}
