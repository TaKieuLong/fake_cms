import React, { useState, useEffect } from "react";
import { Card, Form, Input, Button, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useReceiveCodeModal } from "../viewmodal/ForgotPasswordModal";

const { Text } = Typography;

const ConfirmCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleClickResend, handleClickConfirm, isLoading } = useReceiveCodeModal();
  const [countdown, setCountdown] = useState(30);
  const email = new URLSearchParams(location.search).get("identifier");

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResend = async () => {
    await handleClickResend(email);
    setCountdown(30);
  };

  const onFinish = async (values) => {
    const { code } = values;
    const success = await handleClickConfirm(email, code);
    if (success) {
      navigate(`/reset-password?identifier=${encodeURIComponent(email)}`);
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        height: "100vh",
        width: "100%",
      }}
    >
      <Card
        title="Xác minh"
        bordered={false}
        style={{
          width: 450,
          background: "rgb(255 255 255 / 85%)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Form
          onFinish={onFinish}
          layout="vertical"
          className="row-col"
          style={{ padding: "0px 30px" }}
        >
          <Form.Item
            label="Mã xác nhận"
            name="code"
            rules={[
              {
                required: true,
                message: "Hãy nhập mã xác nhận",
              },
            ]}
          >
            <Input placeholder="Nhập mã" id="code" />
          </Form.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0px 10px",
            }}
          >
            <div style={{ textAlign: "left", textAlign: "justify", marginTop: 10 }}>
              <Text style={{ color: "#b0b0b0", fontSize: 13 }}>
                Lưu ý *: Mã chỉ tồn tại trong 5 phút <br/>
                - Hãy kiểm tra thư mục tin nhắn rác/spam
              </Text>
            </div>
          </div>
          <div style={{ textAlign: "right", margin: "10px 10px" }}>
            <Button
              loading={isLoading}
              type="link"
              style={{
                padding: 0,
                fontWeight: "500",
                textDecoration: "underline",
                textDecorationThickness: "1px",
              }}
              onClick={handleResend}
              disabled={countdown > 0}
            >
              Gửi lại mã {countdown > 0 && `(${countdown}s)`}
            </Button>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ConfirmCode;
