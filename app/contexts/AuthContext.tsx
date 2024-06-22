
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { fetchUser } from '../utils/auth';

interface User {
  department: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { isLoggedIn, department } = parseCookies();
    if (isLoggedIn === 'true' && department) {
      setUser({ department });
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const user = await fetchUser(username, password);
      setUser({ department: user.department });
      setCookie(null, 'isLoggedIn', 'true');
      setCookie(null, 'department', user.department);
      router.push(`/departments/${user.department}/Dashboard`);
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error
    }
  };

  const logout = () => {
    setUser(null);
    destroyCookie(null, 'isLoggedIn');
    destroyCookie(null, 'department');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
