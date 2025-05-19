import React, { useState, useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/index';
import Pagination from '../../../components/Pagination/index';
import FIList from '../../../assets/images/fi_list.png';
import FIEedit from '../../../assets/images/fi_edit.png';
import FITrash2 from '../../../assets/images/fi_trash-2.png';
import UArrowUpDown from '../../../assets/images/fi_trash-2.png';
import UUser from '../../../assets/images/fi_trash-2.png';

interface ExamSchedule {
  id: string;
  semester: string;
  examDate: string;
  courseCode: string;
  subject: string;
  examSession: string;
  status: string;
  studentList: boolean;
  examRoom: string;
}

interface Option {
  id: number;
  value: string;
}

const StudentList: React.FC = () => {
  const [examSchedules, setExamSchedules] = useState<ExamSchedule[]>([
    {
      id: 'EX2020-I',
      semester: 'Học kỳ I',
      examDate: 'Thứ 5, 21/08/2020',
      courseCode: '6',
      subject: 'Toán Đại Số',
      examSession: 'Giữa kỳ',
      status: 'Chờ duyệt',
      studentList: true,
      examRoom: 'GV. Nguyễn Văn A',
    },
    {
      id: 'EX2020-II',
      semester: 'Học kỳ II',
      examDate: 'Thứ 5, 21/08/2020',
      courseCode: '8',
      subject: 'Toán Nâng cao',
      examSession: '45 phút',
      status: 'Chờ duyệt',
      studentList: true,
      examRoom: 'GV. Nguyễn Văn A',
    },
    {
      id: 'EX2020-III',
      semester: 'Học kỳ II',
      examDate: 'Thứ 5, 21/08/2020',
      courseCode: '7',
      subject: 'Toán Nâng cao',
      examSession: 'Cuối kỳ',
      status: 'Chưa bắt đầu',
      studentList: true,
      examRoom: 'GV. Nguyễn Văn A',
    },
    {
      id: 'EX2020-IV',
      semester: 'Học kỳ II',
      examDate: 'Thứ 5, 21/08/2020',
      courseCode: '6',
      subject: 'Toán Đại Số',
      examSession: '45 phút',
      status: 'Đang diễn ra',
      studentList: true,
      examRoom: 'GV. Nguyễn Văn A',
    },
    {
      id: 'EX2020-V',
      semester: 'Học kỳ I',
      examDate: 'Thứ 5, 21/08/2020',
      courseCode: '6',
      subject: 'Toán Đại Số',
      examSession: '45 phút',
      status: 'Đã hoàn thành',
      studentList: true,
      examRoom: 'GV. Nguyễn Văn A',
    },
    {
      id: 'EX2020-VI',
      semester: 'Học kỳ II',
      examDate: 'Thứ 5, 21/08/2020',
      courseCode: '6',
      subject: 'Toán Nâng cao',
      examSession: 'Cuối kỳ',
      status: 'Chưa bắt đầu',
      studentList: true,
      examRoom: 'GV. Nguyễn Văn A',
    },
    {
      id: 'EX2020-VII',
      semester: 'Học kỳ I',
      examDate: 'Thứ 5, 21/08/2020',
      courseCode: '6',
      subject: 'Toán Đại Số',
      examSession: '45 phút',
      status: 'Đã hoàn thành',
      studentList: true,
      examRoom: 'GV. Nguyễn Văn A',
    },
    {
      id: 'EX2020-VIII',
      semester: 'Học kỳ II',
      examDate: 'Thứ 5, 21/08/2020',
      courseCode: '6',
      subject: 'Toán Nâng cao',
      examSession: '45 phút',
      status: 'Chưa bắt đầu',
      studentList: true,
      examRoom: 'GV. Nguyễn Văn A',
    },
    {
      id: 'EX2020-IX',
      semester: 'Học kỳ I',
      examDate: 'Thứ 5, 21/08/2020',
      courseCode: '6',
      subject: 'Toán Đại Số',
      examSession: 'Cuối kỳ',
      status: 'Chờ duyệt',
      studentList: true,
      examRoom: 'GV. Nguyễn Văn A',
    },
    {
      id: 'EX2020-X',
      semester: 'Học kỳ II',
      examDate: 'Thứ 5, 21/08/2020',
      courseCode: '6',
      subject: 'Toán Nâng cao',
      examSession: '45 phút',
      status: 'Chưa bắt đầu',
      studentList: true,
      examRoom: 'GV. Nguyễn Văn A',
    },
  ]);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isConfirming, setIsConfirming] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPages, setItemsPerPage] = useState(5);

  const [isActionDropdownOpen, setIsActionDropdownOpen] = useState<{ [key: string]: boolean }>({});
  const itemsPerPage = 8;
  const navigate = useNavigate();

  const handleDeleteSelected = () => {
    setExamSchedules(examSchedules.filter((schedule) => !selectedIds.includes(schedule.id)));
    setSelectedIds([]);
    setIsConfirming(false);
  };

  const getPaginatedStudents = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return examSchedules.slice(startIndex, endIndex);
  };



  const actionOptions: Option[] = [
    { id: 1, value: 'Chuyển lớp' },
    { id: 2, value: 'Bảo lưu' },
    { id: 3, value: 'Cập nhật miễn giảm' },
    { id: 4, value: 'Cập nhật khen thưởng' },
    { id: 5, value: 'Cập nhật kỷ luật' },
  ];

  return (
    <div className="w-full max-w-[1500px] h-auto bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold font-mulis">Danh sách bài thi</h2>
        <div className="relative max-w-lg w-full">
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="w-full px-3 py-2 text-sm font-normal rounded-3xl pl-10 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-200 italic border border-gray-300"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <FaSearch className="text-gray-400" />
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-white" style={{ background: 'linear-gradient(to right, #F17F21, #FF5400)' }}>
              <th className="px-4 py-2 text-left text-lg w-1/12">
                <div className="flex items-center">
                  <span className="font-mulis">Học kỳ</span>
                  <img src={UArrowUpDown} alt="Sort" className="w-5 h-5 ml-1" />
                </div>
              </th>
              <th className="px-4 py-2 text-left text-lg w-1/12">
                <div className="flex items-center">
                  <span className="font-mulis">Ngày làm bài</span>
                  <img src={UArrowUpDown} alt="Sort" className="w-5 h-5 ml-1" />
                </div>
              </th>
              <th className="px-4 py-2 text-left text-lg w-1/12">
                <div className="flex items-center">
                  <span className="font-mulis">Khoa-Khối</span>
                  <img src={UArrowUpDown} alt="Sort" className="w-5 h-5 ml-1" />
                </div>
              </th>
              <th className="px-4 py-2 text-left text-lg w-1/12">
                <div className="flex items-center">
                  <span className="font-mulis">Môn thi</span>
                  <img src={UArrowUpDown} alt="Sort" className="w-5 h-5 ml-1" />
                </div>
              </th>
              <th className="px-4 py-2 text-left text-lg w-1/12">
                <div className="flex items-center">
                  <span className="font-mulis">Tên kỳ</span>
                  <img src={UArrowUpDown} alt="Sort" className="w-5 h-5 ml-1" />
                </div>
              </th>
              <th className="px-4 py-2 text-left text-lg w-1/12">
                <div className="flex items-center">
                  <span className="font-mulis">Tình trạng</span>
                  <img src={UArrowUpDown} alt="Sort" className="w-5 h-5 ml-1" />
                </div>
              </th>
              <th className="px-4 py-2 text-center text-lg w-1/12">
                <div className="flex items-center justify-center">
                  <span className="font-mulis">Danh sách lớp thi</span>
                  <img src={UArrowUpDown} alt="Sort" className="w-5 h-5 ml-1" />
                </div>
              </th>
              <th className="px-4 py-2 text-left text-lg w-1/12">
                <div className="flex items-center">
                  <span className="font-mulis">Phân công chấm thi</span>
                  <img src={UArrowUpDown} alt="Sort" className="w-5 h-5 ml-1" />
                </div>
              </th>
              <th className="px-4 py-2 text-center text-lg w-1/12">Hành động</th>
            </tr>
          </thead>
        </table>
        <div className="max-h-[307px] overflow-y-auto">
          <table className="w-full border-collapse">
            <tbody>
              {getPaginatedStudents().map((schedule, index) => (
                <tr key={schedule.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                  <td className="px-4 py-3 text-sm font-source-sans w-1/12 text-gray-800">{schedule.semester}</td>
                  <td className="px-4 py-3 text-sm font-source-sans w-1/12 text-gray-800">{schedule.examDate}</td>
                  <td className="px-4 py-3 text-sm font-source-sans w-1/12 text-gray-800">{schedule.courseCode}</td>
                  <td className="px-4 py-3 text-sm font-source-sans w-1/12 text-gray-800">{schedule.subject}</td>
                  <td className="px-4 py-3 text-sm font-source-sans w-1/12 text-gray-800">{schedule.examSession}</td>
                  <td className="px-4 py-3 text-left w-1/12">
                    <span style={{ fontStyle: 'italic', color: '#808080', fontWeight: 300 }}>{schedule.status}</span>
                  </td>
                  <td className="px-4 py-3 text-center  w-1/12">
                    {schedule.studentList && <img src={FIList} alt="Thí sinh" className="w-5 h-5 text-orange-500 ml-10 " />}
                  </td>
                  <td className="px-4 py-3 text-sm font-source-sans w-1/12 text-gray-800">{schedule.examRoom}</td>
                  <td className="px-4 py-3 text-center w-1/12">
                    <button onClick={() => navigate(`/ExamDetail/${schedule.id}`)} className="text-orange-500 hover:text-orange-700 mx-2">
                      <img src={FIList} alt="Xem" className="w-5 h-5" />
                    </button>
                    <div className="relative inline-block">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setIsActionDropdownOpen((prev) => ({ ...prev, [schedule.id]: !prev[schedule.id] }));
                        }}
                        className="text-orange-500 hover:text-orange-700 mx-2"
                      >
                        <img src={FIEedit} alt="Hành động" className="w-5 h-5" />
                      </button>
                      {isActionDropdownOpen[schedule.id] && (
                        <div
                          className="absolute z-50 bg-white rounded-lg shadow-lg p-2"
                          style={{
                            top: '-10px',
                            left: '-200px',
                            width: '200px',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                          }}
                        >
                          {actionOptions.map((option) => (
                            <button
                              key={option.id}

                              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                            >
                              {option.value}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <button onClick={() => setIsConfirming(true)} className="text-orange-500 hover:text-orange-700 mx-2">
                      <img src={FITrash2} alt="Xóa" className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isConfirming && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg" style={{ width: 435 }}>
            <h3 className="text-2xl font-bold text-center">Xóa lịch thi</h3>
            <p className="text-base mt-5 mb-10 font-normal font-source-sans">
              Xác nhận muốn xóa những thông tin đã chọn? Sau khi xóa sẽ không thể hoàn tác.
            </p>
            <div className="flex justify-between w-full px-4 font-bold">
              <Button
                label="Hủy"
                size="medium"
                variant="outline"
                onClick={() => setIsConfirming(false)}
                textColor="#6B7280"
                border="2px solid #6B7280"
                hoverBackgroundColor="rgba(107, 114, 128, 0.1)"
              />
              <Button
                label="Xác nhận"
                size="medium"
                variant="solid"
                onClick={handleDeleteSelected}
                textColor="#ffffff"
                backgroundColor="#FF7506"
                hoverBackgroundColor="#E06504"
              />
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <Pagination
          limit={itemsPerPage}
          activation={currentPage}
          max={Math.ceil(examSchedules.length / itemsPerPage)}
          onPageChange={(page) => setCurrentPage(page)}
          onLimitChange={(limit) => setItemsPerPage(limit)}
        />      </div>
    </div>
  );
};

export default StudentList;
