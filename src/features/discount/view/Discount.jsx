import { useModal } from "@ebay/nice-modal-react";
import { Card, Col, Row, notification } from "antd";
import React, { useMemo } from "react";
import FilteredTable from "../../../components/foundation/common/FilteredTable.jsx";
import BaseModal from "../../../components/foundation/modal/BaseModal.jsx";
import Format from "../../../utils/format/Format.ts";
import strings from "../../../utils/localization/LocalizationString.ts";
import DiscountTable from "../viewmodal/column/DiscountTable.js";
import DiscountModal from "../viewmodal/modal/DiscountModal.js";
import { getDiscountDetail } from "../../../api/app/app.js";
import CreateDiscount from "./modal/CreateDiscount.jsx";
import ChangeStatus from "./modal/ChangeStatus.jsx";
export default function Discount() {
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
    onChangeStatus,
    onCreate,
    onUpdate,
  } = DiscountModal();

  const userModal = useModal(BaseModal);

  const handleShowMyModal = (info) => {
    userModal
      .show({
        title: `Thay đổi trạng thái ${info.id}`,
        children: <ChangeStatus info={info.status} />,

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
          status: values?.status,
          id: info.id,
        };
        onChangeStatus(params);
      })
      .catch((e) => {});
  };

  const handleShow = () => {
    userModal
      .show({
        title: `Thêm mã giảm giá mới`,
        children: <CreateDiscount />,
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
          discount: +values.discount,
          quantity: +values.quantity,
        };
        onCreate(params);
      })
      .catch((e) => {});
  };

  const update = async () => {
    if (selectedRowKeys.length !== 1 || selectedRows.length === 0) {
      notification.warning({
        message: "Vui lòng chọn một mã giảm giá!",
      });
      return;
    }
    const id = selectedRowKeys;
    const name = selectedRows[0].name;

    if (id.length === 1) {
      const res = await getDiscountDetail(id[0]);
      userModal
        .show({
          title: `Cập nhập thông tin mã giảm giá ${name}`,
          children: <CreateDiscount info={res.data} />,
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
            discount: +values.discount,
            quantity: +values.quantity,
          };
          onUpdate(params);
        })
        .catch((e) => {});
    } else {
      notification.warning({
        message: "Vui lòng chọn một mã giảm giá để cập nhật.",
      });
    }
  };
  const addTitleButtons = [
    { title: "Thêm mã giảm giá mới", onClick: handleShow },
    { title: "Cập nhập ", onClick: update },
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
        name: "status",
        title: "Trạng thái",
        type: "options",
        options: [
          { label: strings.All, value: -1 },
          { label: "Hoạt Động", value: 0 },
          { label: "Tạm Khóa", value: 1 },
        ],
        selectProps: {
          value: filterParams.status,
        },
      },
      {
        name: "name",
        title: "Tìm kiếm theo tên",
        type: "string",
        inputProps: {
          value: filterParams.nameSearch,
        },
      },
      {
        name: "discount",
        title: "Phần trăm",
        type: "price",
        inputProps: {
          value: filterParams.discount,
        },
      },
      {
        name: "dateRange",
        title: " Chọn ngày",
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
              }}
              addTitleButtonProps={addTitleButtons}
              tableProps={{
                loading: loading,
                onChange: onTablePageChanged,
                size: "middle",
                columns: DiscountTable(handleShowMyModal),
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
