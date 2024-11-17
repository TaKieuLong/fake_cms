import React from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  Avatar,
  Card,
  Select,
  DatePicker,
  Row,
  Col,
} from "antd";
import {
  UploadOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import useProfile from "../viewmodal/useProfile";
import dayjs from "dayjs";
import Format from "../../../utils/format/Format.ts";

const { Option } = Select;

const Profile = () => {
  const {
    loadingAvatar,
    isLoading,
    loading,
    profile,
    avatarUrl,
    handleFinish,
    handleUpload,
    handleShowVerifyEmailModal,
    handleShowChangePasswordlModal,
    handleClickResend,
  } = useProfile();

  const handleResendClick = async () => {
    await handleClickResend(profile.email);
  };

  const disabledDate = (current) => {
    return current && current > dayjs("2006-12-31");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="content_width"
      style={{
        margin: "50px auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Form
        className="data-person"
        layout="vertical"
        onFinish={handleFinish}
        style={{
          width: "100%",
          maxWidth: "1000px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Row gutter={[8, 8]}>
          <Col span={12}>
            {" "}
            <Card
              className="card-data-person"
              title="Thông tin người dùng"
              bordered={false}
              style={{
                marginBottom: "16px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                width: "100%",
              }}
            >
              <Form.Item label="Ảnh đại diện">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <Avatar
                    size={80}
                    src={avatarUrl || profile.avatar}
                    style={{ marginRight: 8 }}
                    icon={!avatarUrl && <UserOutlined />}
                  />
                  <Upload
                    customRequest={({ file, onSuccess, onError }) => {
                      handleUpload(file)
                        .then(() => {
                          onSuccess(file);
                        })
                        .catch((error) => {
                          onError(error);
                        });
                    }}
                    showUploadList={false}
                  >
                    <Button loading={loadingAvatar} icon={<UploadOutlined />}>
                      Tải lên
                    </Button>
                  </Upload>
                </div>
              </Form.Item>
              <Form.Item
                initialValue={profile.name}
                name="name"
                label="Họ và tên"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập họ và tên của bạn",
                  },
                ]}
              >
                <Input
                  style={{ width: "100%", height: "40px" }}
                  prefix={<UserOutlined />}
                  allowClear
                />
              </Form.Item>
              <Form.Item
                initialValue={profile.gender}
                name="gender"
                label="Giới tính"
                rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
              >
                <Select
                  placeholder="Chọn giới tính"
                  style={{ width: "100%", height: "40px", fontSize: "16px" }}
                >
                  <Option value={0}>Nam</Option>
                  <Option value={1}>Nữ</Option>
                  <Option value={2}>Khác</Option>
                </Select>
              </Form.Item>
              <Form.Item
                initialValue={dayjs(profile.dateOfBirth, "DD/MM/YYYY")}
                name="birthDate"
                label="Ngày sinh"
                rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
              >
                <DatePicker
                  disabledDate={disabledDate}
                  format="DD/MM/YYYY"
                  placeholder="Chọn ngày sinh"
                  style={{ width: "100%", height: "40px", fontSize: "16px" }}
                />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    initialValue={Format.formatDateYear(profile.createdAt)}
                    name="createDate"
                    label="Ngày tạo"
                  >
                    <Input style={{ height: "40px" }} disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    initialValue={Format.formatDateYear(profile.updatedAt)}
                    name="updateDate"
                    label="Ngày cập nhật"
                  >
                    <Input style={{ height: "40px" }} disabled />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                style={{ marginTop: 30, textAlign: "center" }}
                label="Xác thực tài khoản"
              >
                {!profile.verified ? (
                  <>
                    <div
                      style={{
                        marginBottom: 10,
                        fontSize: 18,
                        color: "red",
                        textAlign: "center",
                      }}
                    >
                      Tài khoản chưa xác thực
                    </div>
                    <Button
                      loading={isLoading}
                      type="primary"
                      style={{
                        height: 40,
                        width: "100%",
                        backgroundColor: "#ff4d4f",
                        color: "#fff",
                      }}
                      onClick={async () => {
                        await handleResendClick(profile.email);
                        handleShowVerifyEmailModal(profile.email);
                      }}
                    >
                      Xác thực ngay
                    </Button>
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        fontSize: 18,
                        color: "green",
                        textAlign: "center",
                      }}
                    >
                      Đã bảo mật
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 16,
                      }}
                    >
                      <Button
                        style={{ width: "100%", height: 40 }}
                        type="primary"
                        onClick={() => {
                          handleShowChangePasswordlModal();
                        }}
                      >
                        Đổi Mật Khẩu
                      </Button>
                    </div>
                  </>
                )}
              </Form.Item>
            </Card>
          </Col>
          <Col span={12}>
            <Card
              className="card-bank"
              bordered={false}
              style={{
                marginBottom: "16px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                width: "100%",
              }}
            >
              {profile.banks.map((bank, index) => (
                <div key={index} style={{ marginBottom: 16 }}>
                  <Form.Item
                    label="Tên ngân hàng"
                    name={`bankName-${index}`}
                    initialValue={bank.bankName}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên ngân hàng",
                      },
                    ]}
                  >
                    <Input style={{ width: "100%", height: "40px" }} disabled />
                  </Form.Item>
                  <Form.Item
                    label="Tên viết tắt"
                    name={`bankShortName-${index}`}
                    initialValue={bank.bankShortName}
                  >
                    <Input style={{ width: "100%", height: "40px" }} disabled />
                  </Form.Item>
                  <Form.Item
                    label="Số tài khoản"
                    name={`accountNumber-${index}`}
                    initialValue={bank.accountNumber}
                    rules={[
                      { required: true, message: "Vui lòng nhập số tài khoản" },
                    ]}
                  >
                    <Input style={{ width: "100%", height: "40px" }} disabled />
                  </Form.Item>
                </div>
              ))}
            </Card>

            <Card
              className="card-email"
              bordered={false}
              style={{
                marginBottom: "16px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                width: "100%",
              }}
            >
              <Form.Item
                initialValue={profile.email}
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Vui lòng nhập email của bạn" },
                ]}
              >
                <Input
                  style={{ width: "100%", height: "40px" }}
                  prefix={<MailOutlined />}
                  allowClear
                  disabled
                />
              </Form.Item>
            </Card>

            <Card
              className="card-phone"
              bordered={false}
              style={{
                marginBottom: "16px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                width: "100%",
              }}
            >
              <Form.Item
                initialValue={profile.phone}
                name="phone"
                label="Số điện thoại"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại của bạn",
                  },
                ]}
              >
                <Input
                  style={{ width: "100%", height: "40px" }}
                  prefix={<PhoneOutlined />}
                  allowClear
                  disabled
                />
              </Form.Item>
            </Card>
          </Col>
          <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
            <Form.Item>
              <Button
                className="btn-submit"
                type="primary"
                htmlType="submit"
                style={{
                  width: "%",
                  height: "40px",
                  fontSize: "16px",
                }}
              >
                Cập nhật thông tin
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Profile;
