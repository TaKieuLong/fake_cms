import { useEffect } from "react";
import { Form, Input, DatePicker } from "antd";
import React from "react";
import dayjs from "dayjs";

export default function CreateHoliday(info) {
  const form = Form.useFormInstance();
  const dateFormat = "DD/MM/YYYY";
  const defaultDate = dayjs();

  useEffect(() => {
    if (info && info.info) {
      form.setFieldsValue({
        name: info.info.name,
        price: info.info.price,
        fromDate: info.info.fromDate
          ? dayjs(info.info.fromDate, dateFormat)
          : defaultDate,
        toDate: info.info.toDate
          ? dayjs(info.info.toDate, dateFormat)
          : defaultDate,
      });
    }
  }, [form, info]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div>
      <Form.Item
        label="Tên ngày lễ"
        name="name"
        htmlFor="name"
        rules={[
          {
            required: true,
            message: "Hãy nhập tên ngày lễ!",
          },
        ]}
        labelCol={{ span: 9 }}
      >
        <Input placeholder="Tên ngày lễ" id="name" />
      </Form.Item>

      <Form.Item
        name="fromDate"
        label="Ngày bắt đầu"
        initialValue={defaultDate}
        rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu!" }]}
        labelCol={{ span: 9 }}
      >
        <DatePicker format={dateFormat} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="toDate"
        label="Ngày kết thúc"
        initialValue={defaultDate}
        rules={[
          { required: true, message: "Vui lòng chọn ngày kết thúc!" },
          {
            validator: (_, value) => {
              const fromDate = form.getFieldValue("fromDate");
              if (fromDate && value && value.isBefore(fromDate, "day")) {
                return Promise.reject("Ngày kết thúc phải sau ngày bắt đầu!");
              }
              return Promise.resolve();
            },
          },
        ]}
        labelCol={{ span: 9 }}
      >
        <DatePicker format={dateFormat} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="price"
        label="Phần trăm"
        rules={[
          { required: true, message: "Vui lòng nhập phần trăm!" },
          {
            validator: (_, value) => {
              if (value >= 100) {
                return Promise.reject("Phần trăm không được vượt quá 100!");
              }
              return Promise.resolve();
            },
          },
        ]}
        labelCol={{ span: 9 }}
      >
        <Input
          placeholder="Nhập phần trăm"
          id="price"
          suffix="%"
          type="Number"
          max={100}
        />
      </Form.Item>
    </div>
  );
}
