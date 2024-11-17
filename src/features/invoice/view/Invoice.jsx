import { useModal } from "@ebay/nice-modal-react";
import { Card, Col, Row, notification } from "antd";
import React, { useMemo } from "react";
import { getInvoiceDetail } from "../../../api/app/app.js";
import FilteredTable from "../../../components/foundation/common/FilteredTable.jsx";
import BaseModal from "../../../components/foundation/modal/BaseModal.jsx";
import Format from "../../../utils/format/Format.ts";
import InvoiceTable from "../viewmodal/column/InvoiceTable.js";
import InvoiceModal from "../viewmodal/modal/InvoiceModal.js";
import Detail from "./modal/Detail.jsx";
import Checkout from "./modal/Checkout.jsx";

export default function Invoice() {
  const {
    date,
    StartDate,
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
  } = InvoiceModal();

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

  const handleDetail = async (info) => {
    try {
      userModal
        .show({
          title: `Thông tin chi tiết ${info?.invoiceCode}`,
          children: <Detail info={info} />,
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
    } catch (error) {
      notification.error({
        message: "Có lỗi xảy ra vui lòng thử lại sau",
      });
    }
  };

  const handleUpdate = async (info) => {
    userModal
      .show({
        title: `Thanh toán ${info?.invoiceCode}`,
        children: <Checkout info={info} />,
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
          id: info?.id,
          paymentType: +values?.paymentType,
        };
        onChangeStatus(updatedValues);
      })
      .catch((e) => {});
  };

  const filter = useMemo(() => {
    const filterOptions = [
      {
        name: "invoiceCode",
        title: "Mã đơn",
        type: "string",
        inputProps: {
          value: filterParams.invoiceCode,
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
                nameSearch: "",
              }}
              addTitleButtonProp
              tableProps={{
                loading: loading,
                onChange: onTablePageChanged,
                size: "middle",
                columns: InvoiceTable(handleDetail, handleUpdate),
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
