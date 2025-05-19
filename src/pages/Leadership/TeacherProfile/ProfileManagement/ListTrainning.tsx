import React, { useState } from 'react';
import Input from '../../../../components/Input';
import { FaEdit, FaSearch, FaTrashAlt, FaSort, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { Filter } from 'lucide-react';
import Button from '../../../../components/Button';

interface AccordionProps {
  title: string;
  children?: React.ReactNode;
}

const AccordionTrainning: React.FC<AccordionProps> = ({ title, children }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Dữ liệu mẫu cho bảng
  const [data, setData] = useState([
    { id: 1, agency: 'THPT Campus', subject: 'Toán - Tin', position: 'Giảng viên', start_date: '1/1/2025', end_date: '2/2/2026' },
    { id: 2, agency: 'ĐH Khoa Học', subject: 'Vật lý', position: 'Trợ giảng', start_date: '3/3/2024', end_date: '4/4/2025' },
    { id: 3, agency: 'CĐ Công Nghệ', subject: 'CNTT', position: 'Giảng viên', start_date: '5/5/2023', end_date: '6/6/2024' },
    { id: 4, agency: 'Trung tâm A', subject: 'Tiếng Anh', position: 'Giáo viên', start_date: '7/7/2022', end_date: '8/8/2023' },
    { id: 5, agency: 'THCS XYZ', subject: 'Hóa học', position: 'Giáo viên', start_date: '9/9/2021', end_date: '10/10/2022' },
  ]);

  // Lọc dữ liệu dựa trên searchQuery
  const filteredData = data.filter((item) => item.agency.toLowerCase().includes(searchQuery.toLowerCase()));

  // Hàm xóa dữ liệu
  const handleDelete = () => {
    if (deleteId !== null) {
      setData((prevData) => prevData.filter((item) => item.id !== deleteId));
      setDeleteId(null);
    }
  };
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const handleSort = (key: keyof (typeof data)[0]) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig?.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    setData((prevData) =>
      [...prevData].sort((a, b) => {
        if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
        return 0;
      }),
    );
  };

  return (
    <div className=" rounded-md overflow-hidden">
      <div className="px-5">
        <div
          className={`flex items-center gap-2 p-4 rounded-lg cursor-pointer transition-all ${
            isOpen ? 'bg-orange-600 text-white hover:bg-orange-500' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Icon mũi tên */}
          <svg
            className={`w-4 h-4 transition-transform transform ${isOpen ? 'rotate-90' : 'rotate-0'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>

          {/* Tiêu đề */}
          <h3 className="font-semibold">{title}</h3>
        </div>

        {isOpen && (
          <div className="p-4 bg-white">
            <div className="flex justify-between items-center mb-4">
              {/* Input tìm kiếm ở bên trái */}
              <div className="flex-grow max-w-md">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm"
                  background="light grey"
                  icon={<FaSearch />}
                  borderRadius="24px"
                />
              </div>

              {/* Button ở bên phải */}
              <Button
                label="Thêm"
                textColor="white"
                backgroundColor="#FF7506"
                size="medium"
                variant="none"
                onClick={() => navigate('/leadership/teacher/profile/add-training')}
                icon={<FaPlus />}
              />
            </div>

            {/* Bảng dữ liệu */}
            <table className="w-full border-collapse shadow-sm rounded-lg overflow-hidden table-fixed">
              <thead>
                <tr className="text-white bg-gray-800">
                  <th className="px-6 py-3 text-lg text-center w-[170px] cursor-pointer" onClick={() => handleSort('agency')}>
                    Cơ quan/Đơn vị
                    <FaSort className="ml-2 inline-block" />
                  </th>
                  <th className="px-6 py-3 text-lg text-center w-[170px] cursor-pointer" onClick={() => handleSort('subject')}>
                    Tổ/Bộ môn
                    <FaSort className="ml-2 inline-block" />
                  </th>
                  <th className="px-6 py-3 text-lg text-center w-[170px] cursor-pointer" onClick={() => handleSort('position')}>
                    Chức vụ
                    <FaSort className="ml-2 inline-block" />
                  </th>
                  <th className="px-6 py-3 text-lg text-center w-[170px] cursor-pointer" onClick={() => handleSort('start_date')}>
                    Ngày bắt đầu
                    <FaSort className="ml-2 inline-block" />
                  </th>
                  <th className="px-6 py-3 text-lg text-center w-[170px] cursor-pointer" onClick={() => handleSort('end_date')}>
                    Ngày kết thúc
                    <FaSort className="ml-2 inline-block" />
                  </th>
                  <th className="px-6 py-3 text-lg text-center w-[170px]">Thao tác</th>
                </tr>
              </thead>
              <tbody className="font-normal">
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                      <td className="px-6 py-3 text-center w-[170px]">{item.agency}</td>
                      <td className="px-6 py-3 text-center w-[170px]">{item.subject}</td>
                      <td className="px-6 py-3 text-center w-[170px]">{item.position}</td>
                      <td className="px-6 py-3 text-center w-[170px]">{item.start_date}</td>
                      <td className="px-6 py-3 text-center w-[170px]">{item.end_date}</td>
                      <td className="px-6 py-3 text-center w-[170px] flex justify-center gap-3">
                        <button onClick={() => navigate(`edit/${item.id}`)} className="text-[#FF7506] hover:text-[#FF4500]">
                          <FaEdit />
                        </button>
                        <button onClick={() => setDeleteId(item.id)} className="text-[#FF7506] hover:text-[#FF4500]">
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="text-center">
                    <td colSpan={6} className="p-3">
                      Không có dữ liệu
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Modal xác nhận xóa */}
            {deleteId !== null && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-[435px]">
                  <h3 className="text-2xl font-bold text-center">Xóa kỷ luật</h3>
                  <p className="text-base mt-5 mb-10 text-center">Xác nhận muốn xoá kỷ luật này? Sau khi xoá sẽ không thể hoàn tác.</p>
                  <div className="flex justify-between w-full px-4 font-bold">
                    <button onClick={() => setDeleteId(null)} className="px-4 py-2 rounded-lg w-40 h-14 text-lg bg-gray-200">
                      Hủy
                    </button>
                    <button onClick={handleDelete} className="bg-orange-500 text-white px-4 py-2 rounded-lg w-40 h-14 text-lg">
                      Xác nhận
                    </button>
                  </div>
                </div>
              </div>
            )}
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccordionTrainning;
