import { Button, Flex, Tag } from "antd";
import { FaRegPenToSquare } from "react-icons/fa6";
import { MdMoreHoriz } from "react-icons/md";
import Format from "../../../../utils/format/Format.ts";

function getStatusText(status) {
  switch (status) {
    case 0:
      return "Đang xử lý";
    case 1:
      return "Đã đặt";
    case 2:
      return "Đã hủy";
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
    case 2:
      return "red";
    default:
      return "black";
  }
}

const Data = (handleDetail, handleConfirm) => {
  return [
    {
      title: "Số điện thoại",
      dataIndex: "userPhoneNumber",
      key: "userPhoneNumber",
      width: 180,
      render: (item, record, index) => (
        <div style={{ textAlign: "center", fontWeight: 500 }}>
          {record?.user?.phoneNumber}
        </div>
      ),
    },
    {
      title: "Tên cơ sở",
      dataIndex: "accommodationName",
      key: "accommodationName",
      width: 220,
      render: (item, record, index) => (
        <div style={{ textAlign: "center", fontWeight: 500 }}>
          {record?.accommodation?.name}
        </div>
      ),
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      key: "price",
      width: 90,
      render: (item, record) => (
        <div style={{ textAlign: "right", fontWeight: 500 }}>
          {Format.vndPrice(record?.price)}
        </div>
      ),
    },
    {
      title: "Giảm giá",
      dataIndex: "discountPrice",
      key: "discountPrice",
      width: 90,
      render: (item, record) => (
        <div style={{ textAlign: "right", fontWeight: 500 }}>
          {Format.vndPrice(record?.discountPrice)}
        </div>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      width: 90,
      render: (item, record) => (
        <div style={{ textAlign: "right", fontWeight: 500 }}>
          {Format.vndPrice(record?.totalPrice)}
        </div>
      ),
    },
    {
      title: "Check-in/ Check-out",
      dataIndex: "Check-in",
      key: "Check-in",
      width: 200,

      render: (item, record, index) => (
        <div
          style={{
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          {record?.checkInDate}
          <div
            style={{
              width: "1px",
              height: "20px",
              backgroundColor: "#ccc",
              margin: "0 10px",
            }}
          />
          {record?.checkOutDate}
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "totalPrice",
      key: "totalPrice",
      width: 100,
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
            onClick={() => {
              handleDetail(record?.id);
            }}
          >
            <MdMoreHoriz />
          </Button>
          {(record?.status === 0 || record?.status === 1) && (
            <Button
              style={{
                display: "flex",
                alignItems: "center",
                color: "rgb(255, 96, 0)",
                padding: "5px",
                justifyContent: "center",
              }}
              onClick={() => {
                handleConfirm(record);
              }}
            >
              <FaRegPenToSquare />
            </Button>
          )}
        </Flex>
      ),
    },
  ];
};

export default Data;
