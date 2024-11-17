import React from "react";
import { Form, Input } from "antd";
import { LockOutlined } from "@ant-design/icons";

const ChangePasswordForm = () => {

  return (
    <>
      <Form.Item
        name="newPassword"
        label="Mật khẩu mới"
        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Nhập mật khẩu mới"
          id="newPassword"
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label="Xác nhận mật khẩu mới"
        dependencies={['newPassword']}
        rules={[
          { required: true, message: 'Vui lòng xác nhận mật khẩu mới!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("newPassword") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Mật khẩu xác nhận không khớp!"));
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Xác nhận mật khẩu mới"
          id="confirmPassword"
        />
      </Form.Item>
    </>
  );
};

export default ChangePasswordForm;
