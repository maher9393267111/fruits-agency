import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { getDocument } from "../../../functions/firebase/getData";
import { useAuth } from "../../../functions/contextproject/index";
import ProductForm from "./recipeForm";
import { message } from "antd";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../../functions/firebase";
import AdminLayout from "../AdminLayout";

import {
  uploadImages,
  deleteImages,
} from "../../../functions/firebase/getData";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
const UpdateRecipeMain = ({ product }) => {
  const { query, replace } = useRouter();
  const { id } = query;
  //const [product, setProduct] = useState(null);
  const [files, setFiles] = useState([]);
 
  const isupdate = true;
  const { setPageLoading, pageLoading } = useAuth();

  const initialValues = product;

  console.log("?????-?????-" + initialValues);

  const onFinish = async (values) => {
    try {
      setPageLoading(true);
    

      const imagesToDelete = product.images.filter(
        (image) => !values.images.includes(image)
      );
      await deleteImages(imagesToDelete);
    
      const newImagesUploaded = await uploadImages(files);
      values.images = [...values.images, ...newImagesUploaded];



      await updateDoc(doc(db, "recipes", id), values);

      message.success("recipe Updated Successfully");
      // router.push("/admin?tab=1");
    } catch (error) {
      message.error(error.message);
    } finally {
      setPageLoading(false);
    }
  };

  return (
    
    <VendorDashboardLayout>

   
      <ProductForm
        {...{
          initialValues,
    
          files,
          setFiles,
          isupdate,
          onFinish,
        }}
      />
       </VendorDashboardLayout>
    
  );
};

export default  UpdateRecipeMain;
