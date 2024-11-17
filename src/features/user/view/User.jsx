import { useModal } from "@ebay/nice-modal-react";
import { Card, Col, Row } from "antd";
import React, { useMemo } from "react";
import FilteredTable from "../../../components/foundation/common/FilteredTable.jsx";
import BaseModal from "../../../components/foundation/modal/BaseModal.jsx";
import { useAuth } from "../../../global/context/AuthenticationContext";
import Format from "../../../utils/format/Format.ts";
import strings from "../../../utils/localization/LocalizationString.ts";
import UserTable from "../viewmodal/cloum/UserTable.js";
import useUserModal from "../viewmodal/modal/UserModal.js";
import ChangeStatus from "./modal/ChangeStatus.jsx";
import CreateUser from "./modal/CreateUser.jsx";

export default function User() {
  const { profile } = useAuth();

  const {
    loading,
    listHistory,
    total,
    pageSize,
    page,
    filterParams,
    onFilteredParamsChanged,
    onTablePageChanged,
    getListHistory,
    onChangeStatus,
    onCreate,
  } = useUserModal();

  const userModal = useModal(BaseModal);

  const handleShowMyModal = (info) => {
    userModal
      .show({
        title: `Thay đổi trạng thái của user ${info.id}`,
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
        title: `Thêm tài khoản mới`,
        children: <CreateUser />,
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
        onCreate(values);
      })
      .catch((e) => {});
  };

  const addTitleButtons = [
    { title: "Thêm tài khoản mới", onClick: handleShow },
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
              name: "role",
              title: "Vai trò",
              type: "options",
              options: [
                { label: strings.All, value: -1 },
                { label: "User", value: 0 },
                { label: "SuperAdmin", value: 1 },
                { label: "Admin", value: 2 },
              ],
              selectProps: {
                value: filterParams.role,
              },
            },
          ]
        : []),
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
              initialValues={{
                ...filterParams,
                status: -1,
                role: -1,
                nameSearch: "",
              }}
              addTitleButtonProps={addTitleButtons}
              tableProps={{
                loading: loading,
                onChange: onTablePageChanged,
                size: "middle",
                columns: UserTable(handleShowMyModal),
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
