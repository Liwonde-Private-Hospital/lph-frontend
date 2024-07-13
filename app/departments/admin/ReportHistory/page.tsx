'use client'
// pages/report-and-dashboard.js
import { useEffect } from 'react';
import Head from 'next/head';

const ReportAndDashboard = () => {
  useEffect(() => {
    // Redirect to the Power BI report URL
    window.location.href = 'https://playground.powerbi.com/sampleReportEmbed';
  }, []);

  return (
    <>
      <Head>
        <title>REPORTS AND DASHBOARD</title>
      </Head>
      <div>
        <h1>Redirecting to the report...</h1>
      </div>
    </>
  );
};

export default ReportAndDashboard;
