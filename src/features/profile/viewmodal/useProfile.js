import { useState } from "react";
import { message, notification } from "antd";
import {
  addIMG,
  updateuser,
  verifyemail,
  resetpassword,
  resendcode,
} from "../../../api/app/app.js";
import { useAuth } from "../../../global/context/AuthenticationContext";
import Format from "../../../utils/format/Format.ts";
import VerifyEmailForm from "../modal/VerifyEmailForm.jsx";
import ChangePasswordForm from "../modal/ChangePasswordForm.jsx";
import modalDraft from "../../../components/foundation/modal/BaseModal.jsx";
import { useNavigate } from "react-router-dom";
import { useModal } from "@ebay/nice-modal-react";

const useProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { profile, loading, updateProfile } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState();
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const verifyEmailModal = useModal(modalDraft);
  const changePasswordModal = useModal(modalDraft);

  const handleShowChangePasswordlModal = () => {
    changePasswordModal
      .show({
        title: "Đổi mật khẩu",
        children: <ChangePasswordForm />,
        footer: [
          {
            title: "Xác nhận",
            htmlType: "submit",
            type: "primary",
          },
          {
            title: "Đóng",
            type: "default",
          },
        ],
      })
      .then((values) => {
        handleSubmitChangePassword(values);
      })
      .catch((e) => {});
  };

  const handleShowVerifyEmailModal = (email) => {
    verifyEmailModal
      .show({
        title: "Xác thực tài khoản",
        children: <VerifyEmailForm email={email} />,
        footer: [
          {
            title: "Gửi mã",
            htmlType: "submit",
            type: "primary",
          },
          {
            title: "Đóng",
            type: "default",
          },
        ],
        onSubmit: handleSendVerificationEmail,
      })
      .catch((e) => {});
  };

  const handleSendVerificationEmail = async (values) => {
    const token = values.code;
    try {
      setIsLoading(true);
      const response = await verifyemail(token);
      if (response?.code === 1) {
        const userInfo = JSON.parse(localStorage.getItem("profile"));
        if (userInfo) {
          userInfo.verified = true;
          localStorage.setItem("profile", JSON.stringify(userInfo));
        }
        notification.success({
          message: `${response.mess}`,
        });
        window.location.reload();
      } else {
        notification.error({
          message: `${response.mess}`,
        });
      }
    } catch (error) {
      console.error("Error during verify email:", error);
      notification.error({
        message: "Đã xảy ra lỗi! Vui lòng thử lại.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  //hàm cập nhật user
  const handleFinish = async (values) => {
    const updatedValues = {
      Name: values.name,
      PhoneNumber: values.phone,
      Avatar: avatarUrl || profile.avatar,
      Gender: values.gender,
      DateOfBirth: Format.formatDateYear(values.birthDate),
    };
    try {
      const response = await updateuser(updatedValues);
      if (response.code === 1) {
        updateProfile(response.data);
        message.success("Cập nhật thành công");
        navigate("/profile");
      } else {
        message.error("Cập nhật thất bại");
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi khi cập nhật thông tin.");
    }
  };
  //hàm upload avatar
  const handleUpload = async (file) => {
    setLoadingAvatar(true);
    try {
      const response = await addIMG(file);
      if (response) {
        setAvatarUrl(response.url);
        notification.success({
          message: `${response.message}`,
        });
      } else {
        notification.success({
          message: `${response.message}`,
        });
      }
    } catch (error) {
      message.error("Upload thất bại.");
    } finally {
      setLoadingAvatar(false);
    }
  };
  //hàm đổi mật khẩu
  const handleSubmitChangePassword = async (values) => {
    const identifier = profile.email;
    const password = values.newPassword;

    const data = {
      identifier,
      password,
    };
    setIsLoading(true);
    try {
      const response = await resetpassword(data);

      if (response?.code === 1) {
        notification.success({
          message: `${response.mess}`,
        });
      } else {
        notification.error({
          message: `${response.mess}`,
        });
      }
    } catch (error) {
      console.error("Error during reset password:", error);
      notification.error({
        message: "Đã xảy ra lỗi! Vui lòng thử lại.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  //hàm resend code
  const handleClickResend = async (identifier) => {
    try {
      setIsLoading(true);
      const response = await resendcode({ identifier });

      if (response?.code === 1) {
        notification.success({
          message: "Mã xác minh đã được gửi!",
        });
      } else {
        notification.error({
          message: `${response.mess}`,
        });
      }
    } catch (error) {
      console.error("Error during resend:", error);
      notification.error({
        message: "Đã xảy ra lỗi! Vui lòng thử lại.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    loading,
    profile,
    avatarUrl,
    loadingAvatar,
    handleFinish,
    handleUpload,
    handleClickResend,
    handleShowVerifyEmailModal,
    handleShowChangePasswordlModal,
  };
};

export default useProfile;
