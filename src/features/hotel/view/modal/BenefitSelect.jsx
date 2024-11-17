import React, { useState } from "react";
import { Select, Input, Button, Form, Space } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import useHotelModal from "./HotelModal";

export default function BenefitSelect() {
  const { benefits, handleChange } = useHotelModal();

  const handleAddNewBenefits = (values) => {
    const newBenefits = values.newBenefits
      .filter((benefit) => benefit && benefit.name.trim() !== "")
      .map((benefit) => benefit.name);

    if (newBenefits.length > 0) {
      Promise.all(newBenefits.map((name) => addBenefit(name)));
    }
  };

  return (
    <Form.Item
      name="benefits"
      label="Tiện ích"
      rules={[{ required: true, message: "Vui lòng chọn tiện ích!" }]}
    >
      <Select
        mode="multiple"
        placeholder="Chọn tiện ích"
        options={benefits.map((benefit) => ({
          label: benefit.name,
          value: benefit.id,
        }))}
        style={{ width: "100%", marginBottom: "8px" }}
      />

      {/* Form.List để thêm nhiều tiện ích mới */}
      <Form.List name="newBenefits">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, "name"]}
                  rules={[{ required: true, message: "Nhập tên tiện ích" }]}
                  style={{ flex: 1 }}
                >
                  <Input placeholder="Nhập tiện ích mới" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                Thêm tiện ích mới
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item>
        <Button type="primary" onClick={() => form.submit()} style={{ marginTop: "8px" }}>
          Lưu tất cả tiện ích mới
        </Button>
      </Form.Item>
    </Form.Item>
  );
}
