import React from "react";
import PageTitle from "../../components/pagetitle/PageTitle";
import "./createfarm.css";
import { Steps } from "antd";
import CreateFarmBasic from "../../components/create farm/CreateFarmBasic";

const { Step } = Steps;

export default function CreateFarm() {
  return (
    <div className="create_farm">
      <PageTitle title={"Create Farm"} />
      <div className="farm_creation_area">
        <div className="farm_creation_steps_area">
          <Steps size="small" current={1}>
            <Step title="Finished" />
            <Step title="In Progress" />
            <Step title="Waiting" />
          </Steps>
        </div>
        <div className="farm_input_area">
          <CreateFarmBasic />
        </div>
      </div>
    </div>
  );
}
