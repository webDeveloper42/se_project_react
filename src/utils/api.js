const BASE_URL = "http://localhost:3001";
const checkRes = async (res) => {
  if (res.ok) {
    return res.json();
  }

  const contentType = res.headers.get("content-type") || "";

  let message = `Error ${res.status}`;
  try {
    if (contentType.includes("application/json")) {
      const data = await res.json();
      message = data.message || JSON.stringify(data);
    } else {
      const text = await res.text();
      if (text) message = text;
    }
  } catch (err) {
    // fallback to status-only message
  }

  return Promise.reject(`Error ${res.status}: ${message}`);
};
const getItems = () => {
  return fetch(`${BASE_URL}/items`).then(checkRes);
};
const addItem = ({ name, imageUrl, weather, id, _id }) => {
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, imageUrl, weather, id, _id }),
  }).then(checkRes);
};
const deleteItem = (_id) => {
  return fetch(`${BASE_URL}/items/${_id}`, {
    method: "DELETE",
  }).then(checkRes);
};
export { checkRes, getItems, addItem, deleteItem };
