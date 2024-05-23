"use client";

import { useRouter } from "next/navigation";
import LoginForm from "./Loginform";

export default function Login() {
  const router = useRouter();
  const HandleLoginSuccess = () => {
    console.log("Login Successfully");
    alert("login successfully")
  };

  const redirectToAdmin = () => {
    router.push("/Lab/Dashboard");
  };
  const redirectToDepartment = (departmentId: string) => {
    router.push(`/${departmentId}`);
  };

  return (
    <div>
      <LoginForm
        onLoginSucess={HandleLoginSuccess}
        redirectToAdmin={redirectToAdmin}
        redirectToDepartment={redirectToDepartment}
      />
    </div>
  );
}
