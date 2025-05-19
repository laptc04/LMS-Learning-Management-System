import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { FaChevronDown, FaChevronLeft, FaChevronRight, FaRegCalendarAlt } from 'react-icons/fa';
import { FaPlus, FaEye, FaAngleDown, FaAngleUp, FaSearch, FaExclamation } from 'react-icons/fa';
import apiInstance from "../../../../services/api";
import Dropdown from "../../../../components/Dropdown";
import DatePicker from "../../../../components/DatePicker";
import { parse, isValid, format } from "date-fns";

interface ClassItem {
  classCode: number;
  subjectName: string;
  startDate: string;
  time: string;
  teacherName: string;
  statusClass: "Đã kết thúc" | "Đang diễn ra" | "Chưa diễn ra";
  schoolYear: string;
  department: string
}
interface Option {
  id: string | number;
  value: string;
}
const ClassList: React.FC = () => {
  const params = useParams<Record<string, string>>();
  const currentFilter = params.filter || "all";

  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<ClassItem[]>([]);
  const [schoolYear, setSchoolYear] = useState("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjectGroup, setSubjectGroup] = useState<Option[]>([]);
  const [selectedSubjectGroup, setSelectedSubjectGroup] = useState<Option | null>(null);
  const [academic, setAcademic] = useState<Option[]>([]);
  const [selectedAcademic, setSelectedAcademic] = useState<Option | null>(null);

  useEffect(() => {
    fetchSubjectGroup();
    fetchDepartment();
  }, []);

  const fetchSubjectGroup = async () => {
    try {
      const response = await apiInstance.get("api/subject/get-all-subjects-by-student");
      if (response.data.status === 0) {
        const subjectOptions = response.data.data.map((item: any) => ({
          id: item.id,
          value: item.name,
        }));
        setSubjectGroup(subjectOptions);

      } else {
        console.error("Error fetching subject groups:", response.data.message);
      }
    } catch (error) {
      console.error("API Error fetching subject groups:", error);
    }
  };
  const fetchDepartment = async () => {
    try {
      const response = await apiInstance.get("api/academicyear/get-all-academic-years-by-student");
      if (response.data.status === 0) {
        const departmentOptions = response.data.data.map((item: any) => ({
          id: item.id,
          value: item.name,
        }));
        setAcademic(departmentOptions);
      } else {
        console.error("Error fetching departments:", response.data.message);
      }
    } catch (error) {
      console.error("API Error fetching departments:", error);
    }
  };

  const handleDateChange = (date: string | null) => {
    if (date) {
      // Parse the date in dd/MM/yyyy format
      const parsedDate = parse(date, "dd/MM/yyyy", new Date());
      if (isValid(parsedDate)) {
        setSelectedDate(format(parsedDate, "yyyy-MM-dd"));
      } else {
        console.error("Invalid date:", date);
      }
    }
  };

  // Fetch data based on selected filters
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        let tab = 0; // default value for tab

        // Set tab based on currentFilter
        switch (currentFilter) {
          case 'upcoming':
            tab = 1;
            break;
          case 'completed':
            tab = 2;
            break;
          case 'incomplete':
            tab = 3;
            break;
          case 'all':
          default:
            tab = 0;
            break;
        }

        const response = await apiInstance.get("api/class/futurestudent", {
          params: {
            status: tab,
            subjectId: selectedSubjectGroup?.id || 2,
            departmentId: selectedAcademic?.id || 1,
            date: selectedDate
          },
        });

        if (response.data.status === 0) {
          setClasses(response.data.data.items);
        } else {
          console.error("Error fetching data:", response.data.message);
        }
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    fetchClasses();
  }, [currentFilter, selectedDate, selectedSubjectGroup, selectedAcademic]);


  // Filter classes based on additional filters
  useEffect(() => {
    let filtered = [...classes];

    if (schoolYear) {
      filtered = filtered.filter((cls) => cls.schoolYear === schoolYear);
    }

    if (selectedSubject) {
      filtered = filtered.filter((cls) => cls.subjectName === selectedSubject);
    }

    setFilteredClasses(filtered);
  }, [classes, schoolYear, selectedSubject]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value.toLowerCase();
    const filtered = classes.filter(
      (cls) =>
        cls.subjectName.toLowerCase().includes(searchText) ||
        cls.teacherName.toLowerCase().includes(searchText)
    );
    setFilteredClasses(filtered);
  };
  const handleFilter = () => {
    if (!selectedDate || !selectedSubject || !selectedAcademic) {
      alert('Vui lòng chọn đầy đủ các bộ lọc.');
      return;
    }

    // Tiến hành lọc sau khi xác nhận các giá trị hợp lệ
    let filtered = [...classes];

    if (selectedDate) {
      filtered = filtered.filter((cls) => cls.startDate === selectedDate);
    }

    if (selectedSubject) {
      filtered = filtered.filter((cls) => cls.subjectName === selectedSubject);
    }

    if (selectedAcademic) {
      filtered = filtered.filter((cls) => cls.department === selectedAcademic.value);
    }

    setFilteredClasses(filtered);
  };

  return (
    <div className="max-w mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Lớp học của tôi</h2>

      {/* Tabs */}
      <div className="flex gap-4">
        {[{ name: "Tất cả lớp học", path: "all" }, { name: "Lớp học sắp tới", path: "upcoming" }, { name: "Lớp học đã hoàn thành", path: "completed" }, { name: "Lớp học chưa hoàn thành", path: "incomplete" }].map((tab) => (
          <NavLink key={tab.path} to={`/student/my-classes/list/${tab.path}`} className={({ isActive }) => `min-w-[150px] max-w-[150px] flex items-center justify-center text-center px-4 py-2 text-sm font-medium rounded-t-lg transition-all duration-300 ${isActive ? "bg-orange-500 text-white" : "border-t-2 border-l-2 border-r-2 border-b-0 border-orange-500 text-black bg-white border hover:bg-orange-100"}`}>{tab.name}</NavLink>
        ))}
      </div>

      {/* Bộ lọc */}
      <div className="flex flex-wrap gap-4 mt-4 p-4 bg-white rounded-md items-center">

        {/* <div className="flex flex-col">
          <label className="mb-1 font-medium">Chọn niên khóa</label>
          <Dropdown
            options={academic}
            width="w-full"
            value={selectedAcademic?.id}
            onChange={(option: Option) => setSelectedAcademic(option)}
          />
        </div> */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Chọn ngày</label>
          <DatePicker value={selectedDate} onChange={handleDateChange} />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium">Chọn bộ môn</label>
          <Dropdown
            options={subjectGroup}
            width="w-full"
            // value={selectedSubjectGroup?.id}
            onChange={(option: Option) => setSelectedSubjectGroup(option)}
          />
        </div>



        <button
          className="mt-6 bg-orange-500 text-white font-semibold px-3 py-3 rounded"
          onClick={handleFilter} // Gọi hàm handleFilter khi nút được nhấn
        >
          Lọc kết quả
        </button>
      </div>

      {/* Danh sách lớp học */}
      <div className="overflow-x-auto p-4">
        <table className="w-full border-separate border-spacing-0 border-collapse border border-gray-200 rounded-lg overflow-hidden">
          {/* Header */}
          <thead className="bg-orange-500 text-white">
            <tr>
              {[
                { key: 'id', label: 'Mã lớp' },
                { key: 'subject', label: 'Môn học' },
                { key: 'time', label: 'Thời gian' },
                { key: 'teacher', label: 'Giảng viên' },
                { key: 'status', label: 'Trạng thái' },
                { key: 'info', label: '' }
              ].map(({ key, label }) => (
                <th key={key} className="px-4 py-2 text-left whitespace-nowrap font-mulish font-[550]">{label}</th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {filteredClasses.length > 0 ? (
              filteredClasses.map((cls) => (
                <tr key={cls.classCode} className="odd:bg-gray-100 even:bg-white">
                  <td className="px-4 py-2 text-left font-source-sans">{cls.classCode}</td>
                  <td className="px-4 py-2 text-left font-source-sans">{cls.subjectName}</td>
                  <td className="px-4 py-2 text-left font-source-sans">{cls.startDate}</td>
                  <td className="px-4 py-2 text-left font-source-sans">{cls.teacherName}</td>
                  <td
                    className={`px-4 py-2 text-left font-source-sans italic 
                       ${cls.statusClass === "Chưa diễn ra" ? "text-red-500"
                        : cls.statusClass === "Đã kết thúc" ? "text-green-500"
                          : cls.statusClass === "Đang diễn ra" ? "text-blue-500"
                            : "text-gray-500"}`}>
                    {cls.statusClass === "Chưa diễn ra"
                      ? "Chưa diễn ra"
                      : cls.statusClass === "Đã kết thúc"
                        ? "Đã kết thúc"
                        : cls.statusClass === "Đang diễn ra"
                          ? "Đang diễn ra"
                          : "Không xác định"}
                  </td>
                  <td className="px-4 py-2 text-left font-source-sans">
                    <button className="text-orange-500">
                      <img src="/icon/fi-info.png" alt="Exclamation" className="w-[24px] h-[24px] mt-2" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-2 text-center text-gray-700">Không có lớp học nào.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className="flex items-center justify-between pt-6 pb-4">
        <div className="text-sm text-gray-600 flex items-center space-x-2">
          <span className="italic">Hiển thị</span>
          <select className="w-16 h-8 border border-orange-500 rounded-md text-center focus:outline-none focus:ring-1 focus:ring-orange-500">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          <span className="italic">hàng trong mỗi trang</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <button className="px-2 py-1 text-gray-600 hover:bg-gray-200 rounded mx-1"> &#10094; </button>
          <button className="px-2 h-6 w-6 mx-[2px] rounded-full bg-orange-500 text-white">1</button>
          <button className="px-2 h-6 w-6 mx-[2px] rounded-full text-gray-600 hover:bg-gray-200">2</button>
          <button className="px-2 py-1 text-gray-600 hover:bg-gray-200 rounded mx-1"> &#10095; </button>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default ClassList;
