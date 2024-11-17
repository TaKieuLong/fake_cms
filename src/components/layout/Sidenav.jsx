import { Menu, Typography, Avatar, Space, Modal } from "antd";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../global/context/AuthenticationContext";
import {
  ReceptionistNav,
  AdmintNav,
  SuperAdminNav,
} from "../../navigation/ExternalNav.ts";
import ROUTES from "../../navigation/index.ts";
import { UserOutlined } from "@ant-design/icons";

const { Title } = Typography;

const getMenuItem = (label, key, icon, children, type) => {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
};

function Sidenav({ onClick }) {
  const { pathname } = useLocation();
  let path = pathname?.replace?.("/", "");

  const { profile, onLogout } = useAuth();

  const navigate = useNavigate();

  const sideNav = useMemo(() => {
    let sideNav = [];
    if (profile && profile.isAdmin && profile.isAdmin()) {
      sideNav = AdmintNav;
    } else if (profile && profile.isSuperAdmin && profile.isSuperAdmin()) {
      sideNav = SuperAdminNav;
    } else {
      sideNav = ReceptionistNav;
    }
    return sideNav;
  }, [profile]);

  const defaultSelectedKeys = useMemo(() => {
    if (path.length === 0) {
      if (!!sideNav?.[0].children?.[0]) {
        return [sideNav?.[0].children?.[0].path];
      } else {
        return [sideNav?.[0]?.item.path];
      }
    }
    return [path];
  }, [sideNav, path]);

  const defaultOpenKeys = useMemo(() => {
    for (let i = 0; i < sideNav?.length; i++) {
      let nav = sideNav[i];

      if (nav.item.path === path) {
        return [path];
      }

      let isInSubMenu =
        (nav.children?.filter?.((e) => e.path === path)?.length || 0) > 0;
      if (isInSubMenu) {
        return [nav.item.path];
      }
    }

    return [sideNav?.[0].item.path];
  }, [sideNav, path]);

  const items = useMemo(() => {
    return sideNav?.map((nav) => {
      return getMenuItem(
        nav.item.title,
        nav.item.path,
        <nav.item.icon />,
        nav.children?.map((subNav) => {
          return getMenuItem(subNav.title, subNav.path, <subNav.icon />);
        })
      );
    });
  }, [sideNav]);

  const onClickMenuItem = (e) => {
    onClick?.(e);
    if (e.key === ROUTES.SIGN_OUT.path) {
      Modal.confirm({
        title: `Bạn chắc chắn muốn đăng xuất?`,
        okText: "CÓ !",
        cancelText: "KHÔNG",
        okButtonProps: {
          style: {
            fontWeight: "semi-bold",
          },
        },
        cancelButtonProps: {
          style: {
            fontWeight: "semi-bold",
          },
        },
        onOk: () => {
          onLogout();
        },
        onCancel: () => {},
      });
    } else {
      navigate(e.key);
    }
  };

  return (
    <div style={{ padding: "0px 5px" }} className="sidenav">
      <div style={{ textAlign: "center", padding: 5 }}>
        <Title
          level={3}
          style={{
            margin: 0,
            color: "#4096ff",
            fontFamily: "monospace",
            letterSpacing: ".3rem",
            fontWeight: "800",
          }}
        >
          TROLTHALO
        </Title>
      </div>
      <hr />
      <div style={{}}>
        <Space wrap size={16} style={{ padding: "5px 10px" }}>
          <Avatar
            size={58}
            icon={profile?.avatar ? null : <UserOutlined />}
            src={profile?.avatar || null}
          />
          <div>
            <div
              style={{
                padding: 5,
                fontWeight: 500,
              }}
            >
              {profile?.name}
            </div>
            <div
              style={{
                padding: 5,
                fontWeight: 500,
                color:
                  profile?.role === 1
                    ? "red"
                    : profile?.role === 2
                    ? "blue"
                    : "orange",
              }}
            >
              {profile?.role === 1
                ? "Super Admin"
                : profile?.role === 2
                ? "Admin"
                : "Receptionist"}
            </div>
          </div>
        </Space>
      </div>
      <hr />
      <Menu
        style={{
          background: "transparent",
        }}
        theme="light"
        mode="inline"
        onClick={onClickMenuItem}
        defaultSelectedKeys={defaultSelectedKeys}
        defaultOpenKeys={defaultOpenKeys}
        items={items}
      ></Menu>
    </div>
  );
}

export default Sidenav;
