"use client";
import React from "react";
import { Center } from "@chakra-ui/react";
import "./style.css";
import LoginForm from "@/componets/LoginForm";
const Login: React.FC = () => {
  return (
    <Center h="100vh">
      <div className="login-container">
        <LoginForm />
      </div>
    </Center>
  );
};

export default Login;
 