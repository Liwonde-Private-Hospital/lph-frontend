import React, { useState } from "react";
import "./style.css";
import icon from "../images/icon.png";
import Image from "next/image";
import ClipLoader from "react-spinners/ClipLoader";

//const API_URL = "https://lph-backend.onrender.com/Staff/login";

const API_URL = "http://localhost:3000/login";

interface LoginFormProps {
  onLoginSucess: () => void;
  redirectToAdmin: () => void;
  redirectToDepartment: (department: string) => void;
}

export default function LoginForm({
  redirectToAdmin,
  redirectToDepartment,
}: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showEnterFieldsMessage, setShowEnterFieldsMessage] = useState(false);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsloading(true);
    setErrorMessage("");
    setShowEnterFieldsMessage(false);

    try {
      if (!username || !password) {
        setShowEnterFieldsMessage(true);
        return;
      }

      const response = await fetch("http://localhost:3000/Staff/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const apiData = await response.json();
        const userData = apiData.user;

        if (userData.roles.includes("admin")) {
          redirectToAdmin();
        } else if (userData.roles.includes("admin") && userData.assignedDepartment) {
          redirectToDepartment(userData.assignedDepartment);
        } else {
          setErrorMessage("Invalid credentials or insufficient role information");
          alert("Invalid credentials or insufficient role information")
        }
      } else {
        setErrorMessage("Invalid username or password");
        alert("Invalid username or password")
      }
    } catch (error) {
      console.error("Error during login", error);
      setErrorMessage("Login failed. Please check your internet connection");
      alert("Login failed. Please try again")
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="justify-center mt-13 items-center">
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
              <label className="name">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label className="name">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                placeholder="*******"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {showEnterFieldsMessage && (
                <p style={{ color: "red" }}>Please enter both username and password</p>
              )}
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              <button className="button1" type="submit" disabled={isLoading}>
                {isLoading ? <ClipLoader color="#ffffff" loading={isLoading} /> : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
