import React from "react";
import { Breadcrumb } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import "./breadcrumb.css";
import { getpathArray } from "../../utils/pathnameToArray";

export default function BreadCrumb() {
  const location = useLocation();
  const { pathname, state } = location;
  const pathNameList = getpathArray(pathname);

  return (
    <div className="breadcrumb">
      {pathNameList.length > 1 && (
        <Breadcrumb>
          {pathNameList.map((el, index) => {
            const routeLink = `/${pathNameList
              .slice(0, index + 1)
              .map((el) => el.link)
              .join("/")}`;
            const isLast = index === pathNameList.length - 1;

            return (
              <Breadcrumb.Item key={index}>
                {isLast ? (
                  <span className="breadcrum_item">{el.name}</span>
                ) : (
                  <NavLink to={routeLink} state={state}>
                    <span className="breadcrum_item">{el.name}</span>
                  </NavLink>
                )}
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      )}
    </div>
  );
}
