import { useCallback, useState, useRef } from "react";
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
import { useFormik, useFormikContext } from "formik";
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
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/router";
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
  const { t } = useTranslation("common");
  const [recaptcha, setRecaptcha] = useState(false);
  // callbacks
  const valueOnChange = (key) => (e) => {
    setRecaptcha(e);
  };

  const initialValues = {
    email: "",
    name: "",
    subject: "",
    description: "",
    address: "",
    phone: "",
  };
  const formSchema = yup.object().shape({
    //t("name")
    name: yup.string().required("name is required"),
    description: yup.string().required("message is required"),
    subject: yup.string().required("subject is required"),
    address: yup.string().required("address is required"),
    phone: yup.number().required("phone number is required"),
    email: yup.string().email("invalid email").required("Email is required"),
  });

  const { profile } = useAuth();
  const sitekey = "6Ldcb5cpAAAAAPWrd2Kk_YCIWOjIVd6lfbsLZ1D9";
  const captchaRef = useRef(null);
const {locale} = useRouter()
  const { enqueueSnackbar } = useSnackbar();

  const handleFormSubmit = async (values) => {
    console.log(values);

    if (!recaptcha) {
      enqueueSnackbar("Capthca is required", {
        variant: "error",
      });

      return;
    }

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
      enqueueSnackbar("Something wrong", {
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
        src="\assets\images\sweetimages\sweetsips-final-logo.png"
        sx={{
          m: "auto",
          width: "50%",
          height: "50%",
          alignItems: "center",
        }}
      />

      <H1 textAlign="center" mt={1} mb={2} fontSize={16}>
        {t("order.ordernow")} {profile?.name}
      </H1>
      <H1 textAlign="center">SweetSips</H1>
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
        label={t("order.name")}
        placeholder={t("order.name")}
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
        label={t("order.email")}
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
        label={t("order.phone")}
        placeholder={t("order.phone")}
        error={!!touched.phone && !!errors.phone}
        helperText={touched.phone && errors.phone}
      />

      <BazaarTextField
        className="my-1"
        size="medium"
        fullWidth
        name="subject"
        type="subject"
        variant="outlined"
        onBlur={handleBlur}
        value={values.subject}
        onChange={handleChange}
        label={t("order.subject")}
        placeholder={t("order.subject")}
        error={!!touched.subject && !!errors.subject}
        helperText={touched.subject && errors.subject}
      />

      <BazaarTextField
        size="medium"
        fullWidth
        name="address"
        type="address"
        variant="outlined"
        onBlur={handleBlur}
        value={values.adress}
        onChange={handleChange}
        label={t("order.address")}
        placeholder={t("order.address")}
        error={!!touched.adress && !!errors.adress}
        helperText={touched.adress && errors.adress}
      />

      <div className="my-12">
        <TextField
          className="m"
          rows={6}
          multiline
          fullWidth
          color="primary"
          size="medium"
          name="description"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.description}
          label={t("order.message")}
          placeholder={t("order.message")}
          error={Boolean(errors.description && touched.description)}
          helperText={touched.description && errors.description}
        />
      </div>
      {/* <TextField

        className="my-6"
        rows={6}
        multiline
        fullWidth
        color="primary"
        size="medium"
        name="description"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.description}
        label={t('order.message')}
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

            <Link href={`/shop/single?id=${item.id}`}>
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
              <Link href={`/shop/single?id=${item.id}`}>
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

      {/* --------Captcha----- */}

      <div className="flex justify-center my-5">
        <ReCAPTCHA
          onChange={valueOnChange("reCaptcha")}
          size="normal"
          sitekey={sitekey}
          ref={captchaRef}
        />
      </div>

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
        {t("order.send")}
      </Button>
    </form>
  );
};

export default OrderSidebar;
