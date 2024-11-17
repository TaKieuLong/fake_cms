import { Form, Select } from "antd";
import React from "react";

const DualSelectFormItem = ({
  title,
  data = [],
  id,
  form,
  labelColSpan = 8,
  onChange,
  initialValue,
  size = "small",
}) => {
  const defaultValue = initialValue || data?.[0];

  return (
    <Form.Item
      style={{
        marginTop: 0,
      }}
      labelCol={{ span: labelColSpan }}
      label={title}
      name={id}
      initialValue={defaultValue}
    >
      <Select
        labelInValue
        onChange={(value) => {
          onChange(value);
        }}
        size={size}
        options={data}
      />
    </Form.Item>
  );
};

export default DualSelectFormItem;
