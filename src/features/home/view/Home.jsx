import React from "react";
import { useHomeModal } from "../viewmodal/HomeModal.js";
import { Card, Row, Col } from "antd";
import BarChart from "../../../components/foundation/chatjs/Barchat.jsx";
import Format from "../../../utils/format/Format.ts";

export default function Home() {
  const { list, lastMonth, currentMonth, labels, datasets } = useHomeModal();

  return (
    <div className="custom_home">
      <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
        <Row gutter={16}>
          <Col span={12}>
            <Card title="Doanh thu tổng" style={{ width: 300 }}>
              <div className="textDashboard">
                {Format.vndPrice(list?.totalRevenue)}
              </div>
            </Card>
            <Card
              title={`Doanh thu tháng ${currentMonth}`}
              style={{ width: 300, marginTop: 10 }}
            >
              <div className="textDashboard">
                {Format.vndPrice(list?.currentMonthRevenue)}
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Doanh thu tuần" style={{ width: 300 }}>
              <div className="textDashboard">
                {Format.vndPrice(list?.currentWeekRevenue)}
              </div>
            </Card>
            <Card
              title={`Doanh thu tháng ${lastMonth}`}
              style={{ width: 300, marginTop: 10 }}
            >
              <div className="textDashboard">
                {Format.vndPrice(list?.lastMonthRevenue)}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <div
        style={{
          margin: 20,
          padding: 20,
          background: "white",
          textAlign: "center",
        }}
      >
        <div style={{ padding: 20, fontSize: 18 }}>
          <strong>Biểu đồ doanh thu và số đơn hàng</strong>
        </div>

        <BarChart labels={labels} datasets={datasets} />
      </div>
    </div>
  );
}
