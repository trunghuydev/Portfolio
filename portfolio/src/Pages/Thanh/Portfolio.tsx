// pages/PortfolioThanh.tsx
import React from 'react';

import Footer from '@/Components/Footer/Footer';

import { useAutoLogin } from '../Login/Hook/useAutoLogin';
import { useAuthStore } from '@/Store/auth';
import ProfileContainer from '@/Components/Profile/hook/ProfileContainer';

const PortfolioThanh: React.FC = () => {
  const username = 'trungthanh';
  const password = '123456789';

  useAutoLogin(username, password);

  const accessToken = useAuthStore((state) => state.accessToken);

  if (!accessToken) return <p>Bạn chưa đăng nhập.</p>;

  return (
    <>
      <main className="scroll-smooth">
        <ProfileContainer accessToken={accessToken} />
        <Footer />
      </main>
    </>
  );
};

export default PortfolioThanh;
