import { notification } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getUser, ChangeUserStatus, CreateUser } from "../../../../api/app/app";

const currentDate = dayjs();
const defaultStartDate = currentDate.subtract(30, "day");
const StartDate = defaultStartDate.format("YYYY-MM-DD");
const date = currentDate.format("YYYY-MM-DD");

const UserModal = () => {
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
      const response = await getUser(finalParams);
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
    await getListHistory();
  };

  const onChangeStatus = async (values) => {
    try {
      setLoading(true);

      let response = await ChangeUserStatus(values);

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

      let response = await CreateUser(values);

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

  return {
    date,
    StartDate,
    loading,
    listHistory,
    total,
    pageSize,
    page,
    filterParams,
    setFilterParams,
    onTablePageChanged,
    getListHistory,
    onFilteredParamsChanged,
    onChangeStatus,
    onCreate,
  };
};
export default UserModal;
