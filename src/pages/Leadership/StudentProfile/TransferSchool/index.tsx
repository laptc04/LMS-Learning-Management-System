import { useState, useEffect } from 'react';
import Dropdown from '../../../../components/Dropdown';
import { Link } from 'react-router-dom';
import { FaPlus, FaEye, FaAngleDown, FaAngleUp, FaSearch } from 'react-icons/fa';
import AddTransferSchool from './Edit';
import apiInstance from '../../../../services/api';
import Pagination from '../../../../components/Pagination';
import { Student, Semester, AcademicYear, Option } from './type';


const TransferSchool = () => {
  const [loading, setLoading] = useState(true); // Quản lý tình trạng loading
  const [students, setStudents] = useState<Student[]>([]);
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>([]);
  const [selectedAcademicId, setSelectedAcademicId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfigs, setSortConfigs] = useState<{ [key in keyof Student]?: 'asc' | 'desc' }>({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalStudents, setTotalStudents] = useState(0);


  const fetchDataSchoolTransfer = async (
    page = currentPage,
    pageSize = itemsPerPage,
    search = searchTerm,
    academicId = selectedAcademicId
  ) => {
    try {
      const academicIdParam = academicId || (academicYears.length > 0 ? academicYears[0].id : 5);

      const response = await apiInstance.get(
        `api/SchoolTransfer?academicId=${academicIdParam}&PageNumber=${page}&PageSize=${pageSize}&isOrder=true&column=1&searchItem=${search}`
      );

      if (response.data.status === 0) {
        setStudents(response.data.data);
        setTotalPages(response.data.totalPages || Math.ceil(response.data.totalCount / pageSize));
        setTotalStudents(response.data.totalCount || response.data.data.length);
      } else {
        throw new Error(response.data.message || "Lỗi không xác định");
      }
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu:", err);
    }
  };

  const fetchDataAcademicYear = async () => {
    try {
      const response = await apiInstance.get(
        `api/AcademicYear`
      );

      if (response.data.status === 0) {
        const years = response.data.data.items;
        setAcademicYears(years);
        setLoading(false); // Đánh dấu là đã tải xong

        if (years.length > 0 && !selectedAcademicId) {
          setSelectedAcademicId(years[0].id);
        }
      } else {
        throw new Error(response.data.message || "Lỗi không xác định");
      }
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu:", err);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchDataAcademicYear();
  }, []);

  // Fetch students when any of these parameters change
  useEffect(() => {
    setLoading(false); // Đánh dấu là đã tải xong
    if (selectedAcademicId) {
      fetchDataSchoolTransfer(currentPage, itemsPerPage, searchTerm, selectedAcademicId);
    }
  }, [currentPage, itemsPerPage, searchTerm, selectedAcademicId]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (limit: number) => {
    setItemsPerPage(limit);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleSort = (key: keyof Student) => {
    setSortConfigs((prev) => ({
      ...prev,
      [key]: prev[key] === 'asc' ? 'desc' : 'asc',
    }));
  };

  // Handle academic year selection - updated to match the Dropdown component's Option interface
  const handleAcademicYearChange = (option: Option) => {
    // Convert option.id to number if it's a string
    const academicId = typeof option.id === 'string' ? parseInt(option.id, 10) : option.id;
    setSelectedAcademicId(academicId);
    setCurrentPage(1); // Reset to first page when changing academic year
  };

  // Filter students based on search term
  const filteredStudents = students.filter((student) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      student.userCode.toLowerCase().includes(searchTermLower) ||
      student.fullName.toLowerCase().includes(searchTermLower) ||
      (student.transferFrom && student.transferFrom.toLowerCase().includes(searchTermLower)) ||
      student.departmentName.toLowerCase().includes(searchTermLower)
    );
  });

  const dropdownOptions = academicYears.map((year) => ({
    id: year.id,
    value: `${new Date(year.startDate).getFullYear()} - ${new Date(year.endDate).getFullYear()}`,
  }));

  return (
    <div className="px-5">
      {/* Title section */}
      <div className="flex items-center space-x-5 mb-9">
        <Link to="/leadership/student/profile" className="text-gray-300 text-[18px] font-mulish font-semibold hover:text-gray-500">
          Hồ sơ học viên
        </Link>
        <span className="text-orange-500 font-mulish text-2xl">{'>'}</span>
        <h1 className="text-[40px] font-bold font-mulish">Tiếp nhận chuyển trường</h1>
      </div>

      {/* Dropdown + Button */}
      <div className="flex justify-between items-center mb-6">
        {/* Dropdown with onChange handler */}
        <Dropdown
          options={dropdownOptions}
          selectedId={selectedAcademicId || '5'}
          onChange={handleAcademicYearChange}
        />

        {/* Add new button */}
        <button className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-md" onClick={() => setIsPopupOpen(true)}>
          <FaPlus size={14} />
          <span>Thêm mới</span>
        </button>
        {isPopupOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={() => setIsPopupOpen(false)}
          >
            <div
              className="bg-white rounded-lg shadow-lg w-[800px] max-h-[100vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <AddTransferSchool />
            </div>
          </div>
        )}
      </div>
      <div className="bg-white shadow-[0px_0px_2px_rgba(0,0,0,0.15)] rounded-lg px-10">
        <div className="flex justify-between items-center py-2">
          <h1 className="text-22px font-mulish font-600">Danh sách chuyển trường</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm mã học viên, tên học viên"
              className="pl-12 pr-4 py-2 rounded-3xl bg-gray-100 w-[350px] focus:outline-none text-sm font-normal italic"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" size={20} />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full border-collapse border border-gray-200">
            {/* Header */}
            <thead className="bg-orange-500 text-white">
              <tr>
                {[
                  { key: 'userCode', label: 'Mã học viên' },
                  { key: 'fullName', label: 'Tên học viên' },
                  { key: 'birthDate', label: 'Ngày sinh' },
                  { key: 'gender', label: 'Giới tính' },
                  { key: 'transferFrom', label: 'Chuyển từ' },
                  { key: 'semester', label: 'Học kỳ chuyển' },
                  { key: 'departmentName', label: 'Khối' },
                  { key: 'transferDate', label: 'Ngày chuyển' },
                ].map(({ key, label }) => (
                  <th
                    key={key}
                    className="px-4 py-2 text-left whitespace-nowrap cursor-pointer font-mulish font-[550]"
                    onClick={() => handleSort(key as keyof Student)}
                  >
                    <span className="flex items-center">
                      {label}
                      <div className="ml-1 flex flex-col">
                        <FaAngleUp
                          className={`cursor-pointer text-xs ${sortConfigs[key as keyof Student] === 'asc' ? 'text-black' : 'text-gray-300'}`}
                        />
                        <FaAngleDown
                          className={`cursor-pointer text-xs -mt-1 ${sortConfigs[key as keyof Student] === 'desc' ? 'text-black' : 'text-gray-300'}`}
                        />
                      </div>
                    </span>
                  </th>
                ))}
                <th className="px-4 py-2 font-normal text-left"></th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center px-4 py-2 font-source-sans">
                    Không có dữ liệu
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.userCode} className="odd:bg-gray-100 even:bg-white">
                    <td className="px-4 py-2 text-left font-source-sans">{student.userCode || 'Không có dữ liệu'}</td>
                    <td className="px-4 py-2 text-left font-source-sans">{student.fullName || 'Không có dữ liệu'}</td>
                    <td className="px-4 py-2 text-left font-source-sans">
                      {student.birthDate ? new Date(student.birthDate).toLocaleDateString('en-GB') : 'Không có dữ liệu'}
                    </td>
                    <td className="px-4 py-2 text-left font-source-sans">{student.gender ? 'Nam' : 'Nữ'}</td>
                    <td className="px-4 py-2 text-left font-source-sans">
                      {student.transferFrom || 'Không có dữ liệu'}
                    </td>
                    <td className="px-4 py-2 text-left font-source-sans">{student.semester || 'Không có dữ liệu'}</td>
                    <td className="px-4 py-2 text-left font-source-sans">
                      {student.departmentName || 'Không có dữ liệu'}
                    </td>
                    <td className="px-4 py-2 text-left font-source-sans">
                      {student.transferDate ? new Date(student.transferDate).toLocaleDateString('en-GB') : 'Không có dữ liệu'}
                    </td>
                    <td className="px-4 py-2 text-left font-source-sans">
                      <button className="text-orange-500">
                        <FaEye size={32} />
                      </button>
                    </td>
                  </tr>
                ))
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
    </div>
  );
};

export default TransferSchool;