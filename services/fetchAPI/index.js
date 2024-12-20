export const postAPI = async (
  URL,
  body,
  method = "POST",
  headers = { "Content-Type": "application/json" }
) => {
  try {
    if (!process.env.NEXT_PUBLIC_API_URL || !URL) {
      throw new Error("URL bulunamadı!");
    }
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL + URL}`, {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
      cache: "no-store",
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    return data;
  } catch (err) {
    throw new Error(`API isteği başarısız: ${err}`);
  }
};

export const getAPI = async (
  URL,
  headers = { "Content-Type": "application/json" }
) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL + URL}`, {
    method: "GET",
    headers: headers,
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return data;
};
