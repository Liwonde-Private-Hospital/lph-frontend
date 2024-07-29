'use client'
import React, { useEffect } from "react";
import './style.css';
import { logout } from "@/actions";
import { LPHStaffRole } from "@/app/enums";
const Backstore = () => {
    // Replace with actual accessToken, reportId, and groupId
    
    useEffect(() => {
        // Check if the user is online
        if (!navigator.onLine) {
            alert("Unable to open report: no internet connection");
        }

        // Add event listener for when the user goes offline
        const handleOffline = () => {

            alert("check your connection and try again later");
        };

        window.addEventListener('offline', handleOffline);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('offline', handleOffline);
        };
    }, []);
 const handleLogout = async () => {
   logout(LPHStaffRole.ADMIN);
<li>
  <a onClick={handleLogout}>Logout</a>
</li>;
  
 };
    return (
      <div>
        <div id="dash">
          <header>Admin Dashboard</header>
          <ul>
            <li>
              <a href="AddStaff">Add Staff</a>
            </li>
            <li>
              <a href="DeleteStaff">Delete Staff</a>
            </li>
            <li>
              <a href="ReportHistory">New Reports</a>
            </li>
            <li>
              <a href="PowerBIEmbed">Report History</a>
            </li>
            <li>
              <a href="ViewData">View TodaysData</a>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
        <h1 className="mutu">REPORTS AND DASHBOARD</h1>

        <div className="flex justify-center">
          <iframe
            src="https://playground.powerbi.com/sampleReportEmbed"
            width="90%"
            height="1000px"
            frameBorder="0"
            allowFullScreen={true}
          ></iframe>
        </div>

        {/* Place PowerBIEmbed component where you want the report to appear */}
        {/* <PowerBIEmbed */}
        {/* accessToken={accessToken} */}
        {/* reportId={reportId} */}
        {/* groupId={groupId} */}
        {/* /> */}
      </div>
    );
}
export default Backstore;