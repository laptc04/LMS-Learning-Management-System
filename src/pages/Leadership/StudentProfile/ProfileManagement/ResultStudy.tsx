import React, { useState } from 'react';
import { FaEdit, FaSearch, FaTrashAlt, FaSort } from 'react-icons/fa';
import ClassInfo from './ProfileStudent';
import Dropdown from '../../../../components/Dropdown';
import { Option } from '../../../../components/Dropdown/type';

interface AccordionProps {
  title: string;
  children?: React.ReactNode;
}

const AccordionStudy: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState('hocky1');
  const yearOptions: Option[] = Array.from({ length: 51 }, (_, i) => {
    const startYear = 2000 + i;
    return {
      id: startYear,
      value: `${startYear} - ${startYear + 1}`, // Chuyển về định dạng "YYYY - YYYY+1"
    };
  });
  const classOptions: Option[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1, // Nếu id cần là number
    value: `12A${i + 1}`,
  }));

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="shadow-sm mb-4 my-5">


      <div>
        <ClassInfo />
      </div>
      <div className="">
        <div
          className={`flex items-center gap-1.5 p-4 rounded-lg cursor-pointer transition-all ${isOpen ? 'bg-orange-600 text-white hover:bg-orange-500' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
          <div className="py-5 px-5 bg-white">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-xl">
                <thead className="bg-[#823B00] text-white ">
                  {/* Hàng tiêu đề lớn chứa 3 học kỳ */}
                  <tr>
                    <th colSpan={3} className="py-3 px-4 text-white text-center text-lg">
                      Học kỳ 1
                    </th>
                    <th colSpan={3} className="py-3 px-4 text-white text-center text-lg">
                      Học kỳ 2
                    </th>
                    <th colSpan={3} className="py-3 px-4 text-white text-center text-lg">
                      Cả năm
                    </th>
                  </tr>
                  {/* Hàng tiêu đề nhỏ chứa từng tiêu chí trong mỗi học kỳ */}
                  <tr className="bg-white text-[#CC5C00] text-center">
                    <th className="py-2 px-4 border">Học lực</th>
                    <th className="py-2 px-4 border">Hạnh kiểm</th>
                    <th className="py-2 px-4 border">Điểm trung bình</th>
                    <th className="py-2 px-4 border">Học lực</th>
                    <th className="py-2 px-4 border">Hạnh kiểm</th>
                    <th className="py-2 px-4 border">Điểm trung bình</th>
                    <th className="py-2 px-4 border">Học lực</th>
                    <th className="py-2 px-4 border">Hạnh kiểm</th>
                    <th className="py-2 px-4 border">Điểm trung bình</th>
                  </tr>
                </thead>
                {/* Hàng dữ liệu phải có 9 cột tương ứng */}
                <tbody className="text-center">
                  <tr className="text-gray-700">
                    <td className="py-2 px-4 border">Khá</td>
                    <td className="py-2 px-4 border">Tốt</td>
                    <td className="py-2 px-4 border">7.7</td>
                    <td className="py-2 px-4 border">Khá</td>
                    <td className="py-2 px-4 border">Tốt</td>
                    <td className="py-2 px-4 border">7.9</td>
                    <td className="py-2 px-4 border text-[#49C510]">Khá</td>
                    <td className="py-2 px-4 border text-[#49C510]">Tốt</td>
                    <td className="py-2 px-4 border text-[#49C510]">7.5</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 overflow-x-auto">
              <div className="flex bg-gray-100 rounded-full p-1 w-64">
                <button
                  onClick={() => setTab('hocky1')}
                  className={`flex-1 py-2 text-center rounded-full transition-all ${tab === 'hocky1' ? 'bg-gray-800 text-white' : 'text-gray-400'}`}
                >
                  Học kỳ I
                </button>
                <button
                  onClick={() => setTab('hocky2')}
                  className={`flex-1 py-2 text-center rounded-full transition-all ${tab === 'hocky2' ? 'bg-gray-800 text-white' : 'text-gray-400'}`}
                >
                  Học kỳ II
                </button>
              </div>

              {/* Nội dung hiển thị bảng điểm */}
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                  <thead className="bg-[#823B00] text-white">
                    <tr>
                      <th className="py-2 px-4 border-b">Môn học</th>
                      <th className="py-2 px-4 border-b">Chuyên cần</th>
                      <th className="py-2 px-4 border-b">Kiểm tra đầu giờ</th>
                      <th className="py-2 px-4 border-b">15 phút</th>
                      <th className="py-2 px-4 border-b">45 phút</th>
                      <th className="py-2 px-4 border-b">Cuối kỳ</th>
                      <th className="py-2 px-4 border-b">Điểm trung bình</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tab === 'hocky1' ? (
                      <>
                        <tr>
                          <td className="py-2 px-4 border-b font-bold">Toán Đại Số</td>
                          <td className="py-2 px-4 border-b">10</td>
                          <td className="py-2 px-4 border-b">10</td>
                          <td className="py-2 px-4 border-b">10</td>
                          <td className="py-2 px-4 border-b">10</td>
                          <td className="py-2 px-4 border-b">10</td>
                          <td className="py-2 px-4 border-b text-[#49C510]">7.0</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border-b font-bold">Tiếng Anh</td>
                          <td className="py-2 px-4 border-b">9</td>
                          <td className="py-2 px-4 border-b">9</td>
                          <td className="py-2 px-4 border-b">9</td>
                          <td className="py-2 px-4 border-b">9</td>
                          <td className="py-2 px-4 border-b">9</td>
                          <td className="py-2 px-4 border-b text-[#49C510]">8.5</td>
                        </tr>
                      </>
                    ) : (
                      <>
                        <tr>
                          <td className="py-2 px-4 border-b font-bold">Toán Hình Học</td>
                          <td className="py-2 px-4 border-b">10</td>
                          <td className="py-2 px-4 border-b">10</td>
                          <td className="py-2 px-4 border-b">10</td>
                          <td className="py-2 px-4 border-b">10</td>
                          <td className="py-2 px-4 border-b">10</td>
                          <td className="py-2 px-4 border-b text-[#49C510]">8.0</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border-b font-bold">Lịch Sử</td>
                          <td className="py-2 px-4 border-b">9</td>
                          <td className="py-2 px-4 border-b">9</td>
                          <td className="py-2 px-4 border-b">9</td>
                          <td className="py-2 px-4 border-b">9</td>
                          <td className="py-2 px-4 border-b">9</td>
                          <td className="py-2 px-4 border-b text-[#49C510]">10.0</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccordionStudy;
