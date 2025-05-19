import React, { useState } from "react";
import { FaPaperclip, FaSort } from "react-icons/fa";
import Dropdown from "../../../../components/Dropdown";
import Button from "../../../../components/Button";

const GradingInterface: React.FC = () => {
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
        }
    };

    const handleSave = () => {
        // Logic lưu (gửi dữ liệu form, ...)
        console.log('Lưu');
    };

    const handleGrade = () => {
        // Logic lưu (gửi dữ liệu form, ...)
        console.log('Lưu');
    };
    return (
        <div>
            <h1 className="text-3xl font-bold ms-3">Chấm điểm</h1>

            <div className="flex justify-end mt-4">
                <Button
                    label="Chấm điểm"
                    size="big"
                    variant="solid"
                    onClick={handleGrade}
                    textColor="white"
                    backgroundColor="#ff7506"
                    hoverBackgroundColor="#e06504"
                />
            </div>
            <div className="bg-white rounded-lg shadow-lg w-full max-w-8xl p-6 mt-3 flex">

                {/* Left Section */}
                <div className="w-1/4 pr-4">

                    <h5 className="mb-3"><strong>Môn học:</strong> Ngữ Văn</h5>
                    <h5 className="mb-3"><strong>Lớp:</strong> 10C1</h5>
                    <h5 className="mb-3"><strong>Thời gian:</strong> Thứ 6, 20/10/2020 13:00</h5>
                    <h5 className="mb-3"><strong>Phân loại:</strong> KT 15 phút</h5>
                    <h5 className="mb-3"><strong>Đề bài:</strong> Lorem ih5sum dolor sit amet</h5>
                    <div className="flex items-center justify-between">
                        <label className="font-medium">
                            Tệp đính kèm
                        </label>
                        <div className="w-2/3 flex items-center gap-8">
                            <div className="flex items-center bg-gray-100 border border-gray-300 rounded-md p-2 w-3/3">
                                {/* Ô chứa icon */}
                                <div className="pr-4 border-r border-gray-400 flex items-center">
                                    <FaPaperclip style={styles.action__icon} />
                                </div>

                                {/* Ô chứa tên file */}
                                <div className="pl-4 flex-1">
                                    <span className="text-gray-500">DSTT_KT45P_12A1.doc</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Student List */}
                    <div className="flex justify-between items-center mt-4">
                        <h3 className="text-lg font-semibold">Danh Sách Học Viên</h3>
                        <Dropdown
                            options={[{ id: 1, value: "Tất cả" }, { id: 2, value: "Chưa chấm" }, { id: 3, value: "Đã chấm" }]}
                            width="short"
                        />
                    </div>
                    <table className="w-full mt-4 border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-white-200">
                                <th className="border p-2 text-orange-700">STT</th>
                                <th className="border p-2 text-orange-700">
                                    Họ và Tên <FaSort className="ml-2 inline-block" />
                                </th>
                                <th className="border p-2 text-orange-700">Điểm</th>
                            </tr>

                        </thead>
                        <tbody>
                            {["Nguyễn Văn A", "Trần Thanh B", "Nguyễn Văn B", "Nguyễn Văn X", "Ngô Bảo Nhi", "Bảo Quang Huy", "Nguyễn Ngọc Nhi", "Nguyễn Văn D", "Võ Tân Mĩ"].map((name, index) => (
                                <tr key={index} className="border">
                                    <td className="border p-2 text-center">{index + 1}</td>
                                    <td className="border p-2 font-semibold">{name}</td>
                                    <td className="border p-2 text-center">{index >= 5 ? (Math.random() * 3 + 7).toFixed(2) : "--"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Middle Section - Subject Content */}
                <div className="w-1/2 px-4 border-l border-r max-h-[200px] overflow-y-auto">
                    <h3 className="text-lg font-semibold text-center">Ngữ Văn</h3>
                    <p className="font-bold text-orange-600">Câu 1:</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc egestas imperdiet enim in dictum.</p>
                    <p className="font-bold text-orange-600 mt-4">Câu 2:</p>
                    <p>In porta iaculis ipsum quis facilisis. Donec tristique interdum luctus. Maecenas pulvinar, erat id lobortis ullamcorper.</p>
                    <p className="mt-4">Etiam molestie tempus eros, a aliquam dui congue quis. Fusce vulputate tincidunt ipsum.</p>
                </div>


                {/* Right Section */}
                <div className="w-1/4 pl-4 space-y-4">
                    <h5><strong>Ngày nộp bài:</strong> 20/10/2020 13:00</h5>
                    <h5><strong>Thời gian làm bài:</strong> 13m45s</h5>

                    <hr className="border-gray-300 my-4" />

                    <div className="space-y-3">
                        <label className="font-medium">Tệp đính kèm</label>
                        <div className="flex items-center bg-gray-100 border border-gray-300 rounded-md p-2">
                            {/* Ô chứa icon */}
                            <div className="pr-4 border-r border-gray-400 flex items-center">
                                <FaPaperclip style={styles.action__icon} />
                            </div>
                            {/* Ô chứa tên file */}
                            <div className="pl-4 flex-1">
                                <span className="text-gray-500">DSTT_KT45P_12A1.doc</span>
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-300 my-4" />


                    <div className="space-y-3">
                        <label className="block font-semibold">Điểm số:</label>
                        <input type="number" className="w-full p-2 border rounded" defaultValue={9} />
                        <p className="text-sm text-gray-500">
                            <span className="text-orange-500" style={styles.action__icon}>⚠</span> Điểm số được tính theo thang điểm 10.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <label className="block font-semibold">Nhận xét:</label>
                        <textarea className="w-full p-2 border rounded h-40" placeholder="Nhận xét..." />
                    </div>
                    <div className="flex justify-center">
                        <Button
                            label="Lưu"
                            size="big"
                            variant="solid"
                            onClick={handleSave}
                            textColor="white"
                            backgroundColor="#FF7506 "
                            hoverBackgroundColor="#45a049"
                        />
                    </div>

                </div>

            </div>
        </div>
    );
};
const styles = {
    action__icon: {
        color: '#ff7506',
        fontSize: '20px',
    },
};
export default GradingInterface;