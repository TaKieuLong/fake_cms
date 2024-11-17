import { Card, Form, Input, Button } from "antd";
import * as React from "react";
import { useRegisterModal } from "../viewmodal/RegisterModal";

export default function Register() {
  const { isLoading, handleSubmit } = useRegisterModal();

  const onFinish = (values) => {
    handleSubmit(values.email, values.password);
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
        backgroundImage:
          "url('https://c0.wallpaperflare.com/path/366/11/720/sky-landscape-lake-tree-19a9b41732325d287f1251b3706640cb.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card
        title="Đăng ký"
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
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Hãy nhập Email!",
              },
            ]}
          >
            <Input placeholder="Email" id="email" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Hãy nhập mật khẩu!",
              },
            ]}
          >
            <Input.Password placeholder="Mật khẩu" id="password" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Xác nhận mật khẩu"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Xin mời xác thực mật khẩu!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu xác thực không trùng khớp!")
                  );
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
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
                fontWeight: 500,
                height: 40,
                marginTop: "16px",
              }}
              loading={isLoading}
            >
              ĐĂNG KÝ
            </Button>
          </Form.Item>
          <div style={{ textAlign: "center", marginTop: "16px" }}>
            <span>Bạn đã có tài khoản? </span>
            <a href="/login">Đăng nhập ngay</a>
          </div>
        </Form>
      </Card>
    </div>
  );
}
