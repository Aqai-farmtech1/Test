import React from "react";
import { Breadcrumb } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import "./breadcrumb.css";
import { getPathArray, getPathName } from "../../utils/urlPathConversion";
import usePageInfo from "../../hooks/usePageInfo";

export default function BreadCrumb() {
  const location = useLocation();
  const { pathname, state } = location;
  const { breadCrumbPath } = usePageInfo();
  const pathNameList = getPathArray(pathname);

  return (
    <div className="breadcrumb">
      {pathNameList.length > 1 && (
        <Breadcrumb>
          {pathNameList.map((el, index) => {
            const routeLink = getPathName(pathNameList, index);
            const encodedRouteLink = encodeURI(routeLink);
            const isLast = index === pathNameList.length - 1;

            return (
              <Breadcrumb.Item key={index}>
                {isLast ? (
                  <span className="breadcrum_item">{el.name}</span>
                ) : (
                  <NavLink to={encodedRouteLink} state={state}>
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
