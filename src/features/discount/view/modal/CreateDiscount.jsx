import { useEffect } from "react";
import { Form, Input, DatePicker } from "antd";
import React from "react";
import dayjs from "dayjs";

export default function CreateDiscount(info) {
  const form = Form.useFormInstance();
  const dateFormat = "DD/MM/YYYY";
  const defaultDate = dayjs();

  useEffect(() => {
    if (info && info.info) {
      form.setFieldsValue({
        name: info.info.name,
        discount: info.info.discount,
        quantity: info.info.quantity,
        description: info.info.description,
        fromDate: info.info.fromDate
          ? dayjs(info.info.fromDate, dateFormat)
          : defaultDate,
        toDate: info.info.toDate
          ? dayjs(info.info.toDate, dateFormat)
          : defaultDate,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, info]);
  return (
    <div>
      <Form.Item
        label="Tên mã"
        name="name"
        htmlFor="name"
        rules={[
          {
            required: true,
            message: "Hãy nhập tên mã!",
          },
        ]}
        labelCol={{ span: 9 }}
      >
        <Input placeholder="Tên mã giảm giá" id="name" />
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
              if (fromDate && value && value.isBefore(fromDate)) {
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
        name="discount"
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
          type="number"
          max={100}
        />
      </Form.Item>
      <Form.Item
        initialValue={1}
        label="Lượt sử dụng"
        name="quantity"
        htmlFor="quantity"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập lượt sử dụng!",
          },
        ]}
        labelCol={{ span: 9 }}
      >
        <Input
          type="number"
          placeholder="Lượt sử dụng của 1 user"
          id="quantity"
        />
      </Form.Item>
      <Form.Item
        style={{ marginBottom: 20 }}
        name="description"
        label="Mô tả"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mô tả  mã giảm giá!",
          },
        ]}
        labelCol={{ span: 9 }}
      >
        <Input.TextArea
          placeholder="Nhập mô tả về mã giảm giá"
          maxLength={200}
          showCount
        />
      </Form.Item>
    </div>
  );
}
