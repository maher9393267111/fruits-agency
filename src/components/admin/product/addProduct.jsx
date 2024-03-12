import React from "react";
import ProductForm from "./productForm";
import { toast } from "react-toastify";
// import { useAuth } from "@/functions/context";
import { useState } from "react";
import { db } from "../../../functions/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { uploadImages } from "../../../functions/firebase/getData";
import { message } from "antd";
import AdminLayout from "../AdminLayout";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";

const AddProductMain = ({ products }) => {
  const [files, setFiles] = useState([]);
  const [videoFile, setVideoFile] = useState("");

  // const { setPageLoading, pageLoading } = useAuth();
  const isupdate = true;

  const onFinish = async (values) => {
    console.log("values-->", values);


    if(values.ismedia && (!videoFile && !values.videourl)){

message.error("video is required")
return
    }


    /////urls [array of images]
    values.images = await uploadImages(files);

   



    if (videoFile) {
      values.video = await uploadImages(videoFile, true);
      message.success("Video Uploaded Successfully");
    }

  


    values.timeStamp = serverTimestamp();

    await addDoc(collection(db, "products"), values);

    message.success(`Product Uploaded Successfully`);
  };

  return (
    <VendorDashboardLayout>
      <ProductForm
        {...{ onFinish, files, setFiles, videoFile, setVideoFile }}
      />
    </VendorDashboardLayout>
  );
};

export default AddProductMain;
