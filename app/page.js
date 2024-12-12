"use client"
import { useState, useEffect, use } from "react";
import { getAPI, postAPI } from "./api/fetchAPI";

const GeneralBanner = () => {
  const [bannerData, setBannerData] = useState({
    mainText: "",
    mainTextColor: "",
    underText: "",
    underTextColor: "",
    buttonColor: "",
    backgroundColor: "",
  });

  useEffect(() => {
    const fetchBannerData = async () => {
      const response = await getAPI("/api/banner");
      setBannerData(response.data);
    };
    fetchBannerData();
  }, []);

  const handleUpdate = async () => {
    await postAPI("/api/banner", bannerData);
    // Başarılı güncelleme için bir bildirim gösterilebilir
  };

  return (
    <div>
      <h1>General Banner</h1>
      <p>Main Text: {bannerData.mainText}</p>
      <p>Main Text Color: {bannerData.mainTextColor}</p>
      <p>Under Text: {bannerData.underText}</p>
      <p>Under Text Color: {bannerData.underTextColor}</p>
      <p>Button Color: {bannerData.buttonColor}</p>
      <p>Background Color: {bannerData.backgroundColor}</p>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default function Home() {
  return <GeneralBanner />;
}
