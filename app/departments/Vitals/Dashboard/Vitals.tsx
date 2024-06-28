'use client'
import './style.css'; 
import React, { useState } from "react";
import icon from '../../../images/icon.png';
import Image from "next/image";
import LogoutButton from '@/componets/LogoutButton';
const DashboardPage: React.FC = () => {
    const [showProfile, setShowProfile] = useState(false);

    // Function to toggle profile popup visibility for both anchor and button elements
    const toggleProfile = (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>) => {
        event.preventDefault(); // Prevents the default behavior for both <a> and <button>
        setShowProfile(!showProfile);
    };

    return (
        <div>
            <div id="dash">
                <header>Vitals</header>
                <ul>
                    {/* No href attribute, using cursor pointer in CSS */}
                    <li>
                        <a href="#" onClick={toggleProfile}>Profile</a>
                    </li>
                    <li><a href="History">History</a></li>
                    <li>
                        <LogoutButton/>
                    </li>
                </ul>
            </div>
            <div id="table">
                <div>
                    <Image
                        src={icon}
                        alt="alt"
                        width={100}
                        height={100}
                    />
                </div>
                <div id="searchbar">
                    <input
                        type="text"
                        id="searchbar"
                        placeholder="search for patients"
                    />
                </div>
                <div className="button-container">
                    <div>
                        <a href="ViewData">
                            <button className="button2"> Todays Data</button>
                        </a>
                    </div>
                    <div>
                        <a href="Record">
                            <button className="button2">New Day</button>
                        </a>
                    </div>
                </div>
            </div>

            {/* Profile Popup Container */}
            {showProfile && (
                <div className="profile-popup absolute right-0 top-0 mt-2 mr-2 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    <div className="profile-content p-4">
                        <div className="flex justify-center">
                            <div className="rounded-lg overflow-hidden h-32 w-32 mb-4">
                                <img
                                    src="https://scontent-jnb2-1.xx.fbcdn.net/v/t39.30808-6/440377891_847631457383615_2637721381328687699_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=LbaLrq5mlXMQ7kNvgEYJP0J&_nc_ht=scontent-jnb2-1.xx&oh=00_AYA9O63tWIPYEEjJt0aOZcC17fF4VMAVTZjcAJL16fh_2A&oe=6676A9C3"
                                    alt="Profile"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>
                        <h2 className="text-lg font-semibold text-center">User Profile</h2>
                        <p className="text-sm"><span className="font-semibold">Name:</span> John Doe</p>
                        <p className="text-sm"><span className="font-semibold">Age:</span> 30</p>
                        <p className="text-sm"><span className="font-semibold">Position:</span> Doctor</p>
                        <p className="text-sm"><span className="font-semibold">Phone Number:</span> +1234567890</p>
                        <p className="text-sm"><span className="font-semibold">Email:</span> john.doe@example.com</p>
                        <p className="text-sm"><span className="font-semibold">Status:</span> Use Client</p>
                        <button onClick={toggleProfile} className="mt-4 w-full bg-green-800 hover:bg-orange-300 text-black-800 py-1 px-3 rounded-md">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
