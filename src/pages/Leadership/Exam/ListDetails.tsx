import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Pagination from '../../../components/Pagination/index';
import Button from '../../../components/Button/index';

interface ExamSchedule {
    id: string;
    hoVaTen: string;
    ngaySinh: string;
    chuyenCan: number;
    mieng: number;
    test15Phut: number;
    heSo1: number;
    heSo2: number;
    trungBinh: number;
    diemTrungBinhCaNam: number;
    boi: boolean;
    ngayCapNhat: string;
}

const StudentList: React.FC = () => {
    const [examSchedules, setExamSchedules] = useState<ExamSchedule[]>([
        {
            id: '1',
            hoVaTen: 'Nguyễn Văn A',
            ngaySinh: '01/02/2004',
            chuyenCan: 9,
            mieng: 7,
            test15Phut: 8,
            heSo1: 8,
            heSo2: 6,
            trungBinh: 7.2,
            diemTrungBinhCaNam: 7.0,
            boi: true,
            ngayCapNhat: '16:00 20/10/2020',
        },
        {
            id: '2',
            hoVaTen: 'Trần Thanh B',
            ngaySinh: '14/12/2004',
            chuyenCan: 9,
            mieng: 7,
            test15Phut: 8,
            heSo1: 8,
            heSo2: 6,
            trungBinh: 7.2,
            diemTrungBinhCaNam: 4.8,
            boi: false,
            ngayCapNhat: '16:00 20/10/2020',
        },
        {
            id: '3',
            hoVaTen: 'Nguyễn Văn B',
            ngaySinh: '14/10/2004',
            chuyenCan: 9,
            mieng: 7,
            test15Phut: 8,
            heSo1: 8,
            heSo2: 6,
            trungBinh: 7.2,
            diemTrungBinhCaNam: 7.6,
            boi: true,
            ngayCapNhat: '16:00 20/10/2020',
        },
        {
            id: '4',
            hoVaTen: 'Nguyễn Văn X',
            ngaySinh: '18/02/2004',
            chuyenCan: 9,
            mieng: 7,
            test15Phut: 8,
            heSo1: 8,
            heSo2: 6,
            trungBinh: 7.2,
            diemTrungBinhCaNam: 7.2,
            boi: true,
            ngayCapNhat: '16:00 20/10/2020',
        },
        {
            id: '5',
            hoVaTen: 'Bùi Bảo Nhi',
            ngaySinh: '14/12/2004',
            chuyenCan: 9,
            mieng: 7,
            test15Phut: 8,
            heSo1: 8,
            heSo2: 6,
            trungBinh: 7.2,
            diemTrungBinhCaNam: 8.5,
            boi: true,
            ngayCapNhat: '16:00 20/10/2020',
        },
        {
            id: '6',
            hoVaTen: 'Bùi Quang Nhi',
            ngaySinh: '20/07/2004',
            chuyenCan: 9,
            mieng: 7,
            test15Phut: 8,
            heSo1: 8,
            heSo2: 6,
            trungBinh: 7.2,
            diemTrungBinhCaNam: 1.3,
            boi: false,
            ngayCapNhat: '16:00 20/10/2020',
        },
        {
            id: '7',
            hoVaTen: 'Nguyễn Ngọc Nhi',
            ngaySinh: '21/12/2004',
            chuyenCan: 9,
            mieng: 7,
            test15Phut: 8,
            heSo1: 8,
            heSo2: 6,
            trungBinh: 7.2,
            diemTrungBinhCaNam: 9.3,
            boi: true,
            ngayCapNhat: '16:00 20/10/2020',
        },
        {
            id: '8',
            hoVaTen: 'Nguyễn Văn D',
            ngaySinh: '30/09/2004',
            chuyenCan: 9,
            mieng: 7,
            test15Phut: 8,
            heSo1: 8,
            heSo2: 6,
            trungBinh: 7.2,
            diemTrungBinhCaNam: 4.0,
            boi: false,
            ngayCapNhat: '16:00 20/10/2020',
        },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const getPaginatedStudents = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return examSchedules.slice(startIndex, endIndex);
    };

    return (
        <div className="w-full max-w-[1500px] h-auto bg-white rounded-lg shadow-md p-6">
            <div className="mb-4">
                <div className="flex items-center space-x-4">
                    <div>

                        <select className="border border-black rounded px-2 py-1">
                            <option>2021-2025</option>
                            <option>2022</option>
                        </select>
                    </div>
                    <div>

                        <select className="border border-black rounded px-2 py-1">
                            <option>chọn lớp</option>
                            <option>Toán</option>
                            <option>Anh</option>
                        </select>
                    </div>
                    <div>

                        <select className="border border-black rounded px-2 py-1">
                            <option>chọn khối</option>
                            <option>10C2</option>
                        </select>
                    </div>
                    <div>

                        <select className="border border-black rounded px-2 py-1">
                            <option>chọn môn</option>
                            <option>10C2</option>
                        </select>
                    </div>

                </div>
                <div className="border border-orange-300 rounded-lg p-4 bg-orange-50 mt-4">
                    <h2 className="text-orange-600 font-semibold mb-2">Kết quả tìm kiếm</h2>

                    <div className="flex justify-between items-start gap-4">

                        <div className="text-gray-700 space-y-2 flex-1">
                            <p>
                                <span className="font-semibold">Môn học:</span> Ngữ Văn
                            </p>
                            <p>
                                <span className="font-semibold">Lớp:</span> 10C1
                            </p>
                            <p>
                                <span className="font-semibold">Mã lớp:</span> 134 2665 3563
                            </p>
                            <p>
                                <span className="font-semibold">Thời gian bắt đầu:</span> Thứ 6, 20/10/2020 - 13:00 (GMT +7 Bangkok)
                            </p>
                        </div>


                        <div className="flex flex-col items-end space-y-2">
                            <span className="font-semibold text-gray-700 text-start">In bảng điểm:</span>
                            <div className="flex items-center gap-2">
                                <Button
                                    label="Xuất file"
                                    size="medium"
                                    variant="solid"
                                    textColor="#ffffff"
                                    backgroundColor="#FF7506"
                                    hoverBackgroundColor="#E06504"
                                    onClick={() => console.log('Xuất file Excel')}
                                />
                                <select className="border border-gray-300 rounded-md px-2 py-1 text-gray-700">
                                    <option>Excel - .xlsx</option>
                                    <option>PDF - .pdf</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-4 mt-5">
                    <h2 className="text-2xl font-bold font-mulis">Bảng điểm của lớp</h2>
                    <div className="relative max-w-lg w-full">
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo ID hoặc tên môn học"
                            className="w-full px-3 py-2 text-sm font-normal rounded-3xl pl-10 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-200 italic border border-gray-300"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <FaSearch className="text-gray-400" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="overflow-hidden rounded-lg shadow-sm">
                <table className="w-full border-collapse">
                    <thead>

                        <tr className="text-white" style={{ background: 'linear-gradient(to right, #F17F21, #FF5400)' }}>
                            <th className="px-4 py-2 text-left text-lg w-1/12 "></th>
                            <th className="px-4 py-2 text-left text-lg w-2/12 "></th>
                            <th className="px-4 py-2 text-left text-lg w-1/12 border-r  border-r-zinc-400"></th>
                            <th className="px-4 py-2 text-center text-lg border-r border-b border-r-zinc-400 border-b-zinc-400" colSpan={6}>
                                <div className="flex items-center justify-center">
                                    <span className="font-mulis">HỌC KỲ 1</span>
                                </div>
                            </th>
                            <th className="px-4 py-2 text-left text-lg w-1/12 "></th>
                            <th className="px-4 py-2 text-center text-lg w-1/12 "></th>
                            <th className="px-4 py-2 text-left text-lg w-1/12 "></th>
                        </tr>

                        {/* Hàng thứ hai với các tiêu đề cột riêng lẻ */}
                        <tr className="text-white" style={{ background: 'linear-gradient(to right, #F17F21, #FF5400)' }}>
                            <th className="px-4 py-2 text-left text-lg w-1/12 
                        ">
                                <div className="flex items-center">
                                    <span className="font-mulis text-sm">STT</span>
                                </div>
                            </th>
                            <th className="px-4 py-2 text-left text-sm w-2/12 ">
                                <div className="flex items-center">
                                    <span className="font-mulis">Họ và tên</span>
                                </div>
                            </th>
                            <th className="px-4 py-2 text-left text-sm w-1/12 border-r border-r-zinc-400">
                                <div className="flex items-center">
                                    <span className="font-mulis">Ngày sinh</span>
                                </div>
                            </th>
                            <th className="px-4 py-2 text-left text-sm w-1/12">
                                <div className="flex items-center">
                                    <span className="font-mulis">Chuyên cần</span>
                                </div>
                            </th>
                            <th className="px-4 py-2 text-left text-sm w-1/12 e">
                                <div className="flex items-center">
                                    <span className="font-mulis">Miêng</span>
                                </div>
                            </th>
                            <th className="px-4 py-2 text-left text-sm w-1/12 ">
                                <div className="flex items-center">
                                    <span className="font-mulis">15 phút</span>
                                </div>
                            </th>
                            <th className="px-4 py-2 text-left text-sm w-1/12 ">
                                <div className="flex items-center">
                                    <span className="font-mulis">Hệ số 1</span>
                                </div>
                            </th>
                            <th className="px-4 py-2 text-left text-sm w-1/12 ">
                                <div className="flex items-center">
                                    <span className="font-mulis">Hệ số 2</span>
                                </div>
                            </th>
                            <th className="px-4 py-2 text-left text-sm w-1/12 border-r border-r-zinc-400">
                                <div className="flex items-center">
                                    <span className="font-mulis">Trung bình</span>
                                </div>
                            </th>
                            <th className="px-4 py-2 text-left text-sm w-1/12 ">
                                <div className="flex items-center">
                                    <span className="font-mulis">Điểm trung bình cả năm</span>
                                </div>
                            </th>
                            <th className="px-4 py-2 text-center text-sm w-1/12">
                                <div className="flex items-center justify-center">
                                    <span className="font-mulis">Đạt</span>
                                </div>
                            </th>
                            <th className="px-4 py-2 text-left text-sm w-1/12">
                                <div className="flex items-center">
                                    <span className="font-mulis">Ngày cập nhật</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {getPaginatedStudents().map((schedule, index) => (
                            <tr key={schedule.id} >
                                <td className="px-4 py-3 text-sm font-source-sans w-1/12 text-gray-800 ">{index + 1 + (currentPage - 1) * itemsPerPage}</td>

                                <td className="px-4 py-3 text-sm font-source-sans w-2/12 text-gray-800  border-b border-gray-200 ">{schedule.hoVaTen}</td>
                                <td className="px-4 py-3 text-sm font-source-sans w-1/12 text-gray-800 border-b border-gray-200 border-r border-l-stone-600">{schedule.ngaySinh}</td>
                                <td className="px-4 py-3 text-sm font-source-sans w-1/12 text-gray-800 border-b border-gray-200 ">{schedule.chuyenCan}</td>
                                <td className="px-4 py-3 text-sm font-source-sans w-1/12 text-gray-800 border-b border-gray-200">{schedule.mieng}</td>
                                <td className="px-4 py-3 text-sm font-source-sans w-1/12 text-gray-800 border-b border-gray-200">{schedule.test15Phut}</td>
                                <td className="px-4 py-3 text-sm font-source-sans w-1/12 text-gray-800 border-b border-gray-200">{schedule.heSo1}</td>
                                <td className="px-4 py-3 text-sm font-source-sans w-1/12 text-gray-800 border-b border-gray-200">{schedule.heSo2}</td>

                                <td className="px-4 py-3 text-sm font-source-sans w-1/12 text-blue-600 border-r border-l-stone-600 border-b border-gray-200">{schedule.trungBinh}</td>

                                <td
                                    className={`px-4 py-3 text-sm font-source-sans w-1/12 border-b border-gray-200 ${schedule.diemTrungBinhCaNam < 5 ? 'text-red-600' : 'text-green-600'} `}
                                >
                                    {schedule.diemTrungBinhCaNam}
                                </td>
                                <td className="px-4 py-3 text-center w-1/12 text-gray-800 border-b border-gray-200 ">
                                    {schedule.boi ? (
                                        <span className="text-green-500 border-b border-gray-200">✔</span>
                                    ) : (
                                        <span className="text-red-500 border-b border-gray-200">✘</span>
                                    )}
                                </td>
                                <td className="px-4 py-3 text-sm font-source-sans w-1/12 text-gray-800 border-b border-gray-200">{schedule.ngayCapNhat}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default StudentList;