// API calls
// server.js: API endpoints
// database.js: sqlite3 interface

export const createSprint = async requestObj => {
  const response = await fetch("/sprint", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestObj)
  });
  const body = await response.json();

  if (response.status !== 200) throw Error(body.message);

  return body;
};

export default {
  createSprint
};
