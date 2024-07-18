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
import icon from "../favicon.ico";
import { LPHStaffRole } from "@/app/enums";
import { useAuth } from "@/app/context/AuthContext";

interface LoginFormProps {
  redirectToDepartment: (departmentId: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ redirectToDepartment }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showEnterFieldsMessage, setShowEnterFieldsMessage] = useState(false);

  const { login } = useAuth();
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setShowEnterFieldsMessage(false);
  
    try {
      if (!username || !password) {
        setShowEnterFieldsMessage(true);
        throw new Error("Username and password are required.");
      }
  
      const api = "http://localhost:3000/Staff/login";
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
  
      if (response.ok) {
        const data = await response.json();
        console.log('Login data:', data);
        
        if (data.user && data.user.roles) {
          const userRoles = data.user.roles;
          const userDepartment = findUserDepartment(userRoles);
          if (userDepartment) {
            login(userDepartment);
            redirectToDepartment(userDepartment);
          } else {
            throw new Error("User does not have access to assigned department.");
          }
        } else {
          throw new Error("User roles data not found in response.");
        }
      } else {
        // Check if response is JSON
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          console.log('Error data:', errorData);
          throw new Error(errorData.message || "Invalid username or password. Please try again.");
        } else {
          // Handle non-JSON response (like HTML)
          throw new Error("Unable to connect to Server . Please try again later.");
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  

  const findUserDepartment = (userRoles: string[]) => {
    const departmentRoles = Object.values(LPHStaffRole).filter(
      (role) => typeof role === "string"
    );

    return departmentRoles.find((role) => userRoles.includes(role));
  };

  return (
    <div>
      <div className="form">
        <div className="form-wrapper">
          <div className="header1">
            <div className="logo-container">
              <Image
                className="center"
                src={icon}
                alt="talking"
                width={100}
                height={100}
                style={{ borderRadius: "10px" }}
              />
            </div>
            <h1>Staff Login Portal</h1>
            <form onSubmit={handleLogin}>
              <FormControl isRequired>
                <FormLabel className="name">Username</FormLabel>
                <Input
                  type="text"
                  id="username"
                  className="input"
                  placeholder="Your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired mt={4}>
                <FormLabel className="name">Password</FormLabel>
                <Input
                  type="password"
                  id="password"
                  className="input"
                  placeholder="*******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              {showEnterFieldsMessage && (
                <Text color="red" mt="0.5rem">
                  Please enter both username and password
                </Text>
              )}
              {errorMessage && (
                <Text color="red" mt="0.5rem">
                  {errorMessage}
                </Text>
              )}
              <Button
                className="button1"
                type="submit"
                isLoading={isLoading}
                mt={4}
              >
                {isLoading ? <Spinner size="sm" /> : "Login"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
