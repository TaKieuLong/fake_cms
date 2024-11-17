import { Card, Form, Input, Button } from "antd";
import * as React from "react";
import { useLoginModal } from "../viewmodal/LoginModal";

export default function Login() {
  const { isLoading, handleSubmit } = useLoginModal();

  const onFinish = (values) => {
    handleSubmit(values.identifier, values.password);
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
          "url('https://c0.wallpaperflare.com/path/644/211/698/table-plant-chair-sofa-9a0fdb9eaa188c34a1646e6d3d0c91b1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card
        title="Đăng nhập"
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
            label="Email/ Số điện thoại"
            name="identifier"
            htmlFor="identifier"
            rules={[
              {
                required: true,
                message: "Hãy nhập Email/ Số điện thoại!",
              },
            ]}
          >
            <Input placeholder="Email/ Số điện thoại" id="identifier" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            htmlFor="password"
            rules={[
              {
                required: true,
                message: "Hãy nhập mật khẩu!",
              },
            ]}
          >
            <Input.Password placeholder="Mật khẩu" id="password" />
          </Form.Item>
          <div style={{ textAlign: "right", marginTop: 10, marginRight: 10}}>
            <a style={{textDecoration: 'underline', textDecorationThickness: 1}} href="/receive-code">Quên mật khẩu?</a>
          </div>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
                fontWeight: 500,
                height: 40,
              }}
              loading={isLoading}
            >
              ĐĂNG NHẬP
            </Button>
          </Form.Item>
          <div style={{ textAlign: "center", marginTop: "16px" }}>
            <span>Bạn chưa có tài khoản? </span>
            <a href="/register">Đăng ký ngay</a>
          </div>
        </Form>
      </Card>
    </div>
  );
}
