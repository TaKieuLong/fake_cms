import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getRevenue } from "../../../api/app/app";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const useHomeModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);

  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);

  const currentMonth = dayjs().format("MM/YYYY");
  const lastMonth = dayjs().subtract(1, "month").format("MM/YYYY");

  const getList = async () => {
    try {
      setIsLoading(true);
      const response = await getRevenue();
      setList(response);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    if (list?.monthlyRevenue) {
      const tempLabels = [];
      const tempDatasetRevenue = [];
      const tempDatasetOrders = [];

      list.monthlyRevenue.forEach((item) => {
        tempLabels.push(item.month);
        tempDatasetRevenue.push(item.revenue);
        tempDatasetOrders.push(item.orderCount);
      });

      setLabels(tempLabels);
      setDatasets([
        {
          label: "Doanh thu",
          data: tempDatasetRevenue,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          yAxisID: "y1", // Đặt cho trục y thứ nhất
        },
        {
          label: "Số đơn hàng",
          data: tempDatasetOrders,
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
        },
      ]);
    }
  }, [list]);

  return {
    isLoading,
    list,
    lastMonth,
    currentMonth,
    labels,
    datasets,
  };
};
