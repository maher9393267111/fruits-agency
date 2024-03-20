import React, { useState, useEffect } from "react";
import { getDocuments } from "functions/firebase/getData";
import ProductsMain from "components/admin/recipe/recipes";
import Loader from "../../../src/components/admin/common/Loader";
const  AllRecipesPage = ({}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // const Products = await getDocuments("products")

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      setProducts([]);
      const data = await getDocuments("recipes");
      console.log(data, "fetch categories ====>>>>");
      setProducts(data);
      setLoading(false);
    };
    getProducts();
  }, []);

  return (
    <div>
      {/* {products && products?.length > 0 ? */}

      {loading ? <Loader /> : <ProductsMain products={products} />}
    </div>
  );
};

export default AllRecipesPage;

