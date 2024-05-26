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
       <img  src='https://scontent.fblz2-1.fna.fbcdn.net/v/t39.30808-6/436429637_847660294047398_7005383217381675414_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGcYg5Zyl32kUiRmKdLGBQllfk9TMJjhvGV-T1MwmOG8SWA4EpOhRTcVRAlAoQZt4t0fRMOsKulfbOML1wq-NbC&_nc_ohc=NTVUQu9S7S8Q7kNvgHX9NqC&_nc_zt=23&_nc_ht=scontent.fblz2-1.fna&oh=00_AYCvofe4afEhX5eDOsbezx7o6ft6eoFEwE3PY4u_15vNfQ&oe=6655AF1D'/>
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
              <img src='https://scontent.fblz2-1.fna.fbcdn.net/v/t39.30808-6/444976210_852387556908005_5428332056438282258_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGmpLAr-t35H6RlxDuV3WyHoVDvSt8CJPihUO9K3wIk-OYHcsRP3ByF4ey7mkYg33UmrbznafF7rTrC4bGrTztU&_nc_ohc=yGpMpAW48aoQ7kNvgEK5X26&_nc_zt=23&_nc_ht=scontent.fblz2-1.fna&oh=00_AYCfmTuG67fg2mL20YOgJxxKrlU3oKtFtXGJQy1onUKJIw&oe=665585BF' />
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
            <img src='https://scontent.fblz2-1.fna.fbcdn.net/v/t39.30808-6/439935685_847613394052088_2962033458726271154_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGzLXcUPgK9G1FU0G6Nii23uKxl_w6Ll-q4rGX_DouX6iO7mNxamNFs24hPh33mKgcDpcAymH0Yk0PrzSt3l_Lr&_nc_ohc=ZzbODK5iT6IQ7kNvgEvvsNd&_nc_zt=23&_nc_ht=scontent.fblz2-1.fna&oh=00_AYB_P8q2_J06HE_c-afhQzYcF1U79nqgWSHcO0Eti6zl1w&oe=6655A48C'/>

               <p className=" text-center mt-2 text-2xl sm:text-2xl" >OPD Services</p>
              <p className="text-center mt-1  text-1xl text-yellow-300 sm:text-sm font-light">
              Our OPD offers efficient and comfortable care for an array of illnesses. We ensure prompt
medical service,no waiting-because your health can't wait.
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
              <img src="https://scontent.fblz2-1.fna.fbcdn.net/v/t39.30808-6/440072618_847623114051116_5830858774568460928_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHlI4g6AqvMfoAH6x1NNSZz9AMN1EkRnOP0Aw3USRGc499nsOX6VkitwKv1ZzLZVsqpiAkkHQ7SL6GrrtBFMXn6&_nc_ohc=QxjR0rSM46YQ7kNvgH4vItI&_nc_zt=23&_nc_ht=scontent.fblz2-1.fna&oh=00_AYAoUqmAOQ7SF2kyec4mhCj3kOyjDefotYkzYrwFuSfIXg&oe=665599C3"/>
              <p className="text-center mt-2 text-2xl  sm:text-2xl">Maternity Services</p>
              <p className="text-center text-1xl text-yellow-300">
              We pride ourselves in promoting martenal health and our services provide comprehensive care
from prenatal to postnatal stages
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
              <img src="https://scontent.fblz2-1.fna.fbcdn.net/v/t39.30808-6/441623754_847608277385933_6366622942508059321_n.jpg?stp=dst-jpg_s960x960&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGFRvKVv8JCVmAkaxE5_Zqf0xC5_ql5kv7TELn-qXmS_oDmuCXL5zVBzrtXD5KbGrwO7COndlOM18y1GDk6TInU&_nc_ohc=kaln_VvQ2_0Q7kNvgEyq4Xo&_nc_zt=23&_nc_ht=scontent.fblz2-1.fna&oh=00_AYA15UVhOGdhRIhn91zRkDYXNV_Fm11ijmWdnEUmilGmdQ&oe=66559073"/>
              <p className="text-center mt-2 text-2xl  sm:text-2xl">Lab Services</p>
              <p className="text-center   text-1xl text-yellow-300 sm:text-sm font-light">
              Our state-of-the-art Laboratory provides precise and timely diagnostics to the patient's
satisfaction
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
              <img src="https://scontent.fblz2-1.fna.fbcdn.net/v/t39.30808-6/441413553_847617120718382_7192173699096547920_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFmdCIgq1nXKWe2LZru1xDdHS0mzvXio4gdLSbO9eKjiIOzfdBtLeIWHikRV3kMAXpESLh5vGPwAZ4rAVBVxlVh&_nc_ohc=CDUnVUFli1EQ7kNvgEkiPvF&_nc_zt=23&_nc_ht=scontent.fblz2-1.fna&oh=00_AYAqehtqhEli8u1IdXc3TJnJiVt5WRWH4P5hb5Z4EA8v5g&oe=66558738"/>
               <p className="text-center mt-2 text-2xl sm:text-2xl">Dental Services</p>
              <p className="text-center   text-1xl text-yellow-300 sm:text-sm font-light">
              We are leaders in dental care!. We have skilled dentists at your service to provide optimal oral
health and we prioritize patients’ satisfaction and comfort
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
          <div className="slides">
            <div
              style={{
                width: "18rem",
                height: "25rem",
                backgroundColor: "green",
                borderRadius: "5px",
              }}
            >
              <img src="https://scontent.fblz2-1.fna.fbcdn.net/v/t39.30808-6/442440260_852370770243017_1386807777882654563_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHOKAH7m54xU13gpJvEMyooDHSvGro1M8gMdK8aujUzyHJaOPMxgos9XO0lklTeORmKXNVOYSguPtkmSqautli_&_nc_ohc=4T410RM1mVMQ7kNvgH9mjkg&_nc_zt=23&_nc_ht=scontent.fblz2-1.fna&oh=00_AYAIjD5GT4KvEQiwSqT4j46aEMNR2X4H1qbE7SI4McLuqA&oe=66558A54"/>
               <p className="text-center mt-2 text-2xl sm:text-2xl">Radiology Services</p>
              <p className="text-center   text-1xl text-yellow-300 sm:text-sm font-light">
              We maintain the highest standards in X-Ray and Imaging services,ensuring clarity in every scan
with advanced technology and experts in the field.
         
              </p>
              <div className="">
                <a
                  style={{
                    marginLeft: "50px",
                  }}
                  href="X-RayScan"
                  className=" inline-block rounded-md border border-transparent bg-green-600 px-8 py-3 text-center font-medium text-white hover:bg-yellow-700"
                >
                  Explore Radiology
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
