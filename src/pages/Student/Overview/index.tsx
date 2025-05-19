import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import apiInstance from "../../../services/api";

// Tổng quan (Overview)

interface ClassStatic {
  totalClasses: number,
  completedClasses: number,
  ongoingClasses: number,
  averageScore: number
}
interface SubjectStatic {
  name: string;
  value: number;
  color: string;
}

interface CourseData {
  semesterName: string;
  academicYear: string;
  classDetails: {
    classId: string;
    className: string;
    subjectName: string;
    firstSchedule?: {
      timeRange: string;
      date: string;
    };
    status: string;
  }[];
}
interface CollapseState {
  [semesterName: string]: boolean;
}
const Overview = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenBottom, setIsOpenBottom] = useState(false);
  const [classStatic, SetClassStatic] = useState<ClassStatic>();
  const [subjectStatic, SetSubjectStatic] = useState<SubjectStatic[]>([]);
  const [data, setData] = useState<CourseData[]>([]);
  const [collapseState, setCollapseState] = useState<CollapseState>({});


  const fetchSubjectStatic = async () => {
    try {
      const response = await apiInstance.get("api/report/student-subject-statistics"
      );
      if (response.data.status === 0) {
        const totalOption = response.data.data;

        const chartData = [
          {
            name: "Tổng số môn đã hoàn thành",
            value: totalOption.completedSubjects,
            color: "#2EACEE",
          },
          {
            name: "Tổng số môn chưa hoàn thành",
            value: totalOption.ongoingSubjects,
            color: "#FF7506 ",
          }
        ];
        SetSubjectStatic(chartData);


      } else {
        console.error("Error fetching Academics:", response.data.message);
      }
    } catch (error) {
      console.error("API Error fetching Academics:", error);
    }
  };
  const fetchClassStatic = async () => {
    try {
      const response = await apiInstance.get("api/report/student-class-statistics"
      );
      if (response.data.status === 0) {
        const totalOption = response.data.data;
        SetClassStatic(totalOption);

      } else {
        console.error("Error fetching Academics:", response.data.message);
      }
    } catch (error) {
      console.error("API Error fetching Academics:", error);
    }
  };
  const fetchSemester = async () => {
    try {
      const response = await apiInstance.get("api/report/student-semester-statistics"
      );
      if (response.data.status === 0) {
        const totalOption = response.data.data;
        setData(totalOption);
        const defaultCollapse: CollapseState = {};
        response.data.forEach((item: any) => {
          defaultCollapse[item.semesterName] = false;
        });
        setCollapseState(defaultCollapse);
      } else {
        console.error("Error fetching Academics:", response.data.message);
      }
    } catch (error) {
      console.error("API Error fetching Academics:", error);
    }
  };
  const toggleCollapse = (semesterName: string) => {
    setCollapseState(prev => ({
      ...prev,
      [semesterName]: !prev[semesterName],
    }));
  };


  useEffect(() => {
    fetchSubjectStatic();
    fetchClassStatic();
    fetchSemester()
  }, [])

  // const data = [
  //   { name: "Tổng số môn đã hoàn thành", value: 60, color: "#3498db" },
  //   { name: "Tổng số môn chưa hoan thành", value: 3, color: "#f39c12" },
  // ];

  const students = [
    { id: '2020-6A', name: 'Toán', class: 'Lớp 10A1', time: 'Thứ 2 - 8:00', date: '12/05 - 10/07', status: 'incomplete' },
    { id: '2020-6A', name: 'Ngữ văn', class: 'Lớp 10A1', time: 'Thứ 2 - 8:00', date: '12/05 - 10/07', status: 'incomplete' },
    { id: '2020-6A', name: 'Toán đại số', class: 'Lớp 10A1', time: 'Thứ 2 - 8:00', date: '12/05 - 10/07', status: 'incomplete' },
    { id: '2020-6A', name: 'Tiếng anh', class: 'Lớp 10A1', time: 'Thứ 2 - 8:00', date: '12/05 - 10/07', status: 'completed' },
    { id: '2020-6A', name: 'Toán hình học', class: 'Lớp 10A1', time: 'Thứ 2 - 8:00', date: '12/05 - 10/07', status: 'completed' },
    { id: '2020-6A', name: 'Địa lý', class: 'Lớp 10A1', time: 'Thứ 2 - 8:00', date: '12/05 - 10/07', status: 'completed' },
    { id: '2020-6A', name: 'Vật lý', class: 'Lớp 10A1', time: 'Thứ 2 - 8:00', date: '12/05 - 10/07', status: 'incomplete' },
    { id: '2020-6A', name: 'Hóa học', class: 'Lớp 10A1', time: 'Thứ 2 - 8:00', date: '12/05 - 10/07', status: 'incomplete' },
  ]


  return (
    <div className="flex">
      <div className="w-5/12">
        {/* {Thống kê} */}
        <p className="text-[48px] font-bold">Tổng quan</p>
        <div className="grid grid-cols-2 gap-10">
          <div className=" bg-gradient-to-r from-[#F17F21] to-[#FF5400] px-6 py-3 rounded-2xl shadow-lg text-center text-white ">
            <p className="text-lg font-bold ">Khóa học của tôi</p>
            <p className="text-[48px] font-bold">{classStatic?.totalClasses}</p>
          </div>
          <div className=" bg-gradient-to-r from-[#56CCF2] to-[#2F80ED] px-6 py-3 rounded-2xl shadow-lg text-center text-white">
            <p className="tewxt-lg font-bold">Khóa học đã hoàn thành</p>
            <p className="text-[48px]  font-bold">{classStatic?.completedClasses}</p>
          </div>
          <div className=" bg-gradient-to-r from-[#FDC830] to-[#F37335] px-6 py-3 rounded-2xl shadow-lg text-center text-white">
            <p className="text-lg font-bold">Khóa học chưa hoàn thành</p>
            <p className="text-[48px]  font-bold">{classStatic?.ongoingClasses}</p>
          </div>
          <div className=" bg-gradient-to-r from-[#2EACEE] to-[#0016DA] px-6 py-3 rounded-2xl shadow-lg text-center text-white">
            <p className="text-lg font-bold">Tổng điểm trung bình</p>
            <p className="text-[48px]  font-bold">{classStatic?.averageScore}</p>
          </div>
        </div>
        {/* {Chart} */}
        <div className="mt-6">
          <p className="text-[28px] font-bold mt-4">Thống kê kết quả học tập của học viên</p>
          <div className=" bg-white rounded-2xl shadow-2xl mt-4  w-[100%] h-[427px]">
            {/* {Pie chart} */}
            <div className="flex">
              <div className="flex-1 mt-[65px] ml-[74px]">
                <PieChart width={166} height={166} >
                  <Pie data={subjectStatic} dataKey="value" outerRadius={83} fill="#8884d8" >
                    {subjectStatic.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>
              {/* {Thong so} */}
              <div className="flex-1 mt-[65px] mr-6">
                <div className="flex justify-between border-b-4  border-b-[#823B00] py-1">
                  <span>Tổng số môn: </span><span className="text-[#373839] font-bold">{(subjectStatic[0]?.value) + (subjectStatic[1]?.value)}</span>
                </div>
                <div className="flex justify-between border-b-4  border-b-[#823B00] py-1">
                  <span>Số môn đã hoàn thành: </span><span className="text-[#2EACEE] font-bold">{subjectStatic[0]?.value}</span>
                </div>
                <div className="flex justify-between border-b-4  border-b-[#823B00] py-1">
                  <span>Số môn chưa hoàn thành: </span> <span className="text-[#FF7506] font-bold">{subjectStatic[1]?.value}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 ml-[74px]">
              <div className="flex items-center" >
                <div className="w-[32px] h-[16px] rounded-[2px] bg-gradient-to-r from-[#56CCF2] to-[#2F80ED] mr-1"></div><p>Tổng số môn đã hoàn thành</p>
              </div>
              <div className="flex items-center" >
                <div className="w-[32px] h-[16px] rounded-[2px] bg-gradient-to-r from-[#FDC830] to-[#F37335] mr-1"></div><p>Tổng số môn chưa hoàn thành</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {Table list} */}
      <div className="w-7/12 mx-auto mt-10">
        <p className="text-[48px] font-bold ms-5 mb-4">Tất cả khóa học</p>
        <div className="rounded-md h-[724px] overflow-auto">
          {data.map((semester, i) => {
            const isOpen = collapseState[semester.semesterName];
            return (
              <div key={semester.semesterName} className="px-5 mb-3">
                <div
                  className={`flex items-center gap-2 p-4 ${isOpen ? 'rounded-t-xl' : 'rounded-xl'} cursor-pointer transition-all ${isOpen ? 'bg-orange-600 text-white hover:bg-orange-500' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  onClick={() => toggleCollapse(semester.semesterName)}
                >
                  {/* Mũi tên */}
                  <svg
                    className={`w-4 h-4 transition-transform transform ${isOpen ? 'rotate-90' : 'rotate-0'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>

                  {/* Tiêu đề học kỳ */}
                  <p className="font-extrabold text-[16px]">
                    {semester.semesterName} ( {semester.academicYear})
                  </p>
                </div>

                {isOpen && (
                  <div className="overflow-hidden rounded-lg shadow-sm">
                    <table className="w-full table-auto">
                      <tbody className="rounded-xl">
                        {semester.classDetails.map((cls, index) => (
                          <tr
                            key={cls.classId}
                            style={{ borderRadius: '20px' }}
                            className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
                          >
                            <td className="px-0 py-4 text-center font-bold font-source-sans w-2/12">{cls.subjectName}</td>
                            <td className="px-2 py-4 text-base font-source-sans w-2/12">{cls.className}</td>
                            <td className="px-4 py-4 text-base font-source-sans w-2/12">
                              {cls.firstSchedule?.timeRange || '---'}
                            </td>
                            <td className="px-4 py-4 text-base font-source-sans w-2/12">
                              {cls.firstSchedule?.date || '---'}
                            </td>
                            <td
                              className={`px-4 py-4 text-base text-center font-source-sans w-2/12 ${cls.status === 'Đã hoàn thành' ? 'text-[#49C510]' : 'text-[#ED2025]'
                                }`}
                            >
                              {cls.status}
                            </td>
                            <td className="px-4 py-4 text-center w-1/12 text-[#F17F21] cursor-pointer">
                              <FontAwesomeIcon icon={faCircleInfo} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div >
  );
};

export default Overview;
