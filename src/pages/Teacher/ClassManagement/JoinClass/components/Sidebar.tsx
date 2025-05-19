import { MoreVertical } from "lucide-react";
import React from "react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

const students = [
    { name: "Hiền Mai", avatar: "https://khoinguonsangtao.vn/wp-content/uploads/2022/11/hinh-anh-son-tung.jpg", openMic: true },
    { name: "Trần Thanh B", avatar: "https://khoinguonsangtao.vn/wp-content/uploads/2022/11/hinh-anh-son-tung.jpg", openMic: false },
    { name: "Triệu Thị M", avatar: "https://khoinguonsangtao.vn/wp-content/uploads/2022/11/hinh-anh-son-tung.jpg", openMic: false },
    { name: "Nguyễn Văn A", avatar: "https://khoinguonsangtao.vn/wp-content/uploads/2022/11/hinh-anh-son-tung.jpg", openMic: false },
    { name: "Phạm Văn C", avatar: "https://khoinguonsangtao.vn/wp-content/uploads/2022/11/hinh-anh-son-tung.jpg", openMic: true },
    { name: "Thanh Long", avatar: "https://khoinguonsangtao.vn/wp-content/uploads/2022/11/hinh-anh-son-tung.jpg", openMic: false },
    { name: "Bình Bình", avatar: "https://khoinguonsangtao.vn/wp-content/uploads/2022/11/hinh-anh-son-tung.jpg", openMic: false },
    { name: "Melanie", avatar: "https://khoinguonsangtao.vn/wp-content/uploads/2022/11/hinh-anh-son-tung.jpg", openMic: false },
];

const SidebarJoinClass = () => {
    return (
        <div className="w-1/5 bg-gray-100">
            <div className="bg-orange-800 text-white px-4 flex items-center justify-between">
                <h1 className="text-lg font-semibold text-center flex-1">Danh sách học viên</h1>
                <button className="p-2 hover:bg-orange-700 rounded">
                    <MoreVertical size={20} />
                </button>
            </div>

            {/* Student List */}
            <div className="p-4 space-y-4 max-h-screen overflow-y-auto">
                {students.map((student, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md hover:bg-gray-50 transition relative"
                    >
                        <img
                            src={student.avatar}
                            alt={student.name}
                            className="w-full h-[100px] object-cover"
                        />
                        <div className="flex items-center bg-black px-2 py-1 opacity-50 text-white absolute bottom-0 w-full">
                            <span className="text-white font-medium flex-1">
                                {student.name}
                            </span>
                            {student.openMic ? <FaMicrophone /> : <FaMicrophoneSlash />}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SidebarJoinClass;