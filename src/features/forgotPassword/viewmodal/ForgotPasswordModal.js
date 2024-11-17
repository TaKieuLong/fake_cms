import {
    resendcode,
    confirmcode,
    resetpassword,
  } from "../../../api/app/app";
  import { useState } from "react";
  import { notification } from "antd";
  
  export const useReceiveCodeModal = () => {
    const [isLoading, setIsLoading] = useState(false);
  
    //hàm đổi mật khẩu mới
    const handleResetPassword = async (identifier, password) => {
      try {
        setIsLoading(true);
        const response = await resetpassword(identifier, password);
  
        if (response?.code === 1) {
          notification.success({
            message: `${response.mess}`,
          });
          return true
        } else {
          notification.error({
            message: `${response.mess}`,
          });
          return false
        }
      } catch (error) {
        notification.error({
          message: "Đã xảy ra lỗi! Vui lòng thử lại.",
        });
        return false
      } finally {
        setIsLoading(false);
      }
    };
    //hàm  xác thực code
    const handleClickConfirm = async (email, code) => {
      try {
        setIsLoading(true);
        const response = await confirmcode({ email, code });
  
        if (response?.code === 1) {
          notification.success({
            message: `${response.mess}`,
          });
          return true
        } else {
          notification.error({
            message: `${response.mess}`,
          });
          return false
        }
      } catch (error) {
        notification.error({
          message: "Mã xác thực không hợp lệ",
        });
        return false
      } finally {
        setIsLoading(false);
      }
    };
    //hàm send code
    const handleClickResend = async (identifier) => {
      try {
        setIsLoading(true);
        const response = await resendcode({ identifier });
        if (response?.code === 1) {
          notification.success({
            message: "Mã xác minh đã được gửi!",
          });
          return true
        } else {
          notification.error({
            message: `${response.mess}`,
          });
          return false
        }
      } catch (error) {
        notification.error({
          message: "Người dùng không tồn tại.",
        });
        return false
      } finally {
        setIsLoading(false);
      }
    };
  
    return {
      isLoading,
      handleClickResend,
      handleClickConfirm,
      handleResetPassword,
    };
  };
  