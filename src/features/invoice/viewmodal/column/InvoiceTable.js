import { Button, Flex, Tag, Tooltip } from "antd";
import { FaRegPenToSquare } from "react-icons/fa6";
import { MdMoreHoriz } from "react-icons/md";
import Format from "../../../../utils/format/Format.ts";

function getStatusText(status) {
  switch (status) {
    case 0:
      return "Chưa thanh toán";
    case 1:
      return "Đã thanh toán";
    default:
      return "Unknown";
  }
}

function getStatusColor(status) {
  switch (status) {
    case 0:
      return "green";
    case 1:
      return "blue";
    default:
      return "black";
  }
}

const Data = (handleDetail, handleUpdate) => {
  return [
    {
      title: "Mã đơn",
      dataIndex: "invoiceCode",
      key: "invoiceCode",
      width: 180,
      render: (item, record, index) => (
        <div style={{ textAlign: "center", fontWeight: 500 }}>
          {record?.invoiceCode}
        </div>
      ),
    },
    {
      title: "Tổng đơn",
      dataIndex: "totalAmount",
      key: "totalAmount",
      width: 90,
      render: (item, record) => (
        <div style={{ textAlign: "right", fontWeight: 500 }}>
          {Format.vndPrice(record?.totalAmount)}
        </div>
      ),
    },
    {
      title: "Trả trước",
      dataIndex: "paidAmount",
      key: "paidAmount",
      width: 90,
      render: (item, record) => (
        <div style={{ textAlign: "right", fontWeight: 500 }}>
          {Format.vndPrice(record?.paidAmount)}
        </div>
      ),
    },
    {
      title: "Còn lại",
      dataIndex: "remainingAmount",
      key: "remainingAmount",
      width: 90,
      render: (item, record) => (
        <div style={{ textAlign: "right", fontWeight: 500 }}>
          {Format.vndPrice(record?.remainingAmount)}
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
      width: 120,
      render: (item, record) => (
        <div style={{ textAlign: "center", fontWeight: 500 }}>
          <Tag color={getStatusColor(record?.status)}>
            {getStatusText(record?.status)}
          </Tag>
        </div>
      ),
    },
    {
      title: "Hành động",
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
          <Button
            style={{
              display: "flex",
              alignItems: "center",
              color: "rgb(255, 96, 0)",
              padding: "5px",
              justifyContent: "center",
            }}
            onClick={() => handleDetail(record)}
          >
            <MdMoreHoriz />
          </Button>
          <Button
            style={{
              display: "flex",
              alignItems: "center",
              color: "rgb(255, 96, 0)",
              padding: "5px",
              justifyContent: "center",
            }}
            onClick={() => handleUpdate(record)}
          >
            <FaRegPenToSquare />
          </Button>
        </Flex>
      ),
    },
  ];
};

export default Data;
