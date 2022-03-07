import React from "react";
import { Table } from "antd";
import "./farminfo.css";

export default function FarmInfoDetailList({ title, columns, data }) {
  const handleTableChange = () => {};

  return (
    <div className="farm_info_details_list_container">
      <div className="farm_info_details_list_container_title">{title}</div>
      <div className="farm_info_details_list_container_table">
        <Table
          pagination={false}
          style={{ width: "100%" }}
          columns={columns}
          dataSource={data}
          onChange={handleTableChange}
          bordered
        />
      </div>
    </div>
  );
}
