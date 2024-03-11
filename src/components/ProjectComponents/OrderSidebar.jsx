import { useCallback, useState } from "react";
import {
  Button,
  Card,
  Box,
  styled,
  TextField,
  Avatar,
  IconButton,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import * as yup from "yup";
import { useFormik } from "formik";
import { H1, H6, H5, Paragraph, Tiny } from "components/Typography";
import BazaarImage from "components/BazaarImage";
import BazaarTextField from "components/BazaarTextField";

// import EyeToggleButton from "./EyeToggleButton";
import { FlexBox, FlexRowCenter, FlexBetween } from "components/flex-box";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../../../src/functions/contextproject";
import { useSnackbar } from "notistack";

import { Add, Clear, Close, Remove } from "@mui/icons-material";
import LazyImage from "components/LazyImage";

import CartBag from "components/icons/CartBag";
import { useAppContext } from "contexts/AppContext";
import { currency } from "lib";
import { changeLanguage } from "i18next";
import { useTranslation } from "next-i18next";

// ===============================================================

// ===============================================================

const fbStyle = {
  background: "#3B5998",
  color: "white",
};
const googleStyle = {
  background: "#4285F4",
  color: "white",
};
export const Wrapper = styled(({ children, passwordVisibility, ...rest }) => (
  <Card {...rest}>{children}</Card>
))(({ theme, passwordVisibility }) => ({
  width: 500,
  padding: "2rem 3rem",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  ".passwordEye": {
    color: passwordVisibility
      ? theme.palette.grey[600]
      : theme.palette.grey[400],
  },
  ".facebookButton": {
    marginBottom: 10,
    ...fbStyle,
    "&:hover": fbStyle,
  },
  ".googleButton": {
    ...googleStyle,
    "&:hover": googleStyle,
  },
  ".agreement": {
    marginTop: 12,
    marginBottom: 24,
  },
}));
const OrderSidebar = () => {

    const {t} = useTranslation("common")


    const initialValues = {
        email: "",
        name: "",
        subject:"",
        description:"",
        adress:"",
        phone:""

      };
      const formSchema = yup.object().shape({
        //t("name")
        name: yup.string().required("name is required"),
        description: yup.string().required("message is required"),
        subject: yup.string().required("subject is required"),
        adress: yup.string().required("adress is required"),
        phone: yup.number().required("phone number is required"),
        email: yup.string().email("invalid email").required("Email is required"),
      });



  const { profile } = useAuth();
 

  const { enqueueSnackbar } = useSnackbar();

  const handleFormSubmit = async (values) => {
    console.log(values);
    const res = await fetch(`/api/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({ ...values, cart: cartList }),
    });

    console.log("RESPONSE", res);

    if (res?.status === 200) {
      enqueueSnackbar("your order sended successfully", {
        variant: "success",
      });
    } else {
      enqueueSnackbar("Some thing wrong", {
        variant: "error",
      });
    }

    //resetForm();
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: handleFormSubmit,
      validationSchema: formSchema,
    });

  const { palette } = useTheme();

  const { state, dispatch } = useAppContext();
  const cartList = state.cart;
  const handleCartAmountChange = (amount, product) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        ...product,
        qty: amount,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <BazaarImage
        src="/assets/images/bazaar-black-sm.svg"
        sx={{
          m: "auto",
        }}
      />

      <H1 textAlign="center" mt={1} mb={4} fontSize={16}>
        Make your order {profile?.name}
      </H1>

      <BazaarTextField
        mb={1.5}
        fullWidth
        name="name"
        size="small"
        type="text"
        variant="outlined"
        onBlur={handleBlur}
        value={values.name}
        onChange={handleChange}
        label="Enter your name"
        placeholder="Enter your name"
        error={!!touched.name && !!errors.email}
        helperText={touched.name && errors.name}
      />

      <BazaarTextField
        mb={1.5}
        fullWidth
        name="email"
        size="small"
        type="email"
        variant="outlined"
        onBlur={handleBlur}
        value={values.email}
        onChange={handleChange}
        label="Email "
        placeholder="exmple@mail.com"
        error={!!touched.email && !!errors.email}
        helperText={touched.email && errors.email}
      />

      <BazaarTextField
        mb={1.5}
        fullWidth
        name="phone"
        size="phone"
        type="phone"
        variant="outlined"
        onBlur={handleBlur}
        value={values.phone}
        onChange={handleChange}
        label=" Phone"
        placeholder=""
        error={!!touched.phone && !!errors.phone}
        helperText={touched.phone && errors.phone}
      />

      <BazaarTextField
        size="medium"
        fullWidth
        name="subject"
        type="subject"
        variant="outlined"
        onBlur={handleBlur}
        value={values.subject}
        onChange={handleChange}
        label="subject"
        placeholder="enter your subject"
        error={!!touched.subject && !!errors.subject}
        helperText={touched.subject && errors.subject}
      />

      <BazaarTextField
        size="medium"
        fullWidth
        name="adress"
        type="adress"
        variant="outlined"
        onBlur={handleBlur}
        value={values.adress}
        onChange={handleChange}
        label="adress"
        placeholder="enter your adress"
        error={!!touched.adress && !!errors.adress}
        helperText={touched.adress && errors.adress}
      />

      <TextField
        className="my-3"
        rows={6}
        multiline
        fullWidth
        color="primary"
        size="medium"
        name="description"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.description}
        label="message"
        error={Boolean(errors.description && touched.description)}
        helperText={touched.description && errors.description}
      />

      {/* ---------Cart items---- */}
      <Box>
        {cartList.map((item) => (
          <FlexBox
            py={2}
            px={2.5}
            key={item.id}
            alignItems="center"
            borderBottom={`1px solid ${palette.divider}`}
          >
            <FlexBox alignItems="center" flexDirection="column">
              <Button
                color="primary"
                variant="outlined"
                onClick={handleCartAmountChange(item.qty + 1, item)}
                sx={{
                  height: "32px",
                  width: "32px",
                  borderRadius: "300px",
                }}
              >
                <Add fontSize="small" />
              </Button>

              <Box fontWeight={600} fontSize="15px" my="3px">
                {item.qty}
              </Box>

              <Button
                color="primary"
                variant="outlined"
                disabled={item.qty === 1}
                onClick={handleCartAmountChange(item.qty - 1, item)}
                sx={{
                  height: "32px",
                  width: "32px",
                  borderRadius: "300px",
                }}
              >
                <Remove fontSize="small" />
              </Button>
            </FlexBox>

            <Link href={`/product/${item.id}`}>
              <a>
                <Avatar
                  alt={item.name}
                  src={item.imgUrl}
                  sx={{
                    mx: 2,
                    width: 76,
                    height: 76,
                  }}
                />
              </a>
            </Link>

            <Box
              flex="1"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <Link href={`/product/${item.slug}`}>
                <a>
                  <H5 ellipsis fontSize="14px" className="title">
                    {item.name}
                  </H5>
                </a>
              </Link>

              <Tiny color="grey.600">{item.qty}</Tiny>

              {/* 
              <Tiny color="grey.600">
                {currency(item.price)} x {item.qty}
              </Tiny>

              <Box fontWeight={600} fontSize="14px" color="primary.main" mt={0.5}>
                {currency(item.qty * item.price)}
              </Box> */}
            </Box>

            <IconButton
              size="small"
              onClick={handleCartAmountChange(0, item)}
              sx={{
                marginLeft: 2.5,
              }}
            >
              <Close fontSize="small" />
            </IconButton>
          </FlexBox>
        ))}
      </Box>

      <Button
        className=" !bg-red-500"
        fullWidth
        type="submit"
        color="primary"
        variant="contained"
        sx={{
          height: 44,
        }}
      >
        Send
      </Button>
    </form>
  );
};

export default OrderSidebar;