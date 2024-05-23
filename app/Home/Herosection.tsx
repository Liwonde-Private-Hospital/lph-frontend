"use client";
import Button from "@/componets/Button";
import { TypeAnimation } from "react-type-animation";
import "./Styles/HeroSection.css";
import { motion, useInView, useAnimation } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";

export default function Herosection() {
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
      {" "}
      {/* sliding images */}
      <section id="welcome-section">
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
            className=""
          >
            <h1 className="hospital-name">
              <span className="span">|</span>Welcome To Liwonde Private <br />
              Hospital
            </h1>
            <div>
              <a href="Appointment">
                <button className="first-button">
                  Book Appointment <span className="arrow">&#8594;</span>
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
