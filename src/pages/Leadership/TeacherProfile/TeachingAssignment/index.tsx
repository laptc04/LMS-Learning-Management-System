import React from 'react';
import { Routes, Route, useParams, Navigate, Link, useLocation } from 'react-router-dom';
import TeachingAssignmentSidebar from '../../../../components/TeachingAssignmentSidebar';
import TeachingAssignmentDetail from './Detail';
import TopicList from './Detail/TeachingAssignmentTopics';


const TeachingAssignment: React.FC = () => {
  const location = useLocation();
  const isTopicPage = location.pathname.includes('/topic');
  const url = new URL(window.location.href);
  const pathSegments = url.pathname.split('/');
  const id = pathSegments[4];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Nếu KHÔNG phải trang topic thì hiển thị tiêu đề */}
      {!isTopicPage && <h1 className="text-4xl font-bold mt-3 mb-3">Phân công giảng dạy</h1>}

      {/* Nếu là trang topic thì hiển thị Breadcrumb */}
      {isTopicPage && (
        <div className="text-gray-500 text-lg flex items-center space-x-2 mt-3 mb-3">
          <Link to={`/leadership/teacher/teaching-assignment/${id}`} className="text-gray-400 hover:text-gray-600">
            Phân công giảng dạy
          </Link>
          <span className="text-orange-500">{'>'}</span>
          <span className="font-bold text-4xl text-black">Danh sách chủ đề</span>
        </div>
      )}

      <div className="grid grid-cols-4 gap-6 flex-grow">
        <div className="col-span-1 shadow-lg shadow-[#9ACAF5]/25 rounded-lg bg-white">
          <TeachingAssignmentSidebar />
        </div>
        <div className="col-span-3 flex flex-col">
          <div className="shadow-lg shadow-[#9ACAF5]/25 rounded-lg px-6 pb-6 pt-2 mt-16 bg-white flex-1">
            <Routes>
              <Route path="/" element={<Navigate to="1" replace />} />
              <Route path=":id" element={<TeachingAssignmentDetail />} />
              <Route path=":id/topic" element={<TopicList />} />

            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachingAssignment;
