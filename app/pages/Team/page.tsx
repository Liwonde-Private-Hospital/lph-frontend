"use client";
import Header from "@/components/navbar";
import Footer from "@/components/footer";
import { FiPhone } from "react-icons/fi"; // Import phone icon from react-icons/fi
import Image from "next/image";

const people = [
  {
    name: "Samson Zarila",
    role: "Full-Stack Developer & Integration Manager",
    imageUrl:
      "https://scontent.fblz2-1.fna.fbcdn.net/v/t39.30808-6/346633571_246195788065316_8681281355806901271_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeG9P74UkNA3YEBsjY4TddelCM94POWZrh0Iz3g85ZmuHezvGLcC-sfSLwNkOBIIXnIgBnxJYztkp4Tren-E4XhC&_nc_ohc=Jnq2SEclMWMQ7kNvgHvUVQG&_nc_zt=23&_nc_ht=scontent.fblz2-1.fna&oh=00_AYD83yV2sOAvKAgG0ONuwSq6dLxvGt2a7io1PYR3291mnw&oe=66555EDB",
    phoneNumber: "+265887261094",
  },
  {
    name: "Crossby Chilikumtima",
    role: "System Analyst, Information System Manager & Developer",
    imageUrl:
      "https://scontent.fblz2-1.fna.fbcdn.net/v/t1.6435-9/116582215_1168043260221072_8807594132717734057_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGRPyuOULLsxozsQhDPF8J4856Yrmmrq37znpiuaaurfsBlPmng31j7Ki7-6wNdiovMQA_9thFuXTGq6EtcHdD8&_nc_ohc=L8bj8v_xUQgQ7kNvgFcpqTJ&_nc_ht=scontent.fblz2-1.fna&oh=00_AYCQuXZ_MpjXOlwOeM0DPay7eRdopMpwO2NooRPEMYYqLQ&oe=6676FCEA",
    phoneNumber: "+265886262527",
  },
  {
    name: "Richard Mlambuzi",
    role: "Software Engineer (Senior Level), Full-Stack Developer,Software Architect,UI/UX Designer,Database Administrator ",
    imageUrl:
      "https://scontent.fblz2-1.fna.fbcdn.net/v/t39.30808-6/407865931_1891544774575812_7388651972688331146_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEVVWWq9Q6W8a51Rgki-lOKG9MZ2OyVXNcb0xnY7JVc1yItsfy1G5ijoRIfmzO-LgKGrAAYxWWI18ERXp7rJwBN&_nc_ohc=Bb-VzzA8SLsQ7kNvgGZ-kM6&_nc_zt=23&_nc_ht=scontent.fblz2-1.fna&oh=00_AYBXUVFCBMrHDIqKYeFoTGz-tYCUPexVdRTiH-uIe59mnQ&oe=665546F9",
    phoneNumber: "+265991673436",
  },
  {
    name: "Tafadzwa Gambiza",
    role: "Front-End Developer",
    imageUrl:
      "https://scontent.fblz2-1.fna.fbcdn.net/v/t39.30808-1/275781291_499955221767178_1356201981530388921_n.jpg?stp=c0.33.200.200a_dst-jpg_p200x200&_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGzRYzJcwdGMT8-HkcmUnNfrVX1sFtR9aGtVfWwW1H1oalouyrnJfGQ1D42I7kotD7A_UaFagsM9WaieEkph92m&_nc_ohc=am4J41o-5wYQ7kNvgHEfaCy&_nc_ht=scontent.fblz2-1.fna&oh=00_AYDX2UvT2docdAIE4nQRjEF-TEzD7IOX49Sst7i4Pzh2ZA&oe=665553CC",
    phoneNumber: "", // Add the phone number here
  },
  {
    name: "Peter Kayira",
    role: "UX Designer",
    imageUrl:
      "https://scontent.fblz2-1.fna.fbcdn.net/v/t39.30808-6/425297930_359602856978080_7032392020350021342_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEuthHkmj5czO83-e7v5HrZmhdDChd4SS-aF0MKF3hJL38_AkjJ0PcsBUwYX7tOfNbz5R0Zkhcn6uXuV0Nllbr8&_nc_ohc=tueQzrCfjgwQ7kNvgH3c3WS&_nc_zt=23&_nc_ht=scontent.fblz2-1.fna&oh=00_AYC4VHHPQSUl8CtGk28WRsBZdIidwzacVXZynRWdHEo3wg&oe=6655736F",
    phoneNumber: "", // Add the phone number here
  },
];

export default function Team() {
  const handleCall = (phoneNumber: string) => {
    window.location.href = "tel:" + phoneNumber;
  };

  return (
    <div>
      <Header />
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Meet our Team of Developers
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              If you find our work interesting and amazing please contact us
              through:
              <br />
              {people.map((person, index) => (
                <span key={index}>
                  {person.phoneNumber && (
                    <span>
                      <FiPhone
                        className="inline-block align-middle cursor-pointer"
                        onClick={() => handleCall(person.phoneNumber)}
                      />
                      <span
                        className="ml-1  cursor-pointer"
                        onClick={() => handleCall(person.phoneNumber)}
                      >
                        {person.phoneNumber}
                      </span>
                      <br />
                    </span>
                  )}
                </span>
              ))}
            </p>
          </div>
          <ul
            role="list"
            className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
          >
            {people.map((person) => (
              <li key={person.name}>
                <div className="flex items-center gap-x-6">
                  <Image
                    className="h-16 w-16 rounded-full"
                    src={person.imageUrl}
                    alt=""
                    width={64}
                    height={64}
                  />
                  <div>
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                      {person.name}
                    </h3>
                    <p className="text-sm font-semibold leading-6 text-indigo-600">
                      {person.role}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}
