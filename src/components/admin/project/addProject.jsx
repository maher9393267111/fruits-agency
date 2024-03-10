import React from "react";
import ProjectForm from "./projectForm";
import { toast } from "react-toastify";
import { useAuth } from "../../../functions/contextproject";
import { useState } from "react";
import { db } from "@/functions/firebase";
import { addDoc, collection ,serverTimestamp } from "firebase/firestore";
import { uploadImages } from "../../../functions/firebase";
import { message } from "antd";
import AdminLayout from "../AdminLayout";


const AddProject = ({ projects }) => {
  const [files, setFiles] = useState([]);
  //const [videoFile,setVideoFile] = useState("");
  
  const { setPageLoading, pageLoading } = useAuth();
  const isupdate = true;


  const onFinish = async (values) => {
    console.log("values-->", values);
    


    /////urls [array of images]
    values.images = await uploadImages(files);
    values.timeStamp = serverTimestamp()
    
    // if (videoFile) {
    //   values.video = await uploadImages(videoFile,true)
    //   message.success("Video Uploaded Successfully")
    // }

    //values.timeStamp = serverTimestamp()


    await addDoc(collection(db, "projects"), values);


    message.success(`Project Uploaded Successfully`);
  };


  return (
    <AdminLayout>
      <ProjectForm {...{ onFinish, files, setFiles,projects }} />
    </AdminLayout>
  );
};


export default AddProject;
