import React from "react";
import "./../CSS/Header.css";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import AppsIcon from "@mui/icons-material/Apps";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";

const Header = ({photoURL}) => {
  return (
    <div className="header">
      <div className="header_logo">
        <img src="./../assets/Google_Drive_logo.png" />
        <span>Drive</span>
      </div>
      <div className="header_search">
        <SearchIcon />
        <input type="text" placeholder="Search in Drive" />
        <TuneOutlinedIcon />
      </div>
      <div className="header_option">
        <span>
          <HelpOutlineIcon />
          <SettingsIcon />
        </span>
        <span>
          <AppsIcon />
          <AccountCircleIcon src={photoURL}/>
        </span>
      </div>
    </div>
  );
};

export default Header;
