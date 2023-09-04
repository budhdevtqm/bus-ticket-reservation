const BASE_URL = "http://localhost:4000";

const authToken = localStorage.getItem("token");

const headerConfig = {
  headers: { authorization: `Bearer ${authToken}` }
};

export { BASE_URL, headerConfig };
