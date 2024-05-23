import React from 'react'
import './dept.css'
import Image from 'next/image';
import icon from '../images/icon.png'
import Header from '@/componets/navbar';
import Footer from '@/componets/footer';

export default function page() {
  return (
    <>
    <Header/>
    <div className='divyadept'>
    <div className='deptinfo'>
        <div className='tiyikelogo'>
        <Image src={icon} alt="zilogo" width={200} height={20} className='zitobe'/>
        </div>
        <div className='infoija'>
            <h1 className='deptTitle'>IT Department</h1>
            <p className='deptdis'>Welcome to the heart of our digital infrastructure – the IT Department.
             Our dedicated team is the driving force behind the seamless operation and continuous evolution
             of our web application. Comprising skilled professionals with expertise spanning from 
             cybersecurity to software development, our IT department ensures that our digital ecosystem 
             remains secure, efficient, and innovative.</p>
             <p className='deptdis'>
             Our mission is to empower our organization with cutting-edge technology solutions while 
             safeguarding the integrity and confidentiality of our digital assets. We strive to provide
             reliable support and proactive guidance to all departments, fostering a culture of 
             technological excellence and agility.
             </p>
            <span className='deptgcpd'>To contact the department call</span>
            <span className='deptcont'>+265 997 138 340</span>
        </div>
    </div>
    <div className='deptImg'></div>
    </div>
    <Footer/>
    </>
    
  )
}
