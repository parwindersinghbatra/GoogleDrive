import React, { useState } from "react";
import "./../CSS/Sidebar.css";
import AddIcon from "@mui/icons-material/Add";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DevicesIcon from "@mui/icons-material/Devices";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ScheduleIcon from "@mui/icons-material/Schedule";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import { styled } from "@mui/material/styles";
// import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

import { Modal } from "@mui/material";
import { storage, db } from "../firebase";
import { uploadBytes, ref, getStorage, getDownloadURL } from "firebase/storage";
import { serverTimestamp, collection, addDoc, setDoc, doc } from "firebase/firestore";

function Sidebar() {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    },
  }));

  const [open, setOPen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const handleClose = () => {
    setOPen(false);
  };

  const handleOpen = () => {
    setOPen(true);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = (event) => {
    event.preventDefault();

    if (file) {
      const storageRef = ref(storage, `files/${file.name}`);
      const storageInstance = getStorage();
      setUploading(true);
      uploadBytes(storageRef, file)
        .then((snapshot) => {
          return getDownloadURL(ref(storage, `files/${file.name}`));
          
        })
        .then(async (downloadURL) => {
          console.log(`File upload successfully`, downloadURL);
          await setDoc(doc(db, "files", file.name ),{
            URL: downloadURL,
            timestamp: serverTimestamp(),
            filename: file.name,
            size: file.size
          })
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        })
        .finally(() => {
          setUploading(false);
          setFile(null);
          setOPen(false);
        });
    }
  };
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <div className="modal_pop">
          <form>
            <div className="modelHandling">
              <h3>Select file you want to upload</h3>
            </div>
            <div className="modalBody">
              {uploading ? (
                <p className="uploading"> uploading.....</p>
              ) : (
                <>
                  <input type="file" onChange={handleChange} />
                  <input
                    type="submit"
                    value="UPLOAD"
                    className="post_submit"
                    onClick={handleUpload}
                  />
                </>
              )}
            </div>
          </form>
        </div>
      </Modal>
      <div className="sidebar">
        <div className="sidebar_btn">
          <button onClick={handleOpen}>
            <AddIcon /> <span>New</span>
          </button>
        </div>
        <div className="sidebar_options">
          <div className="sidebar_option">
            <HomeOutlinedIcon />
            <span>Home</span>
          </div>
          <div className="sidebar_option  siderbar_active">
            {/* <img src='./../../assets/MyDrive.png' width='20px' className="flex border"/> */}
            <SettingsSystemDaydreamOutlinedIcon />
            <span>My Drive</span>
          </div>
          <div className="sidebar_option">
            <DevicesIcon />
            <span>Computers</span>
          </div>
          <div className="sidebar_options">
            <div className="sidebar_option">
              <PeopleAltIcon />
              <span>Shared with me</span>
            </div>
            <div className="sidebar_option">
              <ScheduleIcon />
              <span>Recent</span>
            </div>
            <div className="sidebar_option">
              <StarBorderIcon />
              <span>Starred</span>
            </div>
          </div>
          <div className="sidebar_options">
            <div className="sidebar_option">
              <ReportGmailerrorredIcon />
              <span>Spam</span>
            </div>
            <div className="sidebar_option">
              <DeleteIcon />
              <span>Trash</span>
            </div>
            <div className="sidebar_option">
              <CloudQueueIcon />
              <span>Storage</span>
            </div>
            <div className="sidebar_option_slider">
              <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <br />
                <BorderLinearProgress variant="determinate" value={55} />
              </Stack>
              <span>7.12 GB of 15 GB used </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
