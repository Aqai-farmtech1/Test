import React, { createRef, useEffect, useState } from "react";
import { Divider, Dropdown, Layout, Menu, message, Popover } from "antd";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import "./mainlayout.css";
import {
  profileImage,
  notificationIcon,
  layoutSiderLogo,
  avtarSvg,
} from "../../../utils/constants";
import { getPathArray } from "../../../utils/urlPathConversion";
import PageTitle from "../../pagetitle/PageTitle";
import usePageInfo from "../../../hooks/usePageInfo";
import { useNavigate } from "react-router-dom";
import tryCatch from "../../../helper/tryCatch.helper";
import { logout } from "../../../api/logout.api";
import Modal from "antd/lib/modal/Modal";
import ChangePassword from "../../../pages/changepassword/ChangePassword";

const { Header, Sider, Content } = Layout;

export default function MainLayout() {
  const token = localStorage.getItem("token");
  const [collapse, setCollapse] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("1");
  const { pageTitle } = usePageInfo();
  const location = useLocation();
  const { pathname } = location;
  const pathnameList = getPathArray(pathname);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const [logoutResponse, logoutError] = await tryCatch(logout(token));
    if (!logoutError) {
      message.success("Logged out Successfully!");
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      console.log(logoutError.response.data);
      message.error("Something went wrong!");
    }
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
      link: "/transactions",
      title: "Transactions",
    },
    {
      key: "4",
      icon: <VideoCameraOutlined style={{ fontSize: "18px" }} />,
      link: "/device",
      title: "Devices",
    },
  ];

  const profileMenu = (
    <ul className="profile_dropdown">
      <li>
        <div className="profile_dropdown_list_profile_settings">
          <h1>Profile Settings</h1>
          <NavLink to="/profile">
            <h2>View Profile</h2>
          </NavLink>
        </div>
        <Divider className="profile_dropdown_divider" />
      </li>
      <li>
        <div
          onClick={() => setIsModalVisible(true)}
          className="profile_dropdown_list_content"
        >
          Change Password
        </div>
        <Divider className="profile_dropdown_divider" />
      </li>
      <li onClick={handleLogout}>
        <div className="profile_dropdown_list_content">Logout</div>
      </li>
    </ul>
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
                <Popover
                  placement="bottomRight"
                  content={profileMenu}
                  trigger="hover"
                >
                  <div className="image_wrapper">
                    <img
                      src={avtarSvg}
                      className="profile_image_header"
                      alt="profile"
                    />
                  </div>
                </Popover>
              </li>
            </ul>
          </div>
        </Header>
        <Content className="layout_content">
          <Outlet />
          <Modal
            onCancel={() => setIsModalVisible(false)}
            visible={isModalVisible}
            title={null}
            footer={null}
            destroyOnClose
          >
            <ChangePassword />
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
}
