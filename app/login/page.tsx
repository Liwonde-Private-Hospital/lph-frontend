"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Center } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { parseCookies } from 'nookies';
import "./style.css";
import LoginForm from "@/componets/LoginForm";

const Login: React.FC = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [departmentId, setDepartmentId] = useState<string | null>(null);

  const redirectToDepartment = useCallback((departmentId: string) => {
    router.push(`/departments/${departmentId}/Dashboard`);
  }, [router]);

  useEffect(() => {
    const cookies = parseCookies();
    const authCookie = Object.keys(cookies).find(key => key.startsWith('isAuthenticated-'));
    if (authCookie) {
      setIsAuthenticated(true);
      setDepartmentId(authCookie.split('-')[1]);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && departmentId) {
      redirectToDepartment(departmentId);
    }
  }, [isAuthenticated, departmentId, redirectToDepartment]);

  return (
    <Center h="100vh">
      <div className="login-container">
        <LoginForm redirectToDepartment={redirectToDepartment} />
      </div>
    </Center>
  );
};

export default Login;
