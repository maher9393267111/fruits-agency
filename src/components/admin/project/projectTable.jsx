import React from "react";
import { useState } from "react";
import { Table, Space, Button } from "antd";
import Link from "next/link";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { handleDeleteGlobal } from "../../../functions/firebase/getData";
import Image from "next/image";

const ProjectTable = ({projects}) => {

  const columns = [
    {
      title: "Projects",
      // same name from database   // category={title ,....}
      dataIndex: "title",

    },
    {
      title: "Image",
      // single category {record} --> record.image.url === category.image.url
      render: (record) => {
        return (
          <div className="flex justify-start w-[100%]  gap-4 ">
            <Image
              width={50}
              height={50}
              className="  relative  w-24 h-24 object-cover object-center rounded-full"
              src={record.images[0]}
              alt=""
            />
          </div>
        );
      },
    },

    {
      title: "Actions",
      // 💡💡  render to make style in table in single category
      // single category data ==> title , image , id
      render: (record) => {
        return (
          <>
            <div className=" flex gap-4  items-center">
              <div>
                <AiFillDelete
                  // send collection name and single category data to delete
                  onClick={() => handleDelete("projects", record, true)}
                  className=" hover:text-red-700 text-red-500 cursor-pointer"
                  size={"25"}
                />
              </div>

              <div>
                <Link href={`/admin/project/edit/${record?.id}`}>
                  <AiFillEdit
                    className="hover:text-blue-700 text-blue-500 cursor-pointer"
                    size={"25"}
                  />
                </Link>
              </div>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <div className=" w-[90%]  md:w-[70%] mx-auto">
      <Space
        style={{
          marginBottom: 16,
        }}
      >
      </Space>
      <Table columns={columns} dataSource={projects} />
    </div>
  );
};

export default ProjectTable;
