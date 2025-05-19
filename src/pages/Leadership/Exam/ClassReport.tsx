import React, { useState, useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/index';
import Pagination from '../../../components/Pagination/index';
import FIList from '../../../assets/images/fi_list.png';
import FITrash2 from '../../../assets/images/fi_trash-2.png';
import UArrowUpDown from '../../../assets/images/fi_trash-2.png';
import FIEedit from '../../../assets/images/fi_edit.png';
interface ExamSchedule {
    id: string;
    maLop: string;
    tenLop: string;
    gvcn: string;
    hsThamGia: string;
    gvChamThi: string;
    xemDiem: boolean;
}

interface Option {
    id: number;
    value: string;
}

const StudentList: React.FC = () => {
    const [examSchedules, setExamSchedules] = useState<ExamSchedule[]>([
        {
            id: '1251468954',
            maLop: '6A',
            tenLop: '6A',
            gvcn: 'Nguyễn Văn A',
            hsThamGia: '45/50',
            gvChamThi: 'Nguyễn Văn A',
            xemDiem: true,
        },
        {
            id: '1251468954',
            maLop: '7A',
            tenLop: '6A',
            gvcn: 'Nguyễn Văn A',
            hsThamGia: '45/50',
            gvChamThi: 'Nguyễn Văn A',
            xemDiem: true,
        },
        {
            id: '1251468954',
            maLop: '7A',
            tenLop: '6A',
            gvcn: 'Nguyễn Văn A',
            hsThamGia: '50/50',
            gvChamThi: 'Nguyễn Văn A',
            xemDiem: true,
        },
        {
            id: '1251468954',
            maLop: '7A',
            tenLop: '6A',
            gvcn: 'Nguyễn Văn A',
            hsThamGia: '50/50',
            gvChamThi: 'Nguyễn Văn A',
            xemDiem: true,
        },
        {
            id: '1251468954',
            maLop: '8C',
            tenLop: '6A',
            gvcn: 'Nguyễn Văn A',
            hsThamGia: '50/50',
            gvChamThi: 'Nguyễn Văn A',
            xemDiem: true,
        },
        {
            id: '1251468954',
            maLop: '7A',
            tenLop: '6A',
            gvcn: 'Nguyễn Văn A',
            hsThamGia: '50/50',
            gvChamThi: 'Nguyễn Văn A',
            xemDiem: true,
        },
        {
            id: '1251468954',
            maLop: '7A',
            tenLop: '6A',
            gvcn: 'Nguyễn Văn A',
            hsThamGia: '50/50',
            gvChamThi: 'Nguyễn Văn A',
            xemDiem: true,
        },
        {
            id: '1251468954',
            maLop: '7A',
            tenLop: '6A',
            gvcn: 'Nguyễn Văn A',
            hsThamGia: '50/50',
            gvChamThi: 'Nguyễn Văn A',
            xemDiem: true,
        },
        {
            id: '1251468954',
            maLop: '7A',
            tenLop: '6A',
            gvcn: 'Nguyễn Văn A',
            hsThamGia: '50/50',
            gvChamThi: 'Nguyễn Văn A',
            xemDiem: true,
        },
        {
            id: '1251468954',
            maLop: '7A',
            tenLop: '6A',
            gvcn: 'Nguyễn Văn A',
            hsThamGia: '50/50',
            gvChamThi: 'Nguyễn Văn A',
            xemDiem: true,
        },
    ]);
    const [itemPerPages, setItemsPerPage] = useState(5);

    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isConfirming, setIsConfirming] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isActionDropdownOpen, setIsActionDropdownOpen] = useState<{ [key: string]: boolean }>({});
    const itemsPerPage = 8;
    const navigate = useNavigate();

    const handleDeleteSelected = () => {
        setExamSchedules(examSchedules.filter((schedule) => !selectedIds.includes(schedule.id)));
        setSelectedIds([]);
        setIsConfirming(false);
    };

    const getPaginatedStudents = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return examSchedules.slice(startIndex, endIndex);
    };

    const actionOptions: Option[] = [
        { id: 1, value: 'Chuyển lớp' },
        { id: 2, value: 'Bảo lưu' },
        { id: 3, value: 'Cập nhật miễn giảm' },
        { id: 4, value: 'Cập nhật khen thưởng' },
        { id: 5, value: 'Cập nhật kỷ luật' },
    ];

    return (
        <div className="w-full max-w-[1500px] h-auto bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold font-mulis">Danh sách bài thi</h2>
                <div className="relative max-w-lg w-full">
                    <input
                        type="text"
                        placeholder="Tìm kiếm"
                        className="w-full px-3 py-2 text-sm font-normal rounded-3xl pl-10 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-200 italic border border-gray-300"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <FaSearch className="text-gray-400" />
                    </div>
                </div>
            </div>

            <div className="overflow-hidden rounded-lg shadow-sm">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="text-white" style={{ background: 'linear-gradient(to right, #F17F21, #FF5400)' }}>
                            <th className="px-4 py-2 text-left text-lg w-1/12">
                                <div className="flex items-center">
                                    <span className="font-mulis">Mã lớp</span>
                                    <img src={UArrowUpDown} alt="Sort" className="w-5 h-5 ml-1" />
                                </div>
                            </th>
                            <th className="px-4 py-2 text-left text-lg w-1/12">
                                <div className="flex items-center">
                                    <span className="font-mulis">Tên Lớp</span>
                                    <img src={UArrowUpDown} alt="Sort" className="w-5 h-5 ml-1" />
                                </div>
                            </th>
                            <th className="px-4 py-2 text-left text-lg w-1/12">
                                <div className="flex items-center">
                                    <span className="font-mulis">GVCN</span>
                                    <img src={UArrowUpDown} alt="Sort" className="w-5 h-5 ml-1" />
                                </div>
                            </th>
                            <th className="px-4 py-2 text-left text-lg w-1/12">
                                <div className="flex items-center">
                                    <span className="font-mulis">HS tham gia</span>
                                    <img src={UArrowUpDown} alt="Sort" className="w-5 h-5 ml-1" />
                                </div>
                            </th>
                            <th className="px-4 py-2 text-left text-lg w-1/12">
                                <div className="flex items-center">
                                    <span className="font-mulis">GV chấm thi</span>
                                    <img src={UArrowUpDown} alt="Sort" className="w-5 h-5 ml-1" />
                                </div>
                            </th>
                            <th className="px-4 py-2 text-center text-lg w-1/12">Xem điểm</th>
                            <th className="px-4 py-2 text-center text-lg w-1/12">Hành động</th>
                        </tr>
                    </thead>
                </table>
                <div className="max-h-[307px] overflow-y-auto">
                    <table className="w-full border-collapse">
                        <tbody>
                            {getPaginatedStudents().map((schedule, index) => (
                                <tr key={schedule.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                    <td className="px-4 py-3 text-sm font-source-sans w-1/12 text-gray-800">{schedule.maLop}</td>
                                    <td className="px-4 py-3 text-sm font-source-sans w-1/12 text-gray-800">{schedule.tenLop}</td>
                                    <td className="px-4 py-3 text-sm font-source-sans w-1/12 text-gray-800">{schedule.gvcn}</td>
                                    <td className="px-4 py-3 text-sm font-source-sans w-1/12 text-gray-800">{schedule.hsThamGia}</td>
                                    <td className="px-4 py-3 text-sm font-source-sans w-1/12 text-gray-800">{schedule.gvChamThi}</td>
                                    <td className="px-4 py-3 text-center w-1/12">
                                        {schedule.xemDiem && (
                                            <button className="text-orange-500 hover:text-orange-700 mx-2">
                                                <img src={FIList} alt="Xem điểm" className="w-5 h-5" />
                                            </button>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-center w-1/12">
                                        <button onClick={() => setIsConfirming(true)} className="text-orange-500 hover:text-orange-700 mx-2">
                                            <img src={FIEedit} alt="sửa" className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => setIsConfirming(true)} className="text-orange-500 hover:text-orange-700 mx-2">
                                            <img src={FITrash2} alt="Xóa" className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isConfirming && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg" style={{ width: 435 }}>
                        <h3 className="text-2xl font-bold text-center">Xóa lịch thi</h3>
                        <p className="text-base mt-5 mb-10 font-normal font-source-sans">
                            Xác nhận muốn xóa những thông tin đã chọn? Sau khi xóa sẽ không thể hoàn tác.
                        </p>
                        <div className="flex justify-between w-full px-4 font-bold">
                            <Button
                                label="Hủy"
                                size="medium"
                                variant="outline"
                                onClick={() => setIsConfirming(false)}
                                textColor="#6B7280"
                                border="2px solid #6B7280"
                                hoverBackgroundColor="rgba(107, 114, 128, 0.1)"
                            />
                            <Button
                                label="Xác nhận"
                                size="medium"
                                variant="solid"
                                onClick={handleDeleteSelected}
                                textColor="#ffffff"
                                backgroundColor="#FF7506"
                                hoverBackgroundColor="#E06504"
                            />
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-4 flex items-center justify-between">

                <Pagination
                    limit={itemsPerPage}
                    activation={currentPage}
                    max={Math.ceil(examSchedules.length / itemsPerPage)}
                    onPageChange={(page) => setCurrentPage(page)}
                    onLimitChange={(limit) => setItemsPerPage(limit)}
                />
            </div>
        </div>
    );
};

export default StudentList;