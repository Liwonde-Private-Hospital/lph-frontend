'use client'
import React from 'react';
import './Service.css';
import logo from "../images/icon.png";
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/componets/footer';
import Header from '@/componets/navbar';
function Service() {

  const handleCallClick = () => {
    const phoneNumber = "+265 999940863"; // Replace with the actual phone number
    window.location.href = "tel:" + phoneNumber;
  };

  return (
    <div>
      <Header />
      <div className="zigege">
        <div className='tryit'>
          {/* This div is currently empty */}
        </div>
        <div className='sevdiv'>
          <Image
            src={logo}
            alt="Hospital Logo" 
            className="hospital-logo"
          />
          <div className="service-description">
            <h2 className="kulandila">WELCOME TO THE DENTAL SERVICE</h2>
            <p className="mawu">
              At Liwonde Private Hospital we are dedicated to providing exceptional dental care tailored to your individual needs.
              Our experienced team of dental professionals offers a wide range of services to ensure that you achieve and maintain a healthy, beautiful smile. Here are some of the services we provide:
            </p>
            <span id='spanid'>Routine Check-ups and Cleanings: Keep your smile bright and healthy with regular check-ups and professional cleanings</span>
            <span id='spanid'>Extractions: When necessary, our gentle dentists can perform tooth extractions with care and precision.</span>
            <span id='spanid'>Dental Implants: Regain confidence in your smile with permanent tooth replacement solutions using state-of-the-art dental implants.</span>
         <br></br>
            <button onClick={handleCallClick}><a>call now</a></button>
          </div>
        </div>
        <Link href="/Appointment">
          <div className='divyabt'>
            {/* Add content here if needed */}
          </div>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Service;