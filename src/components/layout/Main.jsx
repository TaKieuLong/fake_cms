import { Drawer, Layout } from "antd";
import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Sidenav from "./Sidenav";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../global/context/AuthenticationContext";

const { Content, Sider } = Layout;

function Main({ children }) {
  const [show, setShow] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const openDrawer = () => setShow(!show);

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register" || location.pathname ==="/receive-code" || location.pathname ==="/confirm-code" || location.pathname ==="/reset-password";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {isAuthenticated() && !isAuthPage && (
        <>
          <Drawer
            title={false}
            placement={"left"}
            closable={false}
            onClose={() => setShow(false)}
            open={show}
            key={"left"}
            width={250}
            className={`drawer-sidebar`}
          >
            <Sidenav onClick={openDrawer} />
          </Drawer>

          <Sider
            trigger={null}
            width={250}
            theme="light"
            style={{ overflow: "hidden" }}
          >
            <Sidenav />
          </Sider>
        </>
      )}

      <Layout>
        {isAuthenticated() && !isAuthPage && <Header onPress={openDrawer} />}
        <Content>{children}</Content>
        {isAuthenticated() && !isAuthPage && <Footer />}
      </Layout>
    </Layout>
  );
}

export default Main;
