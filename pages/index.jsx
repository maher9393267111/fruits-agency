import { useState } from "react";
import { Box } from "@mui/material";
import Setting from "components/Setting";
import Footer from "pages-sections/landing/Footer";
import Section1 from "pages-sections/landing/Section1";
import Section2 from "pages-sections/landing/Section2";
import Section3 from "pages-sections/landing/Section3";
import Section4 from "pages-sections/landing/Section4";
import Section6 from "pages-sections/landing/Section6";
import Section5 from "pages-sections/landing/Section5";
const IndexPage = () => {
  const [filterDemo, setFilterDemo] = useState("");
  return (
  // <Box id="top" overflow="hidden" bgcolor="background.paper">

<div className="h-screen w-screen flex justify-center">
  <img className="w-full h-full object-cover" src="/assets/under.jpg" alt="" />
</div>
  )


      {/* <Section1 />
      <Section6 setFilterDemo={setFilterDemo} />
      <Section2 />
      <Section5 />
      <Section3 filterDemo={filterDemo} setFilterDemo={setFilterDemo} />
      <Section4 />
      <Footer />
      <Setting /> */}
    // </Box>;
};
export default IndexPage;