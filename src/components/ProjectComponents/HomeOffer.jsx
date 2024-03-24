import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Button, Card, Grid, styled } from "@mui/material";
import LazyImage from "components/LazyImage";
import { H3, Paragraph } from "components/Typography";
import { useTranslation } from "react-i18next";


// styled components
const StyledCard = styled(Card)(({
  theme
}) => ({
  display: "flex",
  boxShadow: "none",
  alignItems: "center",
  padding: "20px 50px",
  justifyContent: "center",
  background: theme.palette.paste[50],
  [theme.breakpoints.down("sm")]: {
    padding: "20px 30px",
    "& h3": {
      fontSize: 20
    }
  }
}));

// ============================================================

// ============================================================

const HomeOffer = () => {
  const router = useRouter();


  const {t} = useTranslation("common")

  const recipesCardHomeSlider= t('recipesCardHomeSlider', { returnObjects: true }) 
  console.log("recipesCardHome" ,recipesCardHomeSlider)


  return <Grid container spacing={3}>
     {/* //lg={4} */}
      {recipesCardHomeSlider.map((item, ind) => <Grid key={ind} item md={6} sm={12} xs={12} >
          <Link href="/recipes">
            <a>
              <StyledCard>
                <Box width="60%">
                <H3 fontSize={20} lineHeight={1.35}>
                    {item.title}
                  </H3>
                  <Paragraph className='!my-2 !justify-normal' fontWeight={600}>{item.subtitle}</Paragraph>

                  <Button sx={{
                mt: 2
              }} color="primary" variant="outlined" onClick={() => router.push("/recipes")}>
                    {item.buttonText}
                  </Button>
                  
                </Box>

                <Box width="40%">
                  <LazyImage width={100} height={100} alt={item.title} src={item.imgUrl} layout="responsive" objectFit="contain" />
                </Box>
              </StyledCard>
            </a>
          </Link>
        </Grid>)}
    </Grid>;
};
export default HomeOffer;