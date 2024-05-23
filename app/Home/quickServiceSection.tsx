"use client";
import Image, { StaticImageData } from "next/image";
import Ambulance from '../images/Ambulance.jpeg'
import make from "../images/make.png";
import "./Styles/quickservice.css";
import map from "../images/map.jpeg";
import { motion, useInView, useAnimation } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";

export default function QuickServiceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  const slideControls = useAnimation();
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
                <a href="Appointment" className="book-appointment">
                  <button className="booking">Book </button>
                </a>
              </div>
              <div className="appointment">
                <Image
                  className="image"
                  src={Ambulance}
                  alt=""
                  width={258}
                  height={200}
                />
                <h3 className="book">Call Ambulance</h3>
                <p className="make">
                  Request fast and reliable ambulance services from liwonde
                  private hospital. click the button to view more details
                </p>
                <a href="Ambulance" className="book-appointment">
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
                <a href="Map" className="book-appointment">
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
                <a href="subscribe" className="">
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
