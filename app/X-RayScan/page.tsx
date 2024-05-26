"use client";

import React from 'react';
import './dept.css';
import Image from 'next/image';
import icon from '../images/icon.png';
import Header from '@/componets/navbar';
import Footer from '@/componets/footer';

export default function Page() {
  const handleCallClick = () => {
    const phoneNumber = "+265 997 138 340"; // Replace with the actual phone number
    window.location.href = "tel:" + phoneNumber;
  };

  return (
    <>
      <Header />
      <div className='divyadept'>
        <div className='deptinfo'>
          <div className='tiyikelogo'>
            <Image src={icon} alt="zilogo" width={200} height={20} className='zitobe' />
          </div>
          <div className='infoija'>
            <h1 className='deptTitle'>Department of Radiology</h1>
            <p className='deptdis'>
            The Department of Radiology is a cornerstone of our healthcare facility, dedicated to providing high-quality imaging services to aid in the diagnosis and treatment of various medical conditions. Equipped with cutting-edge technology, our department offers a comprehensive range of imaging modalities, including X-ray, ultrasound, computed tomography (CT), magnetic resonance imaging (MRI), and Scanning Services.

            
              {/* The Finance Department of the hospital is the nerve center of financial management, ensuring the efficient allocation of resources to support optimal patient care. Responsible for budgeting, expenditure tracking, and financial forecasting, it plays a pivotal role in maintaining the institution's fiscal health. Additionally, the department manages billing processes, liaises with insurance companies, and maintains transparent financial records to uphold accountability and compliance. Through its dedication to financial stewardship and operational excellence, the Finance Department enables the hospital to fulfill its mission of delivering high-quality healthcare while ensuring financial sustainability. */}
            </p>
            <span className='deptgcpd'>To contact the department </span>
            <button onClick={handleCallClick}><a>call now</a></button>
          </div>
        </div>
        <div className='deptImg'></div>
      </div>
      <Footer />
    </>
  );
}
