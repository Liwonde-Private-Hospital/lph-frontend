import React from "react";
import "./Service.css";
import logo from "../../images/icon.png";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/navbar";
import Footer from "@/components/footer";

function Service() {
  return (
    <>
      <Header />
      <div className="zigege">
        <div className="tryit"></div>
        <div className="sevdiv">
          <Image src={logo} alt="Hospital Logo" className="hospital-logo" />

          <div className="service-description">
            <h2 className="kulandila">WELCOME TO OUR MATERNITY SERVICE</h2>
            <p className="mawu">
              At Liwonde Private Hospital We are dedicated to providing
              exceptional care and support throughout your pregnancy,
              childbirth, and postpartum journey. Our team of experienced
              obstetricians, midwives, and nurses are here to ensure the health
              and well-being of both you and your baby
            </p>
            <span id="spanid">
              From prenatal consultations to personalized birthing plans, we
              offer comprehensive maternity care tailored to your needs. Our
              state-of-the-art facilities provide a comfortable and safe
              environment for delivery, equipped with advanced technology to
              ensure the highest standards of care
            </span>
            <span id="spanid">
              After delivery, our expert staff provides compassionate postpartum
              support, including breastfeeding assistance, newborn care
              education, and emotional guidance for new parents. We strive to
              make this special time in your life as joyful and stress-free as
              possible.
            </span>
            <span id="spanid">
              Choose Liwonde Private Hospital for your maternity care and
              experience excellence in every moment of your journey to
              parenthood
            </span>
          </div>
        </div>
        <Link href="/Appointment">
          <div className="divyabt"></div>
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default Service;
