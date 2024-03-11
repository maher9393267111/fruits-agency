import React, { useState } from "react";

import AddProductMain from "../../../src/components/admin/product/addProduct";
import { getDocuments } from "../../../src/functions/firebase/getData";

const AddProductPage = ({}) => {
  return (
    <div>
      <AddProductMain />
    </div>
  );
};

export default AddProductPage;

// serverside
AddProductPage.getInitialProps = async (context) => {
  return {};
};
