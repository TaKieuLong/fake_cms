import { notification } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  ChangeHotelStatus,
  CreateHotel,
  CreateRoom,
  getHotel,
  UpdateHotel,
  CreateBooking,
} from "../../../../api/app/app";
import { useAuth } from "../../../../global/context/AuthenticationContext";

const currentDate = dayjs();
const defaultStartDate = currentDate.subtract(30, "day");
const StartDate = defaultStartDate.format("YYYY-MM-DD");
const date = currentDate.format("YYYY-MM-DD");

const HotelModal = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listHistory, setListHistory] = useState([]);

  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [filterParams, setFilterParams] = useState({
    page: page,
    limit: pageSize,
  });

  const { setRefreshBenefits, benefits } = useAuth();

  const getListHistory = async (Params) => {
    let finalParams = Params || filterParams;
    try {
      setLoading(true);
      const response = await getHotel(finalParams);
      setListHistory(response?.data);
      setTotal(response?.pagination?.total);
    } catch (error) {
      notification.error({
        message: "Có lỗi xảy ra vui lòng thử lại sau",
      });
    } finally {
      setLoading(false);
      setPageSize(finalParams.limit);
      setPage(finalParams.page);
    }
  };

  const onTablePageChanged = (pagination) => {
    setPageSize(pagination.pageSize);
    setPage(pagination.current - 1);
    let finalParams;
    if (filterParams.limit !== pagination?.pageSize) {
      finalParams = {
        ...filterParams,
        page: 0,
        limit: +pagination?.pageSize,
      };
    } else {
      finalParams = {
        ...filterParams,
        page: pagination.current - 1,
        limit: pagination.pageSize,
      };
    }
    setFilterParams(finalParams);
    getListHistory(finalParams);
  };

  useEffect(() => {
    getListHistory();
  }, []);

  const onFilteredParamsChanged = (filterParams) => {
    let finalParams = {
      ...filterParams,
      page: 0,
      limit: pageSize,
    };
    setFilterParams(finalParams);
    getListHistory(finalParams);
  };

  const reload = async () => {
    setSelectedRowKeys([]);
    setSelectedRows([]);
    await getListHistory();
  };

  const onChangeStatus = async (values) => {
    try {
      setLoading(true);
      let response = await ChangeHotelStatus(values);

      if (response.code === 1) {
        notification.success({
          message: `${response.mess}`,
        });
        await reload();
      } else {
        notification.error({
          message: `${response.mess}`,
        });
      }
    } catch (error) {
      notification.error({
        message: "Có lỗi xảy ra khi thay đổi độ trạng thái",
      });
    } finally {
      setLoading(false);
    }
  };

  const onCreate = async (values) => {
    try {
      setLoading(true);

      let response = await CreateHotel(values);

      if (response.code === 1) {
        notification.success({
          message: `${response.mess}`,
        });
        await reload();
        setRefreshBenefits(true);
      } else {
        notification.error({
          message: `${response.mess}`,
        });
      }
    } catch (error) {
      notification.error({
        message: "Có lỗi xảy ra khi tạo cơ sở lưu trú!",
      });
    } finally {
      setLoading(false);
    }
  };

  const onUpdate = async (values) => {
    try {
      setLoading(true);

      let response = await UpdateHotel(values);

      if (response.code === 1) {
        notification.success({
          message: `${response.mess}`,
        });
        await reload();
        setRefreshBenefits(true);
      } else {
        notification.error({
          message: `${response.mess}`,
        });
      }
    } catch (error) {
      notification.error({
        message: "Có lỗi xảy ra khi cập nhật cơ sở lưu trú!",
      });
    } finally {
      setLoading(false);
    }
  };

  const onCreateRoom = async (values) => {
    try {
      setLoading(true);

      let response = await CreateRoom(values);

      if (response.code === 1) {
        notification.success({
          message: `${response.mess}`,
        });
        await reload();
      } else {
        notification.error({
          message: `${response.mess}`,
        });
      }
    } catch (error) {
      notification.error({
        message: "Có lỗi xảy ra khi tạo cơ sở lưu trú!",
      });
    } finally {
      setLoading(false);
    }
  };

  const onSelectedRowsChange = (record) => {
    let selectedKeys = record.map((item) => item.id);
    setSelectedRowKeys(selectedKeys);
    setSelectedRows(record);
  };

  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
      .replace(/\s+/g, " ");
  };

  const handleSelectBenefitsChange = (value) => {
    const standardizedBenefits = value.map((input) => {
      const normalizedInput = normalizeText(input);
      const existingBenefit = benefits.find(
        (benefit) => normalizeText(benefit.name) === normalizedInput
      );

      return existingBenefit ? existingBenefit.name : input.trim();
    });
    const uniqueBenefits = [...new Set(standardizedBenefits)];
    return uniqueBenefits;
  };

  const onBooking = async (values) => {
    try {
      setLoading(true);
      let response = await CreateBooking(values);

      if (response.code === 1) {
        notification.success({
          message: `${response.mess}`,
        });
        await reload();
        setRefreshBenefits(true);
      } else {
        notification.error({
          message: `${response.mess}`,
        });
      }
    } catch (error) {
      notification.error({
        message: "Có lỗi xảy ra khi tạo cơ sở lưu trú!",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    date,
    StartDate,
    loading,
    listHistory,
    total,
    pageSize,
    page,
    filterParams,
    selectedRows,
    selectedRowKeys,
    setFilterParams,
    onTablePageChanged,
    getListHistory,
    onFilteredParamsChanged,
    onChangeStatus,
    onCreate,
    onUpdate,
    onSelectedRowsChange,
    onCreateRoom,
    handleSelectBenefitsChange,
    onBooking,
  };
};

export default HotelModal;
