import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import MainLayout from "components/ProjectComponents/mainLayout";
import AllProducts from "components/ProjectComponents/ShopProducts";
import api from "utils/__api__/grocery3-shop";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import {
  getDocuments,
getDocumentsOrder,
} from "../../src/functions/firebase/getData";
import { orderBy, where } from "firebase/firestore";
import { t } from "i18next";
export default function Recipes() {
  const [products, setProducts] = useState([]);
  const [loacding, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      setProducts([]);
      const data = await getDocumentsOrder(
        "recipes",
        orderBy("timeStamp", "asc"),
       
      );

      console.log(data, "fetch products ====>>>>");
      setProducts(data);
      setLoading(false);
    };
    getProducts();
  }, []);

  const {t} = useTranslation("common")

  return (
    <MainLayout>
      <Container
        sx={{
          mb: 6,
        }}
      >
        {/* OUR ALL PRODUCTS AREA */}
        <AllProducts isrecipe={true} products={products} title={t('navbar.recipes')} />
      </Container>
    </MainLayout>
  );
}

export const getStaticProps = async ({ locale }) => {
  //const allProducts = await api.getAllProducts();
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // allProducts,
    },
  };
};
