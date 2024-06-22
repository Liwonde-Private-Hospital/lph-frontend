"use client";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const NotFoundPage = () => {
  const [redirectTimer, setRedirectTimer] = useState<NodeJS.Timeout | null>(
    null
  );
  const [redirectDisabled, setRedirectDisabled] = useState(false);
  const redirectDelay = 10000; // Redirect delay in milliseconds

  useEffect(() => {
    if (!redirectDisabled) {
      const timer = setTimeout(() => {
        window.location.href = "/";
      }, redirectDelay);
      setRedirectTimer(timer);
    }

    return () => {
      if (redirectTimer) clearTimeout(redirectTimer);
    };
  }, [redirectDisabled]);

  const handleDisableRedirect = () => {
    setRedirectDisabled(true);
    if (redirectTimer) clearTimeout(redirectTimer);
  };

  const [countdown, setCountdown] = useState(redirectDelay / 1000);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Page Not Found
        </h2>
        <p className="mt-4 text-lg text-center text-gray-600">
          Oops! The page you are looking for does not exist. It might be under
          construction.
        </p>
        <p className="mt-2 text-lg text-center text-green-500">
          Page under construction
        </p>
        <div className="mt-6 flex items-center justify-center space-x-4">
          <Link href={"/"}>
            <Button className="btn-primary">Back to Home</Button>
          </Link>
          <Button onClick={handleDisableRedirect} className="btn-secondary">
            Disable Redirect
          </Button>
        </div>
        <p className="mt-4 text-center text-gray-600">
          Redirecting you to the home page in {countdown} seconds...
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
