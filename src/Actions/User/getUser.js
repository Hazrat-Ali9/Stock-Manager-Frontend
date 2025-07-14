import axios from "axios";
import { toast } from "react-toastify";

export const activateInActiveUser = (data, setRowdata) => {
  debugger;
  axios
    .put(
      `https://stock-manager-backend-indol.vercel.app/API/users/${
        data.id ? `deactivate/${data.id}` : "Reactivate"
      }`,
      data.email ? data.email : { email: data }
    )
    .then((res) => {
      debugger;
      getAllUser(setRowdata);
      toast.success(res.data.message);
    })
    .then((error) => console.error(error));
};

export const getAllUser = (setRowdata) => {
  debugger;
  axios
    .get("https://stock-manager-backend-indol.vercel.app/API/users")
    .then((res) => {
      debugger;
      setRowdata(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
};
