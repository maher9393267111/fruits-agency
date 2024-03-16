import React, { useState } from "react";

import AddProductMain from "../../../src/components/admin/recipe/addrecipe";
import { getDocuments } from "../../../src/functions/firebase/getData";

const AddRecipePage = ({}) => {
  return (
    <div>
      <AddProductMain />
    </div>
  );
};

export default AddRecipePage;

// serverside
AddRecipePage.getInitialProps = async (context) => {
  return {};
};
