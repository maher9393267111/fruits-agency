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
  Grid,
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
const PartnerForm = () => {
  const { t } = useTranslation("common");

  const initialValues = {
    email: "",
    name: "",
    subject: "",
    description: "",
    adress: "",
    phone: "",
    country: "",
    city: "",
    site: "",
    position: "",
    zipcode: "",
  };
  const formSchema = yup.object().shape({
    //t("name")
    name: yup.string().required("name is required"),
    description: yup.string().required("message is required"),
    subject: yup.string().required("subject is required"),
    adress: yup.string().required("adress is required"),
    phone: yup.number().required("phone number is required"),
    email: yup.string().email("invalid email").required("Email is required"),
    // worktype: yup.string().required("subject is required"),
    // country: yup.string().required("subject is required")
    // city: yup.string().required("subject is required")
    // subject: yup.string().required("subject is required")
  });

  const { profile } = useAuth();

  const { enqueueSnackbar } = useSnackbar();

  const handleFormSubmit = async (values) => {
    console.log(values);
    // const res = await fetch(`/api/order`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },

    //   body: JSON.stringify({ ...values, cart: cartList }),
    // });

    // console.log("RESPONSE", res);

    // if (res?.status === 200) {
    //   enqueueSnackbar("your order sended successfully", {
    //     variant: "success",
    //   });
    // } else {
    //   enqueueSnackbar("Some thing wrong", {
    //     variant: "error",
    //   });
    // }

    //resetForm();
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: handleFormSubmit,
      validationSchema: formSchema,
    });

  const { palette } = useTheme();

  return (
    <form onSubmit={handleSubmit}>
      <BazaarImage
        src="/assets/images/bazaar-black-sm.svg"
        sx={{
          m: "auto",
        }}
      />

      <H1 textAlign="center" mt={1} mb={4} fontSize={16}>
        Be partner with us {profile?.name}
      </H1>

      <Grid container spacing={3}>
        <Grid item sm={6} xs={12}>
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
        </Grid>

        <Grid item sm={6} xs={12}>
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
        </Grid>

        <Grid item sm={6} xs={12}>
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
        </Grid>

        <Grid item sm={6} xs={12}>
          <BazaarTextField
            mb={1.5}
            fullWidth
            name="country"
            size="country"
            type="country"
            variant="outlined"
            onBlur={handleBlur}
            value={values.country}
            onChange={handleChange}
            label="Country"
            placeholder="country"
            // error={!!touched.phone && !!errors.phone}
            // helperText={touched.phone && errors.phone}
          />
        </Grid>

        <Grid item sm={6} xs={12}>
          <BazaarTextField
            mb={1.5}
            fullWidth
            name="city"
            size="city"
            type="city"
            variant="outlined"
            onBlur={handleBlur}
            value={values.city}
            onChange={handleChange}
            label="City"
            placeholder="city"
            // error={!!touched.phone && !!errors.phone}
            // helperText={touched.phone && errors.phone}
          />
        </Grid>

        <Grid item sm={6} xs={12}>
          <BazaarTextField
            mb={1.5}
            fullWidth
            name="position"
            size="position"
            type="position"
            variant="outlined"
            onBlur={handleBlur}
            value={values.position}
            onChange={handleChange}
            label="Position"
            placeholder="position"
            // error={!!touched.phone && !!errors.phone}
            // helperText={touched.phone && errors.phone}
          />
        </Grid>

        <Grid item sm={6} xs={12}>
          <BazaarTextField
            mb={1.5}
            fullWidth
            name="worktype"
            size="worktype"
            type="worktype"
            variant="outlined"
            onBlur={handleBlur}
            value={values.worktype}
            onChange={handleChange}
            label="worktype"
            placeholder="worktype"
            // error={!!touched.phone && !!errors.phone}
            // helperText={touched.phone && errors.phone}
          />
        </Grid>



        <Grid item sm={6} xs={12}>
          <BazaarTextField
            mb={1.5}
            fullWidth
            name="site"
            size="site"
            type="site"
            variant="outlined"
            onBlur={handleBlur}
            value={values.site}
            onChange={handleChange}
            label="Site"
            placeholder="site"
            // error={!!touched.phone && !!errors.phone}
            // helperText={touched.phone && errors.phone}
          />
        </Grid>

        <Grid item sm={6} xs={12}>
          <BazaarTextField
            mb={1.5}
            fullWidth
            name="zipcode"
            size="zipcode"
            type="zipcode"
            variant="outlined"
            onBlur={handleBlur}
            value={values.zipcode}
            onChange={handleChange}
            label="Zipcode"
            placeholder="zipcode"
            // error={!!touched.phone && !!errors.phone}
            // helperText={touched.phone && errors.phone}
          />
        </Grid>

        <Grid item sm={6} xs={12}>
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
        </Grid>

        <Grid item sm={6} xs={12}>
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
        </Grid>

        <Grid item xs={12}>
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
        </Grid>
      </Grid>

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

export default PartnerForm;
