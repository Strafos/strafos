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

export const createArticle = async url => {
  const response = await fetch("/article", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url, createdAt: new Date().toISOString() }),
  });
  const body = await response.json();

  if (response.status !== 200) throw Error(body.message);

  return body;
};

export const updateArticle = async (id, requestObj) => {
  const response = await fetch(`/article/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestObj),
  });
  const body = await response.json();

  if (response.status !== 200) throw Error(body.message);

  return body;
};
