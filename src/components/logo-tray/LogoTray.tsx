import React from "react";
import { ReactComponent as BrandIcon } from "../../assets/spacex.svg";
import "./style.css";

const LogoTray = () => {
  return (
    <div className="logo-container">
      <BrandIcon />
    </div>
  );
};

export default LogoTray;
