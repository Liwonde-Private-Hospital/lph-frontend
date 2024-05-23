"use client";

import LoginForm from "@/app/Pharmacy2/Login/LoginForm";
import { useRouter } from "next/navigation";


export default function Login() {
  const router = useRouter();
  const HandleLoginSuccess = () => {
    console.log("Login Successfully");
    alert("login successfully")
  };

  const redirectToAdmin = () => {
    router.push("/Reception/Dashboard");
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
