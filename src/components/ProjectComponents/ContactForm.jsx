import { useCallback, useState, useRef } from "react";
import { Button, Card, Box, styled, TextField } from "@mui/material";
import Link from "next/link";
import * as yup from "yup";
import { useFormik } from "formik";
import { H1, H2, H6, H5,H4 } from "components/Typography";
import BazaarImage from "components/BazaarImage";
import BazaarTextField from "components/BazaarTextField";

import { FlexBox, FlexRowCenter } from "components/flex-box";

import { useSnackbar } from "notistack";

import BazaarSwitch from "components/BazaarSwitch";

import LazyImage from "components/LazyImage";

import { useTranslation } from "next-i18next";
import ReCAPTCHA from "react-google-recaptcha";
import { db } from "../../../src/functions/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const fbStyle = {
  background: "#3B5998",
  color: "white",
};
const googleStyle = {
  background: "#4285F4",
  color: "white",
};
export const Wrapper = styled(
  ({
    children,

    ...rest
  }) => <Card {...rest}>{children}</Card>
)(({ theme, passwordVisibility }) => ({
  width: 500,
  padding: "2rem 3rem",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
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
const ContactForm = () => {
  const { t } = useTranslation("common");
  const sitekey = "6Ldcb5cpAAAAAPWrd2Kk_YCIWOjIVd6lfbsLZ1D9";
  const captchaRef = useRef(null);
  const [recaptcha, setRecaptcha] = useState(false);
  const [news, setNews] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const valueOnChange = (key) => (e) => {
    setRecaptcha(e);
  };

  const initialValues = {
    email: "",
    name: "",
    subject: "",
    description: "",

    phone: "",
    newsletter: "",
  };
  const formSchema = yup.object().shape({
    name: yup.string().required("name is required"),
    description: yup.string().required("message is required"),
    subject: yup.string().required("subject is required"),

    phone: yup.number().required("phone number is required"),
    email: yup.string().email("invalid email").required("Email is required"),
    //agreements: yup.Boolean().required("agreements is required"),
  });

  const handleFormSubmit = async (values) => {
    console.log(values);

    if (news) {
      // add user to firebase

      const data = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };

      await addDoc(collection(db, "news"), data);
      enqueueSnackbar("Added to newsletter users", {
        variant: "success",
      });
    }

    const res = await fetch(`/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({
        ...values,
      }),
    });

    console.log("RESPONSE", res);

    if (res?.status === 200) {
      enqueueSnackbar("your form message has sended successfully", {
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
  return (
<<<<<<< HEAD
    <div className=" pb-4 -m-20 relative">
      <img src="/assets/images/sweetimages/sugarcane Contact us.jpg" className="w-full h-full  object-cover opacity-100 absolute" alt="img" />
      <H5 className="flex justify-center my-2 py-6 text-white relative text-center  flex-wrap m-auto w-[90%] sm:w-[55%]">{t("contactus.p1")}</H5>
      <Wrapper elevation={3} className=' m-auto    opacity-90'>
=======
    <div className="w-full mx-auto">
      <img src="/assets/images/sweetimages/sugarcane Contact us.jpg" className="w-full  max-h-max h-full !object-cover mx-auto opacity-100 absolute" alt="img" />

      <H4 className="flex justify-center my-2 text-white relative text-center  flex-wrap m-auto w-[90%] sm:w-[55%]">{t("contactus.p1")}</H4>
      <Wrapper elevation={3} className=' m-auto   opacity-90'>
>>>>>>> 72fd7120b7afb9124361209c5a2a6163d3a7ca02
        <form onSubmit={handleSubmit}>
          <BazaarImage
            src="/assets/images/sweetimages/sweetsips-final-logo.png"
            sx={{
              m: "auto",
              width: "30%",
              height: "30%",
            }}
          />
          <H1 textAlign="center" mt={1} mb={2} fontSize={16}>
            {t("contactus.welcome")}
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
            label={t("contactus.name")}
            placeholder={t("contactus.name")}
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
            label={t("contactus.email")}
            placeholder={t("contactus.email")}
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
            label={t("contactus.phone")}
            placeholder={t("contactus.phone")}
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
            label={t("contactus.subject")}
            placeholder={t("contactus.subject")}
            error={!!touched.subject && !!errors.subject}
            helperText={touched.subject && errors.subject}
          />

          <div className="my-2">
            <TextField
              className="my-1"
              rows={4}
              multiline
              fullWidth
              color="primary"
              size="medium"
              name="description"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.description}
              label={t("contactus.message")}
              error={Boolean(errors.description && touched.description)}
              helperText={touched.description && errors.description}
            />
          </div>

          <H5 className={"inline-block"}>{t("contactus.Newsletter")}</H5>
          <BazaarSwitch
            color="info"
            checked={news}
            onChange={(e) => setNews(e.target.checked)}
          />

          {/* --------Captcha----- */}

          <div className="flex justify-center my-3">
            <ReCAPTCHA
              onChange={valueOnChange("reCaptcha")}
              size="normal"
              sitekey={sitekey}
              ref={captchaRef}
            />
          </div>

          <Button
            fullWidth
            type="submit"
            color="primary"
            variant="contained"
            sx={{
              height: 44,
            }}
          >
            {t("contactus.send")}
          </Button>
        </form>
      </Wrapper>
    </div>
  );
};

export default ContactForm;
