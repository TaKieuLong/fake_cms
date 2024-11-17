import { Button, Flex } from "antd";
import { FaRegPenToSquare } from "react-icons/fa6";
import { MdMoreHoriz } from "react-icons/md";
import Format from "../../../../utils/format/Format.ts";

const Data = (handleShowMyModal, handleDetail) => {
  return [
    {
      title: "Tên lưu chú",
      dataIndex: "parentsName",
      key: "parentsName",
      width: 120,
      render: (item, record) => (
        <div
          style={{
            textAlign: "center",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {record?.parents?.name}
        </div>
      ),
    },
    {
      title: "Tên phòng",
      dataIndex: "roomName",
      key: "roomName",
      width: 150,
      render: (item, record) => (
        <div
          style={{
            textAlign: "center",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {record?.roomName}
        </div>
      ),
    },
    {
      title: "Số giường",
      dataIndex: "numBed",
      key: "numBed",
      width: 100,
      render: (item, record) => (
        <div style={{ textAlign: "center" }}>{record?.numBed}</div>
      ),
    },
    {
      title: "Số WC",
      dataIndex: "numTolet",
      key: "numTolet",
      width: 100,
      render: (item, record) => (
        <div style={{ textAlign: "center" }}>{record?.numTolet}</div>
      ),
    },
    {
      title: "Diện tích (m²)",
      dataIndex: "acreage",
      key: "acreage",
      width: 100,
      render: (item, record) => (
        <div style={{ textAlign: "center" }}>{record?.acreage} m²</div>
      ),
    },
    {
      title: "Giá (VND)",
      dataIndex: "price",
      key: "price",
      width: 120,
      render: (item, record) => (
        <div style={{ textAlign: "right", fontWeight: 500, color: "#228B22" }}>
          {Format.vndPrice(record?.price)}
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
      title: "Số người",
      dataIndex: "people",
      key: "people",
      width: 100,
      render: (item, record) => (
        <div style={{ textAlign: "center" }}>{record?.people}</div>
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
              onClick={() => handleDetail(record?.id)}
            >
              <MdMoreHoriz />
            </Button>
          </Flex>
        );
      },
    },
  ];
};

export default Data;
