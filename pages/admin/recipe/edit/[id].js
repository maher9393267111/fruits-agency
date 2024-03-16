import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import UpdateProduct from "../../../../src/components/admin/recipe/updaterecipe";
import {
  getDocuments,
  getDocument,
} from "../../../../src/functions/firebase/getData";
import Loader from "../../../../src/components/admin/common/Loader";

const EditRecipePage = ({  }) => {
  //const product = await getDocument("products", context.query.id);

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const id = router.query.id ;

  // const Products = await getDocuments("products")

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      setProduct({});
      const data = await getDocument("recipes", id);
      console.log(data, "fetch categories ====>>>>");
      setProduct(data);
      setLoading(false);
    };

    if (id) getProducts();
  }, [id]);

  return (
    <div>{loading ? <Loader /> : <UpdateProduct product={product} />}</div>
  );
};

export default EditRecipePage;
