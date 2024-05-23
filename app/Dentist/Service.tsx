import React from 'react';
import './Service.css';
import logo from "../images/icon.png"
import Image from 'next/image';
import Link from 'next/link';


function Service() {
  return (
    <div className="zigege">
      <div className='tryit'>
      
      </div>
      <div className='sevdiv'>
      <Image
        src={logo}
        alt="Hospital Logo" 
        className="hospital-logo"
      />

      <div className="service-description">
        <h2 className="kulandila">WELCOME TO THE DENTAL SERVICE</h2>
        <p className="mawu">At Liwonde clinic we are dedicated to providing exceptional dental care tailored to your individual needs.
         Our experienced team of dental professionals offers a wide range of services to ensure that you achieve and maintain a healthy, beautiful smile. Here are some of the services we provide:</p>
        <span id='spanid'>Routine Check-ups and Cleanings: Keep your smile bright and healthy with regular check-ups and professional cleanings</span>
        <span id='spanid'>Extractions: When necessary, our gentle dentists can perform tooth extractions with care and precision.</span>
        <span id='spanid'>Dental Implants: Regain confidence in your smile with permanent tooth replacement solutions using state-of-the-art dental implants.</span>
      </div>
      </div>
     <Link href="/Appointment">
     <div className='divyabt'>
   
     </div>
     </Link>
    </div>
  );
}

export default Service;
