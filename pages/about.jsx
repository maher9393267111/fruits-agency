import Image from 'next/image'

import MainLayout from "components/ProjectComponents/mainLayout";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
const faqs = [
  [
    {
      question: 'How can Minted Crown Marketing help my business shine like royalty?',
      answer:
        "With our enchanting marketing strategies and creative brilliance, we'll make your brand the crown jewel of its industry!",
    },
    {
      question: 'Is Minted Crown Marketing just another run-of-the-mill marketing agency?',
      answer: "Oh, not at all! We're the eccentric geniuses of marketing, adding a sprinkle of quirkiness to every campaign we touch.",
    },
    {
      question: 'Are you skilled in social media sorcery?',
      answer:
        "Absolutely! We're social media wizards, conjuring up engaging content that'll make your followers bow in awe.",
    },
  ],
  [
    {
      question: 'Can you handle marketing campaigns for niche businesses?',
      answer:
        'Of course! No challenge is too niche for us; we love diving into unique markets and making them our kingdom.',
    },
    {
      question:
        'How do you ensure our brand stands out from the competition?',
      answer:
        "We've got a secret potion of creativity and strategy that ensures your brand will sparkle brighter than the rest!",
    },
    {
      question:
        "What if we need a marketing campaign that's out-of-this-world creative?",
      answer:
        'Fear not! We thrive on creating intergalactic campaigns that boldly go where no marketing has gone before.',
    },
  ],
  [
    {
      question: 'Will you handle everything, even the tiniest details?',
      answer:
        "Absolutely, but we'll admit, we might leave a hint of delightful chaos to keep things interesting.",
    },
    {
      question: "Can you guarantee our business's success?",
      answer: "While we can't see the future, we promise to pour our heart and soul into every campaign, giving you the best shot at triumph!",
    },
    {
      question: 'Is there a "Minted Crown" dress code for your team?',
      answer:
        'Not exactly, but we do encourage the occasional tiara or wizard hat to keep our creative energies flowing!',
    },
  ],
]

export default function About() {


  const {t} = useTranslation("common")
  
  const aboutus= t('aboutus', { returnObjects: true }) 
  console.log("links" ,aboutus)

  return (
    <MainLayout>

    {aboutus.length}
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
    >
      {/* <Image
        className="absolute left-1/2 top-0 max-w-none -translate-y-1/4 translate-x-[-30%]"
        src={'/assets/bgabout.png'}
        alt="background image"
        width={3500}
        height={3000}
        unoptimized
      /> */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faq-title"
            className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
          >
            {t('about.title')}
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
          {t('about.p1')}
          </p>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
          {t('about.p2')}
          </p>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
          {t('about.p3')}
          </p>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
          {t('about.p4')}
          </p>
        </div>
        {/* <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
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
        </ul> */}
        <p className="mt-4 text-lg tracking-tight text-slate-700">
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
  