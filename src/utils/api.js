const BASE_URL = "http://localhost:3001";
const checkRes = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};
const getItems = () => {
  return fetch(`${BASE_URL}/items`).then(checkRes);
};
const addItem = ({ name, imageUrl, weather }) => {
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkRes);
};
const deleteItem = (_id) => {
  return fetch(`${BASE_URL}/items/${_id}`, {
    method: "DELETE",
  }).then(checkRes);
};
export { checkRes, getItems, addItem, deleteItem };
