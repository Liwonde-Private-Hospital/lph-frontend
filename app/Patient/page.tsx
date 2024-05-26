import React from 'react';
import Header from '@/componets/navbar';
import Footer from '@/componets/footer';
import './Service.css';

const callouts = [
  {
    name: 'Patient Admission',
    description: 'Our hospital\'s patient admission service combines compassionate care with seamless efficiency. Our dedicated team prioritizes your comfort, safety, and well-being, providing personalized assistance with paperwork and expedited processing for a stress-free experience. Trust us to provide high-quality care from the moment you arrive.',
    imageSrc: 'https://scontent.fblz1-1.fna.fbcdn.net/v/t39.30808-6/436570700_847620377384723_7356139790777712170_n.jpg?stp=dst-jpg_s640x640&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEFxnS51F0QV5b2n5oA1GwSsHf1D8Gg7Uewd_UPwaDtR3HnadOEIpEyb3hNJ_E29CmIIJ3Y3fOuVa5Q_YNkQkXT&_nc_ohc=FjxYyF5ta3YQ7kNvgEu74fg&_nc_pt=5&_nc_zt=23&_nc_ht=scontent.fblz1-1.fna&oh=00_AYDfiFQq-pLAQFI8_I4Gz4l2S5ZXu_4_ctdxUIDXQZA8YA&oe=664C227D',
  },
  {
    name: 'Patient Discharge',
    description: 'Experience a seamless departure from our hospital with our patient discharge service. As you prepare to leave, our compassionate team ensures a smooth transition, offering personalized support and guidance every step of the way. Rest assured, your comfort and well-being remain our top priority until the very end. Plus, as part of our commitment to your care, we provide the convenience of ambulance transport upon discharge, ensuring a safe journey home. Trust us to see you off with the same level of excellence and care you received during your stay.',
    imageSrc: 'https://scontent.fblz1-1.fna.fbcdn.net/v/t39.30808-6/436233184_847621590717935_8368965591988716_n.jpg?stp=dst-jpg_p180x540&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFg9w0tVPLCqv4jvnNuheHhUtqKLUzXVpdS2ootTNdWlxuH6ZJTnow5u0bsosoFjOHaxju26VaEuAaS6VlQDTf7&_nc_ohc=gmOq_Ipd-JsQ7kNvgHPVvvB&_nc_pt=5&_nc_zt=23&_nc_ht=scontent.fblz1-1.fna&oh=00_AYAUXWDg4kHcwKw3xL-h3hXITmdLMX4fsdmDEntwhIfa-g&oe=664C1DFB',
  },
  {
    name: 'Medical Checkup',
    description: 'Medical prescription guide from our medical specialist and as well as providing routine for check ups and any other related medical guide.',
    imageSrc: 'https://scontent.fblz1-1.fna.fbcdn.net/v/t39.30808-6/440072618_847623114051116_5830858774568460928_n.jpg?stp=dst-jpg_p843x403&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHlI4g6AqvMfoAH6x1NNSZz9AMN1EkRnOP0Aw3USRGc499nsOX6VkitwKv1ZzLZVsqpiAkkHQ7SL6GrrtBFMXn6&_nc_ohc=z1NbyF_VxMkQ7kNvgGUsBf2&_nc_pt=5&_nc_zt=23&_nc_ht=scontent.fblz1-1.fna&oh=00_AYCqrE5Ezb1yXrlKLEMFxsCH28zlsn8GYvzvLA6ZDgT2iw&oe=664C2703',
  },
];

const Visit = [
  { day: 'Monday-Sunday', time1: '7AM to 9AM', time2: '12PM to 2PM', time3: '5PM to 7PM' },
];

export default function Patient() {
  return (
    <>
      <Header />
      <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            <h2 className="text-2xl font-bold text-green-900">Patient Admission and Discharge</h2>
            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {callouts.map((callout) => (
                <div key={callout.name} className="group relative">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                    <img
                      src={callout.imageSrc}
                      className="h-full w-full object-cover object-center"
                      alt={callout.name} // Added alt prop
                    />
                  </div>
                  <h3 className="mt-6 text-base font-semibold text-green-500">
                    <span className="absolute inset-0" />
                    {callout.name}
                  </h3>
                  <p className="text-sm font-light text-gray-600">{callout.description}</p>
                </div>
              ))}
              <div className='justify-center mt-10 '>
                <h2 className="text-2xl font-bold text-green-900 text-center">Visiting Hours</h2>
                <div className="table-row">
                  <div className="table-cell">
                    <p>Day</p>
                  </div>
                  <div className="table-cell">
                    <p>Morning</p>
                  </div>
                  <div className="table-cell">
                    <p>Afternoon</p>
                  </div>
                  <div className="table-cell">
                    <p>Evening</p>
                  </div>
                </div>
                {Visit.map((item, index) => (
                  <div className='table-row' key={index}>
                    <div className='table-cell'>
                      <p>{item.day}</p>
                    </div>
                    <div className='table-cell'>
                      <p>{item.time1}</p>
                    </div>
                    <div className='table-cell'>
                      <p>{item.time2}</p>
                    </div>
                    <div className='table-cell'>
                      <p>{item.time3}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}


