import Image from "next/image";

import MainLayout from "components/ProjectComponents/mainLayout";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
// import { div } from "react-reveal";
import { H1, Paragraph ,H4 } from "components/Typography";

export default function About() {
  const { t } = useTranslation("common");

  const aboutus = t("aboutus", { returnObjects: true });
  console.log("links", aboutus);

  return (
    <MainLayout>
      <section
        id="faq"
        aria-labelledby="faq-title"
        className="relative overflow-hidden bg-slate-50 sm:py-3"
      >
      

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div>
            {/* <div className=" md:space-x-20  space-x-5 max-w-3xl mt-2 flex w-auto  items-center">
          <h1
            id="faq-title"
            className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
          >
            {t('aboutsectionhome.title')}
          </h1>

          <div>
      <Image
        className="absolute m-auto rounded-3xl"
        src='/assets/images/sweetimages/P 2-sugarcane About Banner.jpg'
        alt="background image"
        width={500}
        height={300}
        unoptimized

      />
      </div>

      </div> */}

          
<div className="bg-bg2 w-full h-[100vh] md:h-[60vh] py-[4vh] md:py-[5vh]">
        <div className="w-[100%] h-full flex-col m-auto flex gap-2 md:gap-0  md:flex-row items-start justify-between">
       
          <div className="flex mb-12 flex-col w-full  items-start justify-betwee px-2 md:px-8 py-2 text-text_color2">
            <div bottom>
              {" "}
              <H1 className="">
              {t('aboutsectionhome.title')}
              </H1>
            </div>
          
            <div className="text-slate-700 mt-4 ">
              <div bottom>
                <H4 className=" lg:w-[89%]">
                {t("aboutsectionhome.p1")}
                </H4>
              </div>
            </div>
          
          </div>

          <div >
            <div className="group overflow-hidde h-[200px]  md:h-full w-full rounded-xl md:rounded-3xl" >
              <img
              
                src="/assets/images/sweetimages/P 2-sugarcane About Banner.jpg "
                alt=""
                className="!w-full h-[200px]  md:!h-full object-cover rounded-xl md:rounded-3xl m-auto group-hover:scale-105 transition-all duration-700 ease-in-out"
              />
            </div>
          </div>
        </div>
      </div>

            <div className=" mt-12 sm:mt-2 px-8 lg:px-0  md:w-full mx-auto md:mx-0  max-w-2xl ">
              {/* <p className="mt-4 text-lg tracking-tight text-slate-700">
                {t("aboutsectionhome.p1")}
              </p> */}
              <p className="mt-4 text-lg tracking-tight text-slate-700 font-semibold">
                {t("about.p2")}
              </p>
              <p className="mt-4 text-lg tracking-tight text-slate-700">
                {t("about.p3")}
              </p>
              <p className="mt-10 text-xl tracking-tight text-slate-700 font-semibold underline">
                {t("about.p4")}
              </p>
            </div>
          </div>

          <ul
            role="list"
            className="mx-auto mt-2 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
          >

            {aboutus.map((item, Index) => (
              <li key={Index}>
                <ul role="list" className="flex flex-col gap-y-8">
                  <li>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      {item.a}
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">{item.b}</p>
                  </li>
                </ul>
              </li>
            ))}
          </ul>
          <p className="mt-8 w-[100%] md:w-[50%] text-lg tracking-tight text-slate-700">
            {t("about.p5")}
          </p>
        </div>
      </section>
    </MainLayout>
  );
}

export const getStaticProps = async ({ locale }) => {
  //const allProducts = await api.getAllProducts();
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // allProducts,
    },
  };
};