import React, { useState } from 'react';
import Input from '../../../../components/Input';
import { FaEdit, FaSearch, FaTrashAlt, FaChevronCircleDown } from 'react-icons/fa';
import { useNavigate } from 'react-router';

interface CommendationProps {
  title: string;
}

const CommendationList: React.FC<CommendationProps> = ({ title }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [pageNumber, setPageNumber] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const toggleAccordion = () => setIsOpen(!isOpen);

  const [commendationList, setCommendationList] = useState([
    { id: '1', commendationList: 'Học sinh giỏi cấp trường', regulation: 'HSG.png', time: '27/02/2025' },
    { id: '2', commendationList: 'Học sinh giỏi cấp trường', regulation: 'HSG.png', time: '27/02/2025' },
  ]);

  const filteredData = commendationList.filter((item) => item.commendationList.toLowerCase().includes(keyword.toLowerCase()));

  const totalPages = Math.ceil(filteredData.length / pageNumber);
  const paginatedData = filteredData.slice((currentPage - 1) * pageNumber, currentPage * pageNumber);

  const handleDelete = () => {
    if (deleteId) {
      setCommendationList(commendationList.filter((d) => d.id !== deleteId));
      setDeleteId(null);
    }
  };

  return (
    <div className="border rounded-md overflow-hidden mb-4">
      <div
        className={`flex items-center gap-1.5 p-4 rounded-lg cursor-pointer transition-all ${
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
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Tìm kiếm"
              background="light grey"
              icon={<FaSearch />}
              borderRadius="24px"
            />
          </div>
          <table className="w-full border-collapse shadow-sm rounded-lg overflow-hidden table-fixed">
            <thead>
              <tr className="bg-[#333] text-white">
                <th className="p-1 text-center">STT</th>
                <th className="p-1 text-left">Nội dung khen thưởng</th>
                <th className="p-1 text-left">Quy định khen thưởng</th>
                <th className="p-1 text-left">Ngày quyết định</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                  <tr key={item.id} className="border-b odd:bg-white even:bg-gray-200">
                    <td className="p-3 text-sm text-center">{(currentPage - 1) * pageNumber + index + 1}</td>
                    <td className="p-3 text-sm text-left">{item.commendationList}</td>
                    <td className="p-3 text-sm text-left">{item.regulation}</td>
                    <td className="p-3 text-sm text-left">{item.time}</td>
                    <td className="p-3 text-sm text-left">
                      <button onClick={() => navigate(`update-commendation/`)} className="text-[#FF7506] hover:text-[#FF7506]">
                        <FaEdit style={styles.action__icon} />
                      </button>
                      <button onClick={() => setDeleteId(item.id)} className="text-[#FF7506] hover:text-[#FF7506] ml-3">
                        <FaTrashAlt style={styles.action__icon} />
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

          {deleteId && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-2xl font-bold text-center">Xóa khen thưởng</h3>
                <p className="text-base mt-5 mb-10 text-center">Xác nhận muốn xoá khen thưởng này? Sau khi xoá sẽ không thể hoàn tác.</p>
                <div className="flex justify-between px-4">
                  <button onClick={() => setDeleteId(null)} className="px-4 py-2 rounded-lg bg-gray-200 w-24">
                    Hủy
                  </button>
                  <button onClick={handleDelete} className="px-4 py-2 rounded-lg bg-red-500 text-white w-24">
                    Xác nhận
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  action__icon: {
    color: '#ff7506',
    fontSize: '20px',
  },
};

export default CommendationList;
