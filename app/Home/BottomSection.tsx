"use client";
import NumberAnimation from "../animation";

import Image, { StaticImageData } from "next/image";
import heart from "../images/heart.png";
import "./Styles/bottomSection.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion, useInView, useAnimation } from "framer-motion";
import React, {  useEffect, useRef } from "react";

const stats = [
  { id: 1, name: "satisfied patients", value: <NumberAnimation/> },
  { id: 2, name: "Succes rate", value: "98%" },
  { id: 3, name: "Years In Services", value: "25+" },
];

export default function BottomSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  const slideControls = useAnimation();
 useEffect(() => {
  if (isInView) {
    mainControls.start("visible");
  }
}, [isInView, mainControls]);

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
          <section id="stats">
          <div id="statistics">
               <h1 className="mt-30 text-4xl  text-center font-bold tracking-tight text-white-900 sm:text-4xl mt-50">
            Liwonde Private Hospital Statistics
          </h1>
          <h3 className="mt-4 text-xl  text-center text-white-500">
            {" "}
            Discover the impressive Statistics that showcase our <br />
            commitment to exllence and dedicattion to our patients
          </h3>
          <div className="bg-gray py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.id}
                    className="mx-auto flex max-w-xs flex-col gap-y-4"
                  >
                    <dt className="text-base leading-7 text-gray-600">
                      {stat.name}
                    </dt>
                    <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
        
          </section>
          
         
          <div className="img">
            <Image
              className="reception"
              src={heart}
              alt="recept"
              width={1400}
              height={250}
              style={{
                padding: "10px",
                borderRadius: "10px",
                animation: "slideRight 50s linear infinite",
              }}
            />
          </div>
         
        </motion.div>
        <div>
        </div>
      </div>
    </>
  );
}
