
import Link from "next/link";
import { useCallback, useState } from "react";
import { Box, Button, Chip, Divider, styled } from "@mui/material";
import {
  Add,
  Favorite,
  FavoriteBorder,
  Remove,
  RemoveRedEye,
} from "@mui/icons-material";
import { useSnackbar } from "notistack";
import ShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LazyImage from "components/LazyImage";
import { H3, Span } from "components/Typography";
import BazaarRating from "components/BazaarRating";
import { FlexBetween, FlexBox } from "components/flex-box";
import ProductViewDialog from "components/products/ProductViewDialog";
import { useAppContext } from "contexts/AppContext";
import { calculateDiscount, currency } from "lib";
import ReactPlayer from "react-player";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// styled components
const StyledBazaarCard = styled(Box)({
  height: "100%",
  margin: "auto",
  display: "flex",
  overflow: "hidden",
  position: "relative",
  flexDirection: "column",
  justifyContent: "space-between",
});
const ImageWrapper = styled(Box)(({ theme }) => ({
  borderRadius: 8,
  overflow: "hidden",
  textAlign: "center",
  position: "relative",
  display: "inline-block",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
  "&:hover": {
    "& .hoverButtonBox": {
      opacity: 1,
    },
    "& .hoverImgBox": {
      filter: "blur(0px)",
    },
  },
}));

const VideoWrapper = styled(Box)(({ theme }) => ({
  borderRadius: 8,
  overflow: "hidden",
  textAlign: "center",
  position: "relative",
  display: "inline-block",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));

const HoverButtonBox = styled(Box)({
  opacity: 0,
  top: "50%",
  left: "50%",
  width: "100%",
  height: "100%",
  position: "absolute",
  transition: ".5s ease",
  transform: "translate(-50%, -50%)",
  "& .buttonBox": {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    position: "relative",
    flexDirection: "column",
    justifyContent: "center",
    "& .addCartButton": {
      bottom: 20,
      margin: "auto",
      padding: "4px 14px",
      position: "absolute",
      "& svg": {
        fontSize: 16,
      },
    },
  },
});
const ImageBox = styled(Box)({
  opacity: 1,
  // padding: "44px 40px",
  background: "#F5F5F5",
  transition: "all .3s ease",
});
const ItemController = styled(FlexBetween)(({ theme }) => ({
  background: "#fff",
  overflow: "hidden",
  borderRadius: "5px",
  boxShadow: theme.shadows[2],
  "& span": {
    width: "100%",
    height: "100%",
    display: "flex",
    padding: "6px 12px",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",
      background: "#f3f5f9",
    },
  },
  "& svg": {
    fontSize: 22,
    color: theme.palette.grey[600],
  },
}));
const StyledChip = styled(Chip)({
  zIndex: 11,
  top: "10px",
  left: "10px",
  paddingLeft: 3,
  paddingRight: 3,
  fontWeight: 600,
  fontSize: "10px",
  position: "absolute",
});
const ContentWrapper = styled(Box)({
  padding: "1rem",
  "& .title, & .categories": {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
});

// ====================================================================

// ====================================================================

const ProductCardMain = ({ ...props }) => {
  const {
    off,
    id,
    title,
    price,
    imgUrl,
    rating,
    hideRating,
    slug,
    video,
    ismedia,
    isrecipe
  } = props;
  const { enqueueSnackbar } = useSnackbar();
  const { state, dispatch } = useAppContext();
  const [openModal, setOpenModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const toggleIsFavorite = () => setIsFavorite((fav) => !fav);
  const toggleDialog = useCallback(() => setOpenModal((open) => !open), []);
  const cartItem = state.cart.find((item) => item.slug === slug);
  const handleCartAmountChange = (amount, type) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        price,
        imgUrl,
        id,
        name: title,
        qty: amount,
        slug,
      },
    });

    // SHOW ALERT PRODUCT ADDED OR REMOVE
    if (type === "remove") {
      enqueueSnackbar("Remove from Cart", {
        variant: "error",
      });
    } else {
      enqueueSnackbar("Added to Cart", {
        variant: "success",
      });
    }
  };

  

  const {t} = useTranslation("common")


  return (
    <StyledBazaarCard >
      {/* {ismedia ? 'meeee' :"nooo"} */}
      {ismedia ? (
        <VideoWrapper >
          <ImageBox className="hoverImgBox">
            <a>
              <ReactPlayer
                className="!rounded-2xl "
                controls
                width="auto"
                height="330px"
                playing={false}
                muted={true}
                url={video}
              />
            </a>
          </ImageBox>
        </VideoWrapper>
      ) : (
        <ImageWrapper>
          <ImageBox className="hoverImgBox   ">
            <Link href={isrecipe ? `/recipes/single?id=${slug}` : `/shop/single?id=${slug}`}>
              <a>
                <LazyImage
                  alt={title}
                  width={190}
                  height={190}
                  src={imgUrl}
                  layout="responsive"
                  objectFit="contain"
                  
                />
              </a>
            </Link>
          </ImageBox>

          {/* <ProductViewDialog openDialog={openModal} handleCloseDialog={toggleDialog} product={{
        title,
        price,
        id,
        slug,
        imgGroup: [imgUrl, imgUrl]
      }} /> */}

          <HoverButtonBox className="hoverButtonBox">
            <Box className="buttonBox">
              {/* <ItemController>
              <Span onClick={toggleDialog}>
                <RemoveRedEye />
              </Span>

              <Divider orientation="vertical" flexItem />

              <Span onClick={toggleIsFavorite}>
                {isFavorite ? <Favorite color="primary" fontSize="small" /> : <FavoriteBorder fontSize="small" color="primary" />}
              </Span>

              <Divider orientation="vertical" flexItem />

              <Span onClick={handleCartAmountChange(1)}>
                <ShoppingCartIcon />
              </Span>
            </ItemController> */}

              {props.isorderpage && (
                <div className="text-center flex justify-center">
                  {cartItem?.qty ? (
                    <Button
                      color="primary"
                      variant="outlined"
                      className="addCartButton"
                      onClick={handleCartAmountChange(0, "remove")}
                    >
                      <Remove /> {t('removefromcart')}
                    </Button>
                  ) : (
                    <Button
                      color="primary"
                      variant="outlined"
                      className="addCartButton"
                      onClick={handleCartAmountChange(1)}
                    >
                      <Add /> {t('addtocart')}
                    </Button>
                  )}
                </div>
              )}
            </Box>
          </HoverButtonBox>
        </ImageWrapper>
      )}

      <ContentWrapper >
        {ismedia ?
        <H3 mb={1} title={title} fontSize="14px" fontWeight="600" className="title " color="text.secondary">
            {title}
          </H3>
          :
        <Link href={isrecipe ? `/recipes/single?id=${slug}` : `/shop/single?id=${slug}`}>
          <a>
            <H3
              mb={1}
              title={title}
              fontSize="14px"
              fontWeight="600"
              className="title"
              color="text.secondary"
            >
              {title}
            </H3>
          </a>
        </Link>
}

        {/* <FlexBox gap={1} alignItems="center" mt={0.5}>
          <Box fontWeight="600" color="primary.main">
            {calculateDiscount(price, off)}
          </Box>

          {off !== 0 && <Box color="grey.600" fontWeight="600">
              <del>{currency(price)}</del>
            </Box>}
        </FlexBox> */}
      </ContentWrapper>
    </StyledBazaarCard>
  );
};
export default ProductCardMain;




export const getStaticProps = async ({ locale }) => {

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),

    },
  };
};
