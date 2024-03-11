import React from "react";
import { Container, Grid } from "@mui/material";
import MainLayout from "components/ProjectComponents/mainLayout";
import AllProducts from "components/ProjectComponents/ShopProducts";
import OrderSidebar from "components/ProjectComponents/OrderSidebar";
import api from "utils/__api__/grocery3-shop";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
export default function Order(props) {
  return (
    <MainLayout>
      {/* <Container
        sx={{
          mb: 6,
        }}
      > */}

      <div className=" mx-[65px]">
        <Grid container mb={-0.5} spacing={3}>
          <Grid item md={9} sm={12} xs={12}>
            {/* OUR ALL PRODUCTS AREA */}
            <AllProducts isorderpage={true} products={props.allProducts} />
          </Grid>

          <Grid item md={3} sm={12} xs={12}>
            {/* OUR ALL PRODUCTS AREA */}
            <div>
              <div className=" min-h-[500px] md:!mt-[125px] mx-4 bg-white p-4 ">
                <OrderSidebar />
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      {/* </Container> */}
    </MainLayout>
  );
}

export const getStaticProps = async ({ locale }) => {
  const allProducts = await api.getAllProducts();
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      allProducts,
    },
  };
};
