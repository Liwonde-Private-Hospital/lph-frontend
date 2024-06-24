import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: (department: string) => void;
  logout: (redirectUrl?: string, department?: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  loading: false, // Initialize loading state
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // Initialize loading state
  const router = useRouter();

  // Check if any authenticated cookie exists on mount
  useEffect(() => {
    const cookies = parseCookies();
    const departments = Object.keys(cookies).filter((cookie) => cookie.startsWith("isAuthenticated-"));
    setIsAuthenticated(departments.length > 0);
    setLoading(false); // Set loading to false after initial check
  }, []);

  // Perform login and set authentication cookie
  const login = (department: string) => {
    setIsAuthenticated(true);
    setLoading(true); // Set loading to true during login process
    setCookie(null, `isAuthenticated-${department}`, "true", {
      maxAge: 12 * 60 * 60, // 12 hours
      path: "/",
      secure: true, // Only send over HTTPS
      sameSite: "strict",
    });
    setLoading(false); // Set loading to false after login process completes
  };

  // Perform logout and clear authentication state and cookies
  const logout = (redirectUrl: string = "/login", department?: string) => {
    setIsAuthenticated(false);
    setLoading(true); // Set loading to true during logout process
    if (department) {
      destroyCookie(null, `isAuthenticated-${department}`);
    }
    localStorage.clear();
    sessionStorage.clear();
    setLoading(false); // Set loading to false after logout process completes
    router.push(redirectUrl);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
