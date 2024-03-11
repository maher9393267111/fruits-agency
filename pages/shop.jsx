import React from "react";
import { Container } from "@mui/material";
import MainLayout from "components/ProjectComponents/mainLayout";
import AllProducts from "components/ProjectComponents/ShopProducts";
import api from "utils/__api__/grocery3-shop";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { getDocumentsOrder } from "../src/functions/firebase/getData";
export default function Shop(props) {
  return (
    <MainLayout>
      <Container
        sx={{
          mb: 6,
        }}
      >
        {/* OUR ALL PRODUCTS AREA */}
        <AllProducts products={props.products} />
      </Container>
    </MainLayout>
  );
}

export async function getServerSideProps({ locale }) {
  let products = [];

  products = await getDocumentsOrder(
    "products",
    orderBy("timeStamp", "asc"),

    where("ismeedia", "==", false)
  );

  

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      products:products
    },
  };
}

// export const getStaticProps = async ({ locale }) => {
//   const allProducts = await api.getAllProducts();
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ["common"])),
//       allProducts,
//     },
//   };
// };
