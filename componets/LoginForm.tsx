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

const LoginForm: React.FC<LoginFormProps> = ({
  redirectToDepartment,
}) => {
  // State variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showEnterFieldsMessage, setShowEnterFieldsMessage] = useState(false);

  // Access authentication context
  const { login } = useAuth();

  // Handle form submission
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setShowEnterFieldsMessage(false);

    try {
      // Validate username and password
      if (!username || !password) {
        setShowEnterFieldsMessage(true);
        throw new Error("Username and password are required.");
      }

      // Send login request
      const response = await fetch("http://localhost:3000/Staff/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      // Handle successful login response
      if (response.ok) {
        const data = await response.json();
        const userRoles = data.user.roles;
        const userDepartment = findUserDepartment(userRoles);
        if (userDepartment) {
          login(userDepartment);
          redirectToDepartment(userDepartment);
        } else {
          throw new Error("User does not have access to assigned department.");
        }
      } else {
        throw new Error("Invalid username or password. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Login failed. Please check your internet connection.");
    } finally {
      setIsLoading(false);
    }
  };

  // Find user's department based on roles
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
            {/* Login form */}
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
              {/* Show message if fields are empty */}
              {showEnterFieldsMessage && (
                <Text color="red" mt="0.5rem">
                  Please enter both username and password
                </Text>
              )}
              {/* Show error message if login fails */}
              {errorMessage && (
                <Text color="red" mt="0.5rem">
                  {errorMessage}
                </Text>
              )}
              {/* Login button with loading state */}
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
