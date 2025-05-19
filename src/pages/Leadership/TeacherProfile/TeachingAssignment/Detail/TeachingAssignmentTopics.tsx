import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiInstance from '../../../../../services/api';
import Pagination from '../../../../../components/Pagination'; // Import Pagination component

const TopicList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [teacherInfo, setTeacherInfo] = useState<{ teacherName: string; subjectName: string; className: string } | null>(null);
  const [topics, setTopics] = useState<{ id: number; title: string; description: string; closeAt: Date }[]>([]);
  const url = new URL(window.location.href);
  const pathSegments = url.pathname.split('/');
  const id = pathSegments[4];

  const fetchDataTopics = async (page = currentPage, pageSize = itemsPerPage) => {
    try {
      const response = await apiInstance.get(
        `api/teachingassignment/topics?TeachingAssignmentId=${id}&pageNumber=${page}&pageSize=${pageSize}`
      );

      if (response.data.status === 0) {
        const items = response.data.data.topicItems.items;

        const mappedTopics = items.map((item: any) => ({
          id: item.topicId, // đổi từ topicId sang id
          title: item.title,
          description: item.description,
          closeAt: new Date(item.closeAt) // chuyển chuỗi ISO sang đối tượng Date
        }));

        setTopics(mappedTopics);
        const data = response.data.data;

        setTeacherInfo({
          teacherName: data.teacherName,
          subjectName: data.subjectName,
          className: data.className
        }); // Lưu thông tin giáo viên vào state
        setTotalPages(response.data.data.topicItems.totalPages);
        // setLoading(false); // nếu bạn đang dùng trạng thái loading
      } else {
        throw new Error(response.data.message || "Lỗi không xác định");
      }
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu:", err);
    }
  };


  useEffect(() => {
    fetchDataTopics(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleLimitChange = (newLimit: number) => {
    setItemsPerPage(newLimit);
    setCurrentPage(1); // reset về trang đầu
  };


  return (
    <div className="px-6 pb-6 w-full mx-auto">
      {/* Nút nằm bên phải, cách bảng */}
      <div className="flex justify-end mt-[-65px] mr-[-15px]">
        <button onClick={() => navigate(`/leadership/teacher/teaching-assignment/${id}`)}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md">Phân công giảng dạy</button>
      </div>

      {/* Tiêu đề + Nút */}
      <div className="flex justify-between items-center mt-6">
        <h2 className="text-xl font-bold">Danh sách chủ đề</h2>
        <div className="flex gap-5">
          <button className="text-orange-500 hover:text-orange-600">
            <img src="/icon/fi_edit.png" alt="Edit" className="w-5 h-5" />
          </button>
          <button className="text-red-500 hover:text-red-600">
            <img src="/icon/fi_trash-orange.png" alt="Delete" className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Thông tin giáo viên */}
      <div className="mt-2 mb-3 text-gray-700 flex items-center gap-8">
        <p>
          <strong>Giảng viên:</strong> {teacherInfo?.teacherName || 'Chưa có thông tin'}
        </p>
        <p>
          <strong>Lớp học:</strong> {teacherInfo?.className || 'Chưa có thông tin'}
        </p>
        <p>
          <strong>Môn học:</strong> {teacherInfo?.subjectName || 'Chưa có thông tin'}
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-100">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-orange-500 text-white">
              <th className="p-2 text-left">Chủ đề</th>
              <th className="p-2 text-left">Miêu tả</th>
              <th className="p-2 text-left">Ngày kết thúc</th>
            </tr>
          </thead>
          <tbody>
            {topics.length > 0 ? (
              topics.map((topic, index) => (
                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                  <td className="p-3">{topic.title}</td>
                  <td className="p-3">{topic.description}</td>
                  <td className="p-3">{new Date(topic.closeAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-3 text-center text-gray-500" colSpan={3}>
                  Chưa có topic nào
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
      {/* Pagination */}
      <Pagination
        limit={itemsPerPage}
        activation={currentPage}
        max={totalPages}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
      />
    </div>
  );
};

export default TopicList;
