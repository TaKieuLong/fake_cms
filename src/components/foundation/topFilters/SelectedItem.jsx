import React from "react";
import { Form, Select } from "antd";

const SelectedItem = ({
  title,
  onChange,
  options,
  defaultValue = options[0]?.value,
  className = "",
  size = "middle",
  labelInValue = false,
  allowClear = true,
  id,
  width = "100%",
}) => {
  return (
    <Form.Item
      name={id}
      label={title}
      labelCol={{ span: 24 }}
      key={id}
      initialValue={defaultValue}
    >
      <Select
        style={{
          width: width,
        }}
        labelInValue={labelInValue}
        allowClear={allowClear}
        onChange={onChange}
        className={className}
        size={size}
        options={options.map((option) => ({
          label: option.label,
          value: option.value,
        }))}
      />
    </Form.Item>
  );
};

export default SelectedItem;
