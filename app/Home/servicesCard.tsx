"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Styles/service.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyringe, faKey, faKitMedical} from "@fortawesome/free-solid-svg-icons";

const ProductImages = () => {
  //slideshow

  const [slidesToShow, setSlidesToShow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSlidesToShow(1);
      } else {
        setSlidesToShow(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: "0",
  };

  return (
    <div className="images-body">
      <div className="inside-images">
        <div className="headings in-images">
          <p className="text-3xl font-bold text-center sm:text-2xl"> 
              Our Key Services</p>
          <p className="text-2xl mt-2 text-yellow-300 text-center font-light sm:text-1xl ">
            Explore our comprehensive range of medical services designed to meet
            your healthcare needs.
          </p>
        </div>

        <Slider {...settings}>
          <div className="slides">
            <div
              style={{
                width: "18rem",
                height: "25rem",
                backgroundColor: "green",
                borderRadius: "5px",
              }}
            >
       <img  src='https://scontent.fblz1-1.fna.fbcdn.net/v/t39.30808-6/436366126_847616464051781_3716270528436982268_n.jpg?stp=dst-jpg_s720x720&_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHn6NRPfTiQ1bdtv1j3nLK4YBLf-coFEA5gEt_5ygUQDiSoL33ujfCEJoeqUbskBExP6NboUGtppFuAflbS1TKi&_nc_ohc=NHbe42_dK-4Q7kNvgHwo2bY&_nc_pt=5&_nc_zt=23&_nc_ht=scontent.fblz1-1.fna&oh=00_AYBAQB6QwD-8lXFLP7hMtbX_aqjJkP5HFvejuIBL3h3r_A&oe=664C2E58'/>
              <p className=" text-center mt-2 text-2xl  sm:text-2xl">Pharmacy Services</p>
              <p className="text-center  mt-1 text-1xl sm:text-sm text-yellow-300 font-light">
                Pharmacy is responsible for storing medicine, selling medicine,
                Provide pharmaceutical support to clients. it is managed by well
                trained pharmacists
              </p>
              <div className="">
                <a
                  style={{
                    marginLeft: "50px",
                  }}
                  href="Buy"
                  className=" mt-3 inline-block rounded-md border border-transparent bg-green-600 px-8 py-3 text-center font-medium text-white hover:bg-yellow-700"
                >
                  Explore Pharmacy
                </a>
              </div>
            </div>
          </div>
          <div className="slides">
            <div
              style={{
                width: "18rem",
                height: "25rem",
                backgroundColor: "green",
                borderRadius: "5px",
              }}
            >
              <img src='https://scontent.fblz1-1.fna.fbcdn.net/v/t39.30808-6/441321679_847615397385221_6188719467371561758_n.jpg?stp=dst-jpg_p180x540&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeE5eDKsNVGQBLhjm_IHlb-8ts4Ae5GGigq2zgB7kYaKCuXYWwsBxsF8HZr8vw6vaxvA8nCqOmVA8oMFLRFJQ8-q&_nc_ohc=eCd7XmAIOdAQ7kNvgFU_bbh&_nc_pt=5&_nc_zt=23&_nc_ht=scontent.fblz1-1.fna&oh=00_AYCJwU9d3PeDG9nrXTPu1tGa-plNWdcbimlxwF-zAOOolw&oe=664C1F3B' />
              <p className=" text-center mt-2   sm:text-2xl" >Reception Services</p>
              <p className="text-center mt-1 text-1xl text-yellow-300 sm:text-sm font-light ">
                Reception is the entry point of all the services
                The reception links clients to doctor, pharmacist and
                any other staff
              </p>
              <div className="">
                <a
                  style={{
                    marginLeft: "50px",
                  }}
                  href="Entry"
                  className="mt-5 inline-block rounded-md border border-transparent bg-green-600 px-8 py-3 text-center font-medium text-white hover:bg-yellow-700"
                >
                  Explore Reception
                </a>
              </div>
            </div>
          </div>
          <div className="slides">
            <div
              style={{
                width: "18rem",
                height: "25rem",
                backgroundColor: "green",
                borderRadius: "5px",
              }}
            > 
            <img src='https://scontent.fblz1-1.fna.fbcdn.net/v/t39.30808-6/439935685_847613394052088_2962033458726271154_n.jpg?stp=dst-jpg_p180x540&_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGzLXcUPgK9G1FU0G6Nii23uKxl_w6Ll-q4rGX_DouX6iO7mNxamNFs24hPh33mKgcDpcAymH0Yk0PrzSt3l_Lr&_nc_ohc=BoGm8pnhUJEQ7kNvgHiytLu&_nc_pt=5&_nc_zt=23&_nc_ht=scontent.fblz1-1.fna&oh=00_AYDP7WpZrUBwj4S1eVXTR77Q_HIaZZRFl6l3NYlCiB30tg&oe=664C31CC'/>

               <p className=" text-center mt-2 text-2xl sm:text-2xl" >OPD Services</p>
              <p className="text-center mt-1  text-1xl text-yellow-300 sm:text-sm font-light">
                This is the doctors office each and ever client is warmly Welcome
                to this office and every client is helped accordingly. get any
                medical help from this office
              </p>
              <div className="">
                <a
                  style={{
                    marginLeft: "50px",
                  }}
                  href="Office"
                  className=" inline-block rounded-md border border-transparent bg-green-600 px-8 py-3 text-center font-medium text-white hover:bg-yellow-700"
                >
                  Explore OPD
                </a>
              </div>
            </div>
          </div>
          <div className="slides">
            <div
              style={{
                width: "18rem",
                height: "25rem",
                backgroundColor: "green",
                borderRadius: "5px",
             
              }}
            >
              <img src="https://scontent.fblz1-1.fna.fbcdn.net/v/t39.30808-6/441041760_847614654051962_6370260677110377676_n.jpg?stp=dst-jpg_p843x403&_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGV2lzRkU3Pv8Og0NQsEslYNOHIukOUquQ04ci6Q5Sq5D-5jCqffhtzxd0eHAqYQdqiz1CpzxXwuSQX5xgT9kDu&_nc_ohc=XrPHxjYOHVwQ7kNvgHUbIj2&_nc_pt=5&_nc_zt=23&_nc_ht=scontent.fblz1-1.fna&oh=00_AYB0XV-o_5ZoDbNjX3S7wzAQ5SutZzpbbJhG_1RGK9TmvA&oe=664C1DFE"/>
              <p className="text-center mt-2 text-2xl  sm:text-2xl">Maternity Services</p>
              <p className="text-center text-1xl text-yellow-300">
                This is the doctors office each and ever client is warmly Welcome
                to this office and every client is helped accordingly. get any
                medical help from this office
              </p>
              <div className="">
                <a
                  style={{
                    marginLeft: "50px",
                  }}
                  href="Mom"
                  className=" inline-block rounded-md border border-transparent bg-green-600 px-8 py-3 text-center font-medium text-white hover:bg-yellow-700"
                >
                  Explore Maternity
                </a>
              </div>
            </div>
          </div>
          <div className="slides">
            <div
              style={{
                width: "18rem",
                height: "25rem",
                backgroundColor: "green",
                borderRadius: "5px",
              }}
            >
              <img src="https://scontent.fblz1-1.fna.fbcdn.net/v/t39.30808-6/441623754_847608277385933_6366622942508059321_n.jpg?stp=dst-jpg_s960x960&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGFRvKVv8JCVmAkaxE5_Zqf0xC5_ql5kv7TELn-qXmS_oDmuCXL5zVBzrtXD5KbGrwO7COndlOM18y1GDk6TInU&_nc_ohc=f3gs8zFy_LMQ7kNvgHD1MUO&_nc_oc=AdhPi4JEubfHeMrsbmrkdT0OWu4rvNPbB7WgsrzvyYBm8XuzMSEyGRmaFQrEtEOmD5U&_nc_pt=5&_nc_zt=23&_nc_ht=scontent.fblz1-1.fna&oh=00_AYAuDpY2xcQzQw1GIGos7woS5ga0pmFfT3XrTE14PUNcfw&oe=664C1DB3"/>
              <p className="text-center mt-2 text-2xl  sm:text-2xl">Lab Services</p>
              <p className="text-center   text-1xl text-yellow-300 sm:text-sm font-light">
                This is the doctors office each and ever client is warmly Welcome
                to this office and every client is helped accordingly. get any
                medical help from this office
              </p>
              <div className="">
                <a
                  style={{
                    marginLeft: "50px",
                  }}
                  href="Laboratory"
                  className=" inline-block rounded-md border border-transparent bg-green-600 px-8 py-3 text-center font-medium text-white hover:bg-yellow-700"
                >
                  Explore Lab
                </a>
              </div>
            </div>
          </div>
          <div className="slides">
            <div
              style={{
                width: "18rem",
                height: "25rem",
                backgroundColor: "green",
                borderRadius: "5px",
              }}
            >
              <img src="https://scontent.fblz1-1.fna.fbcdn.net/v/t39.30808-6/441413553_847617120718382_7192173699096547920_n.jpg?stp=dst-jpg_s640x640&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFmdCIgq1nXKWe2LZru1xDdHS0mzvXio4gdLSbO9eKjiIOzfdBtLeIWHikRV3kMAXpESLh5vGPwAZ4rAVBVxlVh&_nc_ohc=3Ctkg-DbQacQ7kNvgEP3B4H&_nc_pt=5&_nc_zt=23&_nc_ht=scontent.fblz1-1.fna&oh=00_AYDisgiCuKy9qm3LqMHA3JxfjJLiJXje6TbSrWVaq-s1Zw&oe=664C4CB8"/>
               <p className="text-center mt-2 text-2xl sm:text-2xl">Dental Services</p>
              <p className="text-center   text-1xl text-yellow-300 sm:text-sm font-light">
                This is the doctors office each and ever client is warmly Welcome
                to this office and every client is helped accordingly. get any
                medical help from this office
              </p>
              <div className="">
                <a
                  style={{
                    marginLeft: "50px",
                  }}
                  href="Dentist"
                  className=" inline-block rounded-md border border-transparent bg-green-600 px-8 py-3 text-center font-medium text-white hover:bg-yellow-700"
                >
                  Explore Dental
                </a>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};
export default ProductImages;
