import React, { useState } from "react";
import { Dropdown, Layout, Menu } from "antd";
import { NavLink, Outlet } from "react-router-dom";
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

const { Header, Sider, Content } = Layout;

export default function MainLayout() {
  const [collapse, setCollapse] = useState(false);

  const handleMenuClick = (val) => {
    setCollapse(val);
  };

  const handleCollapse = (val) => {
    setCollapse(val);
  };

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
        collapsible
        collapsed={collapse}
        className="layout_sider"
      >
        <div className="sider_logo">
          <img src={layoutSiderLogo} alt="layout sider logo" />
        </div>
        <Menu mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <NavLink to="/dashboard">
              <span className="menu_item_span">Dashboard</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            <NavLink to="/farm">
              <span className="menu_item_span">Farms</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="3" icon={<VideoCameraOutlined />}>
            <span className="menu_item_span">Transactions</span>
          </Menu.Item>
          <Menu.Item key="4" icon={<UploadOutlined />}>
            <span className="menu_item_span">Reports</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="main_layout_container">
        <Header className="layout_header">
          <div className="layout_header_container">
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
