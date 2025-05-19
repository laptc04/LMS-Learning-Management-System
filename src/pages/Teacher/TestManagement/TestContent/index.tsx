import React, { useRef, useState } from "react";
import AddressUrlStack from "../../../../components/AddressUrlStack";
import Button from "../../../../components/Button";
import { FaChevronLeft, FaChevronRight, FaPlus, FaEdit, FaTimes, FaLink } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Sử dụng nếu đang dùng React Router
import DatePicker from "../../../../components/DatePicker";
import Dropdown from "../../../../components/Dropdown";

const TestContent = () => {

    const scrollRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate(); // Hook điều hướng trang
    const [fileName, setFileName] = useState('');
    const [showModal, setShowModal] = useState(false);

    const [editTest, setEditTest] = useState<{ id: number, title: string, date: string, time: string } | null>();
    const UrlStack = [
        {
            name: 'Bài kiểm tra',
            href: '#',
        },
        {
            name: 'Nội dung bài kiểm tra',

        },
    ];
    const [lessons, setLessons] = useState<
        { id: number; title: string; date: string; time: string; color: string; disabled?: boolean }[]
    >([
        { id: 1, title: "Bài 1", date: "19/08/2020", time: "14:00-14:45", color: "bg-gray-300", disabled: true },
        { id: 2, title: "Bài 2", date: "20/08/2020", time: "14:00-14:45", color: "bg-orange-500" },
        { id: 3, title: "Bài 3", date: "21/08/2020", time: "14:00-14:45", color: "bg-sky-500" },
        { id: 4, title: "Bài 4", date: "22/08/2020", time: "14:00-14:45", color: "bg-sky-500" },
        { id: 5, title: "Bài 5", date: "23/08/2020", time: "14:00-14:45", color: "bg-sky-500" },
        { id: 6, title: "Bài 6", date: "24/08/2020", time: "14:00-14:45", color: "bg-sky-500" },
        { id: 7, title: "Bài 7", date: "24/08/2020", time: "14:00-14:45", color: "bg-sky-500" },
    ]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
        }
    };
    const handleConfirmDelete = () => {
        setShowModal(false);
    };

    const handleDeleteClick = (id: number) => {
        setShowModal(true);
    };
    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: direction === "left" ? -200 : 200,
                behavior: "smooth",
            });
        }
    };

    const showEditTest = (id: number, title: string, date: string, time: string) => {
        setEditTest(
            {
                id: id,
                title: title,
                date: date,
                time: time
            }
        )
    }

    return (
        <>
            <div>
                <div >
                    <AddressUrlStack breadcrumbs={UrlStack} background="bg-none" />
                </div>
                <div className="flex justify-end">
                    <div>
                        <Button label="Chỉnh sửa" onClick={() => { }} size="medium" variant="solid" />
                    </div>
                </div>
                <div className="pt-2 mt-10 !shadow-[0_0_15px_rgba(0,0,0,0.3)] rounded-lg ">
                    <div className="flex justify-center">
                        <div className="w-full">
                            <div className="px-64">
                                <div className="flex mt-4 mb-4">
                                    <div className="w-1/4">
                                        <p className="font-600">Môn học</p>
                                    </div>
                                    <div className="w-3/4">
                                        <p className="">Toán đại số</p>
                                    </div>
                                </div>
                                <div className="flex mt-4 mb-4">
                                    <div className="w-1/4">
                                        <p className="font-600">Lớp</p>
                                    </div>
                                    <div className="w-3/4">
                                        <p className="">10A1</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-100 pt-2 pb-4">
                                <div className="px-64">
                                    <div className="flex mt-4 mb-4">
                                        <div className="w-1/4">
                                            <p className="font-600">Số lượng</p>
                                        </div>
                                        <div className="w-3/4">
                                            <p className="">Tổng số 06 bài kiểm tra</p>
                                        </div>
                                    </div>
                                    <div className="flex mt-4 mb-4">
                                        <div className="w-1/4">
                                            <p className="font-600">Ngày bắt đầu</p>
                                        </div>
                                        <div className="w-3/4">
                                            <p className="">10/03/2025</p>
                                        </div>
                                    </div>
                                    <div className="flex mt-4 mb-4">
                                        <div className="w-1/4">
                                            <p className="font-600">Thời lượng</p>
                                        </div>
                                        <div className="w-3/4">
                                            <p className="">15 phút</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center px-40">
                                    {/* Nút trái */}
                                    <button onClick={() => scroll("left")} className="p-2 rounded-full bg-transparent hover:bg-gray-200">
                                        <FaChevronLeft className="text-orange-500 w-5 h-5 " />
                                    </button>

                                    {/* Slider - Giữ max 6 item hiển thị */}
                                    <div
                                        ref={scrollRef}
                                        className="flex space-x-4 overflow-hidden whitespace-nowrap scroll-smooth px-2"
                                        style={{ width: "780px" }} // Giữ cố định kích thước
                                    >
                                        {lessons.map((lesson) => (
                                            <div>

                                                <div
                                                    key={lesson.id}
                                                    className={`w-24 h-24 p-4 rounded-xl text-white flex flex-col items-center shrink-0 ${lesson.color} ${lesson.disabled ? "opacity-90" : ""
                                                        }`}
                                                >
                                                    <span className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">{lesson.title}</span>
                                                    <p className="text-xs mt-2">{lesson.date}</p>
                                                    <p className="text-xs font-bold">{lesson.time}</p>
                                                </div>
                                                {!lesson.disabled && (
                                                    <div className="flex justify-center  space-x-2 mt-2">
                                                        <button className="text-orange-500 hover:text-orange-700" onClick={() => { showEditTest(lesson.id, lesson.title, lesson.date, lesson.time) }}>
                                                            <FaEdit size={20} />
                                                        </button>
                                                        <button className="text-orange-500 hover:text-orange-700" onClick={() => handleDeleteClick(lesson.id)}>
                                                            <FaTimes size={20} />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

                                        ))}

                                        {/* Luôn có thẻ dấu cộng ở cuối */}
                                        <div
                                            className="w-24 h-24 p-4 rounded-xl flex justify-center items-center bg-sky-500 cursor-pointer hover:bg-sky-600 shrink-0"
                                            onClick={() => navigate("/add-new")}
                                        >
                                            <FaPlus className="text-white w-8 h-8" />
                                        </div>
                                    </div>

                                    {/* Nút phải */}
                                    <button onClick={() => scroll("right")} className="p-2 rounded-full bg-transparent hover:bg-gray-200">
                                        <FaChevronRight className="text-orange-500 w-6 h-6" />
                                    </button>
                                </div>
                                {editTest && (
                                    <div className="px-64">
                                        <div className="flex mt-4 mb-4">
                                            <div className="w-1/4">
                                                <p className="font-600">Nội dung</p>
                                            </div>
                                            <div className="w-3/4">
                                                <p className="text-gray-400 font-600">{editTest?.title}</p>
                                            </div>
                                        </div>
                                        <div className="flex mt-4 mb-4">
                                            <div className="w-1/4">
                                                <p className="font-600">Ngày kiểm tra</p>
                                            </div>
                                            <div className="w-3/4">
                                                <div className="flex items-center space-x-2">
                                                    <DatePicker value={''} onChange={() => { }} />
                                                    <Dropdown options={[{ id: 1, value: "01:00" }, { id: 2, value: "02:00" }]} />
                                                    <Button label="Lưu" onClick={() => { setEditTest(null) }} size="medium" variant="solid" />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                )}
                            </div>
                            <div className="px-64">
                                <div className="flex mt-4 mb-2">
                                    <div className="w-1/4">
                                        <p className="font-600">Mô tả</p>
                                    </div>
                                    <div className="w-3/4">
                                        <textarea
                                            className="w-full h-20 p-3 resize-none bg-gray-100 border-none rounded-md text-black italic focus:outline-none focus:ring-2 focus:ring-gray-300"
                                            value={"Thêm mô tả"}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="w-1/4">
                                    </div>
                                    <div className="w-3/4">
                                        <div className="w-full flex items-center">
                                            <div className="w-1/5">
                                                <p className="italic">Tiệp đính kèm</p>
                                            </div>
                                            <div className="w-4/5 flex items-center justify-between gap-2">
                                                <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} />
                                                <label htmlFor="file-upload" className="flex items-center w-full h-10 px-3 bg-gray-100 border rounded-md cursor-pointer">
                                                    <span className="text-orange-500 border-r-2 pe-2">
                                                        <FaLink />
                                                    </span>
                                                    <input
                                                        type="text"
                                                        value={fileName}
                                                        placeholder="Chưa có tệp nào"
                                                        className="w-full bg-transparent border-none outline-none focus:ring-0 text-gray-600"
                                                        disabled
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex mt-4 mb-4">
                                    <div className="w-1/4">
                                        <p className="font-600">Cài đặt khác</p>
                                    </div>
                                    <div className="w-3/4 flex items-center gap-2">
                                        <input className="w-5 h-5" type="checkbox" />
                                        <label htmlFor=""> Yêu cầu học viên đính kèm tiệp</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-8">
                    <Button label="Bắt đầu kiểm tra" onClick={() => { }} size="medium" variant="solid" />
                </div>
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center w-2/6">
                            <h2 className="text-xl font-bold text-center">Xóa bài kiểm tra</h2>
                            <p className="mt-2">Giảng viên xác nhận xóa bài kiểm tra này?</p>
                            <div className="mt-4 flex justify-center gap-4">
                                <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setShowModal(false)}>
                                    Hủy
                                </button>
                                <button className="px-4 py-2 bg-orange-500 text-white rounded" onClick={() => setShowModal(false)}>
                                    Xác nhận
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )

}


export default TestContent;