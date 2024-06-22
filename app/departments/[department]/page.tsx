'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Ensure you're using 'next/navigation'
import { useAuth } from '@/app/contexts/AuthContext';

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to the {user.department} Dashboard!</h1>
    </div>
  );
};

export default DashboardPage;
 