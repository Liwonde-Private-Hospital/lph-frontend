"use client";
import React, { useState } from "react";
import {
  Button,
  Spinner,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import icon from "../public/favicon.ico";
import { LPHStaffRole } from "@/app/enums";
import { login } from "@/actions";
import Link from "next/link";
import { toast } from "react-toastify";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showEnterFieldsMessage, setShowEnterFieldsMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setShowEnterFieldsMessage(false);
    setErrorMessage(null);
  
    if (!username || !password) {
      setShowEnterFieldsMessage(true);
      setIsLoading(false);
      return;
    }
  
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/Staff/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
  
      if (!response.ok) {
        // Check if the response is in JSON format
        let errorMessage = "Login failed. Please check your credentials.";
        if (response.headers.get("content-type")?.includes("application/json")) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } else {
          // If the response is plain text
          errorMessage = await response.text();
        }
        throw new Error(errorMessage);
      }
  
      const data = await response.json();
      const userRoles = Array.isArray(data.user?.role)
        ? data.user.role
        : [data.user?.role];
      const userDepartment = findUserDepartment(userRoles);
      const fullName = `${data.user.firstName} ${data.user.lastName}`;
      
      if (userDepartment) {
        login(fullName, userDepartment);
      } else {
        const deptError = "User does not have access to the assigned department.";
        toast.error(deptError);
        throw new Error(deptError);
      }
    } catch (error) {
      // Display user-friendly error message
      setErrorMessage(
        (error as Error).message
      );
      toast.error((error as Error).message);
      setIsLoading(false); // Set isLoading to false here
    }
  };

  
  const findUserDepartment = (userRoles: string[]): string | undefined => {
    return Object.values(LPHStaffRole).find((role) => userRoles.includes(role));
  };

  return (
    <div className="form">
      <div className="form-wrapper">
        <div className="header1">
          <Link href="/">
            <div className="logo-container mt-2">
              <Image
                src={icon}
                alt="icon"
                width={100}
                height={100}
                style={{ borderRadius: "10px" }}
              />
            </div>
          </Link>
          <h1>Staff Login Portal</h1>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                type="text"
                id="username"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                type="password"
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            {showEnterFieldsMessage && (
              <Text color="red" mt="0.5rem">
                Please enter both username and password.
              </Text>
            )}
            {errorMessage && (
              <Text color="red" mt="0.5rem">
                {errorMessage}
              </Text>
            )}
            <Button
              type="submit"
              isLoading={isLoading}
              mt={4}
              className="px-6 py-3 w-full bg-green-500 hover:bg-green-400 text-white font-bold rounded"
            >
              {isLoading ? <Spinner size="md" /> : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
