import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavbarProps, MenuItem } from '../../types';

const NavBar = ({ collapsed, setCollapsed }: NavbarProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeSubIndex, setActiveSubIndex] = useState<number | null>(null);

  const menuItems: MenuItem[] = [
    {
      default: '/icon/home-black.png',
      collapsed: '/icon/home-white.png',
      selected: '/icon/home-color.png',
      title: 'Trang chủ',
      link: '/college-and-centre/home',
    },
    {
      default: '/icon/u_book-open-black.png',
      collapsed: '/icon/u_book-open-white.png',
      selected: '/icon/u_book-open-color.png',
      title: 'Các lớp đào tạo',
      link: '#/',
      subMenu: [
        { title: 'Thiết kế web', link: '#/' },
        { title: 'Thể chất', link: '#/' },
        { title: 'Thiết kế 3D', link: '#/' },
        { title: 'Animation', link: '#/' },
        { title: 'Nhạc cụ dân tộc', link: '#/' },
        { title: 'HTML cơ bản', link: '#/' },
        { title: 'Vovinam', link: '#/' },
        { title: 'Ngôn ngữ Nhật', link: '#/' },
      ],
    },
    {
      default: '/icon/u_signin-black.png',
      collapsed: '/icon/u_signin-white.png',
      selected: '/icon/u_signin-color.png',
      title: 'Đăng kí ghi danh',
      link: '/college-and-centre/registration',
    },
    {
      default: '/icon/u_envelope-alt-black.png',
      collapsed: '/icon/u_envelope-alt-white.png',
      selected: '/icon/u_envelope-alt-black.png',
      title: 'Liên hệ',
      link: '/college-and-centre/contact',
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
      className={`text-black flex flex-col transition-all duration-300 ${
        collapsed ? 'bg-[#ff5400] text-white w-24' : 'bg-white text-black w-80'
      } h-screen`}
    >
      <nav className="flex-1 relative">
        {!collapsed && (
          <div className="absolute top-4 right-4 cursor-pointer" onClick={handleCollapseClick}>
            <img src={'/icon/chevron_duo_left.png'} className="w-6 h-6 transition-all duration-300" alt="Collapse" />
          </div>
        )}

        <div className="flex items-center justify-center my-6">
          <img
            src={collapsed ? '/icon/logo-small.png' : '/icon/logo-big.png'}
            alt="logo"
            className={`transition-all duration-300 ${collapsed ? 'w-12' : 'w-20'} h-auto mt-6 mb-10`}
          />
        </div>

        <ul className="flex flex-col mt-4">
          {menuItems.map((item, index) => (
            <li key={index} className="flex flex-col space-y-2 px-4 py-1 rounded-lg transition-all duration-300">
              <div
                className={`flex items-center space-x-4 p-2 cursor-pointer ${
                  activeIndex === index
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
