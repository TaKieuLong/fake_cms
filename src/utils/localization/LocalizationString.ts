import LocalizedStrings from "react-localization";

const LocalizationString = new LocalizedStrings({
  vn: {
    search: "Tra cứu",
    All: "Tất cả",
    typeApi: {
      rechargeFee: "Nạp cước",
      manageRechargeFee: "Quản lý nạp cước",
    },
    network: {
      Viettel: "Viettel",
      VNMobile: "VNMobile",
      Vinaphone: "Vinaphone",
      Mobifone: "Mobifone",
    },
    subscription: {
      name: "Thuê bao",
      Prepay: "Trả trước",
      Postpaid: "Trả sau",
      Homephone: "Homephone",
      LineMetro: "Line/Metro",
      ADSLFTTH: "ADSL/FTTH",
      SelfRechargeUS: "Tự nạp Mỹ",
      KPP: "Nhanh KPP",
    },
    range: {
      "10": "10k",
      "20": "20K",
      "30": "30K",
      "50": "50K",
      "100": "100K",
      "200": "200K",
      "300": "300K",
      "500": "500K",
      "1000": "1000K",
    },
    statusConnection: {
      Waiting: "Chờ xử lý",
      Processing: "Đang xử lý",
      Done: "Hoàn thành",
      Cancel: "Hoàn thành (Huỷ)",
      Refund: "Hoàn tiền",
      OTP: "Yêu cầu OTP",
    },
    Part: {
      A: "asim",
      B: "crm",
      C: "cskhvp",
      D: "dvvt",
      E: "fvtopup",
    },
    Branch: {
      A: "Chi Nhánh A",
      B: "Chi nhánh B",
    },
    statusRequest: {
      Wait: "Chờ xét duyệt",
      Done: "Đã hoàn thành",
      Cancel: "Đã từ chối",
    },
    statusAccount: {
      Active: "Hoạt động",
      Lock: "Tạm khóa",
    },
    statusCashin: {
      Done: "Thành công",
      Cancel: "Không thành công",
    },
    statusCashout: {
      Done: "Đã xử lý thành công",
      Lock: "Không thành công",
      Cancel: "Đã hủy",
    },
    partCashFlow: {
      Cap1: " CẤP 1",
      asim: "asim",
      crm: "crm",
      cskhvp: "cskhvp",
      dvvt: "dvvt",
    },
    branchCashFlow: {
      cap2: "CẤP 2",
      cap3: "CẤP 3",
      cap4: "CẤP 4",
    },
    typeCashFlow: {
      hoahong: "HOA HỒNG",
      ck: "CHUYỂN TIỀN",
      nap: "NẠP TIỀN",
      rut: "RÚT TIỀN",
      bantien: "BẮN TIỀN",
      k: "GIA HẠN K+",
      avg: "GIA HẠN AVG",
      sms: "GIA HẠN SMG",
      napcuoc: "NẠP CƯỚC",
      tracuoc: "TRA CƯỚC",
      doithe: "ĐỔI THẺ",
      vas: "VAS-MOBI",
      tkc: "RÚT TKC",
    },
    typeParameters: {
      so: "Kiểu số",
      chu: "Kiểu chữ",
    },
    parameters: {
      hethong: "HỆ THỐNG",
      doi: "ĐỔI THẺ",
      nap: "NẠP CƯỚC",
    },
    selectedSubscription: {
      all: "-- Thuê bao --",
      tratruoc: "Trả trước (100%)",
      trasau: "Trả sau (DĐ/HP) (100%)",
      napnhanh: "Nạp nhanh KPP (100%)",
    },
    errorMessage: "Đã xảy ra lỗi vui lòng thử lại!!!",
  },
});

export default LocalizationString;
