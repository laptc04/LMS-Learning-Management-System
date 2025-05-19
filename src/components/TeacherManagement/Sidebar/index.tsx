import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';

const ClassManagementLayout: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedTab, setSelectedTab] = useState('general');
    const isQnaTab = location.pathname.includes('/qna');

    return (
        <div className="p-4">
            <div className="text-gray-500 text-lg flex items-center space-x-2 mt-3 mb-3">
                <Link to="/leadership/teacher/teaching-assignment/" className="text-gray-400 hover:text-gray-600">
                    Thông tin lớp học
                </Link>
                <span className="text-orange-500">{'>'}</span>

                <Link to="/leadership/teacher/teaching-assignment/" className="text-gray-400 hover:text-gray-600">
                    Toán đại số
                </Link>
                <span className="text-orange-500">{'>'}</span>
                <span className="font-bold text-4xl text-black">Hỏi đáp</span>
            </div>

            <div className="bg-[#F2F2F2] inline-flex rounded-3xl p-2">
                <button
                    className={`px-4 py-2 transition-all rounded-3xl ${!isQnaTab ? 'bg-[#373839] text-white' : 'bg-transparent text-gray-800'
                        }`}
                    onClick={() => navigate('/teacher/class-management/list')}
                >
                    Thông tin lớp học
                </button>
                <button
                    className={`px-4 py-2 transition-all rounded-3xl ${isQnaTab ? 'bg-[#373839] text-white' : 'bg-transparent text-gray-800'
                        }`}
                    onClick={() => navigate('/teacher/class-management/list/qna')}
                >
                    Hỏi đáp Q & A
                </button>
            </div>
            <div className="mt-4">
                <Outlet />
            </div>
        </div>
    );
};

export default ClassManagementLayout;
