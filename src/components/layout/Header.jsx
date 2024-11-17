import { Button, Layout, Typography } from "antd";
import React from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineMenu } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../global/context/AuthenticationContext";

const { Header } = Layout;

function ResponsiveAppBar({ onPress }) {
  const { profile } = useAuth();

  const navigate = useNavigate();

  return (
    <div
      className="cusstom-header"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "white",
      }}
    >
      <Header style={{ width: "90%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button type="link" className="menu_icon" onClick={() => onPress()}>
            <MdOutlineMenu size={20} />
          </Button>

          {!profile && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography.Title
                level={3}
                style={{
                  margin: 0,
                  color: "#4096ff",
                  fontFamily: "monospace",
                  letterSpacing: ".3rem",
                  cursor: "pointer",
                }}
                className="header_logo"
                onClick={() => {
                  navigate("/");
                }}
              >
                TROTHALO
              </Typography.Title>
            </div>
          )}

          <Button type="link" style={{ marginLeft: "auto" }}>
            <IoIosNotificationsOutline size={20} />
          </Button>
        </div>
      </Header>
    </div>
  );
}

export default ResponsiveAppBar;
