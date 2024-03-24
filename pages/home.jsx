import React, { useState, useEffect } from "react";
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
import Footer from "../src/components/ProjectComponents/footer";

import api from "utils/__api__/grocery3-shop";
import { Box, styled, useTheme, Container } from "@mui/material";
import { H1 } from "components/Typography";

export default function Home(props) {
  // styled components
  const TitleBox = styled(Box)(({ theme }) => ({
    textAlign: "center",
    "& h1": {
      fontSize: 40,
      fontWeight: 600,
      marginBottom: "10px",
    },
    "& div": {
      width: 200,
      height: "2px",
      margin: "auto",
      background: theme.palette.primary.main,
    },
  }));

  // ---------------------------------------------------------

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

  const { t } = useTranslation("common");

  return (
    <MainLayout>
      {loacding ? (
        <Loader />
      ) : (
        <div className="mb-1">
          <HomeSlider
            products={products}
            mainCarouselData={props.mainCarouselData}
          />

          <Container
            sx={{
              mb: 3,
            }}
          >
            <AboutSectionHome />
            <TitleBox my={2}>
              <H1>{t("homeproductsslider")}</H1>

              <Box />
            </TitleBox>

            <HomeProductsSlider
              isorderpage={false}
              products={products}
              // {props.topSailedProducts}
            />
            <TitleBox my={2}>
              <H1>{t("homeproductsslider2")}</H1>
              <Box />
            </TitleBox>

            <HomeOffer offers={props.offerCards} />

            <div className=" my-10">
              <TitleBox my={2}>
                <H1>{t("homeproductsslider1")}</H1>

                <Box />
              </TitleBox>
              <HomeProductsSlider
                ismedia={true}
                isorderpage={false}
                products={media}
              />
            </div>

            {/* <Footer /> */}
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
