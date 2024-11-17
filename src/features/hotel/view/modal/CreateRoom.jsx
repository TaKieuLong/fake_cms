import { Col, Form, Input, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import UploadAvatar from "./UploadAvatar";
import UploadImage from "./UploadImage";
export default function CreatRoom(info) {

  const [imageUrl, setImageUrl] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [initialImageUrl, setInitialImageUrl] = useState([]);
  const [initialAvatarUrl, setInitialAvatarUrl] = useState("");
  const form = Form.useFormInstance();

  const FurnitureOptions = [
    { label: "Giường", value: "bed" },
    { label: "Tủ", value: "closet" },
    { label: "Bàn", value: "table" },
    { label: "Ghế", value: "chair" },
    { label: "Tivi", value: "tv" },
  ];

  const TypeRoomOption = [
    { label: "Phòng đơn", value: 0 },
    { label: "Phòng đôi", value: 1 },
    { label: "Phòng Deluxe", value: 2 },
    { label: "Phòng Suite ", value: 3 },
    { label: "Phòng Twin Room", value: 4 },
    { label: "Phòng Single Room  ", value: 5 },
    { label: "Phòng Family Room ", value: 6 },
  ];

  useEffect(() => {
    if (info && info.info) {
      form.setFieldsValue({
        type: info.info.type,
        roomName: info.info.roomName,
        address: info.info.address,
        provinceId: info.info.province,
        price: info.info.price,
        acreage: info.info.acreage,
        numBed: info.info.numBed,
        numTolet: info.info.numTolet,
        people: info.info.people,
        description: info.info.description,
        shortDescription: info.info.shortDescription,
        furniture: info.info.furniture,
      });
      setInitialAvatarUrl(info.info.avatar);
      setInitialImageUrl(info.info.img);
    }
  }, [form, info]);
  useEffect(() => {
    form.setFieldsValue({ img: imageUrl });
    form.setFieldsValue({ avatar: avatarUrl });
  }, [imageUrl, avatarUrl, form]);
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="roomName"
            label="Tên phòng"
            rules={[{ required: true, message: "Vui lòng nhập tên phòng!" }]}
            labelCol={{ span: 8 }}
          >
            <Input placeholder="Nhập tên phòng" />
          </Form.Item>
          <Form.Item
            name="type"
            label="Loại phòng"
            rules={[{ required: true, message: "Vui lòng chọn loại phòng!" }]}
            labelCol={{ span: 8 }}
          >
            <Select
              placeholder="Chọn loại phòng"
              options={TypeRoomOption}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="price"
            label="Giá tiền"
            rules={[{ required: true, message: "Vui lòng nhập giá tiền!" }]}
            labelCol={{ span: 8 }}
          >
            <Input
              type="Number"
              min={0}
              placeholder="Nhập giá tiền"
              suffix="VNĐ"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="numBed"
            label="Số lượng giường"
            rules={[{ required: true, message: "Vui lòng nhập số giường!" }]}
            labelCol={{ span: 8 }}
          >
            <Input
              type="Number"
              min={0}
              placeholder="Nhập số giường"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="numTolet"
            label="Số lượng nhà tắm"
            rules={[{ required: true, message: "Vui lòng nhập số nhà tắm!" }]}
            labelCol={{ span: 8 }}
          >
            <Input
              type="Number"
              min={0}
              placeholder="Nhập số nhà tắm"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="people"
            label="Số người ở"
            rules={[{ required: true, message: "Vui lòng nhập số người ở!" }]}
            labelCol={{ span: 8 }}
          >
            <Input
              type="Number"
              min={0}
              placeholder="Nhập số lượng người ở"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="acreage"
            label="Diện tích"
            rules={[
              { required: true, message: "Vui lòng nhập diện tích phòng!" },
            ]}
            labelCol={{ span: 8 }}
          >
            <Input
              type="Number"
              min={0}
              suffix={<span>m&#178;</span>}
              placeholder="Nhập diện tích phòng"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="furniture"
            label="Nội thất"
            rules={[{ required: true, message: "Vui lòng chọn nội thất!" }]}
            labelCol={{ span: 8 }}
          >
            <Select
              mode="multiple"
              placeholder="Chọn nội thất"
              options={FurnitureOptions}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
            labelCol={{ span: 8 }}
          >
            <Input.TextArea placeholder="Nhập mô tả" />
          </Form.Item>
          <Form.Item
            name="shortDescription"
            label="Mô tả ngắn"
            rules={[
              { required: true, message: "Vui lòng nhập mô tả ngắn gọn!" },
            ]}
            labelCol={{ span: 8 }}
          >
            <Input.TextArea placeholder="Nhập mô tả ngắn" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="avatar"
            label=" Hình ảnh đại diện cho phòng (1 ảnh):"
            rules={[{ required: true, message: "Vui lòng chọn ảnh đại diện!" }]}
          >
            <UploadAvatar
              setImageUrl={setAvatarUrl}
              initialFile={initialAvatarUrl}
            />
          </Form.Item>
          <Form.Item name="img" label="Hình ảnh của phòng (ít nhất 8 ảnh)">
            <UploadImage
              setImageUrl={setImageUrl}
              initialFileList={initialImageUrl}
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}
