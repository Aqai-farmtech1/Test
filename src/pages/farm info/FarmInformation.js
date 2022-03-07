import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tryCatch from "../../helper/tryCatch.helper";
import "./farminfo.css";
import FarmInfoBasicDetail from "./FarmInfoBasicDetail";
import FarmInfoDetailList from "./FarmInfoDetailList";
import { getFarmDevice } from "../../api/device.api";
import { getFarmUsers } from "../../api/user.api";

export default function FarmInformation({ farmDetails, isLoading }) {
  const { farmid } = useParams();
  const [productList, setProductList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [deviceList, setDeviceList] = useState([]);

  const tableColumns = {
    productcapacity: [
      {
        title: "Product",
        dataIndex: "product_name",
      },
      {
        title: "Total",
        dataIndex: "capacity",
      },
      {
        title: "Free",
        dataIndex: "free",
      },
    ],
    userlist: [
      {
        title: "Emp No",
        dataIndex: "employee_id",
      },
      {
        title: "Emp Name",
        dataIndex: "fullname",
      },
      {
        title: "Contact Number",
        dataIndex: "phone1",
      },
      {
        title: "Designation",
        dataIndex: "designation_name",
      },
    ],
    devicelist: [
      { title: "Device Name", dataIndex: "device_name" },
      { title: "Device Type", dataIndex: "device_type_name" },
      { title: "Device Id", dataIndex: "device_id" },
      { title: "Frim Ware", dataIndex: "firmware_version" },
    ],
  };

  const getDetails = async () => {
    const alteredGoatList = farmDetails.goat_capacity?.map((el) => ({
      ...el,
      key: el.id,
    }));
    setProductList(alteredGoatList);

    //Device List
    const [deviceResponse, deviceError] = await tryCatch(getFarmDevice(farmid));

    if (!deviceError) {
      const alteredDevice = deviceResponse.data.map((el) => ({
        ...el,
        key: el.id,
      }));
      setDeviceList(alteredDevice);
    } else {
      console.log(deviceError.response);
    }

    //User List
    const [userResponse, userError] = await tryCatch(getFarmUsers(farmid));

    if (!userError) {
      const alteredUser = userResponse.data.map((el) => ({
        ...el,
        key: el.id,
      }));
      console.log(alteredUser);

      setUserList(alteredUser);
    } else {
      console.log(userError.response);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div className="farm_information_main">
      <Row gutter={20} style={{ width: "100%" }}>
        <Col span={14}>
          <div className="farm_information_table_conatainer">
            <FarmInfoDetailList
              isLoading={isLoading}
              columns={tableColumns["productcapacity"]}
              data={productList}
              title={"Product & Capacity"}
            />
            <FarmInfoDetailList
              isLoading={isLoading}
              columns={tableColumns["userlist"]}
              data={userList}
              title={"User Details"}
            />
            <FarmInfoDetailList
              isLoading={isLoading}
              columns={tableColumns["devicelist"]}
              data={deviceList}
              title={"Device Details"}
            />
          </div>
        </Col>
        <Col span={10}>
          <FarmInfoBasicDetail isLoading={isLoading} />
        </Col>
      </Row>
    </div>
  );
}
