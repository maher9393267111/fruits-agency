import React from "react";
import Marquee from "react-fast-marquee";
import { getDocuments } from "../../../functions/firebase";
import { useState,useEffect } from "react";


const AdvertiseBar = () => {


// la testad3e el data from firebase admin dashboard use useState and useEffect line 10---21 
  const [advert, setAdvert] = useState([]);

    useEffect(() => {
        const getAdverts = async () => {
            // setAdvert([]);
            const data = await getDocuments('adverts');
            console.log(data,"fetch Adverts ====>>>>")
            setAdvert(data)
          }
          getAdverts();
      }, []);



  return (
    <div className="py-1 px-2 bg-stone-800 text-white text-sm">
      <Marquee pauseOnHover>
       
          {advert.map((item,index)=> (
            <div key={index}>
              {item.title}
              <span className="mx-2 text-red-400">•</span>
              
       </div>
       ))}
       
      </Marquee>
    </div>
  );
};

export default AdvertiseBar;


