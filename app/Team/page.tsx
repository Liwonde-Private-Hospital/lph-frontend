'use client'
import Header from "@/componets/navbar";
import Footer from "@/componets/footer";
import { FiPhone } from "react-icons/fi"; // Import phone icon from react-icons/fi

const people = [
  {
    name: "Samson Zarila",
    role: "Full-Stack Developer & Integration Manager",
    imageUrl:
      "https://scontent.fblz2-1.fna.fbcdn.net/v/t39.30808-6/357734201_3397892850525582_1436579738853118720_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeF8fsgODOUfdSmAx5ySDuShbmkLX9Ss_hNuaQtf1Kz-E1TPZ-TfVnYDfd_fOqRAJ9RbZfQCZcadnO8ou14fQ83O&_nc_ohc=sZCRrSQVusgQ7kNvgGuqmql&_nc_zt=23&_nc_ht=scontent.fblz2-1.fna&oh=00_AfBfAgTxbuH9NBr7L5E4N6UbtDS7HzRS_yQyl1uQxYDdXQ&oe=66329846",
    phoneNumber: "+265887261094",
  },
  {
    name: "Crossby Chilikumtima",
    role: "System Analyst, Information System Manager & Developer",
    imageUrl:
      "https://scontent.fblz2-1.fna.fbcdn.net/v/t1.6435-9/74588507_950856858606381_4667126207903432704_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHX6zJjUuTjY9xbRuCj9qQN-F7RHr-g7WP4XtEev6DtY7mRYMLLbr3n-By3jckIF-EaBCPeN4CMEdli-GHerISY&_nc_ohc=X2BHIV7X7pwAb5kxR3F&_nc_ht=scontent.fblz2-1.fna&oh=00_AfDbmiOgA23xMV9Y-Ffdgltmqx_Zdvm9kx9N7wA5FPCu4g&oe=663E568A",
    phoneNumber: "+265886262527",
  },
  {
    name: "Richard Mlambuzi",
    role: "Full-Stack Developer",
    imageUrl:
      "https://scontent.fblz2-1.fna.fbcdn.net/v/t39.30808-6/407865931_1891544774575812_7388651972688331146_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEVVWWq9Q6W8a51Rgki-lOKG9MZ2OyVXNcb0xnY7JVc1yItsfy1G5ijoRIfmzO-LgKGrAAYxWWI18ERXp7rJwBN&_nc_ohc=6PxyiCTVs1sAb51JmjZ&_nc_zt=23&_nc_ht=scontent.fblz2-1.fna&oh=00_AfBr2dk-jOtUh0L3dFGjmP-4KHvoQ8JpzhoZzXXdbh6JHQ&oe=6632C7B9",
    phoneNumber: "", // Add the phone number here
  },
  {
    name: "Tafadzwa Gambiza",
    role: "Front-End Developer",
    imageUrl:
      "https://scontent.fblz2-1.fna.fbcdn.net/v/t39.30808-1/275781291_499955221767178_1356201981530388921_n.jpg?stp=c0.33.200.200a_dst-jpg_p200x200&_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGzRYzJcwdGMT8-HkcmUnNfrVX1sFtR9aGtVfWwW1H1oalouyrnJfGQ1D42I7kotD7A_UaFagsM9WaieEkph92m&_nc_ohc=5aM4nBL_cRIAb7YCoT8&_nc_ht=scontent.fblz2-1.fna&oh=00_AfDDEZIQGYAvJZbD-lDMkAmp88CxctXfQY9SoGFPO13_vg&oe=66345E4C",
    phoneNumber: "", // Add the phone number here
  },
  {
    name: "Peter Kayira",
    role: "UX Designer",
    imageUrl:
      "https://scontent.fblz2-1.fna.fbcdn.net/v/t39.30808-6/425297930_359602856978080_7032392020350021342_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEuthHkmj5czO83-e7v5HrZmhdDChd4SS-aF0MKF3hJL38_AkjJ0PcsBUwYX7tOfNbz5R0Zkhcn6uXuV0Nllbr8&_nc_ohc=cdEEc1bOTAcQ7kNvgEMKXUy&_nc_zt=23&_nc_ht=scontent.fblz2-1.fna&oh=00_AfDnCfA0qrT9WhdGrReBfcF-xeqwH7YxN3t8oCBSm65oFA&oe=6632BBEF",
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
                  <img
                    className="h-16 w-16 rounded-full"
                    src={person.imageUrl}
                    alt=""
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
