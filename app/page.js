"use client";
import { useState, useEffect } from "react";
import { getAPI, postAPI } from "../services/fetchAPI/index";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Anasayfa() {
  const [bannerVerisi, setBannerVerisi] = useState({
    mainText: "",
    mainTextColor: "#000000",
    underText: "",
    underTextColor: "#333333",
    buttonColor: "#0070f3",
    backgroundColor: "#f0f0f0",
    isActive: true,
  });

  useEffect(() => {
    const bannerVerisiniCek = async () => {
      try {
        const yanit = await getAPI("/other/generalTopPageBanner");
        if (yanit.data && yanit.data[0]) {
          setBannerVerisi(yanit.data[0]); // Veriyi burada düzgün bir şekilde ayarlıyoruz
        } else {
          toast.error("Banner verisi alınamadı");
        }
      } catch (hata) {
        toast.error("Banner verisi alınırken hata oluştu");
      }
    };
    bannerVerisiniCek();
  }, []);

  const guncellemeIslemi = async () => {
    try {
      const yanit = await postAPI("/dashboard/admin/generalTopPageBanner", {
        ...bannerVerisi,
        role: "admin", // API işleyicisi için gerekli
      });

      if (yanit.status === "success") {
        toast.success("Banner başarıyla güncellendi!");
      } else {
        toast.error(yanit.error || "Güncelleme başarısız");
      }
    } catch (hata) {
      toast.error("Banner güncellenirken bir hata oluştu");
    }
  };

  const girdiDegisikliginiIşle = (e) => {
    const { name, value } = e.target;
    setBannerVerisi((onceki) => ({
      ...onceki,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Genel Banner Yapılandırması</h1>

      <div className="space-y-4">
        <input
          name="mainText"
          value={bannerVerisi.mainText}
          onChange={girdiDegisikliginiIşle}
          placeholder="Ana Metin"
          className="w-full p-2 border rounded"
        />
        <input
          name="mainTextColor"
          type="color"
          value={bannerVerisi.mainTextColor}
          onChange={girdiDegisikliginiIşle}
          className="w-full p-2 border rounded"
        />
        <input
          name="underText"
          value={bannerVerisi.underText}
          onChange={girdiDegisikliginiIşle}
          placeholder="Alt Metin"
          className="w-full p-2 border rounded"
        />
        <input
          name="underTextColor"
          type="color"
          value={bannerVerisi.underTextColor}
          onChange={girdiDegisikliginiIşle}
          className="w-full p-2 border rounded"
        />
        <input
          name="buttonColor"
          type="color"
          value={bannerVerisi.buttonColor}
          onChange={girdiDegisikliginiIşle}
          className="w-full p-2 border rounded"
        />
        <input
          name="backgroundColor"
          type="color"
          value={bannerVerisi.backgroundColor}
          onChange={girdiDegisikliginiIşle}
          className="w-full p-2 border rounded"
        />

        <button
          onClick={guncellemeIslemi}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Banner'ı Güncelle
        </button>
      </div>
    </div>
  );
}
