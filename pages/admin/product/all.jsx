import React from "react";
import { getDocuments } from "functions/firebase/getData";
import ProductsMain from "components/admin/product/products";
const AllProductsPage = ({ products }) => {
  return (
    <div>
      <ProductsMain products={products} />
    </div>
  );
};


export default AllProductsPage;


// serverside
AllProductsPage.getInitialProps = async (context) => {
  const Products = await getDocuments("products"); //  []


  console.log("productsData", Products);


  return {
    // props from serverside will go to props in clientside
    products: Products,
  };
};


