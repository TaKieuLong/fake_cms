import api from "..";
import { API_PATH } from "../client/apiConfig";

//login
export const login = async (props) => {
  return await api.post(API_PATH.LOGIN, props);
};

export const allbanks = async () => {
  return await api.get(API_PATH.ALLBANKS);
};

export const updateuser = async (props) => {
  return await api.put(API_PATH.UPDATEUSER, props);
};

export const verifyemail = async (token) => {
  const url = API_PATH.VERIFY_EMAIL(token);
  return await api.get(url);
};

export const resetpassword = async (props) => {
  return await api.post(API_PATH.RESETPASSWORD, props);
};

export const confirmcode = async (props) => {
  return await api.post(API_PATH.CONFIRMCODE, props);
};

export const resendcode = async (props) => {
  return await api.post(API_PATH.RESENDCODE, props);
};

export const register = async (props) => {
  return await api.post(API_PATH.REGISTER, props);
};

export const getUser = async (props) => {
  return await api.get(API_PATH.GETUSER, { params: { ...props } });
};

export const ChangeUserStatus = async (props) => {
  return await api.put(API_PATH.USERSTATUS, props);
};

export const CreateUser = async (props) => {
  return await api.post(API_PATH.CREATEUSER, props);
};

export const CreateHotel = async (props) => {
  return await api.post(API_PATH.CREATEHOTEL, props);
};

export const CreateBooking = async (props) => {
  return await api.post(API_PATH.BOOKING, props);
};

export const UpdateHotel = async (props) => {
  return await api.put(API_PATH.UPDATEHOTEL, props);
};

export const getHotel = async (props) => {
  return await api.get(API_PATH.GETHOTEL, { params: { ...props } });
};

export const getRoom = async (props) => {
  return await api.get(API_PATH.GETROOM, { params: { ...props } });
};

export const CreateRoom = async (props) => {
  return await api.post(API_PATH.CREATEROOM, props);
};

export const addIMG = async (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile);
  try {
    const response = await api.post(API_PATH.ADDIMG, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const logout = async () => {
  return await api.delete(API_PATH.LOGOUT);
};

export const getRoomDetail = async (id) => {
  const url = API_PATH.GETDETAIL.replace(":id", id);
  return await api.get(url);
};

export const ChangeRoomStatus = async (props) => {
  return await api.put(API_PATH.STATUSROOM, props);
};

export const UpdateRoom = async (props) => {
  return await api.put(API_PATH.UPDATEROOM, props);
};
export const ChangeHotelStatus = async (props) => {
  return await api.put(API_PATH.STATUSHOTEL, props);
};

export const getAccommodationDetail = async (id) => {
  const url = API_PATH.GETHOTELDETAIL.replace(":id", id);
  return await api.get(url);
};

export const getBenefits = async () => {
  return await api.get(API_PATH.GETBENEFITS);
};

export const createBenefits = async (props) => {
  return await api.post(API_PATH.CREATEBENEFITS, props);
};

export const getHoliday = async (props) => {
  return await api.get(API_PATH.GETHOLIDAY, { params: { ...props } });
};

export const CreateHoliday = async (props) => {
  return await api.post(API_PATH.CREATEHOLIDAY, props);
};

export const UpdateHoliday = async (props) => {
  return await api.put(API_PATH.UPDATEHOLIDAY, props);
};

export const getHolidayDetail = async (id) => {
  const url = API_PATH.GETHOLIDAYDETAIL.replace(":id", id);
  return await api.get(url);
};
export const DeleteHoliday = async (data) => {
  return await api.delete(API_PATH.DELETEHOLIDAY, { data });
};
export const getDiscount = async (props) => {
  return await api.get(API_PATH.GETDISCOUNT, { params: { ...props } });
};

export const CreateDiscount = async (props) => {
  return await api.post(API_PATH.CREATEDISCOUNT, props);
};

export const UpdateDiscount = async (props) => {
  return await api.put(API_PATH.UPDATEDISCOUNT, props);
};

export const getDiscountDetail = async (id) => {
  const url = API_PATH.GETDISCOUNTDETAIL.replace(":id", id);
  return await api.get(url);
};
export const ChangeDiscountStatus = async (props) => {
  return await api.put(API_PATH.STATUSDISCOUNT, props);
};

export const getOrder = async (props) => {
  return await api.get(API_PATH.GETORDER, { params: { ...props } });
};

export const orderStatus = async (props) => {
  return await api.put(API_PATH.ORDERSTATUS, props);
};

export const CreateOrder = async (props) => {
  return await api.post(API_PATH.CREATEORDER, props);
};

export const UpdateOrderStatus = async (props) => {
  return await api.put(API_PATH.UPDATEORDER, props);
};

export const paymentStatus = async (props) => {
  return await api.put(API_PATH.PAYSTATUS, props);
};

export const getOrderDetail = async (id) => {
  const url = API_PATH.GETORDERDETAIL.replace(":id", id);
  return await api.get(url);
};

export const getRevenue = async () => {
  return await api.get(API_PATH.REVENUE);
};

export const getInvoice = async (props) => {
  return await api.get(API_PATH.GETINVOICE, { params: { ...props } });
};
export const getInvoiceDetail = async (id) => {
  const url = API_PATH.GETINVOICEDETAIL.replace(":id", id);
  return await api.get(url);
};
