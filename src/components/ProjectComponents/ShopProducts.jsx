import { Box, Button, Grid, styled } from "@mui/material";
import { useRouter } from "next/router";
import { H1 } from "components/Typography";
import ProductCard from "./ProductCard";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useState } from "react";


// styled component
const TitleBox = styled(Box)(({
  theme
}) => ({
  textAlign: "center",
  "& h1": {
    fontSize: 40,
    fontWeight: 600,
    marginBottom: "10px"
  },
  "& div": {
    width: 200,
    height: "2px",
    margin: "auto",
    background: theme.palette.primary.main
  }
}));

// ===============================================================

// ===============================================================

const ShopProducts = ({
  products,
  isorderpage = false,
  isrecipe= false,
  ismedia
}) => {

  const {locale} = useRouter()

  const {t} = useTranslation("common")

  const [page,setPage]= useState("/recipes");

  return <Box>
      <TitleBox my={4}>
        { page === "/recipes" ? 
        <H1>{t('products')}</H1>
        
          :
          <H1>{t('homeproductsslider1')}</H1>
        }
        <Box />
      </TitleBox>

      <Grid container mb={-0.5} spacing={3}>
        {products.map(item => <Grid key={item.id} item md={4} sm={6} xs={12}>
            <ProductCard isrecipe={isrecipe} ismedia={item?.ismedia}   isorderpage={isorderpage} video={item?.video || item?.videourl}  hideRating id={item.id} slug={item.id}  title={locale === 'en' ?  item?.title : locale === 'ar' ? item?.titlear : item.titletr}  imgUrl={item?.images[0]} />
          </Grid>)}
      </Grid>
      {/* <Box mt={6} display="flex" justifyContent="center">
        <Button variant="contained" color="primary" sx={{
        fontSize: "13px"
      }}>
          Load More...
        </Button>
      </Box> */}
    </Box>;
};
export default ShopProducts;



export const getStaticProps = async ({ locale }) => {

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),

    },
  };
};
