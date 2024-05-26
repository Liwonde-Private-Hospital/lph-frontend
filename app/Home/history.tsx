'use client'

import Image, { StaticImageData } from "next/image";
import './Styles/history.css'
import liwonde from "../images/liwonde.jpeg";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

export default function BriefHistory(){
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]); // Include mainControls in the dependency array
  
    return(<>
        {/* brief history */}
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

 <section id="Brief-history">
          <div className="footer-colo">
            <h4>Brief History of LPH</h4>
            <p>
              Liwonde Private Hospital is a private health facility <br />
              based in Malawi, registered with medical council of Malawi
              <br />
              under the act cap 46: 02 and registration number 47668
              <br />
              .It was opened in 1999 and it is located in Machinga <br />
              District, Liwonde Township along Balaka-Zomba road in the
              <br />
              Southern region of Malawi
            </p>
          </div>
          <div className="footer-colo">
            <Image
              src={liwonde}
              alt=""
              width={500}
              height={400}
              className="brief-image"
            />
          </div>  
        </section>
          </motion.div>
            
            

        </div>
        </>)
}