import React, { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import Editor from '../../../../components/Editor';
import { FaFileWord, FaFileImage, FaCheckCircle } from "react-icons/fa";
import CountdownTimer from './CountdownTimer';


type FileItem = {
    name: string;
    size: string;
    type: string; // "doc" | "jpeg" | "png"

};
const EditorTest: React.FC = () => {
    const [content, setContent] = useState<string>('');
    const [uploadedFiles, setUploadedFiles] = useState<FileItem[]>([]);

    const handleImageUpload = (file: File) => {
        console.log('Uploaded Image:', file);
    };

    // Xử lý khi người dùng chọn file
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        const file = files[0]; // Chỉ lấy 1 file duy nhất
        const fileSizeMB = file.size / (1024 * 1024); // Chuyển thành MB
        const fileType = file.name.endsWith(".doc") || file.name.endsWith(".docx") ? "doc"
            : file.name.endsWith(".png") || file.name.endsWith(".jpg") || file.name.endsWith(".jpeg") ? "image"
                : null;

        if (!fileType) {
            alert("Chỉ chấp nhận file .doc, .docx, .png, .jpg, .jpeg");
            return;
        }

        if (fileSizeMB > 50) {
            alert("Dung lượng file không được vượt quá 50MB");
            return;
        }

        setUploadedFiles(prevFiles => {
            // Xóa file cũ cùng loại (nếu có)
            const updatedFiles = prevFiles.filter(f => f.type !== fileType);
            return [...updatedFiles, { name: file.name, size: `${fileSizeMB.toFixed(2)} MB`, type: fileType }];
        });
    };

    return (
        <div >
            <div className="text-lg flex items-center space-x-2 mb-8">
                <Link to="/leadership/teacher/teaching-assignment/" className="text-gray-400">
                    Bài kiểm tra
                </Link>

                <span className="text-orange-500">{'>'}</span>

                <Link to="/leadership/teacher/teaching-assignment/" className="text-gray-400">
                    Làm bài
                </Link>

                <span className="text-orange-500">{'>'}</span>

                <span className="font-bold text-4xl text-black font-mulish">10A1</span>
            </div>
            {/* Thông tin bài kiểm tra */}
            <div className="flex text-14px text-gray-800 justify-between items-start">
                {/* Cột trái */}
                <div className="flex">
                    <div className="grid grid-cols-1">
                        <p><strong className="w-20 h-1 inline-block">Môn học:</strong> Toán</p> <br />
                        <p><strong className="w-20 inline-block">Lớp:</strong> 10A1</p>
                    </div>

                    {/* Thanh phân cách */}
                    <div className="border-r border-gray-300 h-auto mx-10"></div>

                    {/* Cột giữa */}
                    <div className="grid grid-cols-1">
                        <p><strong className="w-28 inline-block">Ngày kiểm tra:</strong> Thứ 5 - Ngày 10 Tháng 8, 2020</p> <br />
                        <p><strong className="w-28 inline-block">Thời lượng:</strong> 45 phút</p>
                    </div>

                    {/* Thanh phân cách */}
                    <div className="border-r border-gray-300 h-auto mx-10"></div>

                    {/* Cột phải */}
                    <div className="grid grid-cols-1">
                        {/* Đề bài */}
                        <p><strong className="w-28 inline-block">Đề bài:</strong> Đề A</p>

                        {/* Tệp đính kèm */}
                        <div className="flex items-center">
                            <strong className="w-28 inline-block">Tệp đính kèm:</strong>
                            <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md">
                                <span className="flex items-center text-gray-500 mr-2">
                                    <img src="/icon/u_paperclip.png" alt="Paperclip" className="w-4 h-4" />
                                    <span className="ml-1">|</span>
                                </span>
                                <span className="text-gray-800">DSTT_KT45P_12A1.doc</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Đồng hồ đếm ngược (Nằm bên phải) */}
                <div className="ml-auto flex items-center">
                    <CountdownTimer initialMinutes={11} />
                </div>
            </div>

            <h3 className="text-lg font-semibold mt-6 mb-3">Phần trả lời của học sinh</h3>
            <div className="max-w-8xl flex">
                {/* Khu vực tải file */}
                <div className="w-1/4 bg-gray-100 p-4 rounded-lg shadow-md">
                    <h4 className=" font-semibold mb-8">Tệp đính kèm của học sinh:</h4>
                    <div className="space-y-3 mb-4">
                        {uploadedFiles.map((file, index) => (
                            <div key={index} className="flex items-center bg-white p-2 rounded-lg shadow-sm border">
                                {/* Icon file */}
                                {file.type === "doc" ? (
                                    <FaFileWord className="text-blue-500 text-2xl mr-2" />
                                ) : (
                                    <FaFileImage className="text-gray-500 text-2xl mr-2" />
                                )}

                                <div className="flex-1">
                                    <p className="text-sm font-semibold truncate w-52" title={file.name}>
                                        {file.name}
                                    </p>
                                    <p className="text-xs text-gray-500">{file.size}</p>
                                </div>

                                {/* Icon xác nhận */}
                                <FaCheckCircle className="text-green-500 text-xl mb-4" />
                            </div>
                        ))}
                    </div>
                    <hr className="my-2 border-gray-300" />

                    <p className="font-semibold mt-2">*Qui định nộp bài:</p>
                    <ul className="text-sm text-gray-600 list-disc pl-4 mt-1 ml-[-16px]">
                        <p>- Mỗi học viên chỉ được gửi tối đa 1 file word (.doc, .docx) và 1 file ảnh (.png, .jpg, .jpeg). Dung lượng tối đa là 50MB</p>
                        <p>Khi tải lên một File tương ứng, File cũ sẽ bị xóa.</p> <br />
                        <p>- Học viên có thể lưu bài nhiều lần. Khi hết thời lượng làm bài, hệ thống sẽ tự động đóng bài kiểm tra. Kết quả được tính dựa theo lần lưu sau cùng.</p>
                    </ul>

                    <div className="flex justify-center items-center mt-4">
                        {/* Input file ẩn */}
                        <input
                            type="file"
                            accept=".doc,.docx,.png,.jpg,.jpeg"
                            className="hidden"
                            id="fileUpload"
                            onChange={handleFileChange}
                        />

                        {/* Nút chọn file */}
                        <button
                            className="bg-orange-200 text-black font-semibold py-1 px-4 rounded-md border border-orange-500 
                   hover:bg-orange-300 transition shadow-md"
                            onClick={() => document.getElementById("fileUpload")?.click()}
                        >
                            Chọn File
                        </button>
                    </div>

                </div>

                {/* Trình soạn thảo văn bản */}
                <div className="w-5/6 ">
                    <Editor value={content} onChange={setContent} onImageUpload={handleImageUpload} />
                </div>
            </div>
            <div className="flex justify-center items-center mt-4 space-x-4">
                {/* Nút Lưu bài */}
                <button
                    className="bg-orange-500 text-white font-semibold py-2 px-6 rounded-lg 
                   hover:bg-orange-600 transition shadow-md text-lg"
                >
                    Lưu bài
                </button>

                {/* Thông báo đã lưu */}
                <span className="text-sm text-blue-500">Đã lưu lần cuối lúc 10h28.</span>
            </div>
        </div>
    );
};

export default EditorTest;
