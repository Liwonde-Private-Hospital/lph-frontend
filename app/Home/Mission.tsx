'use client'

import Image from "next/image";
import "./Styles/mission.css";
import { motion, useInView, useAnimation } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import old from "../images/old.jpeg";

export default function MissionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
 
  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
     
    }
  }, [isInView]);
  return (
    <>
      {/* mission and Vision section */}
      <div  ref={ref} style={{ position: "relative", overflow: "hidden" }}>
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
        <section id="mission-section">
        <div className="footer-coll">
          <h4>Mission Statement</h4>
          <p>
            we are fully committed to deliver effective,
            <br />
            preventive,promotive, currative and
            <br />
            rehabilitative health services to all citizens
          </p>
          <h4>Core Policies</h4>
          <ul>
            <li>Commitment</li>
            <li>Respect</li>
            <li>Hardwork</li>
            <li>Integrity</li>
          </ul>
        </div>
        <div className="footer-colll">
          <h4>Vision Statement</h4>
          <p>
            To be a centre of excellence in
            <br /> the provision of high quality heath <br /> services in Malawi
          </p>
          <h4>Core Policies</h4>
          <ul className="policy">
            <li>Commitment</li>
            <li>Respect</li>
            <li>Hardwork</li>
            <li>Integrity</li>
          </ul>
        </div>
        <div className="footer-colll">
          <Image className="old" src={old} alt="" width={500} height={500} />
        </div>
      </section>
      </motion.div>
      </div>
     
      
    </>
  );
}
