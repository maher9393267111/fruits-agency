import React, { useState, useEffect } from "react";
import { Container, Box } from "@mui/material";
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
import AboutSectionHome from "components/ProjectComponents/AboutSectionHome";

import api from "utils/__api__/grocery3-shop";



export default function Home(props) {
  console.log("Products");

  const [products, setProducts] = useState([]);
  const [media, setMedia] = useState([]);
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

    const getMedia = async () => {
      setLoading(true);

      const data = await getDocumentsOrder(
        "products",
        orderBy("timeStamp", "asc"),
        where("ismedia", "==", true)
      );

      console.log(data, "fetch media ====>>>>");
      setMedia(data);
      setLoading(false);
    };

    getProducts();
    getMedia();
  }, []);

  return (
    <MainLayout>
      {loacding ? (
        <Loader />
      ) : (
        <div className="mb-12">
          {/* mainCarouselData={props.mainCarouselData} */}
          <HomeSlider products={products} />

          <Container
            sx={{
              mb: 6,
            }}
          >


            {/* <About /> */}
            <HomeOffer offers={props.offerCards} />

            <HomeProductsSlider
              isorderpage={false}
              products={products}
              // {props.topSailedProducts}
            />

            <div className=" my-12">
              <HomeProductsSlider
                ismedia={true}
                isorderpage={false}
                products={media}
              />
            </div>

            <AboutSectionHome />
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
