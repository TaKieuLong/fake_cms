import { Button, Flex, Tooltip } from "antd";
import { FaRegTrashAlt } from "react-icons/fa";
import { SlNote } from "react-icons/sl";
import Format from "../../../../utils/format/Format.ts";
const Data = (handleDelete, selectedRowKeys, Update) => {
  return [
    {
      title: "Tên kỳ nghỉ",
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
      title: "Phần trăm",
      dataIndex: "price",
      key: "price",
      width: 90,
      render: (item, record) => (
        <div style={{ textAlign: "right", fontWeight: 500 }}>
          {record?.price}%
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
           <Tooltip title="Xóa">
          <Button
            style={{
              display: "flex",
              alignItems: "center",
              color: "rgb(255, 96, 0)",
              padding: "5px",
              justifyContent: "center",
            }}
            onClick={() => {
              const idsToDelete =
                selectedRowKeys.length > 0 ? selectedRowKeys : [record.id];
              handleDelete(idsToDelete);
            }}
          >
            <FaRegTrashAlt />
          </Button>
          </Tooltip>
          <Tooltip title="Cập nhật">
          <Button
            style={{
              display: "flex",
              alignItems: "center",
              color: "rgb(255, 96, 0)",
              padding: "5px",
              justifyContent: "center",
            }}
            onClick={() => Update(record?.id, record?.name)}
          >
            <SlNote />
          </Button>
          </Tooltip>
        </Flex>
      ),
    },
  ];
};

export default Data;
