import React from 'react';
import './Service.css';
import logo from "../images/icon.png"
import Image from 'next/image';
import Link from 'next/link';
// import Btz from '../Button/page'
import Header from '@/componets/navbar';
import Footer from '@/componets/footer'
import Button from '@/componets/Button'

function Service() {
  return (
    <>
    <Header/>
     <div className="zigege">
      <div>
      <img 
        src="https://i.pinimg.com/564x/9d/d5/f3/9dd5f373cf11ab7a6ac2dd2f1e67e0e5.jpg" 
        alt="Hospital" 
        className="hospital-image"
      />
      
      </div>
      <div className='sevdiv'>
      <Image
        src={logo}
        alt="Hospital Logo" 
        className="hospital-logo"
      />

      <div className="service-description">
        <h2 className="kulandila">WELCOME TO THE RECEPTION SERVICE</h2>
        <p className="mawu">We provide oral health care to patients which helps patients maintain good oral hygiene, prevent and treat dental diseases and enhance their self confidence and quality of life</p>
       
      </div>
     
      </div>
     <Link href="/Appointment">
     <div className='divyabt'>
      <Button/>
     </div>
     </Link>
    </div>
    <Footer/>
    </>
   
  );
}

export default Service;
