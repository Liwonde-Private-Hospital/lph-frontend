"use client";
import { useRouter } from "next/navigation";
import LoginForm from "./Loginform";
import './style.css'
export default function Login() {
  const router = useRouter();
  const HandleLoginSuccess = () => {
    console.log("Login Successfully");
    alert("login successfully")
  };

  const redirectToAdmin = () => {
    router.push("/Finance/Dashboard");
  };
  const redirectToDepartment = (departmentId: string) => {
    router.push(`/departments/${departmentId}/Dashboard`);
  };

  return (
    <div>
      <LoginForm
        onLoginSuccess={HandleLoginSuccess}
        redirectToDepartment={redirectToDepartment}
      />
    </div>
  );
}
