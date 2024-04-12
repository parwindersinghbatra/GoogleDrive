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
import { collection, deleteDoc, deleteField, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";

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

  const storage = getStorage();

  const deleteFileFromStorage = async (filePath) => {
    const desertRef = ref(storage, filePath);
    console.log(desertRef);
    deleteObject(desertRef).then(() => {
        // console.log('File deleted successfully');
    }).catch((error) => {
        console.error('Error deleting file:', error);
    });
  };

  const handleFileDelete = async (filePath, fileID) => {
    try{
      await deleteFileFromStorage(filePath)
      const fileDocRef = doc(db, 'files', fileID);
      await deleteDoc(fileDocRef);
      // console.log("Handling file delete",fileDocRef)
    }
    catch(error){
        console.error('Error deleting file:', error);
    }
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
                  <div class="dropdown">
                <span><MoreVertOutlinedIcon 
                  />
                  </span> 
                       <div class="dropdown-content">
                    <p
                      onClick={() => handleFileDelete(data.data.URL, data.id)}
                    >Delete</p>
                    </div>
                  </div>
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
