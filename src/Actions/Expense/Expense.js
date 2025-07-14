import axios from "axios";
import { toast } from "react-toastify";
export const editExpense = (data, history, id, setSuccess) => {
  axios
    .put(`https://stock-manager-backend-indol.vercel.app/API/expense/${id}`, data)
    .then((res) => {
      toast.success(res.data.message);
      setSuccess(true);
      history.push("/category");
    })
    .then((error) => toast.error("Expense Update Failed"));
};
export const getExpense = (id, setData) => {
  debugger;
  axios
    .get(`https://stock-manager-backend-indol.vercel.app/API/expense/${id}`, id)
    .then((res) => {
      debugger;
      toast.success(res.data.message);
      setData(res.data);
    })
    .then((error) => console.error(error));
};
