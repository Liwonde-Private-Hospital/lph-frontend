"use client";
import Image, { StaticImageData } from "next/image";
import make from "../../images/make.png";
import "./Styles/quickservice.css";
import map from "../../images/map.jpeg";
import { motion, useInView, useAnimation } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";

export default function QuickServiceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]); // Include mainControls in the dependency array
  

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
          <section id="quick-service">
            <div>
              <h3 className="Quick-services">Quick Services</h3>
            </div>

            <div id="access">
              <div className="appointment">
                <Image
                  className="image"
                  src={make}
                  alt=""
                  width={258}
                  height={200}
                />
                <h3 className="book">Book Appointment</h3>
                <p className="make">
                  Make an appointment with the liwonde private hospital. Click
                  the button and follow instructions
                </p>
                <a href="/pages/Appointment" className="book-appointment">
                  <button className="booking">Book </button>
                </a>
              </div>
              <div className="appointment">

              <Image
          className="image"
         src="https://scontent.fblz1-1.fna.fbcdn.net/v/t39.30808-6/440572572_839518068194954_495375744401040503_n.jpg?stp=cp6_dst-jpg&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGUXjpf2_1_8Z4YPazE3GtP58QBcTGZG9LnxAFxMZkb0vph-FAoYBrV2vC0efI76xIq5iAeNDevoB4mVjINyBWq&_nc_ohc=kF2EIPuvMBYQ7kNvgHhs-pV&_nc_pt=5&_nc_zt=23&_nc_ht=scontent.fblz1-1.fna&oh=00_AYCBMDtiiDWW91IzueE62wJPeJHXfZSaeV6FdLuGGoWKLw&oe=667CC2C8"
           width={258}
          height={200}
          alt="ok"
             />
                <h3 className="book">Call Ambulance</h3>
                <p className="make">
                  Request fast and reliable ambulance services from liwonde
                  private hospital.click the button below
                </p>
                <a href="/pages/Ambulance" className="book-appointment">
                  <button className="booking">Call </button>
                </a>
              </div>

              <div className="appointment">
                <Image
                  className="image"
                  src={map}
                  alt=""
                  width={258}
                  height={200}
                />
                <h3 className="book">Maps and Directions</h3>
                <p className="make1">
                  Liwonde private hospital is located along M3 Road near, puma
                  filling station
                </p>
                <a href="/pages/Map" className="book-appointment">
                  <button className="booking">View Map</button>
                </a>
              </div>
              <div className="appointment">
                <Image
                  className="image"
                  src={map}
                  alt=""
                  width={258}
                  height={200}
                />
                <h3 className="book">News and Updates</h3>
                <p className="make">What is happening right now at Liwonde private hospital?
                subscribe to latest news,update about a service or a product</p>
                <a href="/pages/subscribe" className="">
                  <button className="booking">Subscribe</button>
                  </a>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </>
  );
}
