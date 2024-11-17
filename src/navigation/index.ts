import { AiOutlineSchedule } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { CiLogin } from "react-icons/ci";
import { FaDoorOpen } from "react-icons/fa";
import { FaHotel } from "react-icons/fa6";
import { GoHistory, GoPerson } from "react-icons/go";
import { IoHomeOutline, IoNewspaperOutline, IoSettingsOutline } from "react-icons/io5";
import { MdOutlineEmail, MdOutlinePercent, MdPeopleAlt, MdSaveAlt } from "react-icons/md";
import { RiNotification2Line } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import { TbLogout } from "react-icons/tb";
import { TiThMenu } from "react-icons/ti";
import { PiInvoice } from "react-icons/pi";
class Route {
  constructor(
    public key: string,
    public title: string,
    public path: string,
    public icon: any
  ) {}
}

const ROUTES = {
  HOME: new Route("/", "Tổng quan", "/", IoHomeOutline),
  ABOUT: new Route("about", "Về chúng tôi", "about", IoNewspaperOutline),
  CONTACT: new Route("contact", "Liên hê", "contact", MdOutlineEmail),

  SIGNUP: new Route("register", "Đăng ký", "register", MdSaveAlt),
  SIGNIN: new Route("login", "Đăng nhập", "login", CiLogin),
  RECEIVECODE: new Route("receive-code", "Mã xác minh", "receive-code", ""),
  CONFIRMCODE: new Route("confirm-code", "Xác minh", "confirm-code", ""),
  RESETPASSWORD: new Route(
    "reset-password",
    "Đặt mật khẩu mới",
    "reset-password",
    ""
  ),
  SIGN_OUT: new Route("sign-out", "Đăng xuất", "sign-out", TbLogout),

  //check
  MANAGER: new Route("manager", "Quản lý", "manager", TiThMenu),
  ROOM: new Route("manager-room", "Phòng", "manager-room", FaDoorOpen),
  HOTEL: new Route("manager-hotel", "Lưu trú", "manager-hotel", FaHotel),
  ACCOUNT: new Route(
    "manager-account",
    "Nhân sự",
    "manager-account",
    MdPeopleAlt
  ),
  CONFIG: new Route("config", "Cấu hình", "config", IoSettingsOutline),
  DISCOUNT: new Route(
    "config-discount",
    "Mã giảm giá",
    "config-discount",
    MdOutlinePercent
  ),
  HOLIDAY: new Route("config-holiday", "Ngày lễ", "config-holiday", SlCalender),
  BOOKING: new Route(
    "config-booking",
    "Đặt phòng",
    "config-booking",
    AiOutlineSchedule
  ),
  INVOICE: new Route("history-invoice", "Hóa đơn", "history-invoice", PiInvoice),
  HISTORY: new Route("history", "Lịch sử", "history", GoHistory),

  NOTI: new Route(
    "history-noti",
    "Thông báo",
    "history-noti",
    RiNotification2Line
  ),

  SETTING: new Route("setting", "Cá nhân", "setting", CgProfile),
  PROFILE: new Route("profile", "Thông tin cá nhân", "profile", GoPerson),
};

export default ROUTES;
