import { useState, useEffect } from 'react';
import Img from '../../../assets/images/datePickerImg/u_calendar-alt.png';
import Detail from './detail';
import { FaPlus, FaEye, FaSearch, FaChevronDown, FaAngleUp, FaAngleDown } from 'react-icons/fa';
import apiInstance from '../../../services/api';
import LoadingSpinner from '../../../components/Loading';

export interface Exam {
  date: string;
  department: number;
  class: string;
  subject: string;
  teacher: string;
  examcontent: string;
  time: string;
  status: 'Chờ phê duyệt' | 'Chưa bắt đầu' | 'Đang diễn ra' | 'Đã tiến hành' | 'Đã hoàn thành';
  check: 'Chờ phê duyệt' | 'Đã hủy' | 'Đã duyệt';
  index?: number;
}

const Exam = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Exam; direction: 'asc' | 'desc' } | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const sortableKeys = ["department", "class", "subject"];

  const formatDateTime = (startDate: string): string => {
    const date = new Date(startDate);
    const daysOfWeek = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${dayOfWeek}, ${day}/${month}/${year}<br>${formattedHours}:${minutes} ${period}`;
  };


  const mapSubjectToVietnamese = (subjectName: string): string => {
    const subjectMap: { [key: string]: string } = {
      "Mathematics": "Toán",
      "Ngữ văn": "Văn",
      "Vật lý": "Lý",
    };
    return subjectMap[subjectName] || subjectName;
  };

  const formatDuration = (duration: string): string => {
    const [hours, minutes] = duration.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    return `${totalMinutes} phút`;
  };

  const mapStatusAndCheck = (statusExam: string): { status: Exam['status'], check: Exam['check'] } => {
    switch (statusExam) {
      case "Đã kết thúc":
        return { status: "Đã hoàn thành", check: "Đã duyệt" };
      case "Đang diễn ra":
        return { status: "Đang diễn ra", check: "Đã duyệt" };
      case "Chờ phê duyệt":
        return { status: "Chưa bắt đầu", check: "Chờ phê duyệt" };
      default:
        return { status: "Chưa bắt đầu", check: "Chờ phê duyệt" };
    }
  };

  const fetchExams = async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      const response = await apiInstance.get(`api/TestExam?pageNumber=${page}&pageSize=${pageSize}`);
      const apiData = response.data.data;

      const mappedExams: Exam[] = apiData.items.map((item: any, index: number) => {
        const { status: mappedStatus, check: mappedCheck } = mapStatusAndCheck(item.statusExam);
        return {
          date: formatDateTime(item.startDate),
          department: parseInt(item.departmentName.replace("Khối ", ""), 10) || 0,
          class: item.classList || "Không xác định",
          subject: mapSubjectToVietnamese(item.subjectName),
          teacher: item.examiner || "Không xác định",
          examcontent: item.name,
          time: formatDuration(item.duration),
          status: mappedStatus,
          check: mappedCheck,
          index,
        };
      });

      setExams(mappedExams);
      setTotalPages(apiData.totalPages);
    } catch (error: any) {
      console.error("Lỗi khi lấy dữ liệu từ API:", error);
      alert("Không thể lấy dữ liệu bài kiểm tra. Vui lòng thử lại sau!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const handleSort = (key: keyof Exam) => {
    if (!sortableKeys.includes(key)) return;
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const filteredData = exams.filter((exam) =>
    Object.values(exam).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig || !sortableKeys.includes(sortConfig.key)) return 0;
    const { key, direction } = sortConfig;
    const valueA = a[key] ?? "";
    const valueB = b[key] ?? "";
    return direction === "asc"
      ? String(valueA).localeCompare(String(valueB))
      : String(valueB).localeCompare(String(valueA));
  });

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newItemsPerPage = Math.min(Number(e.target.value) || 5, 20);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto p-3">
      {/* header */}
      <h1 className="text-2xl md:text-3xl font-bold font-mulish mb-4">Quản lý bài kiểm tra</h1>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <select className="w-full sm:w-32 p-1 border border-black rounded text-sm">
            <option>Tình trạng</option>
            <option>Chờ phê duyệt</option>
            <option>Chưa bắt đầu</option>
            <option>Đã tiến hành</option>
            <option>Đã hoàn thành</option>
          </select>
          <select className="w-full sm:w-32 p-1 border border-black rounded text-sm">
            <option>Chọn lớp</option>
            <option>Không xác định</option>
          </select>
          <select className="w-full sm:w-32 p-1 border border-black rounded text-sm">
            <option>Chọn Khối</option>
            <option>1</option>
            <option>7</option>
            <option>8</option>
          </select>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex items-center gap-1">
              <span className="text-sm">Từ ngày</span>
              <div className="flex items-center w-32 border border-black rounded">
                <input type="text" value="23/10/2020" readOnly className="w-full p-1 bg-transparent text-sm" />
                <img src={Img} alt="calendar" className="w-4 h-4 mx-1" />
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm">Đến ngày</span>
              <div className="flex items-center w-32 border border-black rounded">
                <input type="text" value="23/10/2025" readOnly className="w-full p-1 bg-transparent text-sm" />
                <img src={Img} alt="calendar" className="w-4 h-4 mx-1" />
              </div>
            </div>
          </div>
        </div>
        <button className="flex items-center gap-1 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-sm">
          <FaPlus size={12} />
          <span>Thêm mới</span>
        </button>
      </div>

      {/* chi tiết */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-3">
          <h2 className="text-lg font-semibold font-mulish">Xem chi tiết bài kiểm tra</h2>
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="w-full pl-8 pr-2 py-1 rounded-full bg-gray-100 text-sm italic focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <LoadingSpinner />
          ) : exams.length === 0 ? (
            <p className="text-center">Không có dữ liệu để hiển thị.</p>
          ) : (
            <table className="w-full border-collapse text-sm">
              <thead className="text-white" style={{ background: 'linear-gradient(to right, #f1721f, #ff5400)' }}>
                <tr>
                  <th className="px-3 py-2 text-left font-mulish font-semibold whitespace-nowrap">Ngày làm bài</th>
                  {[
                    { key: 'department', label: 'Khối' },
                    { key: 'class', label: 'Lớp' },
                    { key: 'subject', label: 'Môn học' },
                  ].map(({ key, label }) => (
                    <th
                      key={key}
                      className="px-2 py-2 text-center font-mulish font-semibold cursor-pointer hover:bg-orange-400 whitespace-nowrap"
                      onClick={() => handleSort(key as keyof Exam)}
                    >
                      <span className="flex items-center justify-center">
                        {label}
                        {sortableKeys.includes(key) && (
                          <div className="ml-1 flex flex-col">
                            <FaAngleUp className={`text-xs ${sortConfig?.key === key && sortConfig?.direction === "asc" ? "text-black" : "text-gray-300"}`} />
                            <FaAngleDown className={`text-xs -mt-1 ${sortConfig?.key === key && sortConfig?.direction === "desc" ? "text-black" : "text-gray-300"}`} />
                          </div>
                        )}
                      </span>
                    </th>
                  ))}
                  <th className="px-2 py-2 text-left font-mulish font-semibold whitespace-nowrap">Giảng viên</th>
                  <th className="px-2 py-2 text-left font-mulish font-semibold whitespace-nowrap">Nội dung</th>
                  <th className="px-2 py-2 text-left font-mulish font-semibold whitespace-nowrap">Thời lượng</th>
                  <th className="px-2 py-2 text-left font-mulish font-semibold whitespace-nowrap">Tình trạng</th>
                  <th className="px-2 py-2 text-left font-mulish font-semibold whitespace-nowrap">Phê duyệt</th>
                  <th className="px-2 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((exam, index) => (
                  <tr key={index} className="odd:bg-gray-50 even:bg-white hover:bg-gray-100 transition-colors">
                    <td className="px-3 py-2 text-left font-source-sans whitespace-nowrap">
                      <div dangerouslySetInnerHTML={{ __html: exam.date }} />
                    </td>
                    <td className="px-2 py-2 text-center font-source-sans">{exam.department}</td>
                    <td className="px-2 py-2 text-center font-source-sans">{exam.class}</td>
                    <td className="px-2 py-2 text-left font-source-sans">{exam.subject}</td>
                    <td className="px-2 py-2 text-left font-source-sans">{exam.teacher}</td>
                    <td className="px-2 py-2 text-left font-source-sans">{exam.examcontent}</td>
                    <td className="px-2 py-2 text-left font-source-sans">{exam.time}</td>
                    <td className="px-2 py-2 text-left font-source-sans text-gray-500 italic">{exam.status}</td>
                    <td className="px-2 py-2 text-left font-source-sans">
                      {exam.check === "Chờ phê duyệt" ? (
                        <div className="flex gap-2">
                          <button
                            className="bg-orange-500 text-white px-2 py-1 rounded text-xs hover:bg-orange-600"
                            onClick={() => {
                              setSelectedExam({ ...exam, index });
                              setIsModalOpen(true);
                            }}
                          >
                            Xác nhận
                          </button>
                          <button className="border-2 border-orange-500 text-orange-500 px-2 py-1 rounded text-xs hover:bg-orange-500 hover:text-white">
                            Hủy
                          </button>
                        </div>
                      ) : (
                        <span className={`italic ${exam.check === "Đã duyệt" ? 'text-blue-500' : 'text-gray-500'}`}>
                          {exam.check}
                        </span>
                      )}
                    </td>
                    <td className="px-2 py-2 text-center">
                      <button className="text-orange-500 hover:text-orange-600">
                        <FaEye size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="italic">Hiển thị</span>
            <input
              type="number"
              min={5}
              max={20}
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="w-12 p-1 border border-orange-500 rounded text-center"
            />
            <span className="italic">hàng</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-2 py-1 text-gray-600 hover:bg-gray-200 rounded disabled:opacity-50"
            >
              ❮
            </button>
            {[...Array(totalPages)].map((_, i) =>
              i < 2 || i > totalPages - 3 || Math.abs(i + 1 - currentPage) < 2 ? (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-6 h-6 rounded-full ${currentPage === i + 1 ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                >
                  {i + 1}
                </button>
              ) : (i === 2 && currentPage > 3) || (i === totalPages - 3 && currentPage < totalPages - 2) ? (
                <span key={i}>...</span>
              ) : null
            )}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-2 py-1 text-gray-600 hover:bg-gray-200 rounded disabled:opacity-50"
            >
              ❯
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && selectedExam && (
        <Detail
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          exam={selectedExam}
        />
      )}
    </div>
  );
};

export default Exam;