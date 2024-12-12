// GET /api/banner
export default async function handler(req, res) {
  if (req.method === "GET") {
    const bannerData = {
      mainText: "Welcome to our website!",
      mainTextColor: "#000000",
      underText: "Explore our features",
      underTextColor: "#333333",
      buttonColor: "#0070f3",
      backgroundColor: "#f0f0f0",
    };
    res.status(200).json(bannerData);
  } else if (req.method === "POST") {
    // Gelen POST isteğinden veriyi alıp güncelle
    const {
      mainText,
      mainTextColor,
      underText,
      underTextColor,
      buttonColor,
      backgroundColor,
    } = req.body;
    // Burada veri tabanı işlemleri gerçekleştirilir
    res.status(200).json({ message: "Banner updated successfully" });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
