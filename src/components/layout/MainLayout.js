import React, { useEffect, useState } from "react";
import { Dropdown, Layout, Menu, message } from "antd";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import "./mainlayout.css";
import {
  profileImage,
  notificationIcon,
  layoutSiderLogo,
} from "../../utils/constants";
import { getPathArray } from "../../utils/urlPathConversion";
import PageTitle from "../pagetitle/PageTitle";
import usePageInfo from "../../hooks/usePageInfo";
import { useNavigate } from 'react-router-dom';
import tryCatch from "../../helper/tryCatch.helper";
import { logout } from "../../api/logout.api";
// import useAuth from "../../hooks/useAuth";

const { Header, Sider, Content } = Layout;


export default function MainLayout() {
  // const { token, setToken } = useAuth();
  const [collapse, setCollapse] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("1");
  const { pageTitle } = usePageInfo();
  const location = useLocation();
  const { pathname } = location;
  const pathnameList = getPathArray(pathname);
  const navigate = useNavigate();

  const handleLogout = async () => {
    // const [logoutResponse, logoutError] = await tryCatch(logout(token));
    // if (!logoutError) {
    //   message.success("Logged out Successfully!");
    //   localStorage.removeItem("token");
    //   setToken("");
    // } else {
    //   console.log(logoutError.response.data);
    //   message.error("Something went wrong!");
    // }
  };

  const handleCollapse = (val) => {
    setCollapse(val);
  };

  useEffect(() => {
    const currentNavItem = navMenuItem.find(
      (obj) => obj.link === `/${pathnameList[0]?.link || ""}`
    );
    setSelectedMenu(currentNavItem?.key || "1");
  }, [pathname]);

  const logout = () => {
    localStorage.removeItem('token');
    // navigate('/');
    window.location = '/';
  }
  const navMenuItem = [
    {
      key: "1",
      icon: <UserOutlined style={{ fontSize: "18px" }} />,
      link: "/farm",
      title: "Farms",
    },
    {
      key: "2",
      icon: <VideoCameraOutlined style={{ fontSize: "18px" }} />,
      link: "/goat",
      title: "Goats",
    },
    {
      key: "3",
      icon: <VideoCameraOutlined style={{ fontSize: "18px" }} />,
      link: "/device",
      title: "Devices",
    },
  ];

  const profileMenu = (
    <Menu>
      <Menu.Item key="1">Profile</Menu.Item>
      <Menu.Item onClick={handleLogout} key="2">
        Logout
      </Menu.Item>
    </Menu >
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
            <PageTitle title={pageTitle} />
            <ul>
              <li>
                <img
                  src={notificationIcon}
                  className="notification_icon"
                  alt="notification icon"
                />
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
