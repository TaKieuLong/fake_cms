import { Card, Form, Input, Button } from "antd";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useReceiveCodeModal } from "../viewmodal/ForgotPasswordModal";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, handleResetPassword } = useReceiveCodeModal();
  const email = new URLSearchParams(location.search).get("identifier");

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const { newPassword } = values;
    const success = await handleResetPassword({ identifier: email, password: newPassword });
    if(success){
      form.resetFields();
      navigate(`/login`);
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
        title="Đặt mật khẩu mới"
        bordered={false}
        style={{
          width: 450,
          background: "rgb(255 255 255 / 85%)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="row-col"
          style={{ padding: "0px 30px" }}
        >
          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Hãy nhập mật khẩu mới!",
              },
            ]}
          >
            <Input.Password placeholder="Nhập mật khẩu mới" id="newPassword" />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Hãy xác nhận mật khẩu!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp!"));
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Xác nhận mật khẩu"
              id="confirmPassword"
            />
          </Form.Item>

          <Form.Item>
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
                fontWeight: 500,
                height: 40,
                marginTop: "20px",
              }}
            >
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
