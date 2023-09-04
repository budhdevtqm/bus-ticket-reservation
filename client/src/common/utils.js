export const verifyStatus = (status, navigate) => {
  if (status === 401 || status === 498 || status === 500) {
    navigate("/login");
  }

  if (status === 403) {
    navigate("/home");
  }
};

export const handler = () => {};
