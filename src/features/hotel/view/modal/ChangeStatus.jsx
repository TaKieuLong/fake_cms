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
    { label: "Bảo Trì", value: 1 },
  ];

  const filteredStatusOptions = statusOptions.filter(
    (option) => option.value !== info
  );

  return (
    <div>
      <Form.Item name="status" label="Chuyển sang" labelCol={{ span: 8 }}>
        <Select style={{ width: "100%" }} options={filteredStatusOptions} />
      </Form.Item>
    </div>
  );
}
