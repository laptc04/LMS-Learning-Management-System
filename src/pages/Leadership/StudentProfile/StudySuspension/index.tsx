import { useState, useEffect } from 'react';
import Dropdown from '../../../../components/Dropdown';
import { Link } from 'react-router-dom';
import { FaPlus, FaEye, FaAngleDown, FaAngleUp, FaSearch } from 'react-icons/fa';
import apiInstance from '../../../../services/api';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useLoading } from '../../../../context/loading';

interface Student {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: 'Nam' | 'Nữ';
  suspensionClass: string;
  suspensionDate: string;
  time: number;
  reason: string;
}
interface Option {
  id: string | number;
  value: string;
}
const StudySuspension = () => {
  const { setLoading } = useLoading();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfigs, setSortConfigs] = useState<{ [key in keyof Student]?: 'asc' | 'desc' }>({});
  const [academicHolds, setAcademicHolds] = useState<Student[]>([]);
  const [filteredData, setFilteredData] = useState<Student[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [academicYears, setAcademicYears] = useState<Option[]>([]);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState<Option | null>(null);
  useEffect(() => {
    if (selectedAcademicYear) {
      fetchAcademicHolds();
    }
  }, [currentPage, itemsPerPage, selectedAcademicYear]);

  useEffect(() => {
    const filtered = academicHolds.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, academicHolds]);
  useEffect(() => {
    const fetchAcademicYears = async () => {
      try {
        setLoading(true);
        const response = await apiInstance.get("api/AcademicYear");
        if (response.data.status === 0) {
          const academicYearOptions = response.data.data.items.map((item: any) => ({
            id: item.id,
            value: item.name,
          }));
          setAcademicYears(academicYearOptions);
        } else {
          console.error("Error fetching academic years:", response.data.message);
        }
      } catch (error) {
        console.error("API Error fetching academic years:", error);
      }
      finally {
        setLoading(false);

      }
    };

    fetchAcademicYears();
  }, []);
  const fetchAcademicHolds = async () => {
    try {
      setLoading(true);

      const response = await apiInstance.get('api/AcademicHolds', {
        params: {
          academicYearId: selectedAcademicYear?.id,
          page: currentPage,
          pageSize: itemsPerPage,
        }
      });

      if (response.data.status === 0) {
        const transformedData = response.data.data.items.map((item: any) => ({
          id: item.userCode,
          name: item.fullName,
          dateOfBirth: new Date(item.birthDate).toLocaleDateString('en-GB'),
          gender: item.gender === 'True' ? 'Nam' : 'Nữ',
          suspensionClass: item.className || '',
          suspensionDate: new Date(item.holdDate).toLocaleDateString('en-GB'),
          time: item.holdDuration,
          reason: item.reason,
        }));
        setAcademicHolds(transformedData);
        setTotalItems(response.data.data.totalItems);
      } else {
        console.error('Lỗi khi lấy danh sách lớp học:', response.data.message);
      }
    } catch (error) {
      console.error('Lỗi API:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key: keyof Student) => {
    setSortConfigs((prev) => ({
      ...prev,
      [key]: prev[key] === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemsPerPage(Math.min(Number(e.target.value) || 5, 20));
    setCurrentPage(1);
  };

  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="px-5">
      {/* Title and navigation */}
      <div className="flex items-center space-x-5 mb-9">
        <Link to="/leadership/student/profile" className="text-gray-300 text-[18px] font-mulish font-semibold hover:text-gray-500">
          Hồ sơ học viên
        </Link>
        <span className="text-orange-500 font-mulish text-2xl">{'>'}</span>
        <h1 className="text-[40px] font-bold font-mulish">Hồ sơ bảo lưu</h1>
      </div>

      {/* Dropdown + Button */}
      <div className="flex justify-between items-center mb-6">
        <Dropdown
          options={academicYears}
          width="short"
          onChange={(option: Option) => {
            setSelectedAcademicYear(option);
          }}
        />
        <Link
          to="/leadership/student/study-suspension/add"
          className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-md"
        >
          <FaPlus size={14} />
          <span>Thêm mới</span>
        </Link>
      </div>

      <div className="bg-white shadow-[0px_0px_2px_rgba(0,0,0,0.15)] rounded-lg px-10">
        <div className="flex justify-between items-center py-2">
          <h1 className="text-22px font-mulish font-600">Danh sách bảo lưu</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm theo tên học viên"
              className="pl-12 pr-4 py-2 rounded-3xl bg-gray-100 w-[350px] focus:outline-none text-sm font-normal italic"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" size={20} />
          </div>
        </div>

        {/* Data table */}
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full border-collapse border border-gray-200">
            <thead className="bg-orange-500 text-white">
              <tr>
                {[{ key: 'id', label: 'Mã học viên' }, { key: 'name', label: 'Tên học viên' }, { key: 'dateOfBirth', label: 'Ngày sinh' }, { key: 'gender', label: 'Giới tính' }, { key: 'suspensionClass', label: 'Lớp bảo lưu' }, { key: 'suspensionDate', label: 'Ngày bảo lưu' }, { key: 'time', label: 'Thời gian' }, { key: 'reason', label: 'Lý do' }].map(({ key, label }) => (
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

            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((student) => (
                  <tr key={student.id} className="odd:bg-gray-100 even:bg-white">
                    <td className="px-4 py-2 text-left font-source-sans">{student.id}</td>
                    <td className="px-4 py-2 text-left font-source-sans">{student.name}</td>
                    <td className="px-4 py-2 text-left font-source-sans">{student.dateOfBirth}</td>
                    <td className="px-4 py-2 text-left font-source-sans">{student.gender}</td>
                    <td className="px-4 py-2 text-left font-source-sans">{student.suspensionClass}</td>
                    <td className="px-4 py-2 text-left font-source-sans">{student.suspensionDate}</td>
                    <td className="px-4 py-2 text-left font-source-sans">{student.time}</td>
                    <td className="px-4 py-2 text-left font-source-sans">{student.reason}</td>
                    <td className="px-4 py-2 text-left font-source-sans">
                      <Link to={`/leadership/student/profile/${student.id}`}>
                        <button className="text-orange-500">
                          <FaEye size={20} />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-4 text-gray-500">Không tìm thấy kết quả</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center py-3">
            <div>
              <span className="text-sm">{`Tổng ${totalItems} bản ghi`}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="flex items-center px-3 py-1 border rounded-md border-gray-300 text-gray-500"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                <ChevronsLeft size={16} />
              </button>
              <span className="mx-2 text-sm">{currentPage}</span>
              <button
                className="flex items-center px-3 py-1 border rounded-md border-gray-300 text-gray-500"
                onClick={handleNextPage}
                disabled={currentPage === pageCount}
              >
                <ChevronsRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudySuspension;
