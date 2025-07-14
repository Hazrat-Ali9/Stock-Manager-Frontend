import axios from "axios";
import { toast } from "react-toastify";
let tenantID = localStorage.getItem("tenantId");
export const editCategory = (data, history, id, setSuccess) => {
  axios
    .put(`https://stock-manager-backend-indol.vercel.app/API/categories/${id}`, data)
    .then((res) => {
      toast.success("Category Updated Successfully");
      setSuccess(true);
      history.push("/category");
    })
    .then((error) => toast.error("Category Update Failed"));
};
export const getCategory = (id, setData) => {
  debugger;
  axios
    .get(`https://stock-manager-backend-indol.vercel.app/API/categories/tenant/${id}`, id)
    .then((res) => {
      debugger;
      
      setData(res.data);
    })
    .then((error) => console.error(error));
};
