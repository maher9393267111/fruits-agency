import React, { useState, useEffect } from "react";
import {
  getDocuments,
  antdFieldValidation,
} from "../../../functions/firebase";
import {
  Button,
  Form,
  Upload,
  message,
  Input,
  Select,
  Switch,
  InputNumber,
} from "antd";
const { TextArea } = Input;

//import Image from "next/image";

const ProjectForm = ({
  onFinish,
  initialValues,
  files,
  setFiles,
  cats,
  subcats,
  isupdate = false,
  projects,
}) => {
  const [images, setImages] = useState(initialValues?.images || []);


  return (
    <div className=" w-[80%] mx-auto ">
      <div className=" w-full md:w-[70%] border-2 py-6 px-6">
        <Form
          layout="vertical"
          // onFinish same as submit normal form
          onFinish={(values) =>
            // name of our function
            onFinish({
              ...values,
              images,
            })
          }
          initialValues={{
            title: initialValues?.title || "",
            desc: initialValues?.desc || "",
            images: initialValues?.images || [],
           

          }}
        >
          <Form.Item name="title" label="Add Project - Title">
            <Input />
          </Form.Item>

          <Form.Item name="desc" label="Description">
            <TextArea rows={4} />
          </Form.Item>

          <div className=" grid gap-3 md:grid-cols-3 lg:grid-cols-4 grid-cols-1">
        
          </div>

          {/* -----images upload----- */}

          <div>
            <Upload
              accept="image/*"
              multiple
              // files is data of images will be uploaded to firebase/storage
              beforeUpload={(file) => {
                setFiles((prev) => [...prev, file]);
                return false;
              }}
              listType="picture-card"
              onRemove={(file) => {
                console.log("fileDATA", file);
                setFiles((prev) => {
                  const index = prev.indexOf(file);
                  const newFileList = prev.slice();
                  newFileList.splice(index, 1);
                  return newFileList;
                });

                console.log("files", files);
              }}
            >
              Upload Images {files?.length}
            </Upload>
          </div>

          {/* -----show product images {update product} ---- */}

          <div className="flex flex-wrap gap-3 mt-2 ">
            {images?.map((data, index) => (
              <div key={index}>
                <img src={data} className="w-20 h-20 rounded-full " />
                <h1
                  onClick={() => {
                    // prev all previous images
                    setImages((prev) => {
                      // all images put into new array
                      const temp = [...prev];
                      // delete  image with clicked index
                      temp.splice(index, 1);
                      // return this new array after delete clicked image
                      return temp;
                    });
                  }}
                  className="text-center cursor-pointer text-red-600"
                >
                  remove
                </h1>
              </div>
            ))}
          </div>

          <div className=" ">
            <Button
              className=" mt-4  block w-1/3 bg-blue-500 mx-auto"
              type="primary"
              htmlType="submit"
            >
              Publish
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ProjectForm;
