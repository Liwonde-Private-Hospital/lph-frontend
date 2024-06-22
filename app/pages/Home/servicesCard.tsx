'use client'
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
                height: "27rem",
                backgroundColor: "green",
                borderRadius: "5px",
              }}
            >
       <img  src='https://scontent.fblz1-1.fna.fbcdn.net/v/t39.30808-6/436366126_847616464051781_3716270528436982268_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHn6NRPfTiQ1bdtv1j3nLK4YBLf-coFEA5gEt_5ygUQDiSoL33ujfCEJoeqUbskBExP6NboUGtppFuAflbS1TKi&_nc_ohc=8C9jJQ5fsFAQ7kNvgHNrB5Y&_nc_pt=5&_nc_zt=23&_nc_ht=scontent.fblz1-1.fna&oh=00_AYDTcLqzbDCn1JCqbH7QoXoeV4ARx-xBecs8X1a2-yuWmg&oe=667CBD98'/>
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
                  href="/pages/Buy"
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
                height: "27rem",
                backgroundColor: "green",
                borderRadius: "5px",
              }}
            >
              <Image
                src="https://scontent.fblz1-1.fna.fbcdn.net/v/t39.30808-6/442419395_852387566908004_1110448681254518384_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGtUL85X_PzZYAhTWI5y3j0osQ4gy8zPGuixDiDLzM8a0uGbBkRw0hiRyDLqrwJDOn2lQch6UAygu5Vs2bBXCHK&_nc_ohc=B394V8wezk8Q7kNvgGveIeL&_nc_pt=5&_nc_zt=23&_nc_ht=scontent.fblz1-1.fna&oh=00_AYAe2Bso7fmftrWKcI8ka2f_EOMHH41zAKJnjFRqp3ERvw&oe=667CB310"
                alt="Reception Services"
                width={400}
                height={300}
              />
              <p className=" text-center mt-2   sm:text-2xl">Reception Services</p>
              <p className="text-center mt-1 text-1xl text-yellow-300 sm:text-sm font-light">
                Reception is the entry point of all the services. The reception links clients to doctor, pharmacist and any other staff.
              </p>
              <div className="">
                <a
                  style={{
                    marginLeft: "50px",
                  }}
                  href="/pages/Entry"
                  className=" mt-5 inline-block rounded-md border border-transparent bg-green-600 px-8 py-3 text-center font-medium text-white hover:bg-yellow-700"
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
                height: "27rem",
                backgroundColor: "green",
                borderRadius: "5px",
              }}
            >
              <Image
                src="https://scontent.fblz1-1.fna.fbcdn.net/v/t39.30808-6/439935685_847613394052088_2962033458726271154_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGzLXcUPgK9G1FU0G6Nii23uKxl_w6Ll-q4rGX_DouX6iO7mNxamNFs24hPh33mKgcDpcAymH0Yk0PrzSt3l_Lr&_nc_ohc=eTsCHOmlegsQ7kNvgGGRBqm&_nc_pt=5&_nc_zt=23&_nc_ht=scontent.fblz1-1.fna&oh=00_AYC5jGiCSyGxwvy1191N1BCYeS7eYB1MMaRINpDusTeQhQ&oe=667CC10C"
                alt="OPD Services"
                width={400}
                height={300}
              />
              <p className=" text-center mt-2 text-2xl sm:text-22xl">OPD Services</p>
              <p className="text-center mt-1 text-1xl text-yellow-300 sm:text-sm font-light">
                Our OPD offers efficient and comfortable care for an array of illnesses. We ensure prompt medical service, no waiting - because your health cant wait.
              </p>
              <div className="">
                <a
                  style={{
                    marginLeft: "50px",
                  }}
                  href="/pages/Office"
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
                 height: "27rem",
                backgroundColor: "green",
                borderRadius: "5px",
              }}
            >
              <Image
                src="https://scontent.fblz1-1.fna.fbcdn.net/v/t39.30808-6/441041760_847614654051962_6370260677110377676_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGV2lzRkU3Pv8Og0NQsEslYNOHIukOUquQ04ci6Q5Sq5D-5jCqffhtzxd0eHAqYQdqiz1CpzxXwuSQX5xgT9kDu&_nc_ohc=UxJFgZwLwfkQ7kNvgFdZKOv&_nc_pt=5&_nc_zt=23&_nc_ht=scontent.fblz1-1.fna&oh=00_AYCaH9RCPH5gFwLB7Vu8FoJ0e9bKU0GiV4HU09cdknkhDw&oe=667CAD3E"
                alt="Maternity Services"
                width={400}
                height={300}
              />
              <p className="text-center mt-2 text-2xl  sm:text-2xl">Maternity Services</p>
              <p className="text-center text-1xl text-yellow-300">
                We pride ourselves in promoting maternity health and our services provide comprehensive care from prenatal to postnatal stages.
              </p>
              <div className="">
                <a
                  style={{
                    marginLeft: "50px",
                  }}
                  href="/pages/Mom"
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
                 height: "27rem",
                backgroundColor: "green",
                borderRadius: "5px",
              }}
            >
              <Image
                src="https://scontent.fblz1-1.fna.fbcdn.net/v/t39.30808-6/441623754_847608277385933_6366622942508059321_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGFRvKVv8JCVmAkaxE5_Zqf0xC5_ql5kv7TELn-qXmS_oDmuCXL5zVBzrtXD5KbGrwO7COndlOM18y1GDk6TInU&_nc_ohc=rXruhbny4LwQ7kNvgF586OT&_nc_pt=5&_nc_zt=23&_nc_ht=scontent.fblz1-1.fna&oh=00_AYAG9iO1HKx9Uq0atH44-ELBC9Gik3iV_c3UYXcjbjQNBQ&oe=667CACF3"
                alt="Lab Services"
                width={400}
                height={300}
              />
              <p className="text-center mt-2 text-2xl  sm:text-2xl">Lab Services</p>
              <p className="text-center   text-1xl text-yellow-300 sm:text-sm font-light">
                Our state-of-the-art Laboratory provides precise and timely diagnostics to the patients satisfaction.
              </p>
              <div className="">
                <a
                  style={{
                    marginLeft: "50px",
                  }}
                  href="/pages/Laboratory"
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
                height: "27rem",
                backgroundColor: "green",
                borderRadius: "5px",
              }}
            >
              <Image
                src="https://scontent.fblz1-1.fna.fbcdn.net/v/t39.30808-6/441413553_847617120718382_7192173699096547920_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFmdCIgq1nXKWe2LZru1xDdHS0mzvXio4gdLSbO9eKjiIOzfdBtLeIWHikRV3kMAXpESLh5vGPwAZ4rAVBVxlVh&_nc_ohc=f0y5CcW4mIYQ7kNvgGpxWpO&_nc_pt=5&_nc_zt=23&_nc_ht=scontent.fblz1-1.fna&oh=00_AYApV1s0ruhyPtkwTQWAiBie8F1GczyjY2q3TlCfXjsQsA&oe=667CA3B8"
                alt="Dental Services"
                width={400}
                height={300}
              />
              <p className="text-center mt-2 text-2xl sm:text-2xl">Dental Services</p>
              <p className="text-center   text-1xl text-yellow-300 sm:text-sm font-light">
                We are leaders in dental care!. We have skilled dentists at your service to provide optimal oral health and we prioritize patients’ satisfaction and comfort.
              </p>
              <div className="">
                <a
                  style={{
                    marginLeft: "50px",
                  }}
                  href="/pages/Dentist"
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
                height: "27rem",
                backgroundColor: "green",
                borderRadius: "5px",
              }}
            >
              <Image
                src="https://scontent.fblz1-1.fna.fbcdn.net/v/t39.30808-6/442440260_852370770243017_1386807777882654563_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHOKAH7m54xU13gpJvEMyooDHSvGro1M8gMdK8aujUzyHJaOPMxgos9XO0lklTeORmKXNVOYSguPtkmSqautli_&_nc_ohc=UnD4HB4vt6MQ7kNvgHxfKdj&_nc_pt=5&_nc_zt=23&_nc_ht=scontent.fblz1-1.fna&oh=00_AYBflUT4ht54Da8B5n_GmwsRKaaxsS5KU_uiq-_mBXScvQ&oe=667CA6D4"
                alt="Radiology Services"
                width={400}
                height={300}
              />
              <p className="text-center mt-2 text-2xl sm:text-2xl">Radiology Services</p>
              <p className="text-center   text-1xl text-yellow-300 sm:text-sm font-light">
                We maintain the highest standards in X-Ray and Imaging services, ensuring clarity in every scan with advanced technology and experts in the field.
              </p>
              <div className="">
                <a
                  style={{
                    marginLeft: "50px",
                  }}
                  href="/pages/X-RayScan"
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
