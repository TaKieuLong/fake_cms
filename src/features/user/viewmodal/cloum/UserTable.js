import Format from "../../../../utils/format/Format.ts";
import { Button, Tag, Flex } from "antd";
import { FaRegPenToSquare } from "react-icons/fa6";

function getStatusText(status) {
  switch (status) {
    case 0:
      return "Hoạt động";
    case 1:
      return "Tạm khóa";

    default:
      return "Unknown";
  }
}

function getStatusColor(status) {
  switch (status) {
    case 0:
      return "green";
    case 1:
      return "red";
    default:
      return "black";
  }
}

function getRoleText(role) {
  switch (role) {
    case 0:
      return "User";
    case 1:
      return "SuperAdmin";
    case 2:
      return "Admin";
    case 3:
      return "Receptionist";
    default:
      return "Unknown";
  }
}

function getRoleColor(role) {
  switch (role) {
    case 0:
      return "black";
    case 1:
      return "red";
    case 2:
      return "green";
    case 3:
      return "blue";
    default:
      return "black";
  }
}

const Data = (handleShowMyModal) => {
  return [
    {
      title: "Tên người dùng",
      dataIndex: "name",
      key: "name",
      width: 220,
      render: (item, record, index) => (
        <div style={{ textAlign: "center", fontWeight: 500 }}>
          {record?.name}
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 300,
      render: (item, record, index) => (
        <div style={{ textAlign: "center", fontWeight: 500 }}>
          {record?.email}
        </div>
      ),
    },

    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      width: 150,
      render: (item, record, index) => (
        <div style={{ textAlign: "center", fontWeight: 500 }}>
          {record?.phone}
        </div>
      ),
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      width: 100,
      render: (item, record, index) => (
        <div
          style={{
            textAlign: "center",
            fontWeight: 500,
            color: getRoleColor(record?.role),
          }}
        >
          {getRoleText(record?.role)}
        </div>
      ),
    },
    {
      title: "Thời gian tạo/ cập nhập",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 220,

      render: (item, record, index) => (
        <div
          style={{
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          {Format.formatDateTime(record?.createdAt)}
          <div
            style={{
              width: "1px",
              height: "20px",
              backgroundColor: "#ccc",
              margin: "0 10px",
            }}
          />
          {Format.formatDateTime(record?.updatedAt)}
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (item, record) => (
        <Flex
          gap="4px 0"
          style={{
            justifyContent: "space-evenly",
          }}
        >
          <Tag color={getStatusColor(record?.status)}>
            {getStatusText(record?.status)}
          </Tag>
          <Button
            style={{
              display: "flex",
              alignItems: "center",
              color: "rgb(255, 96, 0)",
              padding: "5px",
              justifyContent: "center",
            }}
            onClick={() => handleShowMyModal(record)}
          >
            <FaRegPenToSquare />
          </Button>
        </Flex>
      ),
    },
  ];
};

export default Data;
