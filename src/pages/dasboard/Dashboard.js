import React from "react";
import "./dashboard.css";
import { Typography } from "antd";

const { Title } = Typography;

export default function Dashboard() {
  return (
    <div className="dashboard">
      <Title className="dashboard_title" level={1}>
        Dashboard
      </Title>
      <Title className="dashboard_title" level={5}>
        Comes here ...
      </Title>
    </div>
  );
}
