export const getAPI = async (
  url,
  headers = { "Content-Type": "application/json" }
) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: "GET",
    headers,
  });
  return response.json();
};

export const postAPI = async (
  url,
  body,
  headers = { "Content-Type": "application/json" }
) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  return response.json();
};
