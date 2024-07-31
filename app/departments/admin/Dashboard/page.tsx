"use client";
import React from "react";
import SideBar from "../adminLayout";
const DashBoard: React.FC = () => {
  return (
    <SideBar>
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
    </SideBar>
  );
};

export default DashBoard;
