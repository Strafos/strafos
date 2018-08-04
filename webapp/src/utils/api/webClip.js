export const webClip = async url => {
  const response = await fetch("/readerView", {
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
