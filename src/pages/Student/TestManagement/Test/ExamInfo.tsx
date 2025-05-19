import { Paperclip } from "lucide-react";
import { Link } from "react-router-dom";

const ExamInfo = ({ info }: { info: any }) => {
    if (!info) return null; // Không render gì nếu chưa có info

    const {
        className,
        subjectName,
        startDate,
        duration,
        title,
        attachmentFileName,
        attachmentFileUrl
    } = info;

    return (
        <div>
            <div className="text-lg flex items-center space-x-2 mb-8">
                <Link to="/student/test-management" className="text-gray-400">
                    Bài kiểm tra
                </Link>

                <span className="text-orange-500">{'>'}</span>

                <span className="font-bold text-4xl text-black font-mulish">{className}</span>
            </div>

            <div className="flex text-[14px] text-gray-800 justify-between items-start">
                <div className="flex flex-wrap gap-10">
                    <div className="grid grid-cols-1">
                        <p><strong className="w-24 inline-block">Môn học:</strong> {subjectName}</p><br />
                        <p><strong className="w-24 inline-block">Lớp:</strong> {className}</p>
                    </div>

                    <div className="border-r border-gray-300 h-auto"></div>

                    <div className="grid grid-cols-1">
                        <p><strong className="w-32 inline-block">Ngày kiểm tra:</strong> {startDate}</p><br />
                        <p><strong className="w-32 inline-block">Thời lượng:</strong> {duration} phút</p>
                    </div>

                    <div className="border-r border-gray-300 h-auto"></div>

                    <div className="grid grid-cols-1">
                        <p><strong className="w-32 inline-block">Đề bài:</strong> {title || "Không có"}</p>
                        <div className="flex items-center mt-2">
                            <strong className="w-32 inline-block">Tệp đính kèm:</strong>
                            {attachmentFileName && attachmentFileUrl ? (
                                <a
                                    href={attachmentFileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center bg-gray-100 px-3 py-2 rounded-md hover:underline text-blue-600"
                                >
                                    <Paperclip className="w-4 h-4 mr-2" />
                                    {attachmentFileName}
                                </a>
                            ) : (
                                <span className="text-gray-500">Không có</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExamInfo;
