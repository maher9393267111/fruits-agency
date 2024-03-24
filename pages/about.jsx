import Image from "next/image";

import MainLayout from "components/ProjectComponents/mainLayout";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
// import { div } from "react-reveal";
import { H1, Paragraph, H4 } from "components/Typography";

export default function About() {
  const { t } = useTranslation("common");

  const aboutus = t("aboutus", { returnObjects: true });
  console.log("links", aboutus);

  return (
    <MainLayout>
      <div>
        {/* group-hover:scale-105 transition-all duration-700 ease-in-out */}
        <img
          src="/assets/images/sweetimages/P 2-sugarcane About Banner.jpg "
          alt="about-image"
          className=" relative  h-[300px]  max-w-screen-3xl w-full    md:!h-[800px] object-cover mx-auto "
        />
      </div>
      <div >
        <H1 className="absolute top-[20%] w-5 text-white md:mx-5 md:text-5xl text-3xl ">
          {t("aboutsectionhome.title")}
        </H1>
      </div>
      <p className="absolute md:top-[60%] top-[50%]  md:right-[10%] right-[10%] md:text-4xl text-lg tracking-tight text-white font-semibold">
                {t("about.p4")}
              </p>

      <section
        id="faq"
        aria-labelledby="faq-title"
        className="relative overflow-hidden bg-slate-50 sm:-mt-8"
      >
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="">


            <div className=" mt-5 px-8 lg:px-0  md:w-full mx-auto md:mx-0  max-w-5xl ">
              {/* <p className="mt-4 text-lg tracking-tight text-slate-700">
                {t("aboutsectionhome.p1")}
              </p> */}

              <div className="text-slate-700 ">
                <div bottom>
                  <H4 className=" lg:w-[90%]   text-justify">
                    {t("aboutsectionhome.p1")}
                  </H4>
                </div>
              </div>
              <p className="mt-4 lg:w-[90%] text-lg tracking-tight text-slate-700 text-justify ">
                {t("about.p3")}
              </p>

            </div>
          </div>

          <ul
            role="list"
            className="mx-auto mt-2 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3 text-justify"
          >
            {aboutus.map((item, Index) => (
              <li key={Index}>
                <ul role="list" className="flex flex-col gap-y-8">
                  <li>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      {item.a}
                    </h3>
                    <p className="mt-4 text-sm text-slate-700 text-justify w-[70%] md:w-[91%]">
                      {item.b}
                    </p>
                  </li>
                </ul>
              </li>
            ))}
          </ul>
          <p className="mt-8 w-[75%] md:w-[80%] text-lg tracking-tight text-slate-700 text-justify">
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
