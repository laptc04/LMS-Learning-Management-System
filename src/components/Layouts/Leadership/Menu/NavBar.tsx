import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavbarProps, MenuItem } from '../../types';

const NavBar = ({ collapsed, setCollapsed }: NavbarProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeSubIndex, setActiveSubIndex] = useState<number | null>(null);

  const menuItems: MenuItem[] = [
    {
      default: '/icon/fi_eye_black.png',
      collapsed: '/icon/fi_eye_white.png',
      selected: '/icon/fi_eye_color.png',
      title: 'Tổng quan',
      link: '/',
    },
    {
      default: '/icon/u_chart-line_black.png',
      collapsed: '/icon/u_chart-line_white.png',
      selected: '/icon/u_chart-line_color.png',
      title: 'Khai báo dữ liệu',
      link: '/leadership/data-declaration',
    },
    {
      default: '/icon/u_users-alt-black.png',
      collapsed: '/icon/u_users-alt-white.png',
      selected: '/icon/u_users-alt-color.png',
      title: 'Hồ sơ học viên',
      link: '/leadership/student/profile/',
      subMenu: [
        { title: 'Tất cả hồ sơ', link: '/leadership/student/profile/' },
        { title: 'Tiếp nhận chuyển trường', link: '/leadership/student/transfer-school/' },
        { title: 'Bảo lưu', link: '/leadership/student/study-suspension/' },
      ],
    },
    {
      default: '/icon/u_bag-black.png',
      collapsed: '/icon/u_bag-white.png',
      selected: '/icon/u_bag-color.png',
      title: 'Hồ sơ giảng viên',
      link: '/leadership/teacher/profile',
      subMenu: [
        { title: 'Tất cả hồ sơ', link: '/leadership/teacher/list-teacher' },
        { title: 'Phân công giảng dạy', link: '/leadership/teacher/teaching-assignment' },
      ],
    },
    {
      default: '/icon/u_book-open-black.png',
      collapsed: '/icon/u_book-open-white.png',
      selected: '/icon/u_book-open-color.png',
      title: 'Thi cử',
      link: '/leadership/exam',
    },
    {
      default: '/icon/fi_settings-black.png',
      collapsed: '/icon/fi_settings-white.png',
      selected: '/icon/fi_settings-color.png',
      title: 'Cài đặt hệ thống',
      link: '/leadership/setting/',
    },
  ];

  const handleMenuClick = (index: number) => {
    if (activeIndex === index) {
      setCollapsed(!collapsed);
    } else {
      setActiveIndex(index);
      setActiveSubIndex(null);
      setCollapsed(false);
    }
  };

  const handleSubMenuClick = (subIndex: number) => {
    setActiveSubIndex(subIndex);
  };

  const handleCollapseClick = () => {
    setCollapsed(true);
  };

  return (
    <div
      className={`text-black flex flex-col transition-all duration-300 ${collapsed ? 'bg-[#ff5400] text-white w-24' : 'bg-white text-black w-80'}`}
    >
      <nav className="flex-1 relative">
        {!collapsed && (
          <div className="absolute top-4 right-4 cursor-pointer" onClick={handleCollapseClick}>
            <img src={'/icon/chevron_duo_left.png'} className="w-6 h-6 transition-all duration-300" alt="Collapse" />
          </div>
        )}

        <div className="flex items-center justify-center my-6">
          <img
            src={collapsed ? '/images/auth/logo-small.png' : '/images/auth/logo-big.png'}
            alt="logo"
            className={`transition-all duration-300 ${collapsed ? 'w-12' : 'w-20'} h-auto mt-6 mb-10`}
          />
        </div>

        <ul className="flex flex-col mt-4">
          {menuItems.map((item, index) => (
            <li key={index} className="flex flex-col space-y-2 px-4 py-1 rounded-lg transition-all duration-300">
              <div
                className={`flex items-center space-x-4 p-2 cursor-pointer ${activeIndex === index
                    ? collapsed
                      ? 'bg-[#f3bc84] rounded-lg border-r-4 border-[#ff5400]'
                      : 'bg-gray-200 rounded-lg border-r-4 border-[#ff5400]'
                    : collapsed
                      ? 'hover:bg-[#f3bc84] hover:rounded-lg hover:border-r-4 hover:border-[#ff5400]'
                      : 'hover:bg-gray-100 hover:rounded-lg hover:border-r-4 hover:border-[#ff5400]'
                  }`}
                onClick={handleMenuClick.bind(this, index)}
              >
                <Link to={item.link} className={`flex items-center space-x-4 w-30 h-30 p-2 transition-all duration-300 ${collapsed ? '' : ''}`}>
                  <img
                    src={activeIndex === index ? item.selected : collapsed ? item.collapsed : item.default}
                    alt={`${item.title} icon`}
                    className={`w-${collapsed ? '6' : '6'} h-${collapsed ? '6' : '6'} transition-all duration-300`}
                  />
                  {!collapsed && (
                    <span className={`text-sm font-medium transition-all duration-300 ${activeIndex === index ? 'text-[#ff5400]' : 'text-black'}`}>
                      {item.title}
                    </span>
                  )}
                </Link>
              </div>

              {item.subMenu && activeIndex === index && !collapsed && (
                <ul className="ml-6 space-y-2 mt-2">
                  {item.subMenu.map((subItem, subIndex) => (
                    <li
                      key={subIndex}
                      className={`py-1 text-sm cursor-pointer ${activeSubIndex === subIndex ? 'text-[#ff5400]' : 'text-black'} hover:text-[#ff5400]`}
                      onClick={handleSubMenuClick.bind(this, subIndex)}
                    >
                      <Link to={subItem.link} className="w-full">
                        <span>{subItem.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
