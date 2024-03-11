import React from "react";
import { Container } from "@mui/material";
import MainLayout from "components/ProjectComponents/mainLayout";
import PartnerForm from "components/ProjectComponents/PartnerForm";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
export default function Partner() {
  return (
    <MainLayout>
      <Container
        sx={{
          mb: 6,
          mt: "29px",
        }}
      >
        <PartnerForm />
      </Container>
    </MainLayout>
  );
}




export const getStaticProps = async ({locale}) => {


      return {
        props: {
          ...(await serverSideTranslations(locale, ["common"])),
         
     
        }
      };
    };
   