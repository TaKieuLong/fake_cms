import React from "react";
import { Card, Form, Input, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useReceiveCodeModal } from "../viewmodal/ForgotPasswordModal";

const { Text } = Typography;

const ReceiveCode = () => {
  const navigate = useNavigate();
  const { isLoading, handleClickResend } = useReceiveCodeModal();

  const onFinish = async (values) => {
    const { identifier } = values;
    const success = await handleClickResend(identifier);
    if(success){
      navigate(`/confirm-code?identifier=${encodeURIComponent(identifier)}`);
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
        title="Mã xác minh"
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
            label="Email/Số điện thoại"
            name="identifier"
            rules={[
              { required: true, message: "Hãy nhập Email/Số điện thoại" },
            ]}
          >
            <Input placeholder="Email/Số điện thoại" id="identifier" />
          </Form.Item>
          <div style={{ textAlign: "left", padding: "0px 11px" }}>
            <Text style={{ color: "#b0b0b0", fontSize: 13 }}>
              Lưu ý *: Nếu bạn không nhận được mã xác nhận hãy kiểm tra trong
              thư mục tin nhắn rác/spam
            </Text>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading} style={{width: '100%'}}>
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ReceiveCode;
