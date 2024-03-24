import Link from "next/link";
import { useState, useEffect } from "react";

import { useRouter } from "next/router";
import parse from "html-react-parser";
import Loader from "../../src/components/admin/common/Loader";
import { Add, Remove } from "@mui/icons-material";
import { Avatar, Box, Button, Chip, Grid, Container } from "@mui/material";
import LazyImage from "components/LazyImage";
import BazaarRating from "components/BazaarRating";
import { H1, H2, H3, H6 } from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import { FlexBox, FlexRowCenter } from "components/ProjectComponents/flex-box";
import { currency } from "lib";
import productVariants from "data/product-variants";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { loadBundle } from "firebase/firestore";
import {
  getDocuments,
  getDocument,
} from "../../src/functions/firebase/getData";
import MainLayout from "components/ProjectComponents/mainLayout";

// ================================================================

// ================================================================

const ProductDescription = () => {
  return (
    <Box>
      <H3 mb={2}>Specification:</H3>
      <Box>
        Brand: Beats <br />
        Model: S450 <br />
        Wireless Bluetooth Headset <br />
        FM Frequency Response: 87.5 – 108 MHz <br />
        Feature: FM Radio, Card Supported (Micro SD / TF) <br />
        Made in China <br />
      </Box>
    </Box>
  );
};

export default function ProductSingle({}) {
  const [product, setProduct] = useState({});
  console.log("🎭🎭🎭>", product.title);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const locale =router.locale
  const id = router.query.id;

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      //setProduct({});
      const data = await getDocument("products", id);
      console.log(data, "fetch categories ====>>> 🎭🎭🎭>", data);
      setProduct(data);
      setLoading(false);
    };

    if (id) getProduct();
  }, [id]);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectVariants, setSelectVariants] = useState({
    option: "option 1",
    type: "type 1",
  });

  // HANDLE CHAMGE TYPE AND OPTIONS
  const handleChangeVariant = (variantName, value) => () => {
    setSelectVariants((state) => ({
      ...state,
      [variantName.toLowerCase()]: value,
    }));
  };

  // HANDLE SELECT IMAGE
  const handleImageClick = (ind) => () => setSelectedImage(ind);

  return (
    <MainLayout>
      <Container
        sx={{
          mb: 6,
        }}
      >
        <Box className=" mt-[66px]" width="100%">
          {loading ? (
            <Loader />
          ) : (
            <Grid container spacing={3} justifyContent="space-around">
              <Grid item md={6} xs={12} alignItems="center">
                <FlexBox justifyContent="center" mb={6}>
                  {product?.images && product?.images[0] && (
                    <LazyImage
                      alt={product?.title}
                      width={500}
                      height={500}
                      loading="eager"
                      objectFit="contain"
                      src={product?.images && product?.images[selectedImage]}
                    />
                  )}
                </FlexBox>

                <FlexBox overflow="auto">
                  {product?.images &&
                    product?.images.map((url, ind) => (
                      <FlexRowCenter
                        key={ind}
                        width={64}
                        height={64}
                        minWidth={64}
                        bgcolor="white"
                        border="1px solid"
                        borderRadius="10px"
                        ml={ind === 0 ? "auto" : 0}
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={handleImageClick(ind)}
                        mr={
                          ind === product?.images.length - 1 ? "auto" : "10px"
                        }
                        borderColor={
                          selectedImage === ind ? "primary.main" : "grey.400"
                        }
                      >
                        <Avatar
                          src={url}
                          variant="square"
                          sx={{
                            height: 40,
                          }}
                        />
                      </FlexRowCenter>
                    ))}
                </FlexBox>
              </Grid>

              <Grid item md={6} xs={12} alignItems="center">
                <H1 mb={1}>{ locale === 'en' ?  product.title : locale === 'ar' ? product?.titlear : product?.titletr}</H1>


                <div>
  
  {product?.desc && (
                    <Box className="mx-4 md:mx-2" alignItems="center" mb={1}>
                      {parse(locale === 'en' ?  product.desc : locale === 'ar' ? product?.descar : product?.desctr)}
                    </Box>
                  )}
  </div>



                {/* <FlexBox alignItems="center" mb={1}>
            <Box>Brand:</Box>
            <H6>Xiaomi</H6>
          </FlexBox>

          <FlexBox alignItems="center" mb={2}>
            <Box lineHeight="1">Rated:</Box>
            <Box mx={1} lineHeight="1">
              <BazaarRating color="warn" fontSize="1.25rem" value={4} readOnly />
            </Box>
            <H6 lineHeight="1">(50)</H6>
          </FlexBox> */}

                {/* <Box pt={1} mb={3}>
            <H2 color="primary.main" mb={0.5} lineHeight="1">
              {currency(price)}
            </H2>
            <Box color="inherit">Stock Available</Box>
          </Box>

      

          <FlexBox alignItems="center" mb={2}>
            <Box>Sold By:</Box>
            <Link href="/shops/scarlett-beauty" passHref>
              <a>
                <H6 ml={1}>Mobile Store</H6>
              </a>
            </Link>
          </FlexBox> */}
              </Grid>





            </Grid>
          )}

          {/* <ProductDescription /> */}
        </Box>
      </Container>
    </MainLayout>
  );
}

export const getStaticProps = async (ctx) => {
  return {
    revalidate: 1,
    props: {
      ...(await serverSideTranslations(ctx.locale, ["common"])),
    },
  };
};

// export default ProductInfo;
