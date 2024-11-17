import { DatePicker, Form, Input } from "antd";
import React, { useEffect } from "react";

const { RangePicker } = DatePicker;

export default function Booking({ info }) {
  const form = Form.useFormInstance();

  useEffect(() => {}, [info, form]);

  const disabledDate = (current) => {
    return current && current < new Date();
  };

  return (
    <div>
      <Form.Item
        name="guestName"
        label="Tên khách"
        rules={[{ required: true, message: "Vui lòng nhập tên khách!" }]}
        labelCol={{ span: 8 }}
      >
        <Input placeholder="Nhập tên khách" />
      </Form.Item>

      <Form.Item
        name="guestEmail"
        label="Email khách"
        rules={[{ type: "email", message: "Vui lòng nhập email hợp lệ!" }]}
        labelCol={{ span: 8 }}
      >
        <Input placeholder="Nhập email khách" />
      </Form.Item>

      <Form.Item
        name="guestPhone"
        label="Số điện thoại"
        rules={[
          { required: true, message: "Vui lòng nhập số điện thoại!" },
          { pattern: /^[0-9]{10,11}$/, message: "Số điện thoại không hợp lệ!" },
        ]}
        labelCol={{ span: 8 }}
      >
        <Input placeholder="Nhập số điện thoại" />
      </Form.Item>

      <Form.Item
        name="dateRange"
        label="Từ ngày - Đến ngày"
        rules={[{ required: true, message: "Vui lòng chọn khoảng thời gian!" }]}
        labelCol={{ span: 24 }}
      >
        <RangePicker
          style={{ width: "100%" }}
          placeholder={["Từ ngày", "Đến ngày"]}
          disabledDate={disabledDate}
          format="DD/MM/YYYY"
        />
      </Form.Item>
    </div>
  );
}
