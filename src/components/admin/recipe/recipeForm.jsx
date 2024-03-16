import React, { useState, useEffect, useMemo } from "react";
import {
  getDocuments,
  antdFieldValidation,
} from "../../../functions/firebase/getData";
import {
  Button,
  Form,
  Upload,
  message,
  Input,
  Select,
  Switch,
  InputNumber,
  Checkbox,
} from "antd";
const { TextArea } = Input;

import Image from "next/image";

import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ direction: "rtl" }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const RecipeForm = ({
  onFinish,
  initialValues,
  files,
  setFiles,
  cats,
  subcats,
  isupdate = false,
  videoFile,
  setVideoFile,
}) => {
  const [images, setImages] = useState(initialValues?.images || []);





  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <div className=" w-[80%] mx-auto mt-24 ">
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
            titlear: initialValues?.titlear || "",
            titletr: initialValues?.titletr || "",
            desc: initialValues?.desc || "",
            descar: initialValues?.descar || "",
            desctr: initialValues?.desctr || "",
        
          }}
        >
          

          <Form.Item
            rules={[
              {
                required: true,
                message: "Please input your title",
              },
            ]}
            name="title"
            label="Title english"
          >
            <Input className="py-2" />
          </Form.Item>

          <Form.Item
            rules={[
              {
                required: true,
                message: "Please input your title",
              },
            ]}
            name="titlear"
            label="Title arabic"
          >
            <Input className="py-2" />
          </Form.Item>

          <Form.Item
            rules={[
              {
                required: true,
                message: "Please input your title",
              },
            ]}
            name="titletr"
            label="Title turkish"
          >
            <Input className="py-2" />
          </Form.Item>

          <div className=" grid gap-3 md:grid-cols-3 lg:grid-cols-4 grid-cols-1">
            <div className=" flex  md:col-span-2 gap-2 items-center justify-center md:justify-start"></div>
          </div>

          
            <div>
              <Form.Item
                label="Description"
                name="desc"
                rules={[
                  {
                    required: true,
                    message: "Please input your description!",
                  },
                ]}
              >
                {/* <textarea rows={5}></textarea> */}

                <ReactQuill
                  modules={modules}
                  theme="snow"
                  className=" pb-[10px] border-[2.5px] text-black font-medium rounded-md border-teal-400 hover:border-blue-600"
                />
              </Form.Item>

              <Form.Item
                label="Description arabic"
                name="descar"
                rules={[
                  {
                    required: true,
                    message: "Please input your description!",
                  },
                ]}
              >
                {/* <textarea rows={5}></textarea> */}

                <ReactQuill
                  modules={modules}
                  theme="snow"
                  className=" ql-editor-rt pb-[10px] border-[2.5px] text-black font-medium rounded-md border-teal-400 hover:border-blue-600"
                />
              </Form.Item>

              <Form.Item
                label="Description turkish"
                name="desctr"
                rules={[
                  {
                    required: true,
                    message: "Please input your description!",
                  },
                ]}
              >
                {/* <textarea rows={5}></textarea> */}

                <ReactQuill
                  modules={modules}
                  theme="snow"
                  className={`
            
            pb-[10px] border-[2.5px] text-black font-medium rounded-md border-teal-400 hover:border-blue-600`}
                />
              </Form.Item>
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
              Upload Images
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

export default RecipeForm;
