import React from "react";
import { Table, Dropdown } from "antd";
import Link from "next/link";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MoreOutlined } from "@ant-design/icons";
import { handleDelete, updateUserRole } from "../../../functions/firebase";
const UsersTable = ({ users }) => {
  const USER_ACTIONS = [
    { label: "Admin", value: "admin" },
    { label: "User", value: "user" },
    { label: "Guest", value: "guest" },
  ];

  //  id is user id well be change role
  const createUserAction = (id) =>
    USER_ACTIONS.map(({ label, value }) => ({
      key: label,
      label, //  // is  text or item in dropdown menu
      onClick: () => updateUserRole(id, value),
    }));

  const columns = [
    {
      title: "name",
      // same name from database   // category={title ,....}
      dataIndex: "displayName",
    },

    // {
    //   title: "image",
    //   // single category {record} --> record.image.url === category.image.url
    //   render: (record) => {
    //     return (
    //       <>
    //         <img
    //           className="  relative  -ml-6  w-24 h-24 object-contain object-center "
    //           src={record?.avatarUrl}
    //           alt=""
    //         />
    //       </>
    //     );
    //   },
    // },

    {
      title: "role",
      // same name from database   // category={title ,....}
      dataIndex: "role",
    },

    {
      title: "Change Role",
      // 💡💡  render to make style in table in single category
      // single category data ==> title , image , id
      render: (record) => {
        return (
          <>
            <div className=" flex gap-4  items-center">
              <div>
                <AiFillDelete
                  // send collection name and single category data to delete
                  onClick={() => handleDelete("users", record, false, true)}
                  className=" hover:text-red-700 text-red-500 cursor-pointer"
                  size={"25"}
                />
              </div>

              <div>
                <Dropdown
                  menu={{ items: createUserAction(record.id) }}
                  trigger={["click"]}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <MoreOutlined className=" text-xl" />
                  </a>
                </Dropdown>
              </div>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <div className=" w-[90%]  md:w-[70%] mx-auto">
      <Table columns={columns} dataSource={users} />
    </div>
  );
};

export default UsersTable;
