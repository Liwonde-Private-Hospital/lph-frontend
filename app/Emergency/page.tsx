"use client";

import React from 'react';
import './dept.css';
import Image from 'next/image';
import icon from '../images/icon.png';
import Header from '@/componets/DashHeader';
import Footer from '@/componets/footer';

export default function Page() {
  const handleCallClick = () => {
    const phoneNumber = "+265 999940863"; // Replace with the actual phone number
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
            <h1 className='deptTitle'>Emergency Department</h1>
            <p className='deptdis'>
              At the heart of our emergency department is a commitment to patient-centric care. Through innovative technology and a human touch, we strive to alleviate distress and instill confidence in every interaction. From initial intake to follow-up care, our goal is to empower individuals with the tools and resources needed to navigate any health challenge with resilience and assurance.
            </p>
            <span className='deptgcpd'>To contact the department call</span>
            <button onClick={handleCallClick}><a>0999940863</a></button>
          </div>
        </div>
        <div className='deptImg'></div>
      </div>
      <Footer />
    </>
  );
}
