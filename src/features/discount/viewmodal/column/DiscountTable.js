import Format from "../../../../utils/format/Format.ts";
import { Button, Tag, Flex } from "antd";
import { FaRegPenToSquare } from "react-icons/fa6";

function getStatusText(status) {
  switch (status) {
    case 0:
      return "Tạm khóa";
    case 1:
      return "Hoạt động";

    default:
      return "Unknown";
  }
}

function getStatusColor(status) {
  switch (status) {
    case 0:
      return "red";
    case 1:
      return "green";
    default:
      return "black";
  }
}

const Data = (handleShowMyModal) => {
  return [
    {
      title: "Tên mã",
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
      title: "Ngày bắt đầu",
      dataIndex: "fromDate",
      key: "fromDate",
      width: 150,
      render: (item, record, index) => (
        <div style={{ textAlign: "center", fontWeight: 500 }}>
          {record?.fromDate}
        </div>
      ),
    },

    {
      title: "Ngày kết thúc",
      dataIndex: "toDate",
      key: "toDate",
      width: 150,
      render: (item, record, index) => (
        <div style={{ textAlign: "center", fontWeight: 500 }}>
          {record?.toDate}
        </div>
      ),
    },
    {
      title: "Lượt sử dụng",
      dataIndex: "quantity",
      key: "quantity",
      width: 90,
      render: (item, record) => (
        <div style={{ textAlign: "right", fontWeight: 500 }}>
          {record?.quantity}
        </div>
      ),
    },
    {
      title: "Giảm giá",
      dataIndex: "price",
      key: "price",
      width: 90,
      render: (item, record) => (
        <div style={{ textAlign: "right", fontWeight: 500 }}>
          {record?.discount}%
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
