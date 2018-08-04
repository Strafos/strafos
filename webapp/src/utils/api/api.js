// API calls

export const getArticles = async () => {
  const response = await fetch("/articles", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const body = await response.json();

  if (response.status !== 200) throw Error(body.message);

  return body;
};
