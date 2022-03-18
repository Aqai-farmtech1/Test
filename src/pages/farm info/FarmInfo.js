import React, { useEffect, useState } from "react";
import "./farminfo.css";
import { Tabs } from "antd";
import FarmDashboard from "./FarmDashboard";
import FarmInformation from "./FarmInformation";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import usePageInfo from "../../hooks/usePageInfo";
import tryCatch from "../../helper/tryCatch.helper";
import { useParams } from "react-router-dom";
import { getFarm } from "../../api/farm.api";

const { TabPane } = Tabs;

export default function FarmInfo() {
  const [isLoading, setIsLoading] = useState(false);
  const [farmDetail, setFarmDetail] = useState({});
  const { setPageTitle } = usePageInfo();
  const { farmid } = useParams();

  const getFarmDetail = async () => {
    setIsLoading(true);
    const [farmResponse, farmError] = await tryCatch(getFarm(farmid));

    if (!farmError) {
      const alteredData = {
        ...farmResponse.data,
        goat_capacity: farmResponse.data.product_capacity
          .filter((f) => f.product === 3)
          .map((el) => ({
            ...el,
            free: el.capacity - farmResponse.data.total_goats,
          })),
      };
      setIsLoading(false);
      setPageTitle(alteredData.name);
      setFarmDetail(alteredData);
    } else {
      setIsLoading(false);
      console.log(farmError.response);
    }
  };

  useEffect(() => {
    setPageTitle("Farm Info");
    getFarmDetail();
  }, []);

  return (
    <div className="farm_info_main">
      <BreadCrumb />
      <Tabs defaultActiveKey="1" onChange={() => {}}>
        <div></div>
        <TabPane tab="Farm Dashboard" key="1">
          <FarmDashboard isLoading={isLoading} farmDetails={farmDetail} />
        </TabPane>
        <TabPane tab="Farm Info" key="2">
          <FarmInformation farmDetails={farmDetail} isLoading={isLoading} />
        </TabPane>
      </Tabs>
    </div>
  );
}
