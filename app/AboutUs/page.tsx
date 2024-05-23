
'use client'
import { useState } from 'react';
import Header from "@/componets/navbar";
import Footer from "@/componets/footer";
import NumberAnimation from "../animation";

const AboutUs = () => {
  const [showMessage, setShowMessage] = useState(false);
 
  const handleClickVacancies = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000); // Change 5000 to the desired duration in milliseconds (e.g., 5000 for 5 seconds)
  };
 

  const links = [
    { name: "vacancies", onClick: handleClickVacancies },
    { name: "Take a look at the hospital", href: "More" },
    { name: "Our values", href: "#" },
    { name: "Meet our leadership", href: "Leader" },
  ];

  const stats = [
    { name: "Team Of Staff", value: "25" },
    { name: "Full-time colleagues", value: <NumberAnimation/> },
    { name: "Hours per week", value: "24/7 hours" },
    { name: "Paid time off", value: "Unlimited" },
  ];

  return (
    <>
      <Header />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className="bg-orangeC-400 w-full h-400 justify-center  py-24 sm:py-32"
            style={{
              backgroundImage:
                "url(https://scontent-jnb2-1.xx.fbcdn.net/v/t39.30808-6/435914476_848334057313355_912438519930836672_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=kPmxUW7b0_oQ7kNvgGevVgs&_nc_ht=scontent-jnb2-1.xx&oh=00_AYDC5FND-JQiH9IZjmjxhHgmRmZLPjoYwPfnOQtSQCBXaQ&oe=664D8081)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl sm:text-centre">
              <h1 className="mt-60 text-3xl font-bold tracking-tight text-orange-900 sm:text-4xl padding: text-top">
    About Liwonde Private Hospital
  </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative isolate overflow-hidden bg-green-400 py-24 sm:py-32">
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
        />
        <div
          className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div
          className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
          aria-hidden="true"
        >
          <div
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Work with us
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Liwonde Private Hospital is a private health facility based in
              Malawi, registered with medical council of Malawi under the act
              cap 46: 02 and registration number 47668 .It was opened in 1999
              and it is located in Machinga District, Liwonde Township along
              Balaka-Zomba road in the Southern region of Malawi
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
              {links.map((link) => (
                <a key={link.name} href={link.href} onClick={link.onClick}>
                  {link.name} <span aria-hidden="true">&rarr;</span>
                </a>
              ))}
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.name} className="flex flex-col-reverse">
                  <dt className="text-base leading-7 text-gray-300">
                    {stat.name}
                  </dt>
                  <dd className="text-2xl font-bold leading-9 tracking-tight text-white">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      {/* Red Message */}
      {showMessage && (
        <div className="bg-red-500 text-white py-3 text-center">
          No vacancies currently available
        </div>
      )}
      <Footer />
    </>
  );
}

export default AboutUs;
