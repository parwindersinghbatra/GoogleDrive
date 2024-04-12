import React, { useEffect, useState } from "react";
import "./../CSS/Data.css";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ReorderOutlinedIcon from "@mui/icons-material/ReorderOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const Data = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "files"), (snapshot) => {
      setFiles(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return () => {
      unsubscribe();
    };
  }, []);

  function getSize(dataSize){
      const units = ['bytes', 'KB', 'MB', 'GB', 'TB'];
      let unitIndex= 0
      let size = dataSize
      while(size >= 1024 && unitIndex < units.length - 1){
          size = size/1024
          unitIndex++
      }
      return `${size.toFixed(2)} ${units[unitIndex]}`
  }
  return (
    <div className="data">
      <div className="data_header">
        <div className="data_header_left">
          <p>My Drive</p>
          <ArrowDropDownOutlinedIcon />
        </div>
        <div className="data_header_right">
          <span>
            <ReorderOutlinedIcon />
            <GridViewOutlinedIcon />
          </span>
          <span>
            <InfoOutlinedIcon />
          </span>
        </div>
      </div>
      <div className="data_container">
        <div className="data_list">
          <div className="detailsRow">
            <p>
              <b>
                Name <ArrowDownwardOutlinedIcon />
              </b>{" "}
            </p>
            <p>
              <b>Owner</b>
            </p>
            <p>
              <b>Last Modify</b> <ArrowDropDownOutlinedIcon />
            </p>
            <p>
              <b>File Size</b>{" "}
            </p>
            <p>
              <MoreVertOutlinedIcon />
            </p>
          </div>
          {files.map((data, index) => {
            return (
              <div className="detailsRow" key={index}>
                <p>{data.data.filename}</p>
                <p>
                  {" "}
                  <AccountCircleIcon /> Me
                </p>
                <p>
                  {
                    new Date(data.data.timestamp?.seconds * 1000).toUTCString()
                    // formatDate(data.data.timestamp)
                  }
                </p>
                <p>{
                      getSize(data.data.size)
                  }</p>
                <p>
                  {" "}
                  <MoreVertOutlinedIcon />
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Data;
