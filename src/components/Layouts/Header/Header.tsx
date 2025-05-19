import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import {
  getCookie, deleteCookie
} from 'cookies-next'; // Import từ 'cookies-next'
import apiInstance from '../../../services/api';

const Header: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();

  // Lấy thông tin người dùng từ cookie khi component được mount
  useEffect(() => {
    const storedUsername = getCookie('fullname'); // Giả sử bạn đã lưu username vào cookie khi đăng nhập
    if (storedUsername) {
      setUsername(storedUsername as string);
    }
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = async () => {
    try {
      await apiInstance.post('api/auth/logout', {}, { withCredentials: true });
      deleteCookie('AccessToken');
      deleteCookie('RefreshToken');
      deleteCookie('user_role');
      deleteCookie('fullname');
      window.location.reload();
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
      alert('Error during logout. Please try again.');
    }
  };



  return (
    <header className="flex items-center justify-end bg-white w-full h-[72px]">
      {username ? (
        <div className="flex items-center gap-4">
          <FontAwesomeIcon icon={faCircleUser} className="text-[#FF7506] -mr-2 w-10 h-10" />
          <span className="text-[#FF5400] text-[16px] font-bold tracking-[0.24px] mt-[26px] mb-[26px] font-source-sans">{username}</span>
          <div className="w-[1.2px] h-10 bg-[#823b00]"></div>
          <button
            className="text-[#373839] opacity-50 text-[16px] font-normal tracking-[0.24px] mt-[25px] mb-[27px] mr-[64px] font-source-sans"
            onClick={handleLogout}
          >
            Đăng xuất
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-[#FF7506] text-[16px] font-bold tracking-[0.24px] underline underline-offset-4 mt-[26px] mb-[26px] font-source-sans"
            onClick={handleLogin}
          >
            Đăng nhập
          </Link>
          <div className="w-[1.2px] h-10 bg-[#823b00]"></div>
          <button
            className="text-[#FF7506] text-[16px] font-normal tracking-[0.24px] underline underline-offset-4 mt-[25px] mb-[27px] mr-[64px] font-source-sans"
          // onClick={handleRegister}
          >
            Đăng ký
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
