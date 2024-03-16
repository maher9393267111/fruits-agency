import React from "react";
import { useState } from "react";
import { Table, Space, Button, Form, Select } from "antd";

import Link from "next/link";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { FaVideo } from "react-icons/fa6";
import { FaVideoSlash } from "react-icons/fa";
import {
  handleDeleteGlobal,
  handleDelete,
} from "../../../functions/firebase/getData";
import Image from "next/image";
import { useSnackbar } from "notistack";

const ProductTable = ({ products, news }) => {
    
  const { enqueueSnackbar } = useSnackbar();
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const [selectedProduct, setSelectedProduct] = useState({});
  const [selectedUser, setSelectedUser] = useState({});
  function onChange(user, i) {
    setSelectedProduct(products.find((product) => product.title === i));
    setSelectedUser(user)
    console.log("I", i, user, selectedProduct);

    //send news to user email
  }

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };



const SendNews =async()=>{

if( !selectedProduct.title){

  enqueueSnackbar("you must select product first", {
    variant: "error",
  });

  return

}


const data ={
to:selectedUser.email,
phone:selectedUser.phone,
name:selectedUser.name,
product:selectedProduct


}


    const res = await fetch(`/api/news`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
  
        body: JSON.stringify(data),
      });
  
      console.log("RESPONSE", res);
  
      if (res?.status === 200) {
        enqueueSnackbar("News has sended successfully", {
          variant: "success",
        });
      } else {
        enqueueSnackbar("Some thing wrong", {
          variant: "error",
        });
      }

}


  const columns = [
    {
      title: "Name",
      // same name from database   // category={title ,....}
      dataIndex: "name",
    },
    {
      title: "Email",
      // same name from database   // category={title ,....}
      dataIndex: "email",
    },

    {
      title: "Phone",
      // same name from database   // category={title ,....}
      dataIndex: "phone",
    },

    {
      title: "Products",
      // 💡💡  render to make style in table in single category
      // single category data ==> title , image , id
      render: (record) => {
        return (
          <>
            <div className=" flex items-center mt-4 ">
              {/* -----category--- */}
              <Form.Item name="category" label="">
                <Select
                  onChange={(e) => {
                    onChange(record, e);
                  }}
                  className=" !placeholder-black"
                  placeholder="Select Product"
                >
                  {products?.map((product) => {
                    return (
                      <Select.Option key={product?.id} value={product.title}>
                        {product?.title}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
          </>
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
                  onClick={() => handleDelete("news", record, true)}
                  className=" hover:text-red-700 text-red-500 cursor-pointer"
                  size={"25"}
                />
              </div>

              <div>
                <p onClick={ SendNews} className="  cursor-pointer bg-green-500 text-white font-semibold text-center px-4 py-2 rounded-md">
                  Send news
                </p>
              </div>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <div className=" w-[90%]  md:w-[70%] mx-auto !mt-24">
      <Table onChange={handleChange} columns={columns} dataSource={news} />
    </div>
  );
};

export default ProductTable;
