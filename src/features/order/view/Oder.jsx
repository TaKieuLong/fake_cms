import { useModal } from "@ebay/nice-modal-react";
import { Card, Col, Row, notification } from "antd";
import React, { useMemo } from "react";
import { getOrderDetail } from "../../../api/app/app.js";
import FilteredTable from "../../../components/foundation/common/FilteredTable.jsx";
import BaseModal from "../../../components/foundation/modal/BaseModal.jsx";
import Format from "../../../utils/format/Format.ts";
import OrderTable from "../viewmodal/column/OrderTable.js";
import OrderModal from "../viewmodal/modal/OrderModal.js";
import Detail from "./modal/Detail.jsx";
import ChangeStatus from "./modal/ChangeStatus.jsx";

export default function Order() {
  const {
    loading,
    listHistory,
    total,
    pageSize,
    page,
    filterParams,
    selectedRowKeys,
    selectedRows,
    date,
    StartDate,
    onSelectedRowsChange,
    onFilteredParamsChanged,
    onTablePageChanged,
    getListHistory,
    onChangeStatus,
  } = OrderModal();

  const userModal = useModal(BaseModal);

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

  const handleDetail = async (id) => {
    try {
      const res = await getOrderDetail(id);
      if (res.code === 1) {
        userModal
          .show({
            title: `Thông tin chi tiết đơn ${res?.data?.id}`,
            children: <Detail info={res?.data} />,

            footer: [
              {
                title: "Đóng",
                htmlType: "button",
                type: "primary",
              },
            ],
          })
          .then((values) => {})
          .catch((e) => {});
      } else {
        notification.error({
          message: `${res?.mess}`,
        });
      }
    } catch (error) {
      notification.error({
        message: "Có lỗi xảy ra vui lòng thử lại sau",
      });
    }
  };

  const handleConfirm = async (info) => {
    userModal
      .show({
        title: `Trạng thái đơn ${info?.id}`,
        children: <ChangeStatus info={info?.status} />,
        footer: [
          {
            title: "Xác nhận",
            htmlType: "submit",
          },
          {
            title: "Đóng",
            htmlType: "button",
            type: "primary",
          },
        ],
      })
      .then((values) => {
        const updatedValues = {
          ...values,
          id: info?.id,
          paidAmount: +values?.paidAmount,
        };
        onChangeStatus(updatedValues);
      })
      .catch((e) => {});
  };

  const filter = useMemo(() => {
    const filterOptions = [
      {
        name: "name",
        title: "Tên",
        type: "string",
        inputProps: {
          value: filterParams.nameSearch,
        },
      },
      {
        name: "phoneNumber",
        title: "Số điện thoại",
        type: "string",
        inputProps: {
          value: filterParams.phoneNumber,
        },
      },
      {
        name: "dateRange",
        title: "Ngày",
        type: "rangedate",
        RangePickerProps: {
          defaultStartDate: StartDate,
          currentDate: date,
        },
      },
    ];

    return filterOptions;
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                nameSearch: "",
              }}
              addTitleButtonProp
              tableProps={{
                loading: loading,
                onChange: onTablePageChanged,
                size: "middle",
                columns: OrderTable(handleDetail, handleConfirm),
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
