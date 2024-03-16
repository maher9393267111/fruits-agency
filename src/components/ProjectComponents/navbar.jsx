import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'
import Image from "next/image";

//i18n
//import en from "../i18n/en"
//import es from "../i18n/es"


//Icons
import { Icon } from '@iconify/react'
import menuIcon from '@iconify/icons-mdi/menu'

import closeCircleOutline from '@iconify/icons-mdi/close-circle-outline'
import accountSchool from '@iconify/icons-mdi/account-school'
import humanMaleHeight from '@iconify/icons-mdi/human-male-height'
import foodApple from '@iconify/icons-mdi/food-apple'
import newspaperVariantOutline from '@iconify/icons-mdi/newspaper-variant-outline'
import spaIcon from '@iconify/icons-mdi/spa'
import { useTranslation } from "next-i18next";



export default function Navbar() {
  
  const [navbarOpen, setNavbarOpen] = useState(false)

  /* const { locale } = useRouter()
  const i18n = locale === "en" ? en : es */
  const {t} = useTranslation("common") 

  const slider= t('slider', { returnObjects: true }) 
  console.log("links" ,slider)


  return (
    <>
      <nav className="  relative flex flex-wrap items-center justify-between px-2 py-3 bg-emerald-500">
        <div className="container px-4 mx-auto flex flex-wrap justify-between">
          <div className="w-full flex-grow  relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">

 {/* {slider?.map((item,index)=>{
  return (
    <div>
      {item.link}
    </div>
  )
})}  */}
            <Link href="/">
                <a className="font-bold leading-relaxed inline-flex items-center mr-4 py-2 whitespace-nowrap uppercase text-white">
                  <img className="w-14 logo object-cover h-14" src="/assets/logo.png" alt="" />
                  {/* <Icon icon={spaIcon} className=" logo text-4xl mr-2"/> */}
                  <span className="text-base">sweetsips</span>
                </a>
            </Link>  
            
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              {navbarOpen 
              ? <Icon icon={closeCircleOutline} style={{ fontSize: '24px' }} /> 
              : <Icon icon={menuIcon} style={{ fontSize: '24px' }}/>}
            </button>
          </div>

          <div
            className={
              "lg:flex  flex-initial items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">


{/* //media  <Icon icon="lucide:monitor-play" /> */}

              <li className="nav-item">
                <Link href="/home">
                <a className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-white hover:opacity-75">   
                  <Icon  icon="lucide:home" className="text-lg leading-lg text-white opacity-75"/>  
                  <span className="ml-2 "> {t("navbar.home")}  </span>
                </a>
                </Link>  
              </li>

              <li className="nav-item">
                <Link href="/shop">  
                <a className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-white hover:opacity-75">
                  <Icon icon={foodApple} className="text-lg leading-lg text-white opacity-75"/>  
                  <span className="ml-2">{t("navbar.shop")}  </span>
                </a>
                </Link>
              </li>

              
              <li className="nav-item">
                <Link href="/recipes">
                <a className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-white hover:opacity-75">   
                  <Icon  icon="lucide:monitor-play" className="text-lg leading-lg text-white opacity-75"/>  
                  <span className="ml-2"> {t("navbar.recipes")}  </span>
                </a>
                </Link>  
              </li>




              <li className="nav-item">
                <Link href="/order">  
                <a className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-white hover:opacity-75">
                  <Icon icon='lucide:shopping-bag' className="text-lg leading-lg text-white opacity-75"/>  
                  <span className="ml-2">{t("navbar.orders")}  </span>
                </a>
                </Link>
              </li>

              <li className="nav-item">
                <Link href="/partner">  
                <a className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-white hover:opacity-75">
                  <Icon icon={humanMaleHeight} className="text-lg leading-lg text-white opacity-75"/>  
                  <span className="ml-2"> {t("navbar.partner")}  </span>
                </a>
                </Link>
              </li>

              <li className="nav-item">
                <Link href="/media">
                <a className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-white hover:opacity-75">   
                  <Icon  icon="lucide:monitor-play" className="text-lg leading-lg text-white opacity-75"/>  
                  <span className="ml-2"> {t("navbar.media")}  </span>
                </a>
                </Link>  
              </li>



              <li className="nav-item">
                <Link href="/contact">
                    <a className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-white hover:opacity-75">
                    <Icon icon="dashicons:email-alt"  className="text-lg leading-lg text-white opacity-75"/>  
                    <span className="ml-2"> {t("navbar.contact")}  </span>
                    </a>  
                </Link>  
              </li>

             

             
            </ul>
          </div>

        </div>
      </nav>
    </>
  );
}