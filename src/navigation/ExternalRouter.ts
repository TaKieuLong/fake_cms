import ROUTES from "./index.ts";
import SignIn from "../features/login/view/Login.jsx";
import SignUp from "../features/register/view/Register.jsx";
import ReceiveCode from "../features/forgotPassword/view/ReceiveCode.jsx";
import ConfirmCode from "../features/forgotPassword/view/ConfirmCode.jsx";
import ResetPassword from "../features/forgotPassword/view/ResetPassword.jsx";
import Home from "../features/home/view/Home.jsx";
import Profile from "../features/profile/view/profile.jsx";
import Room from "../features/room/view/Product.jsx";
import User from "../features/user/view/User.jsx";
import Hotel from "../features/hotel/view/Hotel.jsx";
import Holiday from "../features/holiday/view/Holiday.jsx";
import Discount from "../features/discount/view/Discount.jsx";
import Order from "../features/order/view/Oder.jsx";
import Invoice from "../features/invoice/view/Invoice.jsx";
export const SuperAdminRouter = [
  {
    path: "/",
    element: Home,
  },
  {
    path: ROUTES.HOTEL.path,
    element: Hotel,
  },
  {
    path: ROUTES.ROOM.path,
    element: Room,
  },
  {
    path: ROUTES.ACCOUNT.path,
    element: User,
  },
  {
    path: ROUTES.PROFILE.path,
    element: Profile,
  },
  {
    path: ROUTES.HOLIDAY.path,
    element: Holiday,
  },
  {
    path: ROUTES.INVOICE.path,
    element: Invoice,
  },
  {
    path: ROUTES.DISCOUNT.path,
    element: Discount,
  },
  {
    path: ROUTES.BOOKING.path,
    element: Order,
  },
];

export const AdminRouter = [
  {
    path: "/",
    element: Home,
  },
  {
    path: ROUTES.HOTEL.path,
    element: Hotel,
  },
  {
    path: ROUTES.ROOM.path,
    element: Room,
  },
  {
    path: ROUTES.ACCOUNT.path,
    element: User,
  },
  {
    path: ROUTES.PROFILE.path,
    element: Profile,
  },
  {
    path: ROUTES.BOOKING.path,
    element: Order,
  },
  {
    path: ROUTES.INVOICE.path,
    element: Invoice,
  },
];

export const ReceptionistRouter = [
  {
    path: "/",
    element: Home,
  },
  {
    path: ROUTES.HOTEL.path,
    element: Hotel,
  },
  {
    path: ROUTES.ROOM.path,
    element: Room,
  },
  {
    path: ROUTES.PROFILE.path,
    element: Profile,
  },
  {
    path: ROUTES.BOOKING.path,
    element: Order,
  },
  {
    path: ROUTES.INVOICE.path,
    element: Invoice,
  },
];

export const GuestRouter = [
  {
    path: "/",
    element: SignIn,
  },
  {
    path: ROUTES.SIGNUP.path,
    element: SignUp,
  },
  {
    path: ROUTES.SIGNIN.path,
    element: SignIn,
  },
  {
    path: ROUTES.RECEIVECODE.path,
    element: ReceiveCode,
  },
  {
    path: ROUTES.CONFIRMCODE.path,
    element: ConfirmCode,
  },
  {
    path: ROUTES.RESETPASSWORD.path,
    element: ResetPassword,
  },
];
