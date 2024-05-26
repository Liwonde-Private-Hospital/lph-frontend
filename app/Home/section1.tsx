"use client";
import { TypeAnimation } from "react-type-animation";
import "./Styles/section1.css";
import { motion, useInView, useAnimation } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import liwonde from '../images/liwonde.jpeg'
import Ambulannce from'../images/Ambulance.jpeg'
import welcome from '../images/welcome.jpeg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedkit, faPhone, faTimesCircle,faBookMedical } from "@fortawesome/free-solid-svg-icons";
import theatre from '../images/theatre.Jpeg'
import Image from "next/image";
import icon from '../images/icon.png'
const features = [
  {
    name: "Contact Us",
    description:
      "Contact staff and officials of private hospital through the following numbers 0888597087 /  0999940863 ",
  },
  {
    name: "Working Hours",
    description:
      "Liwonde private hospital is open to its Services 24 hour Everyday,feel free to visit our hospital any times",
  },
  { name: "Departments", description: "Liwonde Private Hospital has the following department, Radiology, dental, martenity,Laborotory,Operation theatre,ART and many more. each department is managed by team of well trained proffessionals" },
  {
    name: "locations",
    description: "Liwonde private hospital is located along M3 Road near, puma filling station",
  },
  { name: "Enquiries", description: "If you have questions, complaints or anything you need clarification don't hesitate to reach out to us"  },
  {
    name: "Reports",
    description:" we apprecite feedbacks, comments and recommendations towards our every day services, if you have anything to share with us feel free to so",
  },
];

export default function Section1() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  const slideControls=useAnimation()

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);
  return (
    <>
      <div ref={ref} style={{ position: "relative", overflow: "hidden" }}>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{
            duration: 1,
            delay: 0.5,
          }}
        >
          
          <div id="anime">
            <TypeAnimation
              sequence={[
                "A Great Place to Recieve Care",
                1000,
                "We Treat, God Heals",
                1000,
                "High quality Services offered",
                1000,
                "In Parternship with Medical Schemes",
              ]}
              speed={10}
              style={{ fontSize: "2em" }}
              repeat={Infinity}
            />
          </div>
          
          <div className="bg-white">
            <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
              <div>
                
               <div className="items-center justfy-center "> <h2 className="text-3xl font-bold tracking-tight text-green-900 sm:text-4xl">
                  <FontAwesomeIcon icon={faBookMedical} className="my-icon1"/>Important Guide 
                </h2>
                
                <p className="mt-4 text-gray-500">
                  Welcome to Liwonde Private Hospital, this section provides
                  guidance towards the Service, important details and some
                  insights of the functions of the hospital
                </p>
</div>
                <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                  {features.map((feature) => (
                    <div
                      key={feature.name}
                      className="border-t border-yellow-200 pt-4"
                    >
                      <dt className="font-medium text-green-900">
                        {feature.name}
                      </dt>
                      <dd className="mt-2 text-sm text-gray-500">
                        {feature.description}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className=" mt-20 grid grid-cols-2 grid-rows-1 gap-4 sm:gap-6 lg:gap-8">

                 <Image src={liwonde}  height="1000" width="1000" alt="" className=""/>
                 <Image src={Ambulannce} alt="" className=""/>
                 <Image src={theatre} alt="" className=""/>
                 <Image src={welcome} alt="" className=""/>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

