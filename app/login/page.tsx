'use client'
import React, { useCallback, useEffect, useState } from "react";
import { Center } from "@chakra-ui/react";
import { useRouter } from "next/navigation";// Adjust the import path as per your project structure
import "./style.css"; // Adjust the import path as per your project structure
import LoginForm from "@/componets/LoginForm";

const Login= () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [departmentId, setDepartmentId] = useState<string | null>(null);

  // Function to handle redirection after successful login
  const redirectToDepartment = useCallback((departmentId: string) => {
    router.push(`/departments/${departmentId}/Dashboard`);
  }, [router]);

  // Check if user is already authenticated on component mount
  useEffect(() => {
    const storedIsAuthenticated = localStorage.getItem("isAuthenticated");
    const storedDepartmentId = localStorage.getItem("departmentId");

    if (storedIsAuthenticated && storedDepartmentId) {
      setIsAuthenticated(true);
      setDepartmentId(storedDepartmentId);
    }
  }, []);

  // Redirect to department dashboard if authenticated
  useEffect(() => {
    if (isAuthenticated && departmentId) {
      redirectToDepartment(departmentId);
    }
  }, [isAuthenticated, departmentId, redirectToDepartment]);

  return (
    <Center h="100vh">
      <div className="login-container">
        {/* Render login form only if not authenticated */}
        {!isAuthenticated && <LoginForm redirectToDepartment={redirectToDepartment} />}
      </div>
    </Center>
  );
};

export default Login;
