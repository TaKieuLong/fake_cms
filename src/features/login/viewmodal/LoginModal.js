import { useState } from "react";
import { login } from "../../../api/app/app";
import { useAuth } from "../../../global/context/AuthenticationContext";
import { notification } from "antd";

export const useLoginModal = () => {
  const { onLogin } = useAuth();
  const [isLoading, setIsLoading] = useState(Boolean);

  const handleSubmit = async (identifier, password) => {
    try {
      setIsLoading(true);
      const response = await login({ identifier, password });

      if (response?.code === 1) {
        onLogin(response.data);
        notification.success({
          message: "Đăng nhập thành công !",
        });
      } else {
        notification.error({
          message: `${response.mess}`,
        });
      }
    } catch (error) {
      notification.error({
        message: "Đăng nhập không thành công !",
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
