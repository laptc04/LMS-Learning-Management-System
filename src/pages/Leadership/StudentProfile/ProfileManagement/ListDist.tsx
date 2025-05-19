import React, { useState } from 'react';
import Input from '../../../../components/Input';
import { FaEdit, FaSearch, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router';

interface AccordionProps {
  title: string;
  children?: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Dữ liệu mẫu cho bảng
  const [data, setData] = useState([
    { id: 1, content: 'Học sinh giỏi', file: 'abc.pdf', date: '9/9/2025' },
    { id: 2, content: 'Học sinh khá', file: 'abc.pdf', date: '9/9/2025' },
    { id: 3, content: 'Học sinh trung bình', file: 'abc.pdf', date: '9/9/2025' },
  ]);

  // Lọc dữ liệu dựa trên searchQuery
  const filteredData = data.filter((item) => item.content.toLowerCase().includes(searchQuery.toLowerCase()));

  // Hàm xóa dữ liệu
  const handleDelete = () => {
    if (deleteId !== null) {
      setData((prevData) => prevData.filter((item) => item.id !== deleteId));
      setDeleteId(null);
    }
  };

  return (
    <div className="border rounded-md overflow-hidden mb-4">
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
          <div className="flex justify-end items-center mb-4">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm"
              background="light grey"
              icon={<FaSearch />}
              borderRadius="24px"
            />
          </div>

          {/* Bảng dữ liệu */}
          <table className="w-full border-collapse shadow-sm rounded-lg overflow-hidden table-fixed">
            <thead>
              <tr className="text-white bg-gray-800">
                <th className="px-6 py-3 text-lg text-center w-[170px]">STT</th>
                <th className="px-6 py-3 text-lg text-center w-[170px]">Nội dung kỷ luật</th>
                <th className="px-6 py-3 text-lg text-center w-[170px]">Quyết định kỷ luật</th>
                <th className="px-6 py-3 text-lg text-center w-[170px]">Ngày quyết định</th>
                <th className="px-6 py-3 text-lg text-center w-[170px]"></th>
              </tr>
            </thead>
            <tbody className="font-normal">
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                    <td className="px-6 py-3 text-center w-[170px]">{item.id}</td>
                    <td className="px-6 py-3 text-center w-[170px]">{item.content}</td>
                    <td className="px-6 py-3 text-center w-[170px]">{item.file}</td>
                    <td className="px-6 py-3 text-center w-[170px]">{item.date}</td>
                    <td className="px-6 py-3 text-center w-[170px] flex justify-center gap-3">
                      <button onClick={() => navigate(`edit/`)} className="text-[#FF7506] hover:text-[#FF7506]">
                        <FaEdit />
                      </button>
                      <button onClick={() => setDeleteId(item.id)} className="text-[#FF7506] hover:text-[#FF7506]">
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="text-center">
                  <td colSpan={5} className="p-3">
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
  );
};

export default Accordion;
