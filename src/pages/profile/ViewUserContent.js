import React from "react";
import "./profilepage.css";

export default function ViewUserContent({ title, value }) {
  return (
    <div className="view_user_content">
      <div className="view_user_content_title">{title}</div>
      <div className="view_user_content_text">{value}</div>
    </div>
  );
}
