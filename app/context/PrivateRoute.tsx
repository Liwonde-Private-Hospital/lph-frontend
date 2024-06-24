import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useAuth } from "./AuthContext";
import { Center, Spinner } from "@chakra-ui/react";

interface PrivateRouteProps {
  children: React.ReactNode;
  department: string;
  redirectPath?: string; // Optional redirect path on failure
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  department,
  redirectPath = "/login",
}) => {
  const { isAuthenticated, loading } = useAuth(); // Access isAuthenticated and loading from AuthContext
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false); // Local state to manage authorization status

  useEffect(() => {
    const cookies = parseCookies();
    const isDepartmentAuthenticated = cookies[`isAuthenticated-${department}`] === "true";

    if (!isDepartmentAuthenticated) {
      // If not authorized for the department, set authorization state to false and redirect
      setIsAuthorized(false);
      router.push(redirectPath);
    } else {
      // If authorized for the department, set authorization state to true
      setIsAuthorized(true);
    }
  }, [isAuthenticated, department, router, redirectPath]);

  // Memoized content based on authorization status and loading state
  const content = useMemo(() => {
    if (loading) {
      // Display spinner while loading authentication status
      return (
        <Center>
          <Spinner size="xl" />
        </Center>
      );
    }
    return isAuthorized ? children : <p>Unauthorized</p>; // Display children if authorized, else show "Unauthorized"
  }, [children, isAuthorized, loading]);

  return <>{content}</>;
};

export default PrivateRoute;
