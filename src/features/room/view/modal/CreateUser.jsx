import React, { useState } from "react"; // Thêm useState để quản lý trạng thái
import { Form, Input, Select } from "antd";
import { useAuth } from "../../../../global/context/AuthenticationContext";

export default function CreateUser() {
  const form = Form.useFormInstance();
  const { profile } = useAuth();

  const RoleOptions =
    profile.role === 2
      ? [{ label: "Receptionist", value: 3 }]
      : [
          { label: "SuperAdmin", value: 1 },
          { label: "Admin", value: 2 },
        ];

  const [selectedRole, setSelectedRole] = useState(profile.role === 2 ? 3 : 2);

  const handleRoleChange = (value) => {
    setSelectedRole(value);
  };

  return (
    <div>
      <Form.Item
        label="Email"
        name="email"
        htmlFor="email"
        rules={[
          {
            type: "email",
            required: true,
            message: "Hãy nhập Email!",
          },
        ]}
        labelCol={{ span: 9 }}
      >
        <Input placeholder="Email" id="email" />
      </Form.Item>

      <Form.Item
        name="Password"
        label="Mật khẩu"
        rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        labelCol={{ span: 9 }}
      >
        <Input.Password placeholder="Password" id="Password" />
      </Form.Item>

      <Form.Item
        name="PhoneNumber"
        label="Số điện thoại"
        rules={[
          { required: true, message: "Vui lòng nhập số điện thoại!" },
          {
            pattern: /^[0-9]{10,11}$/,
            message: "Số điện thoại phải có 10 hoặc 11 chữ số!",
          },
        ]}
        labelCol={{ span: 9 }}
      >
        <Input placeholder="PhoneNumber" id="PhoneNumber" />
      </Form.Item>

      <Form.Item
        name="Role"
        label="Vai trò"
        initialValue={selectedRole}
        rules={[{ required: true, message: "Vui lòng chọn vai trò!" }]}
        labelCol={{ span: 9 }}
      >
        <Select
          style={{ width: "100%" }}
          options={RoleOptions}
          onChange={handleRoleChange}
        />
      </Form.Item>

      {selectedRole !== 3 && (
        <>
          <Form.Item
            name="bankName"
            label="Tên ngân hàng"
            rules={[
              { required: true, message: "Vui lòng nhập tên ngân hàng!" },
            ]}
            labelCol={{ span: 9 }}
          >
            <Input placeholder="bankName" id="bankName" />
          </Form.Item>

          <Form.Item
            name="bankShortName"
            label="Tên viết tắt ngân hàng"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên viết tắt ngân hàng!",
              },
            ]}
            labelCol={{ span: 9 }}
          >
            <Input placeholder="bankShortName" id="bankShortName" />
          </Form.Item>

          <Form.Item
            name="accountNumber"
            label="Số tài khoản"
            rules={[{ required: true, message: "Vui lòng nhập số tài khoản!" }]}
            labelCol={{ span: 9 }}
          >
            <Input placeholder="accountNumber" id="accountNumber" />
          </Form.Item>
        </>
      )}
    </div>
  );
}
