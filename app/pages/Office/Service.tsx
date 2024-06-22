import React from 'react';
import './Service.css';
import icon from '../../images/icon.png'
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/componets/Button';
import Header from '@/componets/navbar';
import Footer from '@/componets/footer';

function Service() {
  return (
    <>
    <Header/>
    <div className="zigege">
      <div className='tryit'>
      
      </div>
      <div className='sevdiv'>
      <Image
        src={icon}
        alt="Hospital Logo" 
        className="hospital-logo"
      />

      <div className="service-description">
        <h2 className="kulandila">WELCOME TO OUR OPD SERVICE</h2>
        <p className="mawu">Welcome to our Doctors Office at Liwonde Hospital
         We pride ourselves on providing comprehensive, compassionate care to 
         our patients, tailored to their individual needs. Our team of experienced
         physicians and healthcare professionals is dedicated to ensuring your
         well-being and addressing your concerns with expertise and empathy.</p>
        <span id='spanid'>From routine check-ups to managing chronic conditions,
         our primary care physicians are here to be your partners in health, 
         offering preventive care and personalized treatment plans</span>
        <span id='spanid'>At the heart of our practice is a commitment to
         patient-centered care, where your health goals and preferences are 
         respected, and your journey to wellness is supported every step of 
         the way.</span>
        <span id='spanid'>Trust in our Doctors Office at Liwonde Private Hospital for
         exceptional medical care delivered with compassion and excellence</span>
      </div>
      </div>
     <Link href="/pages/Appointment">
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
