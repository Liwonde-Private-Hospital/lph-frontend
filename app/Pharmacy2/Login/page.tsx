"use client";

import { useRouter } from "next/navigation";
import LoginForm from "./LoginForm";

export default function Login() {
  const router = useRouter();
  const HandleLoginSuccess = () => {
    console.log("Login Successfully");
    alert("Login successfully")
  };

  const redirectToAdmin = () => {
    router.push("/Phamarcy2/Dashboard");
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
