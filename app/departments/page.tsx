import React from "react";
import Link from "next/link";
import "./Depthome.css";
import Button from "@/components/Button";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
// Sample department data
const departments = [
  {
    id: 1,
    name: "Emergency ",
    imageUrl:
      "https://scontent.fblz1-1.fna.fbcdn.net/v/t39.30808-6/441904465_847624220717672_8516570232742019743_n.jpg?stp=dst-jpg_s600x600&_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeG6DOGZsQ2yvIwOr_ivS_4uORivyQ0j3T45GK_JDSPdPp9VYumlaMzfFEMWumyfkM8rluYyb7Je4rYU9d7Pej1i&_nc_ohc=JdqTCjMTpN4Q7kNvgEbYp7J&_nc_pt=5&_nc_zt=23&_nc_ht=scontent.fblz1-1.fna&oh=00_AYBUmUJ-kByPVxRNGfhlbYTIG8ID4naHJb6FRBV5yIGQJg&oe=664C27CF", // Path to department image
    link: "/Emergency", // Link to department page
  },
  {
    id: 2,
    name: "Finance ",
    imageUrl:
      "https://scontent.fblz1-1.fna.fbcdn.net/v/t39.30808-6/440377891_847631457383615_2637721381328687699_n.jpg?stp=dst-jpg_p180x540&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFISRw81M6EwOva-SP4vO45RE4PjngpxktETg-OeCnGS0-1PHrc0NzGdpa-QYPTlYa4rjOIB8VIf_kT9McLuJ5x&_nc_ohc=MgBlT4LOJGoQ7kNvgE3PDxf&_nc_pt=5&_nc_zt=23&_nc_ht=scontent.fblz1-1.fna&oh=00_AYDQK1umzZTTRg_JtkRKoiYxyja9DWdNtiKBRxCXD9dc1g&oe=664C4183", // Path to department image
    link: "/Financial", // Link to department page
  },
  {
    id: 3,
    name: "Human Resource",
    imageUrl:
      "https://scontent.fblz1-1.fna.fbcdn.net/v/t39.30808-6/436107032_847627544050673_5000592668885043538_n.jpg?stp=dst-jpg_s720x720&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeF4Yv8cG6T27MVMaW-heCCQzMR9vbfPdLbMxH29t890tq1YGSr2lng9zhxPGTBO3eTECPEiwfQgiomnooi5PlU6&_nc_ohc=pEMNVSl9OOoQ7kNvgEC18jq&_nc_pt=5&_nc_zt=23&_nc_ht=scontent.fblz1-1.fna&oh=00_AYCNgM3Afx3IRAfTz4HvbY2z6YvuKbRNNiVg2jRnuPAPMw&oe=664C2D41",
    link: "/Human",
  },
  {
    id: 4,
    name: "Radiology",
    imageUrl:
      "https://scontent.fblz1-1.fna.fbcdn.net/v/t39.30808-6/436202290_847628200717274_157949292653423815_n.jpg?stp=dst-jpg_s720x720&_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHco_MxfHcZLNUaav9qgZZOVHbX0G7Vv99UdtfQbtW_39g7YN_6UgxXVUVQcrjvg1Epu-8k3qf7O9XlZNB-Vu7Y&_nc_ohc=dvtdGi802JQQ7kNvgG5L7K2&_nc_pt=5&_nc_zt=23&_nc_ht=scontent.fblz1-1.fna&oh=00_AYAsLmqYyVrVVLwXewjHY-XVWyVRn0hXfyHvzZa3FmXm5g&oe=664C25C9", // Path to department image
    link: "/IT",
  },
  {
    id: 5,
    name: "Dental ",
    imageUrl:
      "https://scontent.fblz1-1.fna.fbcdn.net/v/t39.30808-6/427997400_847625577384203_4744401276269985497_n.jpg?stp=dst-jpg_s600x600&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeH7OH1YkLC6gZ9tQp3xwYSwCg9SEBQ2vRkKD1IQFDa9GfXEVZygnIHMCJ90ToUnnE7qMs4_-akvek_TBWWt4O0-&_nc_ohc=xP3929H65QQQ7kNvgELnBtI&_nc_pt=5&_nc_zt=23&_nc_ht=scontent.fblz1-1.fna&oh=00_AYAQZ5n0gFX2vyBWK30FTj6_KScyLy8U9bgq5Z0vC1QBWw&oe=664C2D13", // Path to department image
    link: "/Dental", // Link to department page
  },
  {
    id: 6,
    name: "Operating Theatre",
    imageUrl:
      "https://scontent.fblz1-1.fna.fbcdn.net/v/t39.30808-6/441910845_847629340717160_8364228998593965139_n.jpg?stp=dst-jpg_p180x540&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFS5XuaF36ZJwAHoYFQEUk2Qo8keW4AEZhCjyR5bgARmDA2r_JWxAgQpQszKN35V7y7-Rv84vYhuAzrjB0qbQgN&_nc_ohc=nTittOJgu6gQ7kNvgFZkvdG&_nc_pt=5&_nc_zt=23&_nc_ht=scontent.fblz1-1.fna&oh=00_AYCBAUfXQprKii91KAh7NcEXT2s2sTsCrAqmQs61o5yS-Q&oe=664C552E", // Path to department image
    link: "/Emergency", // Link to department page
  },
  {
    id: 7,
    name: "Laborotory ",
    imageUrl:
      "https://scontent.fblz1-1.fna.fbcdn.net/v/t39.30808-6/440300960_847629780717116_606263849914648273_n.jpg?stp=dst-jpg_p180x540&_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeG9MdKUf4cPd7hgnfdeKVdCNzS-DO_TsA03NL4M79OwDZhvbM2km-H5sAM7wLfis3X0AUVsbz1icI23vK5yA1_g&_nc_ohc=zhltqqHAWHMQ7kNvgHx6XnD&_nc_pt=5&_nc_zt=23&_nc_ht=scontent.fblz1-1.fna&oh=00_AYAOwXAGp3BSHaf2lWY9XmRTSt3pUgKRPbrIO8GRzLBheA&oe=664C2151", // Path to department image
    link: "/Laboratory", // Link to department page
  },
];

const DepartmentsPage = () => {
  return (
    <>
      <Navbar />
      <div className="nmt">
        <div className="kudya">
          <h1 id="hex12">Departments</h1>
          <div className="card-kudya">
            {departments.map((department) => (
              <div key={department.id} className="card">
                <img
                  src={department.imageUrl}
                  alt={department.name}
                  className="kuzco"
                />
                <h2 className="denm">{department.name}</h2>
                <Link href={department.link}>
                  <div className="depthc">
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
