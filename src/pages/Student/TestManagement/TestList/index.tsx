import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams, useNavigate } from "react-router-dom";
import { FaChevronDown, FaRegCalendarAlt, FaSearch } from "react-icons/fa";
import apiInstance from "../../../../services/api";
import Dropdown from "../../../../components/Dropdown";
import DatePicker from "../../../../components/DatePicker";
import { parse, isValid, format } from "date-fns";

interface ClassItem {
  id: number;
  subjectName: string;
  dateOfExam: string;
  time: string;
  teacherName: string;
  status: "all" | "completed" | "incomplete" | string;
  schoolYear: string;
  contentTest: string;
  duration: number;
  action: string;
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
  const [department, setDepartment] = useState<Option[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<Option | null>(null);



  useEffect(() => {
    fetchSubjectGroup();
    fetchDepartment();
  }, []);

  const navigate = useNavigate();

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
      const response = await apiInstance.get("api/department/get-all-departments");
      if (response.data.status === 0) {
        const departmentOptions = response.data.data.map((item: any) => ({
          id: item.id,
          value: item.name,
        }));
        setDepartment(departmentOptions);
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
        const response = await apiInstance.get("api/StudentTestExam", {
          params: {
            tab: currentFilter,
            subjectId: selectedSubjectGroup?.id || 1,
            departmentId: selectedDepartment?.id || 1,
            startDate: selectedDate || "",
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
  }, [currentFilter, selectedDate, selectedSubjectGroup, selectedDepartment]);

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
    console.log(selectedDate, selectedDepartment?.id, selectedSubjectGroup?.id);

    if (!selectedDate || !selectedSubjectGroup?.id || !selectedDepartment?.id) {


      // alert('Vui lòng chọn đầy đủ các bộ lọc.');
      // return;
    }

    // Tiến hành lọc sau khi xác nhận các giá trị hợp lệ
    let filtered = [...classes];

    if (selectedDate) {
      filtered = filtered.filter((cls) => cls.dateOfExam === selectedDate);
    }

    if (selectedSubject) {
      filtered = filtered.filter((cls) => cls.subjectName === selectedSubject);
    }

    if (selectedDepartment) {
      filtered = filtered.filter((cls) => cls.department === selectedDepartment.value);
    }

    setFilteredClasses(filtered);
  };

  return (
    <div className="max-w mt-8 p-6 bg-white shadow-lg rounded-lg">
      <div className="text-gray-500 text-lg flex items-center space-x-2 mt-3 mb-3">
        <Link to="/student/test-management/list" className="text-gray-400 hover:text-gray-600">
          Bài kiểm tra
        </Link>
        <span className="text-orange-500">{">"}</span>
        <span className="font-bold text-4xl text-black">Danh sách bài kiểm tra</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-4">
        {["all", "incomplete", "completed"].map((tab) => (
          <NavLink
            key={tab}
            to={`/student/test-management/list/${tab}`}
            className={({ isActive }) =>
              `min-w-[150px] max-w-[150px] flex items-center justify-center text-center px-4 py-2 text-sm font-medium rounded-t-lg transition-all duration-300 ${isActive ? "bg-orange-500 text-white" : "border-t-2 border-l-2 border-r-2 border-b-0 border-orange-500 text-black bg-white border hover:bg-orange-100"
              }`
            }
          >
            {tab === "all" ? "Tất cả bài kiểm tra" : tab === "incomplete" ? "Bài kiểm tra sắp tới" : "Bài kiểm tra đã hoàn thành"}
          </NavLink>
        ))}
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-4 mt-4 p-4 bg-white rounded-md items-center">
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Chọn bộ môn</label>
          <Dropdown
            options={subjectGroup}
            width="w-full"
            // value={selectedSubjectGroup?.id} // Now using selected option
            onChange={(option: Option) => setSelectedSubjectGroup(option)}
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium">Chọn khối</label>
          <Dropdown
            options={department}
            width="w-full"
            // value={selectedDepartment?.id}
            onChange={(option: Option) => setSelectedDepartment(option)}
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium">Chọn ngày</label>
          <DatePicker value={selectedDate} onChange={handleDateChange} />
        </div>

        {/* <button
          className="mt-6 bg-orange-500 text-white font-semibold px-3 py-3 rounded"
          onClick={handleFilter} // Gọi hàm handleFilter khi nút được nhấn
        >
          Lọc kết quả
        </button> */}
      </div>

      <div className="flex flex-1 justify-end items-center py-2">
        <div className="relative w-[280px] mt-7">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên bài kiểm tra"
            className="pl-10 pr-4 py-2 rounded-3xl bg-gray-100 w-full focus:outline-none text-sm font-normal italic"
            onChange={handleSearch}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>

      {/* Class List */}
      <div className="overflow-x-auto p-4">
        <table className="w-full border-separate border-spacing-0 border-collapse border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-orange-500 text-white">
            <tr>
              {[
                { key: "subject", label: "Môn học" },
                { key: "content", label: "Nội dung kiểm tra" },
                { key: "teacher", label: "Giảng viên" },
                { key: "date", label: "Ngày làm bài" },
                { key: "duration", label: "Thời lượng" },
                { key: "status", label: "Tình trạng" },
                { key: "action", label: "Bài làm" },
                { key: "info", label: "" },
              ].map(({ key, label }) => (
                <th key={key} className="px-4 py-2 text-left whitespace-nowrap font-mulish font-[550]">
                  <div className="flex items-center">
                    {label}
                    {key === "subject" && (
                      <img
                        src="/icon/u_arrow up down.png"
                        alt="Sắp xếp"
                        className="w-6 h-6 ml-1 cursor-pointer"
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredClasses.length > 0 ? (
              filteredClasses.map((cls) => (
                <tr key={cls.id} className="odd:bg-gray-100 even:bg-white">
                  <td className="px-4 py-2 text-left font-source-sans">{cls.subjectName}</td>
                  <td className="px-4 py-2 text-left font-source-sans">{cls.contentTest}</td>
                  <td className="px-4 py-2 text-left font-source-sans">{cls.teacherName}</td>
                  <td className="px-4 py-2 text-left font-source-sans">{cls.dateOfExam}</td>
                  <td className="px-4 py-2 text-left font-source-sans">{cls.duration}</td>
                  <td
                    className={`px-4 py-2 text-left font-source-sans ${cls.status === "Chưa bắt đầu"
                      ? "text-red-500 italic"
                      : cls.status === "Đã kết thúc"
                        ? "text-green-500 italic"
                        : "text-blue-500 italic"
                      }`}
                  >
                    {cls.status === "Chưa bắt đầu"
                      ? "Chưa bắt đầu"
                      : cls.status === "Đã kết thúc"
                        ? "Đã kết thúc"
                        : "Đang diễn ra"
                    }
                  </td>

                  <td
                    className={`px-4 py-2 text-left font-source-sans ${cls.status === "Chưa bắt đầu"
                      ? "text-red-500 italic font-semibold"
                      : cls.status === "Đã kết thúc"
                        ? "text-blue-500 italic"
                        : cls.status === "Đang diễn ra"
                          ? "text-blue-500 italic"
                          : "text-green-500 italic"
                      }`}
                  >
                    {cls.status === "Chưa bắt đầu" ? (
                      "Chưa bắt đầu"
                    ) : cls.status === "Đã kết thúc" ? (
                      <span className="text-blue-500">Đã nộp bài</span>
                    ) : cls.status === "Đang diễn ra" ? (
                      <>
                        <button
                          className="bg-orange-500 text-white font-semibold px-3 py-1 rounded"
                          onClick={async () => {
                            try {
                              const response = await apiInstance.get(`/api/StudentTestExam/${cls.id}`);
                              if (response.data.status === 0) {
                                console.log("Exam data:", response.data.data);
                                // Nếu muốn chuyển trang, thêm điều hướng tại đây
                                navigate(`/student/test-management/list/test/${cls.id}`);
                              } else {
                                console.error("Không thể bắt đầu bài kiểm tra:", response.data.message);
                              }
                            } catch (error) {
                              console.error("Lỗi khi gọi API bắt đầu bài kiểm tra:", error);
                            }
                          }}
                        >
                          Bắt đầu
                        </button>
                        {/* <p className="text-blue-500">Đang thực hiện</p> */}
                        {/* <p className="text-green-500">Đã nộp bài</p> */}
                      </>
                    ) : (
                      "Hoàn thành"
                    )}
                  </td>

                  <td className="px-4 py-2 text-left font-source-sans">
                    <button className="text-orange-500">
                      <img src="/icon/fi_info.png" alt="Exclamation" className="w-[24px] h-[24px] mt-2" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4">Không có kết quả</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassList;
