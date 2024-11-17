import { Col, Flex, Form, Input, Row, Select, TimePicker } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react"; // Thêm useState để quản lý trạng thái
import { useAuth } from "../../../../global/context/AuthenticationContext.js";
import Address from "./Address.jsx";
import UploadAvatar from "./UploadAvatar";
import UploadImage from "./UploadImage";

export default function CreateAccomodation(info) {
  const [imageUrl, setImageUrl] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [initialImageUrl, setInitialImageUrl] = useState([]);
  const [initialAvatarUrl, setInitialAvatarUrl] = useState("");
  const [initialAddress, setInitialAddress] = useState("");
  const form = Form.useFormInstance();

  const { benefits, handleSelectBenefitsChange } = useAuth();

  const [province, setProvince] = useState("");

  const [detailAddress, setDetailAddress] = useState("");

  const TypeAccomodationOptions = [
    { label: "Hotel", value: 0 },
    { label: "Homestay", value: 1 },
    { label: "Villa", value: 2 },
  ];

  const FurnitureOptions = [
    { label: "Giường", value: "bed" },
    { label: "Tủ", value: "closet" },
    { label: "Bàn", value: "table" },
    { label: "Ghế", value: "chair" },
    { label: "Tivi", value: "tv" },
  ];

  const [selectType, setSelectedType] = useState(0);
  const handleTypeChange = (value) => {
    setSelectedType(value);
  };
  useEffect(() => {
    form.setFieldsValue({ img: imageUrl });
    form.setFieldsValue({ avatar: avatarUrl });
    form.setFieldsValue({ address: `${detailAddress}, ${province}` });
  }, [imageUrl, avatarUrl, form, detailAddress, province]);

  useEffect(() => {
    if (info && info.info) {
      const selectedBenefits = info.info.benefits.map(
        (benefit) => benefit.name
      );
      setSelectedType(info.info.type);
      form.setFieldsValue({
        type: info.info.type,
        name: info.info.name,
        address: info.info.address,
        price: info.info.price,
        numBed: info.info.numBed,
        numTolet: info.info.numTolet,
        people: info.info.people,
        description: info.info.description,
        shortDescription: info.info.shortDescription,
        benefits: selectedBenefits,
        furniture: info.info.furniture,
        timeCheckIn: dayjs(info.info.timeCheckIn, "h:mm A"),
        timeCheckOut: dayjs(info.info.timeCheckOut, "h:mm A"),
      });
      setInitialAvatarUrl(info.info.avatar);
      setInitialImageUrl(info.info.img);
      setInitialAddress(info.info.address);
    }
  }, [form, info, benefits]);

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="type"
            label="Loại lưu trú"
            initialValue={selectType}
            rules={[
              { required: true, message: "Vui lòng chọn loại hình lưu trú!" },
            ]}
            labelCol={{ span: 8 }}
          >
            <Select
              style={{ width: "100%" }}
              options={TypeAccomodationOptions}
              onChange={handleTypeChange}
            />
          </Form.Item>
          <Form.Item
            name="name"
            label="Tên cơ sở"
            rules={[{ required: true, message: "Vui lòng nhập tên cơ sở!" }]}
            labelCol={{ span: 8 }}
          >
            <Input placeholder="Nhập tên cơ sở" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
            labelCol={{ span: 8 }}
          >
            <Address
              setDetailAddress={setDetailAddress}
              setProvince={setProvince}
              initialValue={initialAddress}
            />
          </Form.Item>
          <Flex>
            <div style={{ width: "58.5%" }}>
              <Form.Item
                name="timeCheckIn"
                label="Check-in"
                rules={[
                  { required: true, message: "Vui lòng chọn giờ check-in!" },
                ]}
                labelCol={{ span: 14 }}
              >
                <TimePicker
                  use12Hours
                  format="h:mm A"
                  style={{ width: "75%" }}
                />
              </Form.Item>
            </div>

            <Form.Item
              name="timeCheckOut"
              label="Check-out"
              rules={[
                { required: true, message: "Vui lòng chọn giờ check-out!" },
              ]}
              labelCol={{ span: 12 }}
            >
              <TimePicker
                use12Hours
                format="h:mm A"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Flex>

          {selectType !== 0 && (
            <>
              <Form.Item
                name="price"
                label="Giá tiền"
                rules={[{ required: true, message: "Vui lòng nhập giá tiền!" }]}
                labelCol={{ span: 8 }}
              >
                <Input
                  type="Number"
                  min={0}
                  placeholder="Nhập giá tiền cho 1 đêm"
                  suffix="VNĐ"
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item
                name="numBed"
                label="Số phòng ngủ"
                rules={[
                  { required: true, message: "Vui lòng nhập số phòng ngủ!" },
                ]}
                labelCol={{ span: 8 }}
              >
                <Input
                  type="Number"
                  min={0}
                  placeholder="Nhập số phòng ngủ"
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item
                name="numTolet"
                label="Số phòng tắm"
                rules={[
                  { required: true, message: "Vui lòng nhập số phòng tắm!" },
                ]}
                labelCol={{ span: 8 }}
              >
                <Input
                  type="Number"
                  min={0}
                  placeholder="Nhập số phòng tắm"
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item
                name="people"
                label="Số người ở"
                rules={[
                  { required: true, message: "Vui lòng nhập số người ở!" },
                ]}
                labelCol={{ span: 8 }}
              >
                <Input
                  type="Number"
                  min={0}
                  placeholder="Nhập số lượng người ở"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </>
          )}
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mô tả về cơ sở lưu trú!",
              },
            ]}
            labelCol={{ span: 8 }}
          >
            <Input.TextArea placeholder="Nhập mô tả về cơ sở luu trú" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="shortDescription"
            label="Mô tả ngắn"
            rules={[
              { required: true, message: "Vui lòng nhập mô tả ngắn gọn!" },
            ]}
            labelCol={{ span: 8 }}
            style={{ marginBottom: 20 }}
          >
            <Input.TextArea
              maxLength={150}
              showCount
              placeholder="Nhập mô tả ngắn"
            />
          </Form.Item>
          <Form.Item
            name="benefits"
            label="Tiện ích"
            rules={[{ required: true, message: "Vui lòng chọn tiện ích!" }]}
            labelCol={{ span: 8 }}
          >
            <Select
              mode="tags"
              placeholder="Nhập và chọn tiện ích"
              onChange={handleSelectBenefitsChange}
              options={benefits.map((benefit) => ({
                label: benefit.name,
                value: benefit.name,
              }))}
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
            name="avatar"
            label="Ảnh đại diện :"
            labelCol={{ span: 24 }}
            rules={[
              { required: true, message: "Vui lòng chọn 1 ảnh đại diện!" },
            ]}
          >
            <UploadAvatar
              setImageUrl={setAvatarUrl}
              initialFile={initialAvatarUrl}
            />
          </Form.Item>
          <Form.Item
            name="img"
            labelCol={{ span: 24 }}
            label="Ảnh nơi lưu trú (ít nhất 8 ảnh):"
            rules={[
              { required: true, message: "Vui lòng chọn 1 ảnh đại diện!" },
            ]}
          >
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
