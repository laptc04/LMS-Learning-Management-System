import React from "react";
import { useNavigate } from "react-router-dom";

const data = [
    { title: "Cấu hình", desc: "Theme, các thông tin khác về cấu hình", color: "bg-gradient-to-r from-[#FF5400] to-[#F17F21]", path: "/leadership/setting/system" },
    { title: "Thông tin trường", desc: "Thông tin chung của trường, các cơ sở", color: "bg-gradient-to-r from-[#FF5400] to-[#F17F21]", path: "/leadership/setting/system-school" },
    { title: "Người dùng hệ thống", desc: "Phân nhóm người dùng, quản lý thông tin người dùng và phân quyền sử dụng", color: "bg-gradient-to-r from-[#FF5400] to-[#F17F21]", path: "/leadership/setting/user-group-setting/user-group" },
    { title: "Thiết lập lớp học", desc: "Loại lớp cơ bản, nâng cao", color: "bg-gradient-to-r from-[#56CCF2] to-[#2F80ED]", path: "/leadership/setting/class-setting" },
    { title: "Thiết lập môn học", desc: "Thông tin các hệ đào tạo của trường", color: "bg-gradient-to-r from-[#56CCF2] to-[#2F80ED]", path: "/leadership/setting/subject-setting" },
    { title: "Quản lý trình độ đào tạo", desc: "Thông tin các hệ đào tạo của trường", color: "bg-gradient-to-r from-[#56CCF2] to-[#2F80ED]", path: "/leadership/setting/train-setting" },
];

const ButtonsSystem = () => {
    const navigate = useNavigate();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {data.map((item, index) => (
                <div
                    key={index}
                    className={`p-4 rounded-lg text-white ${item.color} shadow-md hover:shadow-lg transition-all cursor-pointer`}
                    onClick={() => navigate(item.path)}
                >
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="text-sm">{item.desc}</p>
                </div>
            ))}
        </div>
    );
};

export default ButtonsSystem;
