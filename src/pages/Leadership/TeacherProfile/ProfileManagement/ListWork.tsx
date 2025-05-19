import React, { useState } from 'react';
import Input from '../../../../components/Input';
import { FaEdit, FaSearch, FaTrashAlt, FaChevronCircleDown, FaSort, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import Button from '../../../../components/Button';

interface WorkListProps {
  title: string;
}

const WorkList: React.FC<WorkListProps> = ({ title }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [pageNumber, setPageNumber] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const toggleAccordion = () => setIsOpen(!isOpen);

  const [commendationList, setCommendationList] = useState([
    { id: 1, agency: 'THPT Campus', subject: 'Toán-Tin', start_date: '1/1/2025', end_date: '2/2/2026', position: 'Đại học', format: 'Cử nhân' },
  ]);

  const filteredData = commendationList.filter((item) => item.agency.toLowerCase().includes(keyword.toLowerCase()));

  const totalPages = Math.ceil(filteredData.length / pageNumber);
  const paginatedData = filteredData.slice((currentPage - 1) * pageNumber, currentPage * pageNumber);

  const handleDelete = () => {
    // if (deleteId) {
    //   setCommendationList(commendationList.filter((d) => d.id !== deleteId));
    //   setDeleteId(null);
    // }
  };

  return (
    <div className="rounded-md overflow-hidden">
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
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
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
                onClick={() => navigate('/leadership/teacher/profile/add-word-process')}
                icon={<FaPlus />}
              />
            </div>
            <table className="w-full border-collapse shadow-sm rounded-lg overflow-hidden table-fixed">
              <thead>
                <tr className="bg-[#333] text-white">
                  <th className="p-1 text-center">
                    Cơ sở/đơn vị
                    <FaSort className="ml-2 inline-block" />
                  </th>
                  <th className="p-1 text-left">Chuyên ngành</th>
                  <th className="p-1 text-left">Ngày bắt đầu</th>
                  <th className="p-1 text-left">Ngày kết thúc</th>
                  <th className="p-1 text-left">Văn bảng/chứng chỉ</th>
                  <th className="p-1 text-left">Hình thức</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((item, index) => (
                    <tr key={item.id} className="border-b odd:bg-white even:bg-gray-200">
                      {/* <td className="p-3 text-sm text-center">{(currentPage - 1) * pageNumber + index + 1}</td> */}
                      <td className="p-3 text-sm text-center">{item.agency}</td>
                      <td className="p-3 text-sm text-left">{item.subject}</td>
                      <td className="p-3 text-sm text-left">{item.start_date}</td>
                      <td className="p-3 text-sm text-left">{item.end_date}</td>
                      <td className="p-3 text-sm text-left">{item.position}</td>
                      <td className="p-3 text-sm text-left">{item.format}</td>
                      <td className="p-3 text-sm text-left">
                        <button onClick={() => navigate(`update-commendation/`)} className="text-[#FF7506] hover:text-[#FF7506]">
                          <FaEdit style={styles.action__icon} />
                        </button>
                        <button className="text-[#FF7506] hover:text-[#FF7506] ml-3">
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
    </div>
  );
};

const styles = {
  action__icon: {
    color: '#ff7506',
    fontSize: '20px',
  },
};

export default WorkList;
