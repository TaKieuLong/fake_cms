import { useModal } from "@ebay/nice-modal-react";
import { Card, Col, Row, notification } from "antd";
import React, { useMemo } from "react";
import { getRoomDetail } from "../../../api/app/app.js";
import FilteredTable from "../../../components/foundation/common/FilteredTable";
import BaseModal from "../../../components/foundation/modal/BaseModal.jsx";
import Format from "../../../utils/format/Format.ts";
import strings from "../../../utils/localization/LocalizationString.ts";
import ProductTable from "../viewmodal/cloum/ProductTable";
import useProductModal from "../viewmodal/modal/ProductModal";
import ChangeStatus from "./modal/ChangeStatus.jsx";
import Detail from "./modal/Detail.jsx";
import CreatRoom from "../../hotel/view/modal/CreateRoom.jsx";
import Booking from "./modal/Booking.jsx";

export default function Product() {
  const {
    loading,
    listHistory,
    total,
    pageSize,
    page,
    filterParams,
    selectedRowKeys,
    selectedRows,
    setFilterParams,
    onTablePageChanged,
    getListHistory,
    onFilteredParamsChanged,
    onSelectedRowsChange,
    onChangeStatus,
    onUpdate,
    onBooking,
  } = useProductModal();

  const userModal = useModal(BaseModal);

  const handleShowMyModal = (info) => {
    userModal
      .show({
        title: `Thay đổi trạng thái của room ${info?.id}`,
        children: <ChangeStatus info={info?.status} />,

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

  const handleDetail = async (info) => {
    try {
      const res = await getRoomDetail(info);
      if (res.code === 1) {
        userModal
          .show({
            title: `Thông tin chi tiết phòng ${info}`,
            children: <Detail info={res?.data} />,
            className: "detail-modal",
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

  const update = async () => {
    const id = selectedRowKeys;

    if (id?.length === 1) {
      const res = await getRoomDetail(id[0]);
      userModal
        .show({
          title: `Cập nhập Lưu trú [${id}]`,
          children: <CreatRoom info={res.data} />,
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
            price: +values.price,
            numBed: +values.numBed,
            numTolet: +values.numTolet,
            people: +values.people,
            acreage: +values.acreage,
          };
          onUpdate(params);
        })
        .catch((e) => {});
    } else {
      notification.warning({
        message: "Vui lòng chọn một Lưu trú để cập nhập.",
      });
    }
  };

  const handleBooking = async () => {
    const id = selectedRowKeys;

    if (id?.length > 0) {
      const allHaveSameParentId = selectedRows.every(
        (row) => row.parents?.id === selectedRows[0]?.parents?.id
      );

      if (allHaveSameParentId) {
        userModal
          .show({
            title: `Đặt phòng `,
            children: <Booking />,
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
            const [checkInDate, checkOutDate] = values.dateRange || [];
            let params = {
              accommodationId: selectedRows[0]?.parents?.id,
              roomId: selectedRowKeys,
              guestEmail: values?.guestEmail,
              guestName: values?.guestName,
              guestPhone: values?.guestPhone,
              checkInDate: Format.formatDate(checkInDate),
              checkOutDate: Format.formatDate(checkOutDate),
            };
            onBooking(params);
          })
          .catch((e) => {});
      } else {
        notification.error({
          message: "Các phòng phải có cùng nơi lưu chú để đặt",
        });
      }
    } else {
      notification.error({
        message: "Hãy chọn phòng để đặt",
      });
    }
  };

  const addTitleButtons = [
    { title: "Cập nhập", onClick: update },
    { title: "Đặt phòng", onClick: handleBooking },
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
        return Format.formatDate(date);
      });

      if (formattedDates.length === 2) {
        const [fromDate, toDate] = formattedDates;
        newFilterParams.fromDate = fromDate;
        newFilterParams.toDate = toDate;
      }
      delete newFilterParams.dateRange;
    }

    onFilteredParamsChanged(newFilterParams);
  };

  const handleSubmit = () => {
    getListHistory();
  };

  const filter = useMemo(() => {
    const filterOptions = [
      {
        name: "accommodation",
        title: "Lưu trú",
        type: "string",
        inputProps: {
          value: filterParams.accommodation,
        },
      },

      {
        name: "province",
        title: "Thành phố",
        type: "options",
        options: [
          { label: strings.All, value: -1 },
          { label: "TP.HCM", value: 0 },
          { label: "Đà Lạt", value: 1 },
          { label: "Vũng Tàu", value: 2 },
          { label: "Đà Nẵng", value: 3 },
        ],
        selectProps: {
          value: filterParams.province,
        },
      },
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
        title: "Tìm kiếm",
        type: "string",
        inputProps: {
          value: filterParams.nameSearch,
        },
      },
      {
        name: "numBed",
        title: "Số phòng",
        type: "price",
        inputProps: {
          value: filterParams.numBed,
        },
      },
      {
        name: "numTolet",
        title: "Số WC",
        type: "price",
        inputProps: {
          value: filterParams.numTolet,
        },
      },
      {
        name: "people",
        title: "Sức chứa",
        type: "price",
        inputProps: {
          value: filterParams.people,
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
              selectedRowKeys={selectedRowKeys}
              selectedRows={selectedRows}
              onSelectedRowsChange={onSelectedRowsChange}
              initialValues={{
                ...filterParams,
                status: -1,
                type: -1,
                province: -1,
                nameSearch: "",
                accommodation: "",
                people: "",
                numTolet: "",
                numBed: "",
              }}
              addTitleButtonProps={addTitleButtons}
              tableProps={{
                loading: loading,
                onChange: onTablePageChanged,
                size: "middle",
                columns: ProductTable(handleShowMyModal, handleDetail),
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
