import { Box, Button, Grid, styled, useTheme } from "@mui/material";
import { H1 ,H2 } from "components/Typography";
import LazyImage from "components/LazyImage";
import Carousel from "components/carousel/Carousel";

import Link from "next/link";
import { useTranslation } from "next-i18next";


// styled components
const StyledBox = styled(Box)({
  marginBottom: 60,
  overflow: "hidden",
  "& .carousel-dot": {
    left: 0,
    right: 0,
    bottom: "30px",
    margin: "auto",
    position: "absolute",
  },
});
const Container = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.paste[50],
}));
const StyledGrid = styled(Grid)(({ theme }) => ({
  maxWidth: 1280,
  alignItems: "center",
  margin: " 0 auto",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column-reverse",
  },
}));
const GridItemTwo = styled(Grid)(({ theme }) => ({
  paddingLeft: 80,
  [theme.breakpoints.down("md")]: {
    paddingLeft: 40,
  },
  [theme.breakpoints.down("sm")]: {
    paddingLeft: 0,
    textAlign: "center",
  },
}));
const StyledButton = styled(Button)({
  color: "#fff",
  fontWeight: 400,
  fontSize: "16px",
});
const GridItemOne = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));
const TextBox = styled(Box)(({ theme }) => ({
  marginBottom: 40,
  "& h1": {
    fontSize: 50,
    fontWeight: 600,
    lineHeight: "1.35",
  },
  [theme.breakpoints.down("lg")]: {
    "& h1": {
      fontSize: 45,
    },
  },
  [theme.breakpoints.down("md")]: {
    "& h1": {
      fontSize: 38,
    },
  },
  [theme.breakpoints.down("sm")]: {
    paddingTop: 30,
  },
}));





// ===================================================================

// ===================================================================

const HomeSlider = ({ mainCarouselData }) => {
  const { palette } = useTheme();

  const { t } = useTranslation("common");

  const slider = t("slider", { returnObjects: true });
  console.log("links", slider);

  return (
    <StyledBox id="carouselBox">
      <Carousel
        spacing="0px"
        showDots={true}
        autoPlay={false}
        showArrow={false}
        visibleSlides={1}
        dotClass="carousel-dot"
        dotColor={palette.primary.main}
        totalSlides={slider.length}
      >
        {/* mainCarouselData */}
        {slider?.map((item, ind) => (
          <Container key={ind} >
            <StyledGrid container>
              <GridItemOne item md={6} sm={6} xs={12}>
                <Box pt={6}>
                  <LazyImage
                    priority
                    width={100}
                    height={100}
                    alt={item.title ? item?.title : "Title"}
                    src={
                      item.imgUrl
                        ? item.imgUrl
                        : "/assets/images/sweetimages/Home-Slide-show-2.png"
                    }
                    layout="responsive"
                    objectFit="contain"
                  />
                </Box>
              </GridItemOne>

              <GridItemTwo item md={6} sm={6} xs={12}>
                <TextBox>
                 
                  <H1 className=' !my-6 md:!mb-[160px] text-green-500' maxWidth={400}>{item.welcome}</H1>
                  
                  <H2 maxWidth={370} className='justify-center m-auto'>{item.title}</H2>
                
                </TextBox>

                <div className="flex gap-6 mb-5 lg:justify-center m-auto">
                  <StyledButton 
                    onClick={() => router.push(item.buttonLink)}
                    className=" bg-red-500 mx-2"
                    variant="contained"
                    color="primary"
                    sx={{
                      px: "30px",
                      py: "6px",
                    }}
                  >
                    {item.buttonText}
                  </StyledButton>

                  <Link href={"/order"}>
                    <StyledButton
                      className=" bg-red-500 mx-2"
                      variant="contained"
                      color="primary"
                      sx={{
                        px: "30px",
                        py: "6px",
                      }}
                    >
                      {t("navbar.orders")}
                    </StyledButton>
                  </Link>
                </div>
              </GridItemTwo>
            </StyledGrid>
          </Container>
        ))}
      </Carousel>
    </StyledBox>
  );
};
export default HomeSlider;
