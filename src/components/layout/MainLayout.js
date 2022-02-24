import React, { useEffect, useState } from "react";
import { Dropdown, Layout, Menu } from "antd";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "./mainlayout.css";
import {
  profileImage,
  notificationIcon,
  layoutSiderLogo,
} from "../../constants/constants";
import BreadCrumb from "../breadcrumb/BreadCrumb";
import { getpathArray } from "../../utils/pathnameToArray";

const { Header, Sider, Content } = Layout;

export default function MainLayout() {
  const [collapse, setCollapse] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("1");
  const location = useLocation();
  const { pathname } = location;
  const pathnameList = getpathArray(pathname);

  const handleMenuClick = (val) => {
    setCollapse(val);
  };

  const handleCollapse = (val) => {
    setCollapse(val);
  };

  useEffect(() => {
    const currentNavItem = navMenuItem.find(
      (obj) => obj.link === `/${pathnameList[0].link}`
    );
    setSelectedMenu(currentNavItem.key);
  }, [pathname]);

  const navMenuItem = [
    {
      key: "1",
      icon: <UserOutlined style={{ fontSize: "18px" }} />,
      link: "/dashboard",
      title: "Dashboard",
    },
    {
      key: "2",
      icon: <VideoCameraOutlined style={{ fontSize: "18px" }} />,
      link: "/farm",
      title: "Farm",
    },
    {
      key: "3",
      icon: <VideoCameraOutlined style={{ fontSize: "18px" }} />,
      link: "/transaction",
      title: "Transaction",
    },
    {
      key: "4",
      icon: <VideoCameraOutlined style={{ fontSize: "18px" }} />,
      link: "/report",
      title: "Report",
    },
  ];

  const profileMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">Profile</Menu.Item>
      <Menu.Item key="2">Logout</Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Sider
        onCollapse={handleCollapse}
        collapsed={collapse}
        className="layout_sider"
      >
        <div className="sider_logo">
          <img src={layoutSiderLogo} alt="layout sider logo" />
        </div>
        <Menu mode="inline" selectedKeys={[selectedMenu]}>
          {navMenuItem.map((el) => (
            <Menu.Item key={el.key} icon={el.icon}>
              <NavLink to={el.link}>
                <span className="menu_item_span">{el.title}</span>
              </NavLink>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className="main_layout_container">
        <Header className="layout_header">
          <div className="layout_header_container">
            <BreadCrumb />
            <ul>
              <li>
                <img src={notificationIcon} alt="notification icon" />
              </li>
              <li>
                <Dropdown trigger={["click"]} overlay={profileMenu}>
                  <div className="image_wrapper">
                    <img
                      src={profileImage}
                      className="profile_image_header"
                      alt="profile"
                    />
                  </div>
                </Dropdown>
              </li>
            </ul>
          </div>
        </Header>
        <Content className="layout_content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
