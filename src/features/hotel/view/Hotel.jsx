import { useModal } from "@ebay/nice-modal-react";
import { Card, Col, Row, notification } from "antd";
import React, { useMemo } from "react";
import { getAccommodationDetail } from "../../../api/app/app.js";
import FilteredTable from "../../../components/foundation/common/FilteredTable.jsx";
import BaseModal from "../../../components/foundation/modal/BaseModal.jsx";
import { useAuth } from "../../../global/context/AuthenticationContext.js";
import Format from "../../../utils/format/Format.ts";
import strings from "../../../utils/localization/LocalizationString.ts";
import HotelTable from "../viewmodal/cloum/HotelTable.js";
import useHotelModal from "../viewmodal/modal/HotelModal.js";
import ChangeStatus from "./modal/ChangeStatus.jsx";
import CreateAccomodation from "./modal/CreateAccomodation.jsx";
import CreatRoom from "./modal/CreateRoom.jsx";
import Detail from "./modal/Detail.jsx";
import Booking from "./modal/Booking.jsx";

export default function Hotel() {
  const { profile, selectedBenefits, benefits } = useAuth();

  const {
    loading,
    listHistory,
    total,
    pageSize,
    page,
    filterParams,
    selectedRows,
    selectedRowKeys,
    onTablePageChanged,
    getListHistory,
    onFilteredParamsChanged,
    onChangeStatus,
    onCreate,
    onUpdate,
    onCreateRoom,
    onSelectedRowsChange,
    handleSelectBenefitsChange,
    onBooking,
  } = useHotelModal();

  const userModal = useModal(BaseModal);

  const handleShowMyModal = (info) => {
    userModal
      .show({
        title: `Thay đổi trạng thái của lưu trú ${info.id}`,
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
        title: `Thêm lưu trú mới`,
        children: <CreateAccomodation />,
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
        const refixbenefits = handleSelectBenefitsChange(values.benefits);

        let params = {
          ...values,
          numBed: +values.numBed,
          numTolet: +values.numTolet,
          people: +values.people,
          price: +values.price,
          benefits: refixbenefits.map((name) => ({
            id: benefits.find((b) => b.name === name)?.id || 0,
            name,
          })),
        };

        onCreate(params);
      })
      .catch((e) => {});
  };

  const createRoom = () => {
    if (selectedRows.length === 0 || selectedRowKeys.length !== 1) {
      notification.warning({
        message: "Vui lòng chọn một cơ sở lưu trú để thêm Phòng mới!",
      });
      return;
    }
    const id = selectedRowKeys[0];
    const name = selectedRows[0].name;
    const type = selectedRows[0].type;
    if (id >= 1 && type === 0) {
      userModal
        .show({
          title: `Thêm Phòng mới cho Lưu trú [${name}]`,
          children: <CreatRoom />,
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
            price: +values.price,
            numBed: +values.numBed,
            numTolet: +values.numTolet,
            acreage: +values.acreage,
            people: +values.people,
            accommodationId: id,
          };
          onCreateRoom(params);
        })
        .catch((e) => {});
    } else {
      notification.warning({
        message: "Vui lòng chọn một Lưu trú dạng Hotel để thêm Phòng mới.",
      });
    }
  };

  const update = async () => {
    const id = selectedRowKeys;

    if (id.length === 1) {
      const res = await getAccommodationDetail(id[0]);
      userModal
        .show({
          title: `Cập nhập Lưu trú [${id}]`,
          children: <CreateAccomodation info={res.data} />,
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
          let formatedTimeCheckin = values?.timeCheckIn.format("h:mm A");
          let formatedTimeCheckout = values?.timeCheckOut.format("h:mm A");

          let params = {
            ...values,
            id: id[0],
            price: +values.price,
            numBed: +values.numBed,
            numTolet: +values.numTolet,
            people: +values.people,
            timeCheckIn: formatedTimeCheckin,
            timeCheckOut: formatedTimeCheckout,
            benefits: values.benefits.map((name) => ({
              id: benefits.find((b) => b.name === name)?.id || 0,
              name,
            })),
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

  const handleDetail = async (info) => {
    try {
      const res = await getAccommodationDetail(info);
      if (res.code === 1) {
        userModal
          .show({
            title: `Thông tin chi tiết phòng ${info?.name}`,
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

  const handleBooking = async (info) => {
    userModal
      .show({
        title: `Đặt phòng ${info?.name}`,
        children: <Booking info={info} />,
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
          accommodationId: info?.id,
          guestEmail: values?.guestEmail,
          guestName: values?.guestName,
          guestPhone: values?.guestPhone,
          checkInDate: Format.formatDate(checkInDate),
          checkOutDate: Format.formatDate(checkOutDate),
        };
        onBooking(params);
      })
      .catch((e) => {});
  };

  const addTitleButtons = [
    {
      title: "Thêm Lưu trú ",
      onClick: handleShow,
    },
    { title: "Thêm Phòng ", onClick: createRoom },
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
      ...(profile.role === 1
        ? [
            {
              name: "user",
              title: "Người tạo",
              type: "string",
              inputProps: {
                value: filterParams.user,
              },
            },
          ]
        : []),
      {
        name: "type",
        title: "Dạng",
        type: "options",
        options: [
          { label: strings.All, value: -1 },
          { label: "Hotel", value: 0 },
          { label: "Homestay", value: 1 },
          { label: "Villa", value: 2 },
        ],
        selectProps: {
          value: filterParams.type,
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
        type: "string",
        inputProps: {
          value: filterParams.numBed,
        },
      },
      {
        name: "numTolet",
        title: "Số WC",
        type: "string",
        inputProps: {
          value: filterParams.numTolet,
        },
      },
      {
        name: "people",
        title: "Sức chứa",
        type: "string",
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
              addTitleButtonProps={profile.role !== 1 ? addTitleButtons : []}
              tableProps={{
                loading: loading,
                onChange: onTablePageChanged,
                size: "middle",
                columns: HotelTable(
                  handleShowMyModal,
                  handleDetail,
                  handleBooking
                ),
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
