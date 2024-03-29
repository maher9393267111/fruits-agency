import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, styled, useTheme } from "@mui/material";
import { H1 } from "components/Typography";
import Carousel from "components/carousel/Carousel";
import ProductCard from "./ProductCard";
import useWindowSize from "hooks/useWindowSize";
import { t } from "i18next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

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

// ===============================================================

// ===============================================================

const TopProducts = ({ products, isorderpage }) => {
  const theme = useTheme();
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(3);

  const { locale } = useRouter();

  const { t } = useTranslation("common");

  useEffect(() => {
    if (width < 500) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(3);
    else setVisibleSlides(3);
  }, [width]);
  return <Box>



      {(products && products?.length > 0) &&

      <Carousel infinite={true} visibleSlides={visibleSlides} totalSlides={products.length} sx={{
      "& #backArrowButton, #backForwardButton": {
        width: 40,
        height: 40,
        borderRadius: 0,
        background: "#fff",
        boxShadow: theme.shadows[2],
        color: theme.palette.primary.main,
      }
    }}>
        {products?.map(item => <Box py={0.5} key={item.id}>
            <ProductCard 
             ismedia={item.ismedia}
             video={item?.video || item?.videourl}  
            
            isorderpage={ isorderpage} id={item.id} slug={item.id} 
            title={ locale === 'en' ?  item.title : locale === 'ar' ? item?.titlear : item?.titletr}
            
            price={22} imgUrl={item?.images[0]} />
          </Box>)}
      </Carousel>
}


    </Box>;
};
export default TopProducts;
