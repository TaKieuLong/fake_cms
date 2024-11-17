import React, { useEffect, useState } from "react";
import { Form, Select, Input } from "antd";

export default function ChangeStatus({ info }) {
  const form = Form.useFormInstance();
  const [isPaidAmountVisible, setIsPaidAmountVisible] = useState(false);

  useEffect(() => {
    if (info === 0) {
      form.setFieldsValue({
        status: 1,
      });
      setIsPaidAmountVisible(true);
    } else if (info) {
      form.setFieldsValue({
        status: info,
      });
      setIsPaidAmountVisible(info === 1);
    }
  }, [info, form]);

  const statusOptions = [
    { label: "Xác nhận", value: 1, key: 1 },
    { label: "Hủy", value: 2, key: 2 },
  ];

  const handleStatusChange = (value) => {
    setIsPaidAmountVisible(value === 1);
    if (value !== 1) {
      form.setFieldsValue({ paidAmount: undefined });
    }
  };

  return (
    <div>
      <Form.Item name="status" label="Chuyển sang" labelCol={{ span: 8 }}>
        <Select
          style={{ width: "100%" }}
          options={statusOptions}
          onChange={handleStatusChange}
        />
      </Form.Item>

      {isPaidAmountVisible && (
        <Form.Item
          name="paidAmount"
          label="Số tiền đã trả"
          labelCol={{ span: 8 }}
          rules={[{ required: true, message: "Vui lòng nhập số tiền đã trả" }]}
        >
          <Input type="number" />
        </Form.Item>
      )}
    </div>
  );
}
