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
  let m = "";

  switch (Number(month)) {
    case 1:
      m = "Jan";
      break;
    case 2:
      m = "Feb";
      break;
    case 3:
      m = "Mar";
      break;
    case 4:
      m = "Apr";
      break;
    case 5:
      m = "May";
      break;
    case 6:
      m = "Jun";
      break;
    case 7:
      m = "Jul";
      break;
    case 8:
      m = "Aug";
      break;
    case 9:
      m = "Sep";
      break;
    case 10:
      m = "Oct";
      break;
    case 11:
      m = "Nov";
      break;
    case 12:
      m = "Dec";
      break;
    default:
      m = "";
      break;
  }

  return `${m} ${date}, ${year}`;
};
