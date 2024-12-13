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
    if (!bannerVerisi.id) {
      return toast.error("Güncelleme için geçerli bir ID bulunamadı.");
    }

    try {
      const yanit = await fetch("/api/dashboard/admin/generalTopPageBanner", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: bannerVerisi.id, // Güncellenecek banner'ın ID'si
          ...bannerVerisi,
          role: "admin",
        }),
      }).then((res) => res.json());

      if (yanit.status === "success") {
        toast.success("Banner başarıyla güncellendi!");
      } else {
        toast.error(yanit.error || "Güncelleme başarısız.");
      }
    } catch (hata) {
      toast.error("Banner güncellenirken bir hata oluştu.");
    }
  };
  const silmeIslemi = async () => {
    if (!bannerVerisi.id) {
      return toast.error("Silme işlemi için geçerli bir ID bulunamadı.");
    }

    if (!window.confirm("Bu banner'ı silmek istediğinizden emin misiniz?")) {
      return;
    }

    try {
      // DELETE API isteği
      const yanit = await fetch("/api/dashboard/admin/generalTopPageBanner", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: bannerVerisi.id, role: "admin" }), // Silme için gerekli veriler
      }).then((res) => res.json());

      if (yanit.status === "success") {
        toast.success("Banner başarıyla silindi!");
        setBannerVerisi({
          mainText: "",
          mainTextColor: "#000000",
          underText: "",
          underTextColor: "#333333",
          buttonColor: "#0070f3",
          backgroundColor: "#f0f0f0",
          isActive: true,
        }); // State'i sıfırla
      } else {
        toast.error(yanit.error || "Silme işlemi başarısız.");
      }
    } catch (hata) {
      toast.error("Banner silinirken bir hata oluştu.");
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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Banner Yapılandırması
        </h1>

        <div className="space-y-4">
          {/* Mevcut input alanları */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ana Metin
              </label>
              <input
                name="mainText"
                value={bannerVerisi.mainText}
                onChange={girdiDegisikliginiIşle}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <input
                name="mainTextColor"
                type="color"
                value={bannerVerisi.mainTextColor}
                onChange={girdiDegisikliginiIşle}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <input
                name="underText"
                value={bannerVerisi.underText}
                onChange={girdiDegisikliginiIşle}
                placeholder="Alt Metin"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <input
                name="underTextColor"
                type="color"
                value={bannerVerisi.underTextColor}
                onChange={girdiDegisikliginiIşle}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <input
                name="buttonColor"
                type="color"
                value={bannerVerisi.buttonColor}
                onChange={girdiDegisikliginiIşle}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <input
                name="backgroundColor"
                type="color"
                value={bannerVerisi.backgroundColor}
                onChange={girdiDegisikliginiIşle}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={guncellemeIslemi}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Güncelle
            </button>
            <button
              onClick={silmeIslemi}
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition duration-300"
            >
              Sil
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
