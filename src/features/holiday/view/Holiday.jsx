import { useModal } from "@ebay/nice-modal-react";
import { Card, Col, Modal, Row, notification } from "antd";
import React, { useMemo } from "react";
import { getHolidayDetail } from "../../../api/app/app.js";
import FilteredTable from "../../../components/foundation/common/FilteredTable.jsx";
import BaseModal from "../../../components/foundation/modal/BaseModal.jsx";
import Format from "../../../utils/format/Format.ts";
import HolidayTable from "../viewmodal/column/HolidayTable.jsx";
import HolidayModal from "../viewmodal/modal/HolidayModal.js";
import CreateHoliday from "./modal/CreateHoliday.jsx";
export default function Holiday() {
  const {
    loading,
    listHistory,
    total,
    pageSize,
    page,
    filterParams,
    selectedRowKeys,
    selectedRows,
    onSelectedRowsChange,
    onFilteredParamsChanged,
    onTablePageChanged,
    getListHistory,
    onCreate,
    onUpdate,
    onDelete,
  } = HolidayModal();

  const userModal = useModal(BaseModal);

  const handleDelete = (ids) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa ngày lễ?",
      content: "Thao tác này không thể hoàn tác.",
      okText: "Có",
      cancelText: "Hủy",
      okButtonProps: { style: { backgroundColor: "blue", color: "#fff" } },
      onOk: async () => {
        try {
          await onDelete(ids);
        } catch (error) {}
      },
    });
  };

  const handleShow = () => {
    userModal
      .show({
        title: `Thêm kỳ nghỉ lễ mới`,
        children: <CreateHoliday />,
        footer: [
          {
            title: "Xác nhận",
            htmlType: "submit",
          },
          {
            title: "Hủy",
            htmlType: "button",
            type: "primary",
          },
        ],
      })
      .then((values) => {
        let params = {
          ...values,
          fromDate: Format.formatDate(values.fromDate),
          toDate: Format.formatDate(values.toDate),
          price: +values.price,
        };
        onCreate(params);
      })
      .catch((e) => {});
  };

  const update = async (id, name) => {
    if (!!id) {
      const res = await getHolidayDetail(id);
      userModal
        .show({
          title: `Cập nhập thông tin ngày lễ ${name}`,
          children: <CreateHoliday info={res.data} />,
          className: "modal-hotel",
          footer: [
            {
              title: "Xác nhận",
              htmlType: "submit",
            },
            {
              title: "Hủy",
              htmlType: "button",
              type: "primary",
            },
          ],
        })
        .then((values) => {
          let params = {
            ...values,
            id: id[0],
            fromDate: Format.formatDate(values.fromDate),
            toDate: Format.formatDate(values.toDate),
            price: +values.price,
          };
          onUpdate(params);
        })
        .catch((e) => {});
    } else {
      notification.warning({
        message: "Vui lòng chọn một ngày lễ để cập nhập.",
      });
    }
  };

  const addTitleButtons = [
    { title: "Thêm kỳ nghỉ lễ mới", onClick: handleShow },
  ];

  const onFilteredChanged = (values) => {
    let newFilterParams = {
      ...filterParams,
      ...values,
    };
    Object.keys(values).forEach((key) => {
      let value = values[key];
      if (
        value === -1 ||
        value === undefined ||
        value === "" ||
        value == null
      ) {
        delete newFilterParams[key];
      }
    });

    if (newFilterParams?.dateRange) {
      const formattedDates = newFilterParams.dateRange.map((date) => {
        return date ? Format.formatDate(date) : null;
      });
      if (formattedDates.length === 1) {
        newFilterParams.fromDate = formattedDates[0];
        newFilterParams.toDate = null;
      } else if (formattedDates.length === 2) {
        const [fromDate, toDate] = formattedDates;
        newFilterParams.fromDate = fromDate;
        newFilterParams.toDate = toDate;
      }
      delete newFilterParams.dateRange;
    } else {
      delete newFilterParams.fromDate;
      delete newFilterParams.toDate;
    }

    onFilteredParamsChanged(newFilterParams);
  };

  const handleSubmit = () => {
    getListHistory();
  };

  const filter = useMemo(() => {
    const filterOptions = [
      {
        name: "name",
        title: "Tìm kiếm theo tên",
        type: "string",
        inputProps: {
          value: filterParams.nameSearch,
        },
      },
      {
        name: "price",
        title: "Phần trăm",
        type: "price",
        inputProps: {
          value: filterParams.price,
        },
      },
      {
        name: "dateRange",
        title: "Ngày",
        type: "rangedate",
      },
    ];

    return filterOptions;
  }, []);

  return (
    <div className="table">
      <Card>
        <Row
          gutter={[8, 8]}
          className="px-8 pt-2"
          style={{ position: "relative" }}
        >
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <FilteredTable
              filters={filter}
              onFinish={handleSubmit}
              onChange={onFilteredChanged}
              onSelectedRowsChange={onSelectedRowsChange}
              selectedRowKeys={selectedRowKeys}
              selectedRows={selectedRows}
              initialValues={{
                ...filterParams,
                status: -1,
                type: -1,
                province: -1,
                nameSearch: "",
                user: "",
                people: "",
                numTolet: "",
                numBed: "",
              }}
              addTitleButtonProps={addTitleButtons}
              tableProps={{
                loading: loading,
                onChange: onTablePageChanged,
                size: "middle",
                columns: HolidayTable(handleDelete, selectedRowKeys, update),
                dataSource: listHistory,
                scroll: { x: 1200, y: 550 },
                pagination: {
                  pageSize: pageSize,
                  current: page + 1,
                  total: total || 0,
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "20", "50", "100"],
                },
              }}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
}
