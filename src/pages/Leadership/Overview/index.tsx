import { useState, useRef, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, CartesianGrid } from 'recharts';
import { FaChevronDown, FaChevronLeft, FaChevronRight, FaRegCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { vi } from 'date-fns/locale';
import apiInstance from '../../../services/api';
import Dropdown from '../../../components/Dropdown';
interface Option {
  id: string | number;
  value: string;
}

interface Total {
  totalStudents: number | null;
  totalTeachers: number;
  totalClasses: number;
}

interface AcademicData {
  className: string,
  excellentCount: number,
  goodCount: number,
  averageCount: number,
  weakCount: number
}

interface StudentData {
  departmentCode: 'Khối 6',
  totalStudents: number
}
const Overview = () => {
  const [academic, setAcademic] = useState<Option[]>([]);
  const [selectedAcademic, setSelectedAcademic] = useState<Option | null>(null);
  const [department, setDepartment] = useState<Option[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<Option | null>(null);
  const [totalList, setTotalList] = useState<Total>();
  const [academicData, setAcademicData] = useState<AcademicData[]>([]);
  const [studentData, setStudentData] = useState<StudentData[]>([]);

  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const fetchAcademic = async () => {
    try {
      const response = await apiInstance.get("api/academicyear/get-all-academic-years");
      if (response.data.status === 0) {
        const AcademicOptions = response.data.data.map((item: any) => ({
          id: item.id,
          value: item.name,
        }));
        setAcademic(AcademicOptions);

      } else {
        console.error("Error fetching Academics:", response.data.message);
      }
    } catch (error) {
      console.error("API Error fetching Academics:", error);
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
        console.error("Error fetching Academics:", response.data.message);
      }
    } catch (error) {
      console.error("API Error fetching Academics:", error);
    }
  };

  const fetchTotal = async () => {
    try {
      const response = await apiInstance.get("api/report/academic-year",
        {
          params: {
            academicId: selectedAcademic?.id
          }
        }
      );
      if (response.data.status === 0) {
        const totalOption = response.data.data;
        setTotalList(totalOption);

      } else {
        console.error("Error fetching Academics:", response.data.message);
      }
    } catch (error) {
      console.error("API Error fetching Academics:", error);
    }
  };

  const fetchAcademicData = async () => {
    try {
      const response = await apiInstance.get("api/report/class-performance",
        {
          params: {
            academicYearId: selectedAcademic?.id,
            departmentId: selectedDepartment?.id,

          }
        }
      );
      if (response.data.status === 0) {
        const totalOption = response.data.data;
        setAcademicData(totalOption);

      } else {
        console.error("Error fetching Academics:", response.data.message);
      }
    } catch (error) {
      console.error("API Error fetching Academics:", error);
    }
  };

  const fetchStudentData = async () => {
    try {
      const response = await apiInstance.get("api/report/school-level-statistics",
        {
          params: {
            academicYearId: selectedAcademic?.id,
            isJuniorHigh: true,

          }
        }
      );
      if (response.data.status === 0) {
        const totalOption = response.data.data.gradeStatistics;
        setStudentData(totalOption);
        console.log(studentData);


      } else {
        console.error("Error fetching Academics:", response.data.message);
      }
    } catch (error) {
      console.error("API Error fetching Academics:", error);
    }
  };

  useEffect(() => {
    fetchAcademic();
    fetchDepartment();
  }, []);
  useEffect(() => {
    fetchTotal();
    fetchStudentData();
  }, [selectedAcademic]);
  useEffect(() => {
    fetchAcademicData();
  }, [selectedAcademic, selectedDepartment]);







  //  academicData = [
  //   { className: '6A1', excellentCount: 1, goodCount: 15, averageCount: 10, weakCount: 5 },
  //   { className: '6A2', excellentCount: 20, goodCount: 14, averageCount: 12, weakCount: 7 },
  //   { className: '6A3', excellentCount: 22, goodCount: 16, averageCount: 11, weakCount: 6 },
  //   { className: '6A4', excellentCount: 18, goodCount: 12, averageCount: 14, weakCount: 8 },
  //   { className: '6A5', excellentCount: 27, goodCount: 18, averageCount: 9, weakCount: 5 },
  //   { className: '6A6', excellentCount: 23, goodCount: 15, averageCount: 13, weakCount: 6 },
  //   { className: '6A7', excellentCount: 26, goodCount: 17, averageCount: 12, weakCount: 4 },
  //   { className: '6A8', excellentCount: 19, goodCount: 13, averageCount: 15, weakCount: 7 },
  // ];

  // const studentData = [
  //   { name: 'Khối 6', value: 1400 },
  //   { name: 'Khối 7', value: 800 },
  //   { name: 'Khối 8', value: 1800 },
  //   { name: 'Khối 9', value: 1000 },
  // ];

  const visitData = [
    { date: '31/01', visits: 5000 },
    { date: '01/02', visits: 7500 },
    { date: '02/02', visits: 4000 },
    { date: '03/02', visits: 6000 },
    { date: '04/02', visits: 8000 },
    { date: '05/02', visits: 4500 },
    { date: '06/02', visits: 9000 },
  ];

  return (
    <div className="ms-10 me-8">
      <h1 className="text-3xl font-bold mb-6">Tổng quan</h1>
      <div className="flex gap-10 mb-3">
        <div className="flex items-center">
          <label className="mr-3 text-gray-700 font-medium">Niên khóa</label>
          <div className="relative border border-black rounded flex items-center">
            <Dropdown
              options={academic}
              width="w-full"
              onChange={(option: Option) => setSelectedAcademic(option)}
            />
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-400 to-blue-600 px-6 py-3 rounded-lg shadow-lg text-center text-white flex-1">
          <p className="text-4xl font-bold">{totalList?.totalStudents}</p>
          <p className="text-lg">Học viên</p>
        </div>
        <div className="bg-gradient-to-r from-orange-400 to-orange-600 px-6 py-3 rounded-lg shadow-lg text-center text-white flex-1">
          <p className="text-4xl font-bold">{totalList?.totalTeachers}</p>
          <p className="text-lg">Giảng viên</p>
        </div>
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 px-6 py-3 rounded-lg shadow-lg text-center text-white flex-1">
          <p className="text-4xl font-bold">{totalList?.totalClasses}</p>
          <p className="text-lg">Lớp học</p>
        </div>
      </div>

      <div className="flex gap-6 py-6">
        <div className="bg-white p-4 rounded-lg shadow-[0px_10px_20px_rgba(0,0,0,0.15),0px_-4px_10px_rgba(0,0,0,0.05)] w-3/4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-gray-700 font-medium">Thống kê kết quả học tập</h2>
            <div className="relative border rounded flex items-center">
              <Dropdown
                options={department}
                width="w-full"
                onChange={(option: Option) => setSelectedDepartment(option)}
              />

            </div>
          </div>
          <div className="relative">
            <button className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2">
              <FaChevronLeft className="text-orange-500" />
            </button>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={academicData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <XAxis dataKey="className" />
                <YAxis interval={1} />
                <Tooltip />
                <CartesianGrid strokeOpacity={0.5} vertical={false} />
                <Legend
                  content={() => (
                    <div style={{ display: 'flex', gap: 40, justifyContent: 'center', marginTop: 10 }}>
                      {[
                        { color: '#C83901', label: 'Giỏi' },
                        { color: '#FF7506', label: 'Khá' },
                        { color: '#FFA75E', label: 'Trung bình' },
                        { color: '#FFD8B8', label: 'Yếu' },
                      ].map(({ color, label }) => (
                        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <div
                            style={{
                              width: 40,
                              height: 15,
                              backgroundColor: color,
                              borderRadius: 8,
                            }}
                          />
                          <span style={{ color: 'black', fontSize: '12px' }}>{label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                />
                <Bar dataKey="excellentCount" radius={10} barSize={10} fill="#C83901" name="Giỏi" />
                <Bar dataKey="goodCount" radius={10} barSize={10} fill="#FF7506" name="Khá" />
                <Bar dataKey="averageCount" radius={10} barSize={10} fill="#FFA75E" name="Trung bình" />
                <Bar dataKey="weakCount" radius={10} barSize={10} fill="#FFD8B8" name="Yếu" />
              </BarChart>
            </ResponsiveContainer>
            <button className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2">
              <FaChevronRight className="text-orange-500" />
            </button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-[0px_10px_20px_rgba(0,0,0,0.15),0px_-4px_10px_rgba(0,0,0,0.05)] w-1/4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-gray-700 font-medium">Số lượng học viên</h2>
            {/* <div className="relative border border-black rounded flex items-center">
              <select className="appearance-none bg-transparent pl-3 pr-5 py-1">
                <option value="#">THCS</option>
                <option value="#">THPT</option>
                <option value="#">CH</option>
              </select>
              <div className="w-px bg-black self-stretch"></div>
              <div className="px-2">
                <FaChevronDown className="text-orange-500 w-4 h-4" />
              </div>
            </div> */}
          </div>
          <div className="space-y-3">
            {studentData.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-4">
                  <span>{item.departmentCode}</span>
                  <span className="opacity-50">{item.totalStudents}/100</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: `${(item.totalStudents / 100) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <div className="bg-white rounded-xl shadow-[0px_10px_20px_rgba(0,0,0,0.15),0px_-4px_10px_rgba(0,0,0,0.05)] p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-orange-600 font-semibold">Thống kê lượng truy cập</h2>
          <div className="flex items-center border border-black rounded-md appearance-none bg-transparent pl-2 pr-4 py-1">
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              className="outline-none text-sm w-20 text-center"
              locale={vi}
            />
            <span className="text-gray-500">-</span>
            <DatePicker
              selected={endDate}
              onChange={(date: Date | null) => setEndDate(date)}
              dateFormat="dd/MM/yyyy"
              className="outline-none text-sm w-20 text-center"
              locale={vi}
            />
            <FaRegCalendarAlt className="text-orange-500" />
          </div>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={visitData} margin={{ right: 50 }}>
            <defs>
              <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF7506" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.3} />
              </linearGradient>
            </defs>

            <XAxis dataKey="date" padding={{ right: 50 }} />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeOpacity={0.5} />
            <Area type="monotone" dataKey="visits" stroke="#d97706" strokeWidth={2} fill="url(#colorVisits)" />
          </AreaChart>
        </ResponsiveContainer>
      </div> */}
    </div>
  );
};

export default Overview;
