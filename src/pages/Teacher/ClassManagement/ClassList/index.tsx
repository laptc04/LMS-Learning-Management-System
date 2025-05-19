import React, { useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { FaClock, FaCalendarAlt } from "react-icons/fa";
import CreateTopicModal from "./QA/CreateTopicModal";

const QnALayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const tabs = [
    { title: "Tất cả câu hỏi", path: "/teacher/class-management/list/qna", badge: 10 },
    { title: "Đã trả lời", path: "/teacher/class-management/list/qna/answered", badge: 5 },
    { title: "Gần đây nhất", path: "/teacher/class-management/list/qna/recent", badge: 3 },
    { title: "Topics", path: "/teacher/class-management/list/qna/topics", badge: 7 },
  ];

  return (
    <div className="p-4">
      {/* Thanh tab + button bên phải */}
      <div className="flex justify-between items-center pb-2">
        {/* Tabs */}
        <div className="flex space-x-4">
          {tabs.map((tab, index) => {
            const isActive = location.pathname === tab.path;
            return (
              <button
                key={index}
                className={`relative flex items-center px-4 py-2 rounded-md transition-all ${isActive
                    ? "border border-[#823B00] bg-[#FFF9F4] text-black"
                    : "text-[#373839]"
                  }`}
                onClick={() => navigate(tab.path)}
              >
                {tab.title}
                {isActive && tab.badge > 0 && (
                  <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white text-xs font-bold">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Chỉ hiển thị button tạo khi ở trang topics */}
        {location.pathname === "/teacher/class-management/list/qna/topics" && (
          <button
            onClick={() => setIsOpen(true)}
            className="w-auto inline-flex items-center justify-center font-bold transition-all duration-300 px-4 min-w-[90px] h-[36px] text-[16px] rounded-[4px] bg-[#ff7506] text-white border-none hover:bg-[#e06504]"
          >
            Tạo topic mới
          </button>
        )}
      </div>

      {/* CreateTopicModal Modal */}

      <CreateTopicModal isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default QnALayout;