import React from "react";
import { Button } from "@chakra-ui/react";
import { destroyCookie } from "nookies";
import { useRouter } from "next/navigation";

const LogoutButton: React.FC = () => {
  const router = useRouter();
  const handleLogout = () => {
    destroyCookie(null, 'isAuthenticated-admin');
    destroyCookie(null, 'isAuthenticated-Backstore');
    destroyCookie(null, 'isAuthenticated-Dental');
    destroyCookie(null, 'isAuthenticated-Finance');
    destroyCookie(null, 'isAuthenticated-Lab');
    destroyCookie(null, 'isAuthenticated-Maternity');
    destroyCookie(null, 'isAuthenticated-OPD');
    destroyCookie(null, 'isAuthenticated-pharmacist');
    destroyCookie(null, 'isAuthenticated-Reception');
    destroyCookie(null, 'isAuthenticated-Vitals');
    destroyCookie(null, 'isAuthenticated-X-Ray');
    
    router.push('/login');
  };

  return (
    <Button className="button1" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
