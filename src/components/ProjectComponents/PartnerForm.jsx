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
import BazaarSwitch from "components/BazaarSwitch";

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
    address: "",
    phone: "",
    country: "",
    city: "",
    site: "",
    position: "",
    zipcode: "",
    intersted: "",
    question: "",
    worktype:'',
   // ismarketing: "",
  //  agreements:false,
    monthly: "",
    newsletter:true,
    
  };
  const formSchema = yup.object().shape({
    //t("name")
    name: yup.string().required("name is required"),
    description: yup.string().required("message is required"),
    subject: yup.string().required("subject is required"),
    address: yup.string().required("address is required"),
    phone: yup.number().required("phone number is required"),
    email: yup.string().email("invalid email").required("Email is required"),
    //agreements: yup.Boolean().required("agreements is required"),
    // worktype: yup.string().required("subject is required"),
    // country: yup.string().required("subject is required")
    // city: yup.string().required("subject is required")
    // subject: yup.string().required("subject is required")
  });

  const { profile } = useAuth();

  const { enqueueSnackbar } = useSnackbar();
  const [news, setNews] = useState(false)
  const [agreements ,setAgreements] =  useState(false)
  const [productPulish, setProductPublish] = useState(false);

  const handleFormSubmit = async (values) => {
    console.log(values);

if (!productPulish ){
  enqueueSnackbar("You must to agree ", {
    variant: "error",
  });
  return
}


    const res = await fetch(`/api/partner`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({ ...values ,agreements:productPulish ,ismarketing:news }),
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

  const { palette } = useTheme();

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <BazaarImage
        src="\assets\images\sweetimages\sweetsips-final-logo.png"
        sx={{
          m: "auto",
          width:"20%",
          height:"20%",
          alignItems:'center'
        }}
      />

      <H1 textAlign="center" mt={1} mb={4} fontSize={20}>
      {t('partner.partnernow')} {profile?.name}
      </H1>

<div className=" mt-2 bg-white py-4 px-6 rounded-lg">


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
            label={t('partner.name')}
            placeholder={t('partner.name')}
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
            label={t('partner.email')}
            placeholder={t('partner.email')}
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
            label={t('partner.phone')}
            placeholder={t('partner.phone')}
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
            label={t('partner.country')}
            placeholder={t('partner.country')}
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
            label={t('partner.city')}
            placeholder={t('partner.city')}
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
            label={t('partner.position')}
            placeholder={t('partner.position')}
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
            label={t('partner.worktype')}
            placeholder={t('partner.worktype')}
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
            label={t('partner.site')}
            placeholder={t('partner.site')}
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
            label={t("partner.zipcode")}
            placeholder={t("partner.zipcode")}
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
            label={t("partner.subject")}
            placeholder={t("partner.subject")}
            error={!!touched.subject && !!errors.subject}
            helperText={touched.subject && errors.subject}
          />
        </Grid>

        <Grid item sm={6} xs={12}>
          <BazaarTextField
            size="medium"
            fullWidth
            name="address"
            type="address"
            variant="outlined"
            onBlur={handleBlur}
            value={values.address}
            onChange={handleChange}
            label={t("partner.address")}
            placeholder={t("partner.address")}
            error={!!touched.address && !!errors.address}
            helperText={touched.address && errors.address}
          />
        </Grid>

        <Grid item sm={6} xs={12}>
          <BazaarTextField
            size="medium"
            fullWidth
            name="interested"
            type="interested"
            variant="outlined"
            onBlur={handleBlur}
            value={values.interested}
            onChange={handleChange}
            label={t("partner.interested")}
            placeholder={t("partner.interested")}
          />
        </Grid>

        <Grid item sm={6} xs={12}>
          <BazaarTextField
            size="medium"
            fullWidth
            name="question"
            type="question"
            variant="outlined"
            onBlur={handleBlur}
            value={values.question}
            onChange={handleChange}
            label={t("partner.question")}
            placeholder={t("partner.question")}
          />
        </Grid>

        <Grid item sm={6} xs={12}>
          <BazaarTextField
            size="medium"
            fullWidth
            name="monthly"
            type="monthly"
            variant="outlined"
            onBlur={handleBlur}
            value={values.monthly}
            onChange={handleChange}
            label={t("partner.monthlyAverage")}
            placeholder={t("partner.monthlyAverage")}
          />
        </Grid>

        <Grid item sm={6} xs={12}>
        <H5 className={'inline-block'}>{t("partner.recieveNewsletter")}</H5>
        <BazaarSwitch color="info" checked={news} onChange={(e) => setNews(e.target.checked)} />

</Grid>



<Grid item sm={6} xs={12}>
<H5 className={'inline-block'}>{t("partner.agree")}</H5>
<BazaarSwitch color="info" checked={productPulish} onChange={(e) => setProductPublish(e.target.checked)} />

</Grid>



        <Grid className="mt-4 mb-12" item xs={12}>
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
            label={t("partner.message")}
            error={Boolean(errors.description && touched.description)}
            helperText={touched.description && errors.description}
          />
        </Grid>
      </Grid>

      <Button
        className=" !bg-red-500 mt-4"
        fullWidth
        type="submit"
        color="primary"
        variant="contained"
        sx={{
          height: 44,
        }}
      >
        {t("partner.send")}
      </Button>

      </div>

    </form>
  );
};

export default PartnerForm;
