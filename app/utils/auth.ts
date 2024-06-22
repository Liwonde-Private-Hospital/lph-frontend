
interface User {
    department: string;
  }
  
  export const fetchUser = async (username: string, password: string): Promise<User> => {
    try {
      const response = await fetch('https://lph-backend.onrender.com/Staff/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      const data = await response.json();
      return { department: data.department };
    } catch (error) {
      throw new Error('Login failed');
    }
  };
  