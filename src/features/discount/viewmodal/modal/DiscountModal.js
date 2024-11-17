import { notification } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  ChangeDiscountStatus,
  CreateDiscount,
  UpdateDiscount,
  getDiscount,
} from "../../../../api/app/app";

const currentDate = dayjs();
const defaultStartDate = currentDate.subtract(30, "day");
const StartDate = defaultStartDate.format("YYYY-MM-DD");
const date = currentDate.format("YYYY-MM-DD");

const DiscountModal = () => {
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
  const getListHistory = async (Params) => {
    let finalParams = Params || filterParams;

    try {
      setLoading(true);
      const response = await getDiscount(finalParams);
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
      let response = await ChangeDiscountStatus(values);

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

      let response = await CreateDiscount(values);

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
        message: "Có lỗi xảy ra khi tạo mã giảm giá mới!",
      });
    } finally {
      setLoading(false);
    }
  };

  const onUpdate = async (values) => {
    try {
      setLoading(true);

      let response = await UpdateDiscount(values);

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
        message: "Có lỗi xảy ra khi cập nhật mã giảm giá!",
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
  };
};

export default DiscountModal;
