import { useCallback, useState } from "react";
import { Button, Card, Box, styled } from "@mui/material";
import Link from "next/link";
import * as yup from "yup";
import { useFormik } from "formik";
import { H1, H6 } from "components/Typography";
import BazaarImage from "components/BazaarImage";
import BazaarTextField from "components/BazaarTextField";

// import EyeToggleButton from "./EyeToggleButton";
import { FlexBox, FlexRowCenter } from "components/flex-box";


import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from '../../../src/functions/contextproject';

// ===============================================================

// ===============================================================

const EyeToggleButton = ({
  show,
  click
}) => {
  return <IconButton size="small" type="button" onClick={click}>
      {show ? <Visibility className="passwordEye" fontSize="small" /> : <VisibilityOff className="passwordEye" fontSize="small" />}
    </IconButton>;
};







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
  passwordVisibility,
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
  ".passwordEye": {
    color: passwordVisibility ? theme.palette.grey[600] : theme.palette.grey[400]
  },
  ".facebookButton": {
    marginBottom: 10,
    ...fbStyle,
    "&:hover": fbStyle
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
const Login = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const {signInUser ,profile} = useAuth()



  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility(visible => !visible);
  }, []);
  const handleFormSubmit = async values => {
    console.log(values);
    signInUser(
        values.email,
        values.password,
       )
  
        resetForm();

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
  return <Wrapper elevation={3} passwordVisibility={passwordVisibility}>
      <form onSubmit={handleSubmit}>
        <BazaarImage src="/assets/images/bazaar-black-sm.svg" sx={{
        m: "auto"
      }} />

        <H1 textAlign="center" mt={1} mb={4} fontSize={16}>
          Welcome To Bazaar {profile?.name}
        </H1>

        <BazaarTextField mb={1.5} fullWidth name="email" size="small" type="email" variant="outlined" onBlur={handleBlur} value={values.email} onChange={handleChange} label="Email or Phone Number" placeholder="exmple@mail.com" error={!!touched.email && !!errors.email} helperText={touched.email && errors.email} />

        <BazaarTextField mb={2} fullWidth size="small" name="password" label="Password" autoComplete="on" variant="outlined" onBlur={handleBlur} onChange={handleChange} value={values.password} placeholder="*********" type={passwordVisibility ? "text" : "password"} error={!!touched.password && !!errors.password} helperText={touched.password && errors.password} InputProps={{
        endAdornment: <EyeToggleButton show={passwordVisibility} click={togglePasswordVisibility} />
      }} />

        <Button className=" !bg-red-500" fullWidth type="submit" color="primary" variant="contained" sx={{
        height: 44
      }}>
          Login
        </Button>
      </form>

      

      

    </Wrapper>;
};
const initialValues = {
  email: "",
  password: ""
};
const formSchema = yup.object().shape({
  password: yup.string().required("Password is required"),
  email: yup.string().email("invalid email").required("Email is required")
});
export default Login;