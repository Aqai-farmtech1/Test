import React, { useEffect, useState } from "react";
import "./profilepage.css";
import ViewUserContent from "./ViewUserContent";
import {
  avtarSvg,
  editIconWhite,
  profileImageIcon,
} from "../../utils/constants";
import { NavLink, useParams } from "react-router-dom";
import { Button, message, Skeleton, Space, Upload } from "antd";
import usePageInfo from "../../hooks/usePageInfo";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import tryCatch from "../../helper/tryCatch.helper";
import { getUserProfile } from "../../api/user.api";

export default function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const { setPageTitle } = usePageInfo();
  const { userid } = useParams();
  const { setBreadCrumbPath } = usePageInfo();

  const getUserData = async () => {
    setIsLoading(true);
    const [userResponse, userError] = await tryCatch(getUserProfile(userid));

    if (!userError) {
      setIsLoading(false);
      setUserData(userResponse.data);
      setBreadCrumbPath(`/user/${userResponse.data.fullname}`);
      console.log(userResponse.data);
    } else {
      setIsLoading(false);
      setBreadCrumbPath(`/user/${""}`);
      console.log(userError.response);
    }
  };

  const handleChange = (info) => {
    console.log(info);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  useEffect(() => {
    setPageTitle("User Profile");
    setBreadCrumbPath(`/user/${userData.fullname || ""}`);
    getUserData();
  }, []);

  return (
    <>
      <div className="view_user_breadcrumb">
        <BreadCrumb />
      </div>
      <div className="view_user_main">
        {isLoading ? (
          <>
            <Space size={40} direction="vertical">
              <Skeleton active style={{ width: "50%" }} />
              <Skeleton active style={{ width: "50%" }} />
              <Skeleton active style={{ width: "50%" }} />
            </Space>
          </>
        ) : (
          <>
            <div className="view_user_title_section1">Basic Info</div>
            <div className="profile_image_wrapper_container">
              <div className="profile_image_wrapper">
                <img
                  className="profile_image"
                  src={userData.image || avtarSvg}
                  alt="avtar"
                />
              </div>
              <Upload beforeUpload={beforeUpload} onChange={handleChange}>
                <img
                  className="profile_image_icon"
                  src={profileImageIcon}
                  alt="img icon"
                />
              </Upload>
            </div>
            <ViewUserContent title="Emp Name" value={userData.fullname} />
            <ViewUserContent title="Emp Code" value={userData.employee_id} />
            <ViewUserContent title="Email Id" value={userData.email} />
            <ViewUserContent title="Primary Number" value={userData.phone1} />
            <ViewUserContent
              title="Secondary Number"
              value={userData.phone2 || "-"}
            />
            <ViewUserContent
              title="Designation"
              value={userData.designation_name}
            />
            <ViewUserContent
              title="Product Type"
              value={userData.product?.map((el) => el) || "-"}
            />
            <div className="view_user_title_section2">Address Info</div>
            <ViewUserContent title="Address" value={userData.address1} />
            <ViewUserContent title="City" value={userData.city} />
            <ViewUserContent title="State" value={userData.state_name} />
            <ViewUserContent title="Country" value={userData.country_name} />
            <ViewUserContent title="Pincode" value={userData.pincode} />
            <div className="view_user_edit">
              <NavLink to={`/profile/edit`}>
                <Button
                  className="user_list_buttons"
                  style={{ borderRadius: "4px" }}
                  block
                  type="primary"
                >
                  <img
                    className="button_icon"
                    src={editIconWhite}
                    alt="edit icon"
                  />
                  Edit
                </Button>
              </NavLink>
            </div>
          </>
        )}
      </div>
    </>
  );
}
