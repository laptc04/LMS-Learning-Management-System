import React, { useEffect, useState } from 'react';
import { FaSearch, FaEdit, FaTrashAlt, FaSort } from 'react-icons/fa';
import Input from '../../../../components/Input';
import HeaderSection from '../component/HeaderSection';
import apiInstance from '../../../../services/api';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../../../components/Toasted';

const classData = [
  { type: 'Môn Căn bản', status: 'Đã vô hiệu hóa', note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam malesuada posuere justo.' },
  { type: 'Môn Nâng cao', status: 'Đang hoạt động', note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { type: 'Môn Tăng cường', status: 'Đang hoạt động', note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam malesuada posuere justo.' },
  { type: 'Môn Phụ đạo', status: 'Đang hoạt động', note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam malesuada posuere justo.' },
  { type: 'Môn Phụ đạo', status: 'Đang hoạt động', note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam malesuada posuere justo.' },
  { type: 'Môn Phụ đạo', status: 'Đang hoạt động', note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam malesuada posuere justo.' },
  { type: 'Môn Phụ đạo', status: 'Đang hoạt động', note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { type: 'Môn Phụ đạo', status: 'Đang hoạt động', note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
];

type SubjectType = {
  id: number;
  name: string;
  status: boolean;
  note: string;
  createAt: string;
  updateAt: string;
  userCreate: number | null;
  userUpdate: number | null;
  isDelete: boolean;
};

function SubjectSetting() {
  const [classData, setClassData] = useState<SubjectType[]>([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchClassTypes = async () => {
    try {
      const response = await apiInstance.get('api/subjecttype');

      const data = response.data?.data?.items;
      console.log('API loại môn học:', data);

      if (Array.isArray(data)) {
        setClassData(data);

      } else {
        setClassData([]); // fallback nếu sai định dạng
        console.warn("Dữ liệu trả về không phải mảng:", data);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API lớp học:", error);
    }
  };
  useEffect(() => {
    fetchClassTypes();
  }, []);

  const filteredClasses = classData.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.ceil(filteredClasses.length / itemsPerPage);
  const displayedClasses = filteredClasses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await apiInstance.delete('api/subjecttype', {
        data: {
          ids: [deleteId],
        },
      });

      console.log('✅ Xoá thành công:', response.data);
      showToast(response.data.message || 'Xóa thành công!', 'success');
      setDeleteId(null);


      fetchClassTypes();
    } catch (error) {
      console.error('❌ Lỗi khi xoá lớp học:', error);
      showToast('Có lỗi xảy ra, vui lòng thử lại!', 'error');

    }
  };
  return (
    <div className="p-6 bg-white shadow-lg rounded-xl border w-full mx-auto">
      {/* Search Bar */}
      <HeaderSection title='Thiết lập môn học' addButtonLink='/leadership/setting/subject-setting/subject-setup' />

      <div className="relative mb-4 flex justify-between items-center">
        <h3 className="font-bold">Danh sách các loại môn học</h3>
        <Input
          type="search"
          placeholder="Tìm kiếm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<FaSearch />}
          background='light grey'
          size="medium"
          borderRadius="16px"
        />
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="px-4 py-2 text-left w-[150px]">
                <div className="flex items-center">
                  <span className="me-2">Loại môn</span>
                  <FaSort />
                </div>
              </th>
              <th className="py-2 px-4 text-left">Trạng thái</th>
              <th className="py-2 px-4 text-left">Ghi chú</th>
              <th className="py-2 px-4 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {displayedClasses.map((c, index) => (
              <tr key={c.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="py-3 px-4">{c.name}</td>
                <td className={`py-3 px-4 italic ${!c.status ? 'text-red-600' : 'text-blue-500'}`}>
                  {c.status ? 'Đang hoạt động' : 'Đã vô hiệu hóa'}
                </td>
                <td className="py-3 px-4 truncate">{c.note}</td>
                <td className="py-3 px-4 text-right space-x-2">
                  <button
                    className="text-orange-500 hover:text-orange-700 transition"
                    onClick={() => navigate(`/leadership/setting/subject-setting/subject-edit/${c.id}`)}
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 transition"
                    onClick={() => setDeleteId(c.id)}
                  >
                    <FaTrashAlt size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg" style={{ width: 435 }}>
            <h3 className="text-2xl font-bold text-center">Xóa môn học</h3>
            <p className="text-base mt-5 mb-10 font-normal">Xác nhận muốn môn học khóa này? Sau khi xoá sẽ không thể hoàn tác.</p>
            <div className="flex justify-between w-full px-4 font-bold">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 rounded-lg w-40 h-14 text-lg" style={{ backgroundColor: '#F2F2F2' }}>
                Hủy
              </button>
              <button onClick={handleDelete} className="bg-orange-500 text-white px-4 py-2 rounded-lg w-40 h-14 text-lg">
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div>
          Hiển thị
          <input
            type="number"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Math.min(Number(e.target.value) || 1, 8))}
            className="p-2 mx-2 border rounded w-16 text-center"
          />
          hàng trong mỗi trang
        </div>
        <div className="flex space-x-2">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
            &#10094;
          </button>
          {[...Array(totalPages)].map((_, i) =>
            i < 2 || i > totalPages - 3 || Math.abs(i + 1 - currentPage) < 2 ? (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 ${currentPage === i + 1 ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-200'} rounded-full`}
              >
                {i + 1}
              </button>
            ) : (i === 2 && currentPage > 3) || (i === totalPages - 3 && currentPage < totalPages - 2) ? (
              <span key={i} className="px-3">
                ...
              </span>
            ) : null,
          )}
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
            &#10095;
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubjectSetting;
