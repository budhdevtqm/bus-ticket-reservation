import { useNavigate } from "react-router-dom";

export const verifyStatus = (status, navigate) => {
  if (status === 401 || status === 498 || status === 500) {
    navigate("/");
    return;
  }

  if (status === 403) {
    navigate("/");
    return;
  }
};
