"use client";

import LoginForm from "@/app/Finance/Login/LoginForm";
import { useRouter } from "next/navigation";


export default function Login() {
  const router = useRouter();
  const HandleLoginSuccess = () => {
    console.log("Login Successfully");
    alert("Login succesfully")
  };

  const redirectToAdmin = () => {
    router.push("/Martenity/Dashboard");
  };
  const redirectToDepartment = (departmentId: string) => {
    router.push(`/department/${departmentId}`);
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
