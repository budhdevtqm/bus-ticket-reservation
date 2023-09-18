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

export const notification = (type, message) => {
  if (type === "success" && message) {
    toast.success(message, { position: "top-right" });
  }
  if (type === "error" && message) {
    toast.error(message, { position: "top-right" });
  }
};

export const beforeDelete = {
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!",
};

export const deleteSuccess = {
  title: "Deleted.",
  icon: "success",
};

export const deleteError = {
  title: "Unable to Delete.",
  text: "Something went wrong.",
  icon: "error",
};

export const getTime = (milliseconds) => {
  const timeString = new Date(milliseconds - 19800000).toLocaleTimeString();
  const [h, m] = timeString.split(":");
  return `${h} : ${m}`;
};

export const getDate = (milliseconds) => {
  const dateString = new Date(milliseconds - 19800000).toLocaleDateString();
  const [date, month, year] = dateString.split("/");
  console.log(dateString, "date-str");

  // switch (key) {
  //   case value:
  //     break;
  //   default:
  //     break;
  // }

  return `${date} `;
};
