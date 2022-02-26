import React, { useEffect, useState } from "react";
import "./createfarm.css";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import PageTitle from "../../components/pagetitle/PageTitle";
import usePageInfo from "../../hooks/usePageInfo";
import CreateFarmBasicInfo from "./CreateFarmBasicInfo";
import CreateFarmcontactInfo from "./CreateFarmcontactInfo";

export default function CreateFarm() {
  const [formStepNo, setFormStepNo] = useState(1);
  const [formInputValues, setFormInputValues] = useState({});
  const { setPageTitle } = usePageInfo();

  useEffect(() => {
    setPageTitle("Create Farm");
  }, [formStepNo]);

  const formStepName = {
    1: "Basic Info 1/2",
    2: "Contact Info 2/2",
  };

  return (
    <div className="create_farm">
      <BreadCrumb />
      <div className="page_title_create_farm">
        <PageTitle title={formStepName[formStepNo]} />
      </div>
      <div className="create_farm_form_area">
        {formStepNo === 1 ? (
          <CreateFarmBasicInfo
            setFormStepNo={setFormStepNo}
            formInputValues={formInputValues}
            setFormInputValues={setFormInputValues}
          />
        ) : (
          <CreateFarmcontactInfo
            setFormStepNo={setFormStepNo}
            formInputValues={formInputValues}
            setFormInputValues={setFormInputValues}
          />
        )}
      </div>
    </div>
  );
}
