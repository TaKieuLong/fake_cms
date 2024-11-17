import React from "react";
import { Row, Col } from "antd";

const LabelValue = ({ label, value, color }) => {
  return (
    <Row style={{ marginBottom: 8 }}>
      <Col xs={12} sm={8}>
        <strong>{label}</strong>:
      </Col>
      <Col xs={12} sm={16} style={{ fontWeight: 500, color: color || "black" }}>
        {value !== null && value !== undefined ? value : "Không có dữ liệu"}
      </Col>
    </Row>
  );
};

export default LabelValue;
