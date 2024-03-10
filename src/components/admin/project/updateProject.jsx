import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getDocument } from "../../../functions/firebase";
import { useAuth } from "@/functions/context";
import ProjectForm from "./projectForm";
import { message } from "antd";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/functions/firebase";
import AdminLayout from "../AdminLayout";


import { uploadImages, deleteImages } from "../../../functions/firebase";

const UpdateProjectMain = ({ project}) => {
  const { query, replace } = useRouter();
  const { id } = query;
  //const [product, setProduct] = useState(null);
  const [files, setFiles] = useState([]);


  const isupdate = true;
  const { setPageLoading, pageLoading } = useAuth();


  const initialValues = project;


  console.log("?????-?????-" + initialValues);


  const onFinish = async (values) => {
    try {
      setPageLoading(true);


      // delete images
      const imagesToDelete = project.images.filter(
        (image) => !values.images.includes(image)
      );
      await deleteImages(imagesToDelete);
      const newImagesUploaded = await uploadImages(files);
      values.images = [...values.images, ...newImagesUploaded];
      await updateDoc(doc(db, "projects", id), values);


      message.success("Project Updated Successfully");
      // router.push("/admin?tab=1");
    } catch (error) {
      message.error(error.message);
    } finally {
      setPageLoading(false);
    }
  };


  return (
    <AdminLayout>
      <ProjectForm
        {...{
          initialValues,
          files,
          setFiles,
          isupdate,
          onFinish,
        }}
      />
    </AdminLayout>
  );
};


export default UpdateProjectMain;

