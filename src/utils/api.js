const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "put the URL for your deployed backend here, including https://"
    : "https://api.whyWeatherWhy.twilightparadox.com";

const checkRes = async (res) => {
  if (res.ok) {
    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      return res.json();
    }
    return res.text();
  }

  const contentType = res.headers.get("content-type") || "";
  let message = `Error ${res.status}`;

  if (contentType.includes("application/json")) {
    try {
      const data = await res.json();
      message = data.message || JSON.stringify(data);
    } catch (err) {
      message = `Response body is not valid JSON`;
    }
  } else {
    try {
      const text = await res.text();
      if (text) message = text;
    } catch (err) {
      /* ignore */
    }
  }

  return Promise.reject(`Error ${res.status}: ${message}`);
};

const getItems = () => {
  return fetch(`${BASE_URL}/items`).then(checkRes);
};

const addItem = ({ name, imageUrl, weather }, token) => {
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkRes);
};

const deleteItem = (_id, token) => {
  return fetch(`${BASE_URL}/items/${_id}`, {
    method: "DELETE",
    headers: { authorization: `Bearer ${token}` },
  }).then(checkRes);
};

const updateUser = ({ name, avatar }, token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(checkRes);
};

const addCardLike = (_id, token) => {
  return fetch(`${BASE_URL}/items/${_id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkRes);
};

const removeCardLike = (_id, token) => {
  return fetch(`${BASE_URL}/items/${_id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkRes);
};

export {
  checkRes,
  getItems,
  addItem,
  deleteItem,
  updateUser,
  addCardLike,
  removeCardLike,
};
