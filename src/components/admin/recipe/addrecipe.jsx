import React from "react";
import ProductForm from "./recipeForm";
import { toast } from "react-toastify";
// import { useAuth } from "@/functions/context";
import { useState } from "react";
import { db } from "../../../functions/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { uploadImages } from "../../../functions/firebase/getData";
import { message } from "antd";
import AdminLayout from "../AdminLayout";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";

const AddRecipeMain = ({ products }) => {
  const [files, setFiles] = useState([]);
  

  // const { setPageLoading, pageLoading } = useAuth();
  const isupdate = true;

  const onFinish = async (values) => {
    console.log("values-->", values);

  

    values.images = await uploadImages(files);



    values.timeStamp = serverTimestamp();

    await addDoc(collection(db, "recipes"), values);

    message.success(`recipe Uploaded Successfully`);
  };

  return (
    <VendorDashboardLayout>
      <ProductForm
        {...{ onFinish, files, setFiles }}
      />
    </VendorDashboardLayout>
  );
};

export default AddRecipeMain;
