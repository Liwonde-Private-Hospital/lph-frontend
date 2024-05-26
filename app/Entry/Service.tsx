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
        src="https://scontent.fblz2-1.fna.fbcdn.net/v/t39.30808-6/442419395_852387566908004_1110448681254518384_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGtUL85X_PzZYAhTWI5y3j0osQ4gy8zPGuixDiDLzM8a0uGbBkRw0hiRyDLqrwJDOn2lQch6UAygu5Vs2bBXCHK&_nc_ohc=hd7Qr-Icbj4Q7kNvgH9vFvH&_nc_zt=23&_nc_ht=scontent.fblz2-1.fna&oh=00_AYAzd84BoppdJQrCFw6w9Sxcy4sEkOGkNConDK3kmLyq1w&oe=66555E50" 
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
        <p className="mawu">At our reception, we strive to provide a warm and welcoming environment for all our visitors. Our dedicated team of receptionists is here to assist you with any inquiries or assistance you may need during your visit to our facility</p>
       
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
