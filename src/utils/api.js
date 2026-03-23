const BASE_URL = "http://localhost:3001";

const getItems = () => {
  return fetch(`${BASE_URL}/items`).then((res) =>
    res.ok ? res.json() : Promise.reject(`Error: ${res.status}`),
  );
};
const addItem = ({ name, imageUrl, weather }) => {
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Error: ${res.status}`),
  );
};
const deleteItem = (_id) => {
  return fetch(`${BASE_URL}/items/${_id}`, {
    method: "DELETE",
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Error: ${res.status}`),
  );
};
export { getItems, addItem, deleteItem };
