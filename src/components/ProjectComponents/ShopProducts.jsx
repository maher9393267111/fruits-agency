import { Box, Button, Grid, styled } from "@mui/material";
import { H1 } from "components/Typography";
import ProductCard from "./ProductCard";
import { useTranslation } from "next-i18next";
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
  isorderpage = false
}) => {


  const {t} = useTranslation("common")

  return <Box>
      <TitleBox my={4}>
        <H1>{t('products')}</H1>
      
        <Box />
      </TitleBox>

      <Grid container mb={-0.5} spacing={3}>
        {products.map(item => <Grid key={item.id} item md={4} sm={6} xs={12}>
            <ProductCard ismedia={item?.ismedia}   isorderpage={isorderpage} video={item?.video || item?.videourl}  hideRating id={item.id} slug={item.id}  title={item.title}  imgUrl={item?.images[0]} />
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