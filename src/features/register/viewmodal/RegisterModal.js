import { notification } from "antd";
import { useState } from "react";
import { register } from "../../../api/app/app";

export const useRegisterModal = () => {
  const [isLoading, setIsLoading] = useState(Boolean);

  const handleSubmit = async (email, password) => {
    try {
      setIsLoading(true);
      const response = await register({ email, password });

      if (response?.code === 0) {
        notification.success({
          message: "Đăng ký thành công !",
        });
      } else {
        notification.error({
          message: `${response.mess}`,
        });
      }
    } catch (error) {
      notification.error({
        message: "Đăng ký không thành công !",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleSubmit,
  };
};
