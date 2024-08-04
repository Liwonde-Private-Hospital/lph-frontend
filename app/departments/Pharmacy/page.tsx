"use client";
import React, { useState, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaTachometerAlt,
  FaShoppingBag,
  FaUserCircle,
  FaCog,
  FaPowerOff,
  FaChevronDown,
  FaChevronRight,
  FaBell,
} from "react-icons/fa";
import Link from "next/link";
import { logout } from "@/actions";
import { LPHStaffRole } from "@/app/enums";

interface AccordionItem {
  title: string;
  link: string;
}

interface AccordionProps {
  title: string;
  icon: React.ReactNode;
  items: AccordionItem[];
}

interface MenuItemProps {
  title: string;
  icon: React.ReactNode;
  link?: string;
  onClick?: () => void;
}

interface SideBarProps {
  children: React.ReactNode;
}

const PharmacySideBar: React.FC<SideBarProps> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogout = async () => {
    await logout(LPHStaffRole.PHARMACY);
  };

  useEffect(() => {
    if (!navigator.onLine) {
      alert("Unable to open report: no internet connection");
    }

    const handleOffline = () => {
      alert("Check your connection and try again later");
    };

    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <div className="flex sticky top-0 items-center justify-between p-4 bg-green-800 text-white">
        <div className="flex items-center">
          <button onClick={openDrawer} className="md:hidden mr-4">
            {isDrawerOpen ? (
              <FaTimes className="h-8 w-8" />
            ) : (
              <FaBars className="h-8 w-8" />
            )}
          </button>
          <h1 className="text-lg font-semibold">
            LIWONDE PRIVATE HOSPITAL DASHBOARD
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative flex items-center cursor-pointer">
            <FaBell className="h-5 w-5" />
            <span className="absolute top-0 right-0 block h-2 w-2 bg-red-600 rounded-full" />
          </div>
          <div className="relative flex items-center cursor-pointer group">
            <FaCog className="h-5 w-5" />
            <div className="absolute top-10 right-0 bg-white shadow-lg rounded-md text-gray-800 hidden group-hover:block">
              <div className="p-2 hover:bg-gray-200 cursor-pointer">
                Profile Settings
              </div>
              <div
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={handleLogout}
              >
                Log Out
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <FaUserCircle className="h-5 w-5" />
            {/* <h3 className="ml-2">{session.fullName}</h3> */}
            {/* <span className="ml-2">{session.role}</span> */}
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-white shadow-md z-30 transform ${
            isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-auto`}
        >
          <div className="h-full flex flex-col">
            <div className="p-4 flex items-center justify-between bg-green-800 text-white">
              <button className="md:hidden" onClick={closeDrawer}>
                <FaTimes className="h-6 w-6" /> Exit
              </button>
            </div>
            <div className="p-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-2.5 h-5 w-5 text-green-500" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              <header className="text-lg font-semibold p-4">
                <Link href="/departments/Pharmacy/Dashboard">
                Pharmacy Dashboard
                </Link>
              </header>
              <nav>
              <Accordion
                  title="Phamarcy Management System"
                  icon={<FaShoppingBag className="h-5 w-5" />}
                  items={[
                    {
                      title: "Stock Drug in Phamarcy",
                      link: "#",
                    },
                    {
                      title: "Sell Drug  in Phamarcy",
                      link: "#",
                    },
                    {
                      title: "Phamarcy Sales History",
                      link: "#",
                    },
                  ]}
                />
                
                <Accordion
                  title="History Management"
                  icon={<FaShoppingBag className="h-5 w-5" />}
                  items={[
                    {
                      title: "Transaction History",
                      link: "/departments/Pharmacy/History",
                    },
                  ]}
                />
                
                <hr className="my-2" />
                <MenuItem
                  title="Record Todays Data"
                  icon={<FaCog className="h-5 w-5" />}
                  link="/departments/Pharmacy/Record"
                />
                <MenuItem
                  title="View Todays Data"
                  icon={<FaCog className="h-5 w-5" />}
                  link="/departments/Pharmacy/ViewData"
                />
                <MenuItem
                  title="Profile"
                  link="#"
                  icon={<FaUserCircle className="h-5 w-5" />}
                />
                <MenuItem
                  title="Log Out"
                  onClick={handleLogout}
                  icon={<FaPowerOff className="h-5 w-5" />}
                />
              </nav>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-4 overflow-y-auto">{children}</div>
      </div>

      {/* Overlay for drawer */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
          onClick={closeDrawer}
        ></div>
      )}
    </div>
  );
};

export default PharmacySideBar;

const Accordion: React.FC<AccordionProps> = ({ title, icon, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`cursor-pointer ${isOpen ? "bg-gray-100" : ""}`}>
      <div
        className="flex items-center p-4 hover:bg-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        {icon}
        <span className="ml-4 flex-1">{title}</span>
        <FaChevronDown
          className={`h-5 w-5 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </div>
      {isOpen && (
        <div className="pl-8">
          {items.map((item, index) => (
            <Link key={index} href={item.link || "/"}>
              <div className="flex items-center p-2 hover:bg-green-200">
                <FaChevronRight className="h-4 w-4" />
                <span className="ml-2">{item.title}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({ title, icon, link, onClick }) => (
  <Link href={link || "/"}>
    <div className="flex items-center p-4 hover:bg-green-200" onClick={onClick}>
      {icon}
      <span className="ml-4">{title}</span>
    </div>
  </Link>
);

