import React from "react";
import { Button } from "@chakra-ui/react";
import { destroyCookie } from "nookies";
import { useRouter } from "next/navigation";

const AdminLogoutButton: React.FC = () => {
  const router = useRouter();
  const handleLogout = () => {
    destroyCookie(null, 'isAuthenticated-admin');
    router.push('/login');
  };

  return (
    <Button className="button1" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default AdminLogoutButton;
