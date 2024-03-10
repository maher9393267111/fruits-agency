import React from 'react'
import MainLayout from '../src/components/ProjectComponents/mainLayout'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function Home() {
  return (
    <MainLayout>

  
    <div>home</div>

    </MainLayout>
  )
}


export const getStaticProps = async ({locale}) => {

    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
   
      }
    };
  };
 