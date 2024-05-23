'use client'
import React, { useState, useRef } from "react";
import emailjs from "emailjs-com";
import Header from "@/componets/navbar";
import Footer from "@/componets/footer";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    area: "",
    city: "",
    message: "",
  });

  const [alert, setAlert] = useState<string | null>(null);
  const [showMessage, setShowMessage] = useState(false);
  const [bookedName, setBookedName] = useState<string | null>(null); // New state variable
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "date") {
      const selectedDate = new Date(value);
      const currentDate = new Date();

      if (selectedDate <= currentDate) {
        setAlert("Please select a date above the current date.");
      } else {
        setAlert(null); // Clear the alert if date is valid
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await emailjs.sendForm('service_gw5ypqa', 'template_g57vw56', formRef.current!, 'HlMFIQVluZ-Bfo1qv');
      setAlert(`${formData.name} has booked for appointment successfully ✅`);
      setShowMessage(true);
      setBookedName(formData.name); // Update bookedName
      setFormData({
        name: "",
        phone: "",
        email: "",
        date: "",
        time: "",
        area: "",
        city: "",
        message: "",
      });
      setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    } catch (error) {
      setAlert(`${formData.name} has failed to book appointment`);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px] bg-white">
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                id="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="phone" className="mb-3 block text-base font-medium text-[#07074D]">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                required
                id="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label htmlFor="date" className="mb-3 block text-base font-medium text-[#07074D]">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    id="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                  {alert && (
                    <p className="text-red-500 text-sm mt-1">{alert}</p>
                  )}
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label htmlFor="time" className="mb-3 block text-base font-medium text-[#07074D]">
                    Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    required
                    id="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
            </div>
            <div className="mb-5 pt-3">
              <label
                htmlFor="address-details"
                className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl"
              >
                Address Details
              </label>
              <div className="-mx-3 flex flex-wrap">
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="text"
                      name="area"
                      id="area"
                      required
                      placeholder="Enter area"
                      value={formData.area}
                      onChange={handleChange}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      placeholder="Enter city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-5">
              <label htmlFor="message" className="mb-3 block text-base font-semibold text-[#07074D] sm:text-xl">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Please tell us more about your appointment"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-[green] py-3 px-8 text-center text-base font-semibold text-white outline-none hover:bg-orange-500"
            >
              Book Appointment
            </button>
            {showMessage && (
              <div className="text-[green] mt-3">{bookedName} has booked for appointment successfully ✅</div>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AppointmentForm;
