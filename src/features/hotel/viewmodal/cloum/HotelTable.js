import { Button, Flex, Tooltip } from "antd";
import { FaRegPenToSquare } from "react-icons/fa6";
import { MdMoreHoriz } from "react-icons/md";
import Format from "../../../../utils/format/Format.ts";
import { RiCalendarCheckFill } from "react-icons/ri";

const getTypeLabel = (type) => {
  switch (type) {
    case 0:
      return "Hotel";
    case 1:
      return "Homestay";
    case 2:
      return "Vila";
    default:
      return "N/A";
  }
};

function getCity(status) {
  switch (status) {
    case 0:
      return "Hồ Chí Minh";
    case 1:
      return "Đà Lạt";
    case 2:
      return "Đà Nẵng";
    case 3:
      return "Vũng Tàu";

    default:
      return "N/A";
  }
}
const Data = (handleShowMyModal, handleDetail, handleBooking) => {
  return [
    {
      title: "Tên khách sạn",
      dataIndex: "name",
      key: "name",
      width: 200,
      render: (item, record) => (
        <div
          style={{
            textAlign: "center",
            fontWeight: 500,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {record?.name}
        </div>
      ),
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      width: 100,
      render: (item, record) => (
        <div style={{ textAlign: "center", fontWeight: 500, color: "red" }}>
          {getTypeLabel(record?.type)}
        </div>
      ),
    },
    {
      title: "Thành phố",
      dataIndex: "province",
      key: "province",
      width: 120,
      render: (item, record) => (
        <div style={{ textAlign: "center", fontWeight: 500 }}>
          {getCity(record?.province)}
        </div>
      ),
    },
    {
      title: "Đánh giá",
      dataIndex: "num",
      key: "num",
      width: 70,
      render: (item, record) => (
        <div style={{ textAlign: "center", fontWeight: 500 }}>
          {record?.num === 0 ? "N/A" : `${record.num} sao`}
        </div>
      ),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      width: 500,
      render: (item, record) => {
        return (
          <div
            style={{
              textAlign: "center",
              fontWeight: 500,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {record?.address}
          </div>
        );
      },
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: 150,
      render: (item, record) =>
        record.price ? (
          <div
            style={{ textAlign: "right", fontWeight: 500, color: "#228B22" }}
          >
            {Format.vndPrice(record?.price)}
          </div>
        ) : (
          <div style={{ textAlign: "right", fontWeight: 500 }}>N/A</div>
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
      width: 150,
      render: (item, record) => {
        const isActive = record?.status === 0;

        return (
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
              onClick={() => handleShowMyModal(record)}
            >
              <FaRegPenToSquare />
            </Button>

            <Button
              style={{
                display: "flex",
                alignItems: "center",
                color: "rgb(255, 96, 0)",
                padding: "5px",
                justifyContent: "center",
              }}
              onClick={() => handleDetail(record.id)}
            >
              <MdMoreHoriz />
            </Button>

            {record?.type !== 0 && (
              <Button
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "rgb(255, 96, 0)",
                  padding: "5px",
                  justifyContent: "center",
                }}
                onClick={() => handleBooking(record)}
              >
                <RiCalendarCheckFill />
              </Button>
            )}
          </Flex>
        );
      },
    },
  ];
};

export default Data;
