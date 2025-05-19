import React, { useRef, useState } from 'react';
import DatePicker from '../../../components/DatePicker';
import Button from '../../../components/Button';
import { Exam } from './index';
import { FaTimes } from 'react-icons/fa';
import { PaperclipIcon, XIcon } from 'lucide-react';

interface UpdateDiscountModalProps {
    isOpen: boolean;
    onClose: () => void;
    exam: Exam;
}

const Detail: React.FC<UpdateDiscountModalProps> = ({ isOpen, onClose, exam }) => {
    const formatDate = (date: Date): string => {
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    const today: string = formatDate(new Date());
    const [selectedDate, setSelectedDate] = useState<string | null>(today);
    const [content, setContent] = useState<string>('');
    const [fileName, setFileName] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFileName(event.target.files[0].name);
        }
    };

    const handleFileUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleRemoveFile = () => {
        setFileName('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const calculateEndDate = (startDate: string, duration: string): string => {
        const start = new Date(startDate.replace(/<br\s*\/?>/g, " ").replace(/^.*?,\s*/, ""));
        const [hours, minutes] = duration.replace(" phút", "").split(':').map(Number);
        const totalMinutes = hours * 60 + (minutes || 0);
        const end = new Date(start.getTime() + totalMinutes * 60000);
        return `${end.getDate().toString().padStart(2, '0')}/${(end.getMonth() + 1).toString().padStart(2, '0')}/${end.getFullYear()} - ${end.getHours().toString().padStart(2, '0')}:${end.getMinutes().toString().padStart(2, '0')}`;
    };

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="relative bg-white rounded-xl shadow-lg w-full max-w-3xl md:max-w-2xl lg:max-w-[900px] pt-6 pb-6 px-4 md:pt-6 md:pb-8 md:px-14">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:bg-gray-300 transition"
                >
                    <FaTimes className="w-7 h-8" style={{ color: "#823B00" }} />
                </button>
                <h2 className="text-[24px] sm:text-[28px] md:text-[30px] lg:text-[32px] font-bold mb-4 text-center">Xem chi tiết bài kiểm tra</h2>
                <div className="flex justify-between">
                    <div className="w-1/2 pr-10">
                        <div className="mb-3 flex">
                            <p className="font-bold w-1/3 text-start">Môn học:</p>
                            <p className="w-2/3 text-start">{exam.subject}</p>
                        </div>
                        <div className="mb-3 flex">
                            <p className="font-bold w-1/3 text-start">Lớp:</p>
                            <p className="w-2/3 text-start">{exam.class}</p>
                        </div>
                        <div className="mb-3 flex">
                            <p className="font-bold w-1/3 text-start">Khoa-khối:</p>
                            <p className="w-2/3 text-start">{exam.department}</p>
                        </div>
                        <div className="mb-3 flex">
                            <p className="font-bold w-1/3 text-start">Giảng viên:</p>
                            <p className="w-2/3 text-start">{exam.teacher}</p>
                        </div>
                    </div>

                    <div className="w-1/2 pl-20">
                        <div className="mb-3 flex">
                            <p className="font-bold w-1/3 text-start whitespace-nowrap flex-shrink-0">Thời gian:</p>
                            <p className="w-2/3 ml-11 overflow-hidden text-ellipsis whitespace-nowrap">{exam.time}</p>
                        </div>
                        <div className="mb-3 flex">
                            <p className="font-bold w-1/3 text-start whitespace-nowrap flex-shrink-0">Hình thức:</p>
                            <p className="w-2/3 ml-11 overflow-hidden text-ellipsis whitespace-nowrap">Tự luận</p>
                        </div>
                        <div className="mb-3 flex">
                            <p className="font-bold w-1/3 text-start whitespace-nowrap flex-shrink-0">Phân loại:</p>
                            <p className="w-2/3 ml-11 overflow-hidden text-ellipsis whitespace-nowrap">{exam.examcontent}</p>
                        </div>
                        <div className="mb-3 flex">
                            <p className="font-bold w-1/3 text-start whitespace-nowrap flex-shrink-0">Ngày bắt đầu:</p>
                            <p className="w-2/3 ml-11 overflow-hidden text-ellipsis whitespace-nowrap">
                                {exam.date.replace(/<br\s*\/?>/g, " - ").replace(/^.*?,\s*/, "")}
                            </p>
                        </div>
                        <div className="mb-3 flex">
                            <p className="font-bold w-1/3 text-start whitespace-nowrap flex-shrink-0">Ngày kết thúc:</p>
                            <p className="w-2/3 ml-11 overflow-hidden text-ellipsis whitespace-nowrap">
                                {calculateEndDate(exam.date, exam.time)}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border border-orange-400 rounded-lg p-6 bg-orange-50 mt-6 mb-12">
                    <div className="space-y-3">
                        <div className="mb-3 flex">
                            <p className="font-bold w-1/5 text-start whitespace-nowrap flex-shrink-0">Chủ đề:</p>
                            <p className="w-4/5 overflow-hidden text-ellipsis whitespace-nowrap">{exam.examcontent}</p>
                        </div>
                        <div className="mb-3 flex">
                            <p className="font-bold w-1/5 text-start whitespace-nowrap flex-shrink-0">Mô tả:</p>
                            <p className="w-4/5 overflow-hidden">Không có mô tả</p>
                        </div>
                        <div className="mb-3 flex">
                            <p className="font-bold w-1/5 text-start whitespace-nowrap flex-shrink-0">Cài đặt khác:</p>
                            <p className="w-4/5 overflow-hidden text-ellipsis whitespace-nowrap">Không có cài đặt khác</p>
                        </div>
                        <div className="mb-3 flex">
                            <label className="block font-bold w-1/5 text-start">
                                Tệp đính kèm:
                            </label>
                            <div className="w-4/5">
                                <div className="relative flex flex-col gap-2">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center border border-gray-300 rounded px-4 py-1 w-full bg-white shadow-sm">
                                            <PaperclipIcon className="w-6 h-6 text-[#ff7506] pr-2 border-r border-gray-300 scale-150 block" />
                                            <span className="flex-1 px-2 text-gray-600 truncate text-start pl-5 overflow-hidden whitespace-nowrap text-ellipsis max-w-[300px]">
                                                {fileName || 'Chưa chọn tệp'}
                                            </span>
                                            {fileName && (
                                                <button onClick={handleRemoveFile} className="text-red-500 hover:text-red-700 pl-12">
                                                    <XIcon className="w-5 h-5" />
                                                </button>
                                            )}
                                            <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
                                        </div>

                                        <button
                                            type="button"
                                            className="w-[200px] bg-[#FFD8B8] text-dark px-3 py-1 rounded border border-[#ff7506] shadow-md hover:bg-orange-600 hover:text-white transition"
                                            onClick={handleFileUploadClick}
                                        >
                                            Chọn tệp tải lên...
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-500 italic">
                                        Kiểu file <span className="font-medium">.pdf .jpeg .jpg</span>. Dung lượng tối đa 100MB.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center space-x-4 mb-4">
                    <Button label="Hủy" size="big" backgroundColor="#f2f2f2" onClick={onClose} variant="solid" textColor="black" />
                    <Button
                        label="Xác nhận"
                        size="big"
                        hoverBackgroundColor="#c9c4c0"
                        textColor="white"
                        onClick={() => {
                            onClose();
                        }}
                        variant="solid"
                    />
                </div>
            </div>
        </div>
    );
};

export default Detail;