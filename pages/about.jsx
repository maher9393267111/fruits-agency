import Image from 'next/image'

import MainLayout from "components/ProjectComponents/mainLayout";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function About() {


  const {t} = useTranslation("common")
  
  const aboutus= t('aboutus', { returnObjects: true }) 
  console.log("links" ,aboutus)

  return (
    <MainLayout>

    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-slate-50 sm:py-3"
    >

{/* absolute left-1/2 top-0 max-w-none -translate-y-1/4 translate-x-[-30%] */}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div>

        <div className=" md:space-x-20  space-x-5 max-w-3xl mt-2 flex w-auto  items-center">
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

      </div>
          <div className='w-[75%]'>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
          {t('aboutsectionhome.p1')}
          </p>
          <p className="mt-4 text-lg tracking-tight text-slate-700 font-semibold">
          {t('about.p2')}
          </p>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
          {t('about.p3')}
          </p>
          <p className="mt-10 text-xl tracking-tight text-slate-700 font-semibold underline">
          {t('about.p4')}
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
          {t('about.p5')}
          </p>
      </div>
    </section>
    </MainLayout>
  )
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
  