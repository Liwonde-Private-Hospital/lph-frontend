'use client'
import React from "react";
import './style.css';
import PowerBIEmbed from "../PowerBIEmbed/page";

export default function Backstore() {
    // Replace with actual accessToken, reportId, and groupId
    const accessToken = "";
    const reportId = "";
    const groupId = "";

    return (
        <div>
            <div id="dash">
                <header>Admin Dashboard</header>
                <ul>
                    <li><a href="AddStaff">Add Staff</a></li>
                    <li><a href="DeleteStaff">Delete Staff</a></li>
                    <li><a href="PowerBIEmbed">New Reports</a></li>
                    <li><a href="">Report History</a></li>
             
                </ul>
            </div>

            <h1>REPORTS AND DASHBOARD</h1>

            {/* Place PowerBIEmbed component where you want the report to appear */}
            <PowerBIEmbed
                accessToken={accessToken}
                reportId={reportId}
                groupId={groupId}
            />
        </div>
    );
}