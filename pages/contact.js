import React from 'react';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Contact = () => {

    const {t} = useTranslation("common")

    return (
        <div className='text-center h-full w-full justify-center flex flex-row items-center m-auto '>
            <div >
           
            
            {t("contact.p15")}
            
      
          
           
           </div>
        </div>
    );
}

export default Contact;



export const getStaticProps = async ({ locale }) => {

    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  };
  
  