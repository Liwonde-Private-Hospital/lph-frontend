import React, { useState } from "react";
import Image from "next/image";
import icon from "../favicon.ico";
import { Button, Spinner } from "@chakra-ui/react";
import { setCookie } from "nookies";
import { LoginFormProps } from "./types";

const defaultApiUrl = "http://localhost:3000/Staff/login";

const LoginForm = ({
  onLoginSuccess,
  redirectToDepartment,
}: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showEnterFieldsMessage, setShowEnterFieldsMessage] = useState(false);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setShowEnterFieldsMessage(false);

    try {
      if (!username || !password) {
        setShowEnterFieldsMessage(true);
        setIsLoading(false);
        return;
      }

      const apiUrls = process.env.API_URLS
        ? process.env.API_URLS.split(",")
        : [defaultApiUrl];
      const userData = await loginUser(apiUrls);

      if (userData) {
        const { data, apiUrl } = userData;
        setCookie(null, "targetDepartment", data.assignedDepartment);
        redirectToDepartment(data.assignedDepartment);
        onLoginSuccess(
          `/pages/departments/${data.assignedDepartment}/Dashboard`
        );
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Login failed. Please check your internet connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const loginUser = async (
    apiUrls: string[],
    index = 0
  ): Promise<{ data: any; apiUrl: string } | null> => {
    if (index >= apiUrls.length) return null;

    try {
      const apiUrl = apiUrls[index];
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.user.roles.includes(data.user.assignedDepartment)) {
          return { data: data.user, apiUrl };
        }
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
    }
return loginUser(apiUrls, index + 1);
  };

  return (
    <div>
      <div className="form mt-30">
        <div className="form-wrapper">
          <div className="header1">
            <div className="flex justify-center align-items-center">
              <Image
                className="block"
                src={icon}
                alt="talking"
                width={100}
                height={100}
                style={{ borderRadius: "10px" }}
              />
            </div>
            <h1 className="align-items-center text-align-center font-size-24 font-weight-bold">
              Staff Login
            </h1>
            <form onSubmit={handleLogin}>
              <label className="name">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label className="name">Password</label>
              <input
                type="password"
                id="password"
                placeholder="*******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showEnterFieldsMessage && (
                <p style={{ color: "red" }}>
                  Please enter both username and password
                </p>
              )}
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              <Button className="button1" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Spinner className="h-6 w-6 bg-color-white text-white-900/50" />
                ) : (
                  "Login"
                )}
                {isLoading && " Please Wait ..."}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
