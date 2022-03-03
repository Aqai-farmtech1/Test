import React from "react";
import "./farminfo.css";
import { Tabs } from "antd";
import FarmDashboard from "./FarmDashboard";
import FarmInformation from "./FarmInformation";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";

const { TabPane } = Tabs;

export default function FarmInfo() {
  return (
    <div className="farm_info_main">
      <BreadCrumb />
      <Tabs defaultActiveKey="1" onChange={() => {}}>
        <TabPane tab="Farm Dashboard" key="1">
          <FarmDashboard />
        </TabPane>
        <TabPane tab="Farm Info" key="2">
          <FarmInformation />
        </TabPane>
      </Tabs>
    </div>
  );
}
