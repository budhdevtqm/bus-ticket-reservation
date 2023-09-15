import { toast } from "react-hot-toast";

export const verifyStatus = (status, navigate) => {
  if (status === 401 || status === 498 || status === 500) {
    localStorage.removeItem("token");
    localStorage.removeItem("permissons");
    navigate("/login");
  }

  if (status === 403) {
    navigate("/home");
  }
};

export const handler = () => { };

export const notification = (type, message) => {
  if (type === "success" && message) {
    toast.success(message, { position: "top-right" });
  }
  if (type === "error" && message) {
    toast.error(message, { position: "top-right" });
  }
};
