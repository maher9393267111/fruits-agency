import React from "react";
import { H1 ,H3,H4 } from "components/Typography";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { Link } from "@mui/material";

export default function AboutSectionHome() {

  const {t} = useTranslation("common")

  return (
    <div className=" sm:my-20">
      <section>
        {/* ------main--- */}
        <div className=" grid md:gap-6 grid-cols-1 md:grid-cols-2 justify-center  ">
          {/* --images-- */}
          
          <div
            // style={{
            //   textAlign: "-webkit-left",
            // }}
            className="  col-span-1 md:mt-5 -mt-10 "
          >
            <div>
              <H1 className=" text-red-500 ">
              {t('aboutsectionhome.title')}
              </H1>

              <div className=" w-[80%] md:w-[95%] my-4">
              <span> 
                <H3 mt={4} className="  text-gray   text-justify">
                 {t('aboutsectionhome.p1')}    
                </H3>
                </span>
                <span>
                <Link href="/about">
                {t('aboutsectionhome.moredetails')}
                </Link>
                </span>
               
              
                
              </div>
            </div>
          </div>
          
     
          {/* ---content-- */}
          <div className="mb-6 md:mb-0 relative">
            <div className="about-image">
              <div className="grid gap-2 items-center grid-cols-1 md:grid-cols-2 ">
                <div className="w-full">
                  <img
                    className="md:!w-full max-w-full md:h-full h-[80%] w-[80%]"
                    src="/assets/images/sweetimages/about1.jpg"
                    alt=""
                  />
                </div>

                <div>
                  <img
                    className="md:w-full md:h-full h-[80%] w-[80%]"
                    src="/assets/images/sweetimages/about2.jpg"
                    alt=""
                  />
                  <img
                    className="md:w-full md:h-full h-[80%] w-[80%]"
                    src="/assets/images/sweetimages/about3.jpg"
                    alt=""
                  />
                </div>
              </div>

              <div className="offer  absolute !top-[90%] md:!top-[80%] sm:top-[50%] !left-[10%] ">
                <img
                  src="/assets/images/sweetimages/about4.png"
                  alt="Offer"
                  width={'200px'}
                  height={'150px'}
                />
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}


  
export const getStaticProps = async ({ locale }) => {

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
