import { Button } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import { checkMail } from "../../utils/constants";

export default function CheckYourMail() {
  return (
    <div className="check_your_mail_container">
      <img src={checkMail} alt="check mail svg" />
      <div className="check_mail_head">Check Your Mail</div>
      <div className="check_mail_description">
        We sent a password link to sample@gmail.com
      </div>
      <NavLink to={"/login"}>
        <Button type="secondary">Back To Login</Button>
      </NavLink>
    </div>
  );
}
