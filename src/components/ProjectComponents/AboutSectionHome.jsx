import React from "react";
import { H1 ,H3,H4 } from "components/Typography";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { Link } from "@mui/material";

export default function AboutSectionHome() {

  const {t} = useTranslation("common")

  return (
    <div className="my-4">
      <section>
        {/* ------main--- */}
        <div className=" grid md:gap-6 grid-cols-1 md:grid-cols-2 justify-center ">
          {/* --images-- */}
          <div className="mb-6 md:mb-0 relative">
            <div className="about-image">
              <div className="grid gap-2 items-center grid-cols-1 md:grid-cols-2">
                <div className="w-full">
                  <img
                    className="!w-full max-w-full h-full"
                    src="/assets/images/sweetimages/about1.jpg"
                    alt=""
                  />
                </div>

                <div>
                  <img
                    className="w-full"
                    src="/assets/images/sweetimages/about2.jpg"
                    alt=""
                  />
                  <img
                    className="w-full"
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

          {/* ---content-- */}
          <div
            // style={{
            //   textAlign: "-webkit-left",
            // }}
            className="  col-span-1 md:text-lef  mt-12 md:mt-0 "
          >
            <div>
              <H1 className=" text-red-500 ">
              {t('aboutsectionhome.title')}
              </H1>

              <div className=" w-[80%] md:w-[95%] my-4">
                
                <H3 mt={4} className="  text-gray">
                <span>  {t('aboutsectionhome.p1')}    </span>
                </H3>
                <Link href="/about">
                <span>more details</span>
                </Link>
            
               
              
                
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
