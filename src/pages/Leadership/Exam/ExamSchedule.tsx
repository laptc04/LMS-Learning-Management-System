import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ExamCalendar: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState("15 January 2020");

    const [exams, setExams] = useState([
        {
            date: "15 January 2020",
            subjects: [
                { id: 1, name: "Toán đại số", teacher: "Lương Hoàng D", class: "Khối 10", duration: "45 phút", type: "Giữa kì II", form: "Tự luận", color: "#49C510" },
                { id: 2, name: "Lịch sử", teacher: "Lương Hoàng D", class: "10A2, 10A2", duration: "45 phút", type: "15 phút", form: "Tự luận", color: "#C83901" },
                { id: 3, name: "Hóa Học", teacher: "Lương Hoàng D", class: "10A2, 10A2", duration: "45 phút", type: "15 phút", form: "Tự luận", color: "#FFA75E" },
                { id: 4, name: "Tiếng Anh", teacher: "Lương Hoàng D", class: "Khối 10", duration: "45 phút", type: "Học kì II", form: "Tự luận", color: "#2EACEE" },
                { id: 5, name: "Địa Lý", teacher: "Lương Hoàng D", class: "10A2, 10A2", duration: "45 phút", type: "30 phút", form: "Tự luận", color: "#FFB923" },
            ]
        },
        {
            date: "16 January 2020",
            subjects: [
                { id: 6, name: "Tiếng Anh", teacher: "Lương Hoàng D", class: "Khối 10", duration: "45 phút", type: "Học kì II", form: "Tự luận", color: "#2EACEE" },
                { id: 7, name: "Địa Lý", teacher: "Lương Hoàng D", class: "10A2, 10A2", duration: "45 phút", type: "30 phút", form: "Tự luận", color: "#FFB923" },

            ]
        }
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const examsPerPage = 4;
    const selectedExams = exams
        .filter(exam => exam.date === selectedDate)
        .flatMap(exam => exam.subjects);
    const totalPages = Math.ceil(selectedExams.length / examsPerPage);
    const currentExams = selectedExams.slice(
        (currentPage - 1) * examsPerPage,
        currentPage * examsPerPage
    );
    const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleDelete = () => {
        if (deleteId) {
            setExams(prevExams =>
                prevExams.map(exam =>
                    exam.date === selectedDate
                        ? { ...exam, subjects: exam.subjects.filter(subject => subject.id !== deleteId) }
                        : exam
                )
            );
            setDeleteId(null);
        }
    };


    return (
        <div >
            <div className="flex">
                <div className="w-10/12 bg-white p-4 rounded-xl shadow-2xl ring-4 ring-blue-50 mr-2">
                    <h2 className="font-mulish text-2xl p-4">Danh sách bài thi</h2>
                    <div className="flex justify-start items-center bg-black text-white p-4 rounded-t-lg">
                        <button className="pr-5 text-2xl"><FaChevronLeft /></button>
                        <h2 className="text-2xl font-mulish px-5">
                            Tháng 8 - 2020
                        </h2>
                        <button className="pl-5 text-2xl"><FaChevronRight /></button>
                    </div>

                    <div className="grid grid-cols-7 text-center text-sm border-t-0 border-[#FF7506]">
                        {/* Hàng tiêu đề với ô có viền cam */}
                        {["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"].map((day) => (
                            <div key={day} className="font-semibold text-base font-mulish text-gray-700 p-4 border border-[#FF7506]">{day}</div>
                        ))}

                        {/* Lưới ngày */}
                        {(() => {
                            const year = 2030;
                            const month = 8;
                            const daysInMonth = 31;
                            const firstDayOfMonth = new Date(year, month, 1).getDay();

                            const totalCells = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7;
                            const emptyCellsBefore = firstDayOfMonth;
                            const emptyCellsAfter = totalCells - (daysInMonth + emptyCellsBefore);


                            return (
                                <>
                                    {/* Ô trống trước ngày 1 */}
                                    {[...Array(emptyCellsBefore)].map((_, i) => (
                                        <div key={`empty-start-${i}`} className="h-36 border border-[#FF7506]"></div>
                                    ))}

                                    {/* Ô chứa ngày thực tế */}
                                    {[...Array(daysInMonth)].map((_, i) => {
                                        const examDay = exams.find(exam => exam.date === `${i + 1} January 2020`);
                                        return (
                                            <div
                                                key={i}
                                                className="p-1 border border-[#FF7506] h-36 cursor-pointer"
                                                onClick={() => setSelectedDate(`${i + 1} January 2020`)}
                                            >
                                                <div className="text-left text-base">{i + 1}</div>
                                                {examDay && (
                                                    <div className="mt-1">
                                                        {examDay.subjects.slice(0, 2).map((subject, idx) => (
                                                            <div key={idx} className="text-sm text-left p-1 rounded-md mb-1 font-semibold"
                                                                style={{ backgroundColor: subject.color, color: "#373839" }}>
                                                                {subject.name} - {subject.type}
                                                                <br />
                                                                <div className="text-xs text-left font-normal italic">{subject.class}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}

                                    {/* Ô trống sau ngày cuối để đủ hàng */}
                                    {[...Array(emptyCellsAfter)].map((_, i) => (
                                        <div key={`empty-end-${i}`} className="h-36 border border-orange-500"></div>
                                    ))}
                                </>
                            );
                        })()}
                    </div>


                </div>
                {/* Chi tiết bài thi */}
                <div className="w-2/12 bg-white p-5 rounded-xl shadow-2xl ring-4 ring-blue-50 ml-4">
                    <div className="text-center mb-3 pt-2 font-mulish">
                        <h1 className="text-center font-extrabold">{selectedDate.split(" ")[0]}</h1>
                        <p className="text-24px font-extrabold">{new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long" })}</p>
                        <p className="text-gray-500 text-lg font-semibold">{new Date(selectedDate).toLocaleDateString("en-US", { year: "numeric", month: "long" })}</p>
                    </div>

                    {/* Hiển thị môn học */}
                    {currentExams.map((subject, index) => (
                        <div key={index} className="mb-5 relative" style={{ borderColor: subject.color }}>
                            <hr className="border-t-2 border-[#FF7506] my-3" />
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-22px flex items-center" style={{ color: subject.color }}>
                                    <span className="mr-1">•</span> {subject.name}
                                </h3>
                                <div className="flex text-gray-500">
                                    <button className="text-orange-500 hover:text-orange-700">
                                        <img src="/icon/fi_edit.png" alt="Sửa" className="w-6 h-6" />
                                    </button>
                                    <button className="text-orange-500 hover:text-orange-700 mx-2" onClick={() => setDeleteId(subject.id)}>
                                        <img src="/icon/fi_trash-2.png" alt="Xóa" className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            {/* Thông tin môn học */}
                            <div className="text-sm text-gray-600 mt-1">
                                <div className="flex items-center">
                                    <span className="font-medium w-2/4 text-16px">Giáo viên:</span>
                                    <span>{subject.teacher}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-medium w-2/4 text-16px">Thời lượng:</span>
                                    <span>{subject.duration}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-medium w-2/4 text-16px">Phân loại:</span>
                                    <span>{subject.type}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-medium w-2/4 text-16px">Hình thức:</span>
                                    <span>{subject.form}</span>
                                </div>
                            </div>
                        </div>
                    ))}


                    {/* Phân Trang */}
                    {totalPages > 1 && (
                        <div className="flex justify-between mt-7">
                            <button
                                onClick={prevPage}
                                disabled={currentPage === 1}
                                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
                            >
                                <FaChevronLeft />
                            </button>
                            <span className="text-lg font-bold">{currentPage} / {totalPages}</span>
                            <button
                                onClick={nextPage}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
                            >
                                <FaChevronRight />
                            </button>
                        </div>
                    )}
                </div>
            </div>


            {deleteId && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg" style={{ width: 435 }}>
                        <h3 className="text-2xl font-bold text-center">Xóa lịch thi</h3>
                        <p className="text-base mt-5 mb-10 font-normal font-source-sans">
                            Xác nhận muốn xoá lịch thi này và toàn bộ thông tin bên trong? Sau khi xoá sẽ không thể hoàn tác.
                        </p>
                        <div className="flex justify-between w-full px-4 font-bold">
                            <button onClick={() => setDeleteId(null)} className=" px-4 py-2 rounded-lg w-40 h-14 text-lg font-mulis" style={{ backgroundColor: "#F2F2F2" }}>
                                Hủy
                            </button>
                            <button onClick={handleDelete} className="bg-orange-500 text-white px-4 py-2 rounded-lg w-40 h-14 text-lg">
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExamCalendar;
