import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import MainLayout from "../src/components/ProjectComponents/mainLayout";
import HomeSlider from "components/ProjectComponents/HomeSlider";
import HomeOffer from "components/ProjectComponents/HomeOffer";
import HomeProductsSlider from "components/ProjectComponents/HomeProductsSlider";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { orderBy, where, collection, query, getDocs } from "firebase/firestore";
import { db } from "functions/firebase";
import { getDocuments, getDocumentsOrder } from "functions/firebase/getData";
import Loader from "components/admin/common/Loader";

import api from "utils/__api__/grocery3-shop";

export default function Home(props) {
  console.log("Products");

  const [products, setProducts] = useState([]);
  const [loacding, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      setProducts([]);
      const data = await getDocumentsOrder(
        "products",
        orderBy("timeStamp", "asc"),
         where("ismedia", "==", false)
      );

      console.log(data, "fetch products ====>>>>");
      setProducts(data);
      setLoading(false);
    };
    getProducts();
  }, []);




  return (
    <MainLayout>
      {products?.length}
      {loacding ? (
        <Loader />
      ) : (
        <div>
          <HomeSlider products={products} mainCarouselData={props.mainCarouselData} />

          <Container
            sx={{
              mb: 6,
            }}
          >
            <HomeOffer  offers={props.offerCards} />

            <HomeProductsSlider
            
              isorderpage={false}
              products= {products}
              // {props.topSailedProducts}
            />
          </Container>
        </div>
      )}
    </MainLayout>
  );
}

export const getStaticProps = async ({ locale }) => {
  const mainCarouselData = await api.getMainCarousel();
  const offerCards = await api.getOfferCards();
  //const topSailedProducts = await api.getTopSailedProducts();
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),

      mainCarouselData,
      offerCards,
    //  topSailedProducts,
    },
  };
};

