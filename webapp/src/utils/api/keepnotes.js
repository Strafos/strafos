// API calls

export const getKeepnotes = async () => {
  const response = await fetch("/keepnotes", {
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

export const createKeepnote = async requestObj => {
  const response = await fetch("/keepnote", {
    method: "POST",
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

export const updateKeepnote = async (id, requestObj) => {
  const response = await fetch(`/keepnote/${id}`, {
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

export const deleteKeepnote = async id => {
  const response = await fetch(`/keepnote/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const body = await response.json();

  if (response.status !== 200) throw Error(body.message);

  return body;
};
