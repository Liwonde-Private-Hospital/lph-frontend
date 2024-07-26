import React, { useState } from "react";
import { Button, Spinner, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import Image from "next/image";
import icon from "../public/favicon.ico";
import { LPHStaffRole } from "@/app/enums";
import { useRouter } from "next/navigation";
import { setCookie } from 'nookies';

interface LoginFormProps {
  redirectToDepartment: (departmentId: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ redirectToDepartment }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showEnterFieldsMessage, setShowEnterFieldsMessage] = useState(false);

  const router = useRouter();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setShowEnterFieldsMessage(false);

    if (!username || !password) {
      setShowEnterFieldsMessage(true);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Staff/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.user && data.user.role) {
          const userRoles = Array.isArray(data.user.role) ? data.user.role : [data.user.role];
          const userDepartment = findUserDepartment(userRoles);
          console.log(userDepartment + " accessed");

          if (userDepartment) {
            setCookie(null, `isAuthenticated-${userDepartment}`, 'true', {
              maxAge: 12 * 60 * 60,
              path: '/',
              secure: process.env.NEXT_PUBLIC_IS_SECURE === 'true',
              sameSite: 'strict',
            });

            redirectToDepartment(userDepartment);
          } else {
            throw new Error("User does not have access to assigned department.");
          }
        } else {
          throw new Error("User roles data not found in response.");
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Invalid username or password. Please try again.");
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const findUserDepartment = (userRoles: string[]): string | undefined => {
    return Object.values(LPHStaffRole).find(role => userRoles.includes(role));
  };

  return (
    <div className="form">
      <div className="form-wrapper">
        <div className="header1">
          <div className="logo-container">
            <Image src={icon} alt="icon" width={100} height={100} style={{ borderRadius: "10px" }} />
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
            <Button className="button1" type="submit" isLoading={isLoading} mt={4}>
              {isLoading ? <Spinner size="md" /> : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
