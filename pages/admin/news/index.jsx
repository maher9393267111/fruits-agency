import React, { useState, useEffect } from "react";
import { getDocuments } from "functions/firebase/getData";
import NewsMain from "components/admin/news";
import Loader from "../../../src/components/admin/common/Loader";
const AllProductsPage = ({}) => {
  const [news, setNews] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // const Products = await getDocuments("products")

  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      
      const data = await getDocuments("news");
      console.log(data, "fetch news ====>>>>");
      setNews(data);
      setLoading(false);
    };


    const getProducts = async () => {
        setLoading(true);
        
        const data = await getDocuments("products");
        console.log(data, "fetch news ====>>>>");
        setProducts(data);
        setLoading(false);
      };

    getNews();
    getProducts();
  }, []);

  return (
    <div>
      {/* {products && products?.length > 0 ? */}

      {loading ? <Loader /> : <NewsMain products={products} news={news} />}
    </div>
  );
};

export default AllProductsPage;
