import React, { useState } from "react";
import { Button, Divider, Switch, Modal } from "antd";
import "./farminfo.css";
import EditFarmDetails from "./EditFarmDetails";

export default function FarmInfoDetails() {
  const [editModelVisible, setEditModalVisible] = useState(false);

  return (
    <div className="farm_info_details">
      <div className="farm_image"></div>
      <div className="farm_status">
        <Switch
          checkedChildren="Active"
          unCheckedChildren="Inactive"
          defaultChecked
        />
      </div>
      <div className="farm_info_name">Red Hills Farm</div>
      <div className="farm_info_code">CHE-100987</div>
      <div className="farm_info_edit">
        <Button
          onClick={() => setEditModalVisible(true)}
          className="farm_info_edit_button"
          ghost
          type="primary"
        >
          Edit
        </Button>
        <EditFarmDetails
          editModelVisible={editModelVisible}
          setEditModalVisible={setEditModalVisible}
        />
      </div>
      <div className="farm_info_general_details">
        <Divider className="farm_info_divider" />
        <div className="farm_info_incharge_details">
          <div className="farm_info_incharge_details_title">Incharge</div>
          <div className="farm_info_incharge_details_value">
            S.Santhosh Raja
          </div>
        </div>
        <Divider className="farm_info_divider" />
        <div className="farm_info_contact_details">
          <div className="farm_info_contact_details_title">Contact Number</div>
          <div className="farm_info_contact_details_value">9781565479</div>
        </div>
        <Divider className="farm_info_divider" />
        <div className="farm_info_capacity">
          <div className="farm_info_capacity_details">
            <div className="farm_info_capacity_title">Farm Capacity</div>
            <div className="farm_info_capacity_value">
              <div className="farm_info_capacity_details_total">1500</div>
              <div className="farm_info_capacity_details_free">1000</div>
            </div>
          </div>
          <div className="farm_info_machine_details">
            <div className="farm_info_machine_details_title">Machines</div>
            <div className="farm_info_machine_details_value">3</div>
          </div>
        </div>
        <Divider className="farm_info_divider" />
        <div className="farm_info_address_details">
          <div className="farm_info_address_details_title">Address</div>
          <div className="farm_info_address_details_value">
            No.147, 1st Floor, Pandiyan Street.
          </div>
        </div>
      </div>
    </div>
  );
}
