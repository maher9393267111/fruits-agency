import { useCallback, useState ,useRef } from "react";
import { Button, Card, Box, styled  ,TextField} from "@mui/material";
import Link from "next/link";
import * as yup from "yup";
import { useFormik } from "formik";
import { H1, H6 } from "components/Typography";
import BazaarImage from "components/BazaarImage";
import BazaarTextField from "components/BazaarTextField";


import { FlexBox, FlexRowCenter } from "components/flex-box";

import { useSnackbar } from "notistack";


import LazyImage from "components/LazyImage";

import { useTranslation } from "next-i18next";
import ReCAPTCHA from "react-google-recaptcha";


const fbStyle = {
  background: "#3B5998",
  color: "white"
};
const googleStyle = {
  background: "#4285F4",
  color: "white"
};
export const Wrapper = styled(({
  children,
  
  ...rest
}) => <Card {...rest}>{children}</Card>)(({
  theme,
  passwordVisibility
}) => ({
  width: 500,
  padding: "2rem 3rem",
  [theme.breakpoints.down("sm")]: {
    width: "100%"
  },


  ".googleButton": {
    ...googleStyle,
    "&:hover": googleStyle
  },
  ".agreement": {
    marginTop: 12,
    marginBottom: 24
  }
}));
const ContactForm = () => {

    const { t } = useTranslation("common");
    const sitekey = "6Ldcb5cpAAAAAPWrd2Kk_YCIWOjIVd6lfbsLZ1D9";
    const captchaRef = useRef(null);
    const [recaptcha, setRecaptcha] = useState(false);

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


  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit
  } = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema: formSchema
  });
  return <Wrapper elevation={3} >
      <form onSubmit={handleSubmit}>
        <BazaarImage src="/assets/images/bazaar-black-sm.svg" sx={{
        m: "auto"
      }} />

        <H1 textAlign="center" mt={1} mb={4} fontSize={16}>
          Welcome To Bazaar
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
            label={t('partner.name')}
            placeholder={t('partner.name')}
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
            label={t('partner.email')}
            placeholder={t('partner.email')}
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
            label={t('partner.phone')}
            placeholder={t('partner.phone')}
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
            label={t("partner.subject")}
            placeholder={t("partner.subject")}
            error={!!touched.subject && !!errors.subject}
            helperText={touched.subject && errors.subject}
          />



<div className="my-12">

<TextField
            className="my-2"
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
</div>
  




    {/* --------Captcha----- */}

    <div className="flex justify-center my-5">
        <ReCAPTCHA
          onChange={valueOnChange("reCaptcha")}
          size="normal"
          sitekey={sitekey}
          ref={captchaRef}
        />
      </div>


        <Button fullWidth type="submit" color="primary" variant="contained" sx={{
        height: 44
      }}>
          Login
        </Button>
      </form>

    



     
    </Wrapper>;
};

export default ContactForm;