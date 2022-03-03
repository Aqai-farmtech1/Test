import { Col, Row } from "antd";
import React from "react";
import "./farminfo.css";
import FarmInfoBasicDetail from "./FarmInfoBasicDetail";
import FarmInfoDetailList from "./FarmInfoDetailList";

export default function FarmInformation() {
  const tableColumns = {
    productcapacity: [
      {
        title: "Product",
        dataIndex: "product",
      },
      {
        title: "Total",
        dataIndex: "total",
      },
      {
        title: "Free",
        dataIndex: "free",
      },
    ],
    userlist: [
      {
        title: "Emp No",
        dataIndex: "empno",
      },
      {
        title: "Emp Name",
        dataIndex: "empname",
      },
      {
        title: "Contact Number",
        dataIndex: "contactno",
      },
      {
        title: "Designation",
        dataIndex: "designation",
      },
    ],
    devicelist: [
      { title: "Device Type", dataIndex: "devicetype" },
      { title: "Device Id", dataIndex: "deviceid" },
      { title: "Frim Ware", dataIndex: "frimware" },
    ],
  };

  const tableData = {
    productcapacity: [
      {
        key: 1,
        product: "Goat",
        total: 1000,
        free: 500,
      },
      {
        key: 2,
        product: "Goat",
        total: 1000,
        free: 500,
      },
    ],
    userlist: [
      {
        key: 1,
        empno: 1234,
        empname: "Ajith Abinash S",
        contactno: 1234567890,
        designation: "Staff",
      },
      {
        key: 2,
        empno: 1234,
        empname: "Ajith Abinash S",
        contactno: 1234567890,
        designation: "Staff",
      },
    ],
    devicelist: [
      {
        key: 1,
        devicetype: "Weighing Machine",
        deviceid: "0000234234799",
        frimware: "FRM-1212128",
      },
      {
        key: 2,
        devicetype: "IoT",
        deviceid: "0000234234799",
        frimware: "FRM-1212128",
      },
    ],
  };

  return (
    <div className="farm_information_main">
      <Row gutter={20} style={{ width: "100%" }}>
        <Col span={14}>
          <div className="farm_information_table_conatainer">
            <FarmInfoDetailList
              columns={tableColumns["productcapacity"]}
              data={tableData["productcapacity"]}
              title={"Product & Capacity"}
            />
            <FarmInfoDetailList
              columns={tableColumns["userlist"]}
              data={tableData["userlist"]}
              title={"User Details"}
            />
            <FarmInfoDetailList
              columns={tableColumns["devicelist"]}
              data={tableData["devicelist"]}
              title={"Device Details"}
            />
          </div>
        </Col>
        <Col span={10}>
          <FarmInfoBasicDetail />
        </Col>
      </Row>
    </div>
  );
}
