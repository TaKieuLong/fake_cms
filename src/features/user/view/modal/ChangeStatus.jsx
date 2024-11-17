import React, { useEffect } from "react";
import { Form, Select } from "antd";

export default function ChangeStatus({ info }) {
  const form = Form.useFormInstance();

  useEffect(() => {
    const statusValue = info === 0 ? 1 : 0;
    form.setFieldsValue({
      status: info !== undefined ? statusValue : getFirstStatusValue(),
    });
  }, [info, form]);

  const getFirstStatusValue = () => {
    return 0;
  };

  const statusOptions = [
    { label: "Hoạt động", value: 0 },
    { label: "Tạm khóa", value: 1 },
  ];

  return (
    <div>
      <Form.Item name="status" label="Chuyển sang" labelCol={{ span: 8 }}>
        <Select style={{ width: "100%" }} options={statusOptions} />
      </Form.Item>
    </div>
  );
}
