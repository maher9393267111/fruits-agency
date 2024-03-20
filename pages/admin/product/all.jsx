import React, { useState, useEffect } from "react";
import { getDocuments } from "functions/firebase/getData";
import ProductsMain from "components/admin/product/products";
import Loader from "../../../src/components/admin/common/Loader";
const AllProductsPage = ({}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // const Products = await getDocuments("products")

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      setProducts([]);
      const data = await getDocuments("products");
      console.log(data, "fetch categories ====>>>>");
      setProducts(data);
      setLoading(false);
    };
    getProducts();
  }, []);

  return (
    <div>
      {products.length}
      {/* {products && products?.length > 0 ? */}

      {loading ? <Loader /> : <ProductsMain products={products} />}
    </div>
  );
};

export default AllProductsPage;

// serverside
// AllProductsPage.getInitialProps = async (context) => {
//  const Products = await getDocuments("products"); //  []

// console.log("productsData", Products);

//   return {
//     //props from serverside will go to props in clientside
//    products: Products || [] ,
//   };
// };