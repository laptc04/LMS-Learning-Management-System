import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Dropdown from '../../../components/Dropdown';

interface DropdownOption {
  id: number;
  value: string;
}

interface Subject {
  id: number;
  name: string;
  teacher: string;
  class: string;
  duration: string;
  type: string;
  content: string;
  form: string;
  color: string;
  time: string;
}

interface Exam {
  date: string;
  subjects: Subject[];
}


const ExamSchedule: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState("12 August 2020");
  const [viewMode, setViewMode] = useState("month");
  const [filterType] = useState<string>("Tất cả");

  const [exams] = useState<Exam[]>([
    {
      date: "11 August 2020",
      subjects: [
        {
          id: 2,
          name: "Vật lý",
          teacher: "Lương Hoàng D",
          class: "Khối 10",
          duration: "45 phút",
          type: "Kiểm tra 15 phút",
          content: "Ôn tập chương 5",
          form: "Tự luận",
          color: "#FFB923",
          time: "8:00 - 8:45",
        },
      ],
    },
    {
      date: "12 August 2020",
      subjects: [
        {
          id: 3,
          name: "Tiếng Anh",
          teacher: "Lương Hoàng D",
          class: "10C1, 10C2",
          duration: "45 phút",
          type: "Học kỳ",
          content: "Academic Vocabulary",
          form: "Trắc nghiệm",
          color: "#2EACEE",
          time: "8:00 - 8:45",
        },
        {
          id: 4,
          name: "Vật lý",
          teacher: "Lương Hoàng D",
          class: "Khối 10",
          duration: "30 phút",
          type: "Kiểm tra 15 phút",
          content: "Ôn tập chương 5",
          form: "Tự luận",
          color: "#C83901",
          time: "12:00 - 12:30",
        },
        {
          id: 5,
          name: "Lịch sử",
          teacher: "Lương Hoàng D",
          class: "Khối 10",
          duration: "90 phút",
          type: "Giữa kỳ",
          content: "Ôn tập chương 5",
          form: "Tự luận",
          color: "#49C510",
          time: "9:30 - 11:00",
        },
      ],
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const examsPerPage = 2;

  const filteredExams = exams.filter(
    exam =>
      filterType === "Tất cả" || exam.subjects.some(subject => subject.type === filterType)
  );

  const selectedExams = filteredExams
    .filter(exam => exam.date === selectedDate)
    .flatMap(exam => exam.subjects);

  const totalPages = Math.ceil(selectedExams.length / examsPerPage);
  const currentExams = selectedExams.slice(
    (currentPage - 1) * examsPerPage,
    currentPage * examsPerPage
  );

  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  const classOptions: DropdownOption[] = [
    { id: 1, value: "Khối 10" },
    { id: 2, value: "Khối 9" },
    { id: 3, value: "Khối 8" },
    { id: 4, value: "Khối 7" },
  ];

  const [currentWeekStart] = useState(new Date("8 August 2020"));
  const getWeekRange = (startDate: Date) => {
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    return `${startDate.getDate()} - ${endDate.getDate()} Tháng ${startDate.getMonth() + 1}`;
  };
  const weekRange = getWeekRange(currentWeekStart);

  const timeSlots = [
    "7:00 - 7:30",
    "7:30 - 8:00",
    "8:00 - 8:30",
    "8:30 - 9:00",
    "9:00 - 9:30",
    "9:30 - 10:00",
    "10:00 - 10:30",
    "10:30 - 11:00",
    "11:00 - 11:30",
    "11:30 - 12:00",
    "12:00 - 12:30",
    "12:30 - 13:00",
    "13:00 - 13:30",
  ];

  const getTimeSlotIndex = (time: string) => {
    const [startHour, startMinute] = time.split(" - ")[0].split(":").map(Number);
    const totalMinutes = (startHour - 7) * 60 + startMinute;
    return Math.floor(totalMinutes / 30);
  };

  return (
    <div>
      <div className="flex">
        <div className="w-10/12">
          <h2 className="font-mulish font-bold text-5xl p-2 mb-5">Lịch thi</h2>
          <div className="flex space-x-4 pb-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 ml-1 py-2">Chọn khối</label>
              <Dropdown options={classOptions} width="short" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end w-2/12 pr-4">
          <div className="w-[92px] h-[92px] rounded-full overflow-hidden">
            <img src="/icon/Ellipse-teacher.png" alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="w-10/12 bg-white mr-2">
          <div className="flex justify-between items-center bg-black text-white p-4 rounded-t-lg">
            <div className="flex items-center">
              <button className="pr-5 text-2xl">
                <FaChevronLeft />
              </button>
              <h2 className="text-2xl font-mulish px-5">
                {viewMode === "month" ? "Tháng 8 - 2020" : weekRange}
              </h2>
              <button className="pl-5 text-2xl">
                <FaChevronRight />
              </button>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode("month")}
                className={`px-4 py-2 rounded-lg ${viewMode === "month" ? "bg-white text-black" : "bg-gray-300 text-black"}`}
              >
                Tháng
              </button>
              <button
                onClick={() => setViewMode("week")}
                className={`px-4 py-2 rounded-lg ${viewMode === "week" ? "bg-white text-black" : "bg-gray-300 text-black"}`}
              >
                Tuần
              </button>
            </div>
          </div>

          {/* Lịch tháng - Lịch tuần */}
          {viewMode === "month" ? (
            <div className="grid grid-cols-7 text-center text-sm border-t-0 border-[#FF7506]">
              {["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"].map((day) => (
                <div key={day} className="font-semibold text-base font-mulish text-gray-700 p-4 border border-[#FF7506]">
                  {day}
                </div>
              ))}

              {(() => {
                const year = 2020;
                const month = 7;
                const daysInMonth = 31;
                const firstDayOfMonth = new Date(year, month, 1).getDay();
                const totalCells = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7;
                const emptyCellsBefore = firstDayOfMonth;
                const emptyCellsAfter = totalCells - (daysInMonth + emptyCellsBefore);

                return (
                  <>
                    {[...Array(emptyCellsBefore)].map((_, i) => (
                      <div key={`empty-start-${i}`} className="h-36 border border-[#FF7506]"></div>
                    ))}

                    {[...Array(daysInMonth)].map((_, i) => {
                      const examDay = filteredExams.find(exam => exam.date === `${i + 1} August 2020`);
                      return (
                        <div
                          key={i}
                          className="p-1 border border-[#FF7506] h-36 cursor-pointer"
                          onClick={() => {
                            setSelectedDate(`${i + 1} August 2020`);
                            setCurrentPage(1);
                          }}
                        >
                          <div className="text-left text-base">{i + 1}</div>
                          {examDay && (
                            <div className="mt-1">
                              {examDay.subjects.slice(0, 2).map((subject, idx) => (
                                <div
                                  key={idx}
                                  className="text-sm text-left p-1 rounded-md mb-1 font-semibold"
                                  style={{ backgroundColor: subject.color, color: "#373839" }}
                                >
                                  {subject.name}
                                  <div className="text-xs text-left font-normal italic">{subject.class}</div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {[...Array(emptyCellsAfter)].map((_, i) => (
                      <div key={`empty-end-${i}`} className="h-36 border border-[#FF7506]"></div>
                    ))}
                  </>
                );
              })()}
            </div>
          ) : (
            // Lịch tuần
            <div className="grid grid-cols-8 text-center text-sm border-t-0 border-[#FF7506]">
              <div className="border border-[#FF7506]">
                <div className="h-[60px] border-b border-[#FF7506]"></div>
                {timeSlots.map((time, idx) => (
                  <div key={time} className="h-[60px] text-sm font-mulish text-gray-700 border-b border-[#FF7506] flex items-center justify-center">
                    {time.split(" - ")[0]}
                  </div>
                ))}
              </div>

              {[...Array(7)].map((_, idx) => {
                const currentDate = new Date(currentWeekStart);
                currentDate.setDate(currentWeekStart.getDate() + idx);
                const formattedDate = `${currentDate.getDate()} August 2020`; // Định dạng giống lịch tháng
                const dayExams = filteredExams.filter(exam => exam.date === formattedDate);

                return (
                  <div key={idx} className="border border-[#FF7506]">
                    <div className="font-semibold text-base font-mulish text-gray-700 p-4 border-b border-[#FF7506] h-[60px]">
                      {currentDate.toLocaleDateString("vi-VN", { weekday: "long" })} <br /> {currentDate.getDate()}
                    </div>
                    {timeSlots.map((time, slotIdx) => {
                      const examsInSlot = dayExams
                        .flatMap(exam => exam.subjects)
                        .filter(subject => getTimeSlotIndex(subject.time) === slotIdx);

                      return (
                        <div
                          key={slotIdx}
                          className="h-[60px] border-b border-[#FF7506] p-1 cursor-pointer relative"
                          onClick={() => {
                            setSelectedDate(formattedDate);
                            setCurrentPage(1);
                          }}
                        >
                          {examsInSlot.length > 0 && (
                            <div
                              className="absolute top-1 left-1 right-1 p-1 rounded-md text-sm font-semibold"
                              style={{
                                backgroundColor: examsInSlot[0].color,
                                color: "#373839",
                                height:
                                  examsInSlot[0].duration === "90 phút"
                                    ? "240px"
                                    : examsInSlot[0].duration === "45 phút"
                                      ? "100px"
                                      : "60px",
                                top: "0px",
                                zIndex: 2,
                              }}
                            >
                              {examsInSlot[0].name} <br /> {examsInSlot[0].time}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Chi tiết bài thi */}
        <div className="w-2/12 font-mulish">
          <div className="bg-white p-3 rounded-xl shadow-2xl ring-4 ring-blue-50 mb-5 ml-4 h-[620px] flex flex-col justify-between">
            <div className="flex items-center mb-4 pt-2 ml-4">
              <h1 className="text-5xl font-extrabold text-[#2F2F2F] leading-none mr-4">
                {selectedDate.split(" ")[0]}
              </h1>
              <div className="flex flex-col text-sm text-[#2F2F2F] font-bold gap-[2px]">
                <p>{new Date(selectedDate).toLocaleDateString("vi-VN", { weekday: "long" })}</p>
                <p>Tháng {new Date(selectedDate).getMonth() + 1}</p>
                <p>Năm {new Date(selectedDate).getFullYear()}</p>
              </div>
            </div>

            <hr className="border-t-4 border-orange-400 w-[90%] h-1 mx-auto my-4" />

            <div className="flex-1 overflow-y-auto">
              {selectedExams.length > 0 ? (
                currentExams.map((subject, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex items-center mb-1 ml-4">
                      <span className="text-lg font-bold mr-2" style={{ color: subject.color }}>●</span>
                      <h3 className="font-bold text-[17px]" style={{ color: subject.color }}>{subject.name}</h3>
                    </div>
                    <div className="text-base text-gray-800 space-y-1 ml-4">
                      <div className="flex">
                        <span className="font-normal text-gray-800 min-w-[100px]">Đối tượng:</span>
                        <span className="text-gray-500">{subject.class}</span>
                      </div>
                      <div className="flex">
                        <span className="font-normal text-gray-800 min-w-[100px]">Thời lượng:</span>
                        <span className="text-gray-500">{subject.duration}</span>
                      </div>
                      <div className="flex">
                        <span className="font-normal text-gray-800 min-w-[100px]">Nội dung:</span>
                        <span className="text-gray-500 whitespace-pre-line">{subject.content}</span>
                      </div>
                      <div className="flex">
                        <span className="font-normal text-gray-800 min-w-[100px]">Hình thức:</span>
                        <span className="text-gray-500">{subject.form}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 mt-4">
                  Không có bài kiểm tra nào vào ngày này.
                </div>
              )}
            </div>

            <div className="mt-4">
              <p className="italic text-sm text-[#FF7506] mb-2">Cố gắng ôn tập cho các bài kiểm tra sắp tới nhé!</p>
              {totalPages > 1 && (
                <div className="flex justify-between">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="px-2 py-1 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
                  >
                    <FaChevronLeft />
                  </button>
                  <span className="text-sm font-bold">{currentPage} / {totalPages}</span>
                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
                  >
                    <FaChevronRight />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md mt-6 ml-4">
            <h2 className="text-lg font-semibold mb-4">Lọc lịch thi</h2>
            <div className="flex flex-col gap-3">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="h-6 w-6 accent-[#FFB923] "
                  defaultChecked
                />
                <span className="ml-2 text-sm text-gray-700">Kiểm tra 15 phút</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="h-6 w-6 accent-[#2EACEE] "
                  defaultChecked
                />
                <span className="ml-2 text-sm text-gray-700">Kiểm tra 45 phút</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="h-6 w-6 accent-[#49C510] "
                  defaultChecked
                />
                <span className="ml-2 text-sm text-gray-700">Thi giữa học kì</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="h-6 w-6 accent-[#FF7506] "
                  defaultChecked
                />
                <span className="ml-2 text-sm text-gray-700">Thi cuối học kì</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamSchedule;