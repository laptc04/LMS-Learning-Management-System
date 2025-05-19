import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import DeletePopup from '../../../../../components/Popup/Delete'; // Import Popup
import apiInstance from '../../../../../services/api';
import Pagination from '../../../../../components/Pagination'; // Import Pagination component
import TeachingAssignmentUpdate from '../Update';

const TeachingAssignmentDetail: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8); // Giá trị mặc định
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isBulkDeletePopupOpen, setIsBulkDeletePopupOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [selectedClasses, setSelectedClasses] = useState<number[]>([]);
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<any>(null);
  const [instructor, setInstructors] = useState<{ classCode: string; classId: number; className: string; startDate: Date; endDate: Date; id: number }[]>([]);

  const fetchDataTeachingAssignment = async (page = currentPage, pageSize = itemsPerPage) => {
    try {
      const response = await apiInstance.get(
        `api/TeachingAssignment/get-all?userId=${id}&pageNumber=${page}&pageSize=${pageSize}`,
      );

      if (response.data.status === 0 && Array.isArray(response.data.data.items)) {
        const transformed = response.data.data.items.map((item: any) => ({
          id: item.id,
          classCode: item.classCode,
          classId: item.classId,
          className: item.className,
          startDate: item.startDate,
          endDate: item.endDate,
        }));

        setInstructors(transformed);
        setCurrentPage(response.data.data.pageNumber);
        setItemsPerPage(response.data.data.pageSize);
        setTotalPages(response.data.data.totalPages);
      } else {
        console.error("Dữ liệu không hợp lệ:", response.data);
      }
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu:", err);
    }
  };

  const DeleteDataTeachingAssignment = async (ids: number[]) => {
    try {
      const response = await apiInstance.delete(`api/TeachingAssignment`, {
        data: {
          ids: ids,
        },
      });

      if (response.data.status === 0) {
        // Xóa thành công, cập nhật lại danh sách
        fetchDataTeachingAssignment(currentPage, itemsPerPage);
      } else {
        console.error("Lỗi khi xóa dữ liệu:", response.data.message);
      }
    } catch (err) {
      console.error("Lỗi khi xóa dữ liệu:", err);
    }
  };

  useEffect(() => {
    // setAssignedClasses(initialClasses.filter((cls) => cls.instructorId === id));
    fetchDataTeachingAssignment(); // Gọi khi component mount
    setItemsPerPage(8); // Reset itemsPerPage
    setCurrentPage(1);
  }, [id]);

  if (!instructor) {
    return <p className="text-red-500">Giảng viên không tồn tại.</p>;
  }

  // Xử lý chọn checkbox
  const handleCheckboxChange = (classId: number) => {
    setSelectedClasses((prev) =>
      prev.includes(classId) ? prev.filter((id) => id !== classId) : [...prev, classId]
    );
  };

  // Xử lý xóa một lớp (Popup riêng)
  const handleDelete = (classId: number) => {
    setSelectedClassId(classId);
    setIsPopupOpen(true);
  };

  const confirmDelete = () => {
    if (selectedClassId) {
      DeleteDataTeachingAssignment([selectedClassId]); // truyền mảng id
    }
    setIsPopupOpen(false);
    setSelectedClassId(null);
  };

  // Xử lý mở popup xóa nhiều lớp
  const handleDeleteSelected = () => {
    if (selectedClasses.length > 0) {
      setIsBulkDeletePopupOpen(true);
    }
  };

  // Xác nhận xóa nhiều lớp
  const confirmBulkDelete = () => {
    if (selectedClasses.length > 0) {
      DeleteDataTeachingAssignment(selectedClasses); // truyền trực tiếp mảng id
    }
    setSelectedClasses([]); // Reset danh sách đã chọn
    setIsBulkDeletePopupOpen(false);
  };

  const handleNavigate = () => {
    navigate(`/leadership/teacher/teaching-assignment/${id}/topic`); // Đường dẫn bạn muốn điều hướng đến
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchDataTeachingAssignment(page, itemsPerPage);
  };

  const handleLimitChange = (limit: number) => {
    setItemsPerPage(limit);
    setCurrentPage(1);
    fetchDataTeachingAssignment(1, limit);
  };

  const handleOpenUpdatePopup = (assignment: any) => {
    setEditingAssignment(assignment); // truyền cả object hoặc chỉ id tuỳ bạn
    setIsUpdatePopupOpen(true);
  };

  return (
    <div className="relative px-4 pb-4 ">
      {/* Tiêu đề */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold font-mulish mb-1">Danh sách phân công giảng dạy</h2>
        <div className="flex items-center gap-2 mt-[-120px]  ">
          <button onClick={handleDeleteSelected} disabled={selectedClasses.length === 0}>
            <img src="/icon/fi_trash-orange.png" alt="Delete" className="w-8 h-8 " />
          </button>
          <span className="h-10 bg-gray-300 w-[1px] mx-1"></span>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center gap-2" onClick={() => handleOpenUpdatePopup(null)}>
            <FaPlus size={14} />
            Thêm mới
          </button>
        </div>
      </div>

      {/* Bảng */}
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full border-collapse border border-gray-200 text-left">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="px-4 py-1"></th>
              <th className="px-4 py-1">Mã lớp</th>
              <th className="px-4 py-1">Tên lớp</th>
              <th className="px-4 py-1">Ngày bắt đầu</th>
              <th className="px-4 py-1">Ngày kết thúc</th>
              <th className="px-4 py-1 text-center">Danh sách chủ đề</th>
              <th className="px-4 py-1 text-center"></th>
            </tr>
          </thead>

          <tbody>
            {instructor.length > 0 ? (
              instructor.map((cls) => (
                <tr key={cls.id} className="odd:bg-white even:bg-gray-100">
                  <td className="px-4 py-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      {/* Checkbox ẩn */}
                      <input
                        type="checkbox"
                        className="hidden"
                        onChange={() => handleCheckboxChange(cls.id)}
                        checked={selectedClasses.includes(cls.id)}
                      />
                      {/* Ô checkbox */}
                      <div
                        className={`w-6 h-6 border-2 rounded-md transition-all duration-200  ${selectedClasses.includes(cls.id) ? 'bg-blue-500 border-blue-500 ' : 'border-blue-500 bg-white'
                          }`}
                      >
                        {selectedClasses.includes(cls.id) && (
                          <svg className="w-[18px] h-[18px] text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 18" fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M20.707 5.293a1 1 0 010 1.414l-10 10a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L10 14.586l9.293-9.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </label>
                  </td>
                  <td className="px-4 py-3">{cls.classCode}</td>
                  <td className="px-4 py-3">{cls.className}</td>
                  <td className="px-4 py-3">{new Date(cls.startDate).toLocaleDateString()}</td>
                  <td className="px-4 py-3">{new Date(cls.endDate).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={handleNavigate} className="text-orange-500 hover:text-orange-600">
                      <img src="/icon/u_list.Danhsachchude.png" alt="Navigate" className="w-7 h-7 " />
                    </button>
                  </td>
                  <td className="px-4 py-5 text-center flex justify-center gap-4">
                    <button
                      className="text-orange-500 hover:text-orange-600"
                      onClick={() => handleOpenUpdatePopup(cls)} // truyền assignment cần update
                    >
                      <img src="/icon/fi_edit.png" alt="Update" className="w-6 h-6" />
                    </button>

                    <button className="text-red-500 hover:text-red-600" onClick={() => handleDelete(cls.id)}>
                      <img src="/icon/fi_trash-orange.png" alt="Delete" className="w-6 h-6 " />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-3 text-center text-gray-500">
                  Không có lớp nào được phân công.
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

      {
        isUpdatePopupOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black  bg-opacity-50">
            <TeachingAssignmentUpdate onClose={() => setIsUpdatePopupOpen(false)} />
          </div>
        )
      }

      {/* Popup xác nhận xóa một lớp */}
      <DeletePopup
        isOpen={isPopupOpen}
        onCancel={() => setIsPopupOpen(false)}
        onConfirm={confirmDelete}
        title="Xóa phân công"
        text="Xác nhận muốn xoá phân công này và toàn bộ thông tin bên trong? Sau khi xoá sẽ không thể hoàn tác."
      />

      {/* Popup xác nhận xóa nhiều lớp */}
      <DeletePopup
        isOpen={isBulkDeletePopupOpen}
        onCancel={() => setIsBulkDeletePopupOpen(false)}
        onConfirm={confirmBulkDelete}
        title="Xóa phân công"
        text="Xác nhận muốn xoá phân công này và toàn bộ thông tin bên trong? Sau khi xoá sẽ không thể hoàn tác."
      />
    </div >
  );
};

export default TeachingAssignmentDetail;
