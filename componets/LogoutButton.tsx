// components/LogoutButton.tsx
import React from "react";
import { Button } from "@chakra-ui/react";
import { destroyCookie, parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext"; // Adjust the path as per your project structure
import  "../app/login/style.css"; // Assuming you have a CSS module for styling

const LogoutButton: React.FC = () => {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    destroyCookie(null, "targetDepartment");

    // Clear localStorage or sessionStorage if used
    localStorage.clear();
    sessionStorage.clear();

    // Perform logout action from AuthContext
    logout("/login"); // Redirect to login page after logout

    // Ensure that router is used
    router.push("/login"); // Example usage to resolve TypeScript error
  };

  return (
    <>
      {parseCookies(null).targetDepartment && (
        <Button  className="button1" type="button" mt={4} onClick={handleLogout}>
          Logout
        </Button>
      )}
    </>
  );
};

export default LogoutButton;
