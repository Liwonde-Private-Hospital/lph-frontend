export interface LoginFormProps {
    onLoginSuccess: (redirectPath: string) => void;
    redirectToDepartment: (departmentId: string) => void;
  }
  