import React from "react";
import { H1 ,H3 } from "components/Typography";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

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
                    className="!w-full max-w-full"
                    src="https://demo.bravisthemes.com/munfirm/wp-content/uploads/2022/08/company-300x400.jpg"
                    alt=""
                  />
                </div>

                <div>
                  <img
                    className="w-full"
                    src="https://demo.bravisthemes.com/munfirm/wp-content/uploads/2022/08/company2-300x280.jpg"
                    alt=""
                  />
                  <img
                    className="w-full"
                    src="https://demo.bravisthemes.com/munfirm/wp-content/uploads/2022/08/company2-300x280.jpg"
                    alt=""
                  />
                </div>
              </div>

              <div className="offer  absolute !top-[90%] md:!top-[70%] !left-[10%]">
                <img
                  src="https://demo.bravisthemes.com/munfirm/wp-content/themes/munfirm/assets/images/organic.png"
                  alt="Offer"
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
              {t('about.title')}
              </H1>

              <div className=" w-[80%] md:w-[65%] my-4">
                <H1 className=" ">
                  Organic & Helathy Foods Provider Farming
                </H1>

                <H3 mt={4} className="  text-gray">
                {/* السخط الصالح والكراهية للرجال الذين خدعتهم وأحبطتهم سحر متعة اللحظة التي أعمتها الرغبة، لدرجة أنهم لا يستطيعون */}
                  On the other hand we denounce with righteous indignation and
                  dislike men who are beguiled and demoralized by the charms of
                  pleasure of the moment so blinded by desire, that they cannot
                  foresee the pain
                </H3>
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
