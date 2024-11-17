import { Layout } from "antd";
import React from "react";

const { Footer } = Layout;

const CustomFooter = () => {
  return (
    <Footer
      className="footer"
      style={{ backgroundColor: "#2e2e2e", padding: 20 }}
    >
      <div style={{ textAlign: "center", color: "white" }}>
        CopyRight Trothalo © 2024
      </div>
    </Footer>
  );
};

export default CustomFooter;
