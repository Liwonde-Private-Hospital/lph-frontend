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
} from "react-icons/fa";
import Link from "next/link";
import { logout } from "@/actions";
import { LPHStaffRole } from "@/app/enums";

// Define PropTypes or TypeScript types if necessary
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
  link?: string; // `link` is optional in case it's not provided
  onClick?: () => void;
}

export default function DashBoard() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogout = async () => {
    logout(LPHStaffRole.ADMIN);
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
    <div className="flex ">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-green shadow-md z-30 transform bg-green-900  ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-auto`}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 flex items-center justify-between bg-gray-800 text-white">
            <span className="text-lg font-semibold ">SideBar</span>
            <button className="md:hidden" onClick={closeDrawer}>
              <FaTimes className="h-6 w-6 "  /> Exit
            </button>
          </div>
          <div className="p-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-500 " />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <header className="text-lg font-semibold p-4 text-white">
              Admin Dashboard
            </header>
            <nav>
              <Accordion
                title="Staff Management"
                icon={<FaTachometerAlt className="h-5 w-5" />}
                items={[
                  { title: "Add Staff", link: "/departments/admin/AddStaff" },
                  { title: "Delete Staff", link: "/departments/admin/DeleteStaff" },
                ]}
              />
              <Accordion
                title="Report Management"
                icon={<FaShoppingBag className="h-5 w-5" />}
                items={[{ title: "Report History", link: "/departments/admin/ReportHistory" }]}
              />
              <hr className="my-2" />
              <MenuItem
                title="Profile"
                icon={<FaUserCircle className="h-5 w-5" />}
                link="#"
                onClick={() => {}}
              />
              <MenuItem
                title="View Today's Data"
                icon={<FaCog className="h-5 w-5" />}
                link="/departments/admin/ViewData"
                onClick={() => {}}
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

      {/* Hamburger Menu for small screens */}
      <div className="flex justify-between items-center p-4 bg-gray-800 text-white md:hidden w-full">
        <button onClick={openDrawer}>
          {isDrawerOpen ? (
            <FaTimes className="h-8 w-8" />
          ) : (
            <FaBars className="h-8 w-8" />
          )}
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold">REPORTS AND DASHBOARD</h1>
        <div className="flex justify-center">
          <iframe
            src="https://playground.powerbi.com/sampleReportEmbed"
            width="90%"
            height="1000px"
            frameBorder="0"
            allowFullScreen={true}
          ></iframe>
        </div>
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
}

function Accordion({ title, icon, items }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`cursor-pointer ${isOpen ? "bg-gray-100" : ""}`}>
      <div
        className="flex items-center p-4 hover:bg-orange-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        {icon}
        <span className="ml-4 flex-1 text-white font-semibold">{title}</span>
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
              <div className="flex items-center p-2 hover:bg-orange-400">
                <FaChevronRight className="h-4 w-4" />
                <span className="ml-2 ">{item.title}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function MenuItem({ title, icon, link, onClick }: MenuItemProps) {
  return (
    <Link href={link || "/"}>
      <div
        className="flex items-center p-4 hover:bg-orange-500"
        onClick={onClick}
      >
        {icon}
        <span className="ml-4 flex-1 text-white font-semibold">{title}</span>
      </div>
    </Link>
  );
}
