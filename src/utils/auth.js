const BASE_URL = "http://localhost:3001";

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

const signUp = ({ name, avatar, email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkRes);
};

const logIn = ({ email, password }) => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(checkRes);
};

const getCurrentUser = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkRes);
};

export { signUp, logIn, getCurrentUser };
