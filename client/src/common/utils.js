import { useNavigate } from "react-router-dom";

export const verifyStatus = (status) => {
  const navigate = useNavigate();

  if (status === 401 || status === 498 || status === 500) {
    navigate("/auth");
    return;
  }

  if (status === 403) {
    navigate("/");
    return;
  }
};
