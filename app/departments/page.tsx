import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './Depthome.css';
import Footer from '@/componets/footer';

import Button from '@/componets/BT';
import Navbar from '@/componets/navbar';

// Sample department data
const departments = [
  {
    id: 1,
    name: 'Emergency',
    imageUrl: 'https://scontent.fblz2-1.fna.fbcdn.net/v/t39.30808-6/441904465_847624220717672_8516570232742019743_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeG6DOGZsQ2yvIwOr_ivS_4uORivyQ0j3T45GK_JDSPdPp9VYumlaMzfFEMWumyfkM8rluYyb7Je4rYU9d7Pej1i&_nc_ohc=r7XI-wRf6YoQ7kNvgHue85R&_nc_zt=23&_nc_ht=scontent.fblz2-1.fna&oh=00_AYD44fDAw_Abu3Vl7KvgX-6pc0OS0XbcvHh433YIX_ed6A&oe=66559A8F',
    link: "/Emergency",
  },
  {
    id: 2,
    name: 'Finance',
    imageUrl: 'https://scontent.fblz2-1.fna.fbcdn.net/v/t39.30808-6/440377891_847631457383615_2637721381328687699_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFISRw81M6EwOva-SP4vO45RE4PjngpxktETg-OeCnGS0-1PHrc0NzGdpa-QYPTlYa4rjOIB8VIf_kT9McLuJ5x&_nc_ohc=LCX1-jxf2IkQ7kNvgHSpW2v&_nc_zt=23&_nc_ht=scontent.fblz2-1.fna&oh=00_AYARz6dXDPP5RVH9T7Bo2LG7I8st4XMFJr-gnhkizWJkAQ&oe=6655B443',
    link: "/Financial",
  },
  {
    id: 3,
    name: 'Human Resource',
    imageUrl: 'https://scontent-jnb2-1.xx.fbcdn.net/v/t39.30808-6/441524254_847638564049571_497590884102366016_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=qqeYk-iOXAoQ7kNvgFRbBj_&_nc_ht=scontent-jnb2-1.xx&oh=00_AYCylKYPeW9RkMRieodkyh1JNRM7jApLI48EsXjiJrYbsA&oe=66568594',
    link: "/Human",
  },
  {
    id: 4,
    name: 'Radiology',
    imageUrl: 'https://scontent-jnb2-1.xx.fbcdn.net/v/t39.30808-6/436202290_847628200717274_157949292653423815_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=TCsy5SUnspkQ7kNvgHGgXAF&_nc_ht=scontent-jnb2-1.xx&oh=00_AYDcq-8x0E5uP80XzbwThiV5XdZas5IPSQ9ESe__54xftg&oe=6656B1C9',
    link: "/X-RayScan",
  },
  {
    id: 5,
    name: 'Dental',
    imageUrl: 'https://scontent-jnb2-1.xx.fbcdn.net/v/t39.30808-6/441413553_847617120718382_7192173699096547920_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=CDUnVUFli1EQ7kNvgG5Ni8P&_nc_ht=scontent-jnb2-1.xx&oh=00_AYDtBTo61YgJjlSDtS-ELuPunlrZtLyRVn9PQjaNVkFDdQ&oe=6656A078',
    link: "/Dentist",
  },
  {
    id: 6,
    name: 'Operating Theatre',
    imageUrl: 'https://scontent-jnb2-1.xx.fbcdn.net/v/t39.30808-6/441910845_847629340717160_8364228998593965139_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=xAjiv3XP50kQ7kNvgEuCPM4&_nc_ht=scontent-jnb2-1.xx&oh=00_AYBtri0zuuBZeln63jjX70Q8jA_Ozvz6bnGDhpyJXnhSsQ&oe=6656A8EE',
    link: "/Theatre",
  },
  {
    id: 7,
    name: 'Laboratory',
    imageUrl: 'https://scontent-jnb2-1.xx.fbcdn.net/v/t39.30808-6/441623754_847608277385933_6366622942508059321_n.jpg?stp=dst-jpg_s960x960&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=xck4hNQ4c9AQ7kNvgEQ4GMR&_nc_ht=scontent-jnb2-1.xx&oh=00_AYAb0zFDzFUoqLwnlWr6ILpHPn6Uv4Kcgeq2RBPc7Yrihw&oe=6658DC33',
    link: "/Laboratory",
  },
];

const DepartmentsPage = () => {
  return (
    <>
      <Navbar />
      <div className='nmt'>
        <div className="kudya">
          <h1 id='hex12'>Departments</h1>
          <div className="card-kudya">
            {departments.map(department => (
              <div key={department.id} className="card">
                <Image src={department.imageUrl} alt={department.name} className='kuzco' width={500} height={500} />
                <h2 className='denm'>{department.name}</h2>
                <Link href={department.link}>
                  <div className='depthc'>
                    <Button />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DepartmentsPage;
