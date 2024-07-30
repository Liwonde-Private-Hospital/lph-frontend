import React from "react";
import "./Service.css";
import logo from "../images/icon.png";
import Image from "next/image";
import Header from "@/components/navbar";
import Footer from "@/components/footer";

function Service() {
  const Visit = [
    {
      day: "Monday",
      time1: "7AM to 9AM",
      time2: "12PM to 2PM",
      time3: "5PM to 7PM",
    },
    {
      day: "Tuesday",
      time1: "7AM to 9AM",
      time2: "12PM to 2PM",
      time3: "5PM to 7PM",
    },
    {
      day: "Wednesday",
      time1: "7AM to 9AM",
      time2: "12PM to 2PM",
      time3: "5PM to 7PM",
    },
    {
      day: "Thursday",
      time1: "7AM to 9AM",
      time2: "12PM to 2PM",
      time3: "5PM to 7PM",
    },
    {
      day: "Friday",
      time1: "7AM to 9AM",
      time2: "12PM to 2PM",
      time3: "5PM to 7PM",
    },
    {
      day: "Surtaday",
      time1: "7AM to 9AM",
      time2: "12PM to 2PM",
      time3: "5PM to 7PM",
    },
    {
      day: "Sunday",
      time1: "7AM to 9AM",
      time2: "12PM to 2PM",
      time3: "5PM to 7PM",
    },
  ];

  return (
    <>
      <Header />
      <div className="zigege">
        <div className="tryit"></div>
        <div className="sevdiv">
          <Image src={logo} alt="Hospital Logo" className="hospital-logo" />
          <div className="service-description">
            <div className="justify-center text-center">
              <p className="   text-2xl font-bold text-green-600 mt-10">
                Patient Admission and Discharge
              </p>
              <p className="">
                The Doctors at the liwonde private hospital provide directive on
                admitting <br />
                depending on the condition of the patient, further more there
                are arrange
                <br />
                ments in place for patient discharge as explained the following
                sector
              </p>
              <p className="   text-1xl font-bold text-green-600 mt-5">
                Patient Admission
              </p>
              <p className="">
                Our hospitals patient admission service combines compassionate
                care with seamless
                <br />
                efficiency. Our dedicated team prioritizes your comfort, safety,
                and well-being, <br />
                providing personalized assistance with paperwork and expedited
                processing <br />
                for a stress-free experience. Trust us to provide high-quality
                care from the moment you arrive
              </p>
              <p className="   text-1xl font-bold text-green-600 mt-5">
                Patient Discharge
              </p>
              <p className="">
                Experience a seamless departure from our hospital with our
                patient discharge <br />
                service. As you prepare to leave, our compassionate team ensures
                a smooth transition, <br />
                offering personalized support and guidance every step of the
                way. Rest assured, <br />
                your comfort and well-being remain our top priority until the
                very end. Plus,
                <br />
                as part of our commitment to your care, we provide the
                convenience of ambulance <br />
                transport upon discharge, ensuring a safe journey home. Trust us
                to see you off with <br />
                the same level of excellence and care you received during your
                stay
              </p>
            </div>
            <p className="text-center  text-1xl font-bold text-green-600 mt-5">
              Visiting Hours
            </p>
            <div className="justify-center">
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
                <div className="table-row" key={index}>
                  <div className="table-cell">
                    <p>{item.day}</p>
                  </div>
                  <div className="table-cell">
                    <p>{item.time1}</p>
                  </div>
                  <div className="table-cell">
                    <p>{item.time2}</p>
                  </div>
                  <div className="table-cell">
                    <p>{item.time3}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Service;
