import React, { useEffect, useState } from 'react';
import { FaEdit, FaExclamation, FaInfoCircle, FaSearch, FaSort, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Dropdown from '../../../../components/Dropdown';
import DatePicker from '../../../../components/DatePicker';
import apiInstance from '../../../../services/api';

interface DropdownOption {
    id: number;
    value: string;
}

interface DropdownProps {
    options: DropdownOption[];
    onChange: (selected: DropdownOption) => void;
    value?: string;
}

interface TestItem {
    id: number;
    className: string;
    contentTest: string;
    subjectName: string;
    dateOfExam: string;
    duration: string;
    status: string | null;
    graded: string;
}

export default function AllTestList() {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [pageNumber, setPageNumber] = useState(8);

    const [currentPage, setCurrentPage] = useState(1);

    const [tests, setTests] = useState<TestItem[]>([]);

    const filteredData = tests.filter((item) => item.className.toLowerCase().includes(keyword.toLowerCase()));

    const totalPages = Math.ceil(filteredData.length / pageNumber);

    const paginatedData = filteredData.slice((currentPage - 1) * pageNumber, currentPage * pageNumber);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleDelete = () => {
        if (deleteId) {
            setTests(tests.filter((type) => type.id !== deleteId));
            setDeleteId(null);
        }
    };

    const subjectOptions: DropdownOption[] = [
        { id: 1, value: "Ngữ Văn " },
        { id: 2, value: "Toán" },
        { id: 3, value: "Vật lý" }

    ];
    const blockOptions: DropdownOption[] = [
        { id: 1, value: "Khối 10 " },
        { id: 2, value: "Khối 11" },
        { id: 3, value: "Khối 12" }

    ];
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const formatDateIntl = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("vi-VN", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        }).format(date);
    };
    useEffect(() => {
        const fetchTeacherTestData = async () => {
            try {
                const response = await apiInstance.get('/api/teachertestexam');
                console.log("Dữ liệu từ API:", response.data);
                setTests(response.data.data.items || []); // giả sử response.data.data chứa mảng
            } catch (err) {
                console.error("Lỗi khi gọi API:", err);
                setError("Không thể tải dữ liệu");
            } finally {
                setLoading(false);
            }
        };

        fetchTeacherTestData();
    }, []);
    const formatDateVN = (input: string): string => {
        const date = new Date(input);

        if (isNaN(date.getTime())) return "Ngày không hợp lệ";

        // Tùy chọn định dạng tiếng Việt
        const options: Intl.DateTimeFormatOptions = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            weekday: 'long',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        };

        // Format thời gian kiểu "07:00 SA Chủ Nhật, 10/03/2024"
        return new Intl.DateTimeFormat('vi-VN', options).format(date);
    };

    return (
        <div>
            <div className="bg-white rounded-lg shadow-lg w-full max-w-8xl p-6 mt-1">
                <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
                    {/* Bộ lọc bên trái */}
                    <div className="flex items-center gap-4">
                        {/* Dropdown chọn bộ môn */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700">Chọn bộ môn</label>
                            <Dropdown
                                options={subjectOptions}
                                width="short"
                            />
                        </div>

                        {/* Dropdown chọn khối */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700">Chọn khối</label>
                            <Dropdown
                                options={blockOptions}
                                width="short"
                            />
                        </div>

                        {/* Date Picker */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700">Chọn ngày</label>
                            <DatePicker
                                value={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                placeholder="Chọn ngày"
                                width="300px"
                                height="32px"
                                className="h-10"
                            />



                        </div>

                        <div >
                            <label className="invisible block text-sm font-bold text-gray-700">Lọc</label>

                            <Button
                                label="Lọc kết quả"
                                size="medium"
                                variant="solid"
                                backgroundColor="#FF7506"
                                textColor="white"
                                onClick={() => console.log('Hủy')}
                            />
                        </div>
                    </div>

                    {/* Ô tìm kiếm bên phải */}
                    <div className="relative">
                        <Input
                            type="search"
                            placeholder="Tìm kiếm theo tên topic"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            icon={<FaSearch />}
                            background='light grey'
                            size="medium"
                            borderRadius="16px"
                        />
                    </div>
                </div>
                {/* Bảng dữ liệu */}
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse">
                        <thead>
                            <tr className="bg-orange-500 text-white text-sm font-semibold">
                                <th className="px-4 py-2 text-center w-[150px]">
                                    <div className="flex items-center justify-center"> {/* Thêm justify-center */}
                                        <span className="me-2">Lớp</span>
                                        <FaSort />
                                    </div>
                                </th>
                                <th className="px-4 py-2 text-center w-[200px]">Nội dung kiểm tra</th>

                                <th className="px-4 py-2 text-center w-[200px]">
                                    <div className="flex items-center justify-center"> {/* Thêm justify-center */}
                                        <span className="me-2">Môn học</span>
                                        <FaSort />
                                    </div>
                                </th>
                                <th className="px-4 py-2 text-center w-[200px]">Ngày làm bài</th>
                                <th className="px-4 py-2 text-center w-[200px]">Thời lượng</th>
                                <th className="px-4 py-2 text-center w-[200px]">Tình trạng</th>
                                <th className="px-4 py-2 text-center w-[200px]">Bài làm</th>
                                <th className="px-4 py-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.length > 0 ? (
                                paginatedData.map((test, index) => (
                                    <tr key={index} className="odd:bg-white even:bg-gray-200">
                                        <td className="px-4 py-4 text-gray-700 text-sm">{test.className}</td>
                                        <td className="px-4 py-4 text-gray-700 text-sm">{test.contentTest}</td>
                                        <td className="px-4 py-4 text-gray-700 text-sm">{test.subjectName}</td>
                                        <td className="px-4 py-4 text-gray-700 text-sm text-center">
                                            {formatDateVN(test.dateOfExam)}
                                        </td>
                                        <td className="px-4 py-4 text-gray-700 text-sm text-center">{test.duration}</td>

                                        {/* Cột Tình Trạng */}
                                        <td
                                            className={`px-4 py-4 text-sm font-bold text-center ${test.status === "Chưa bắt đầu"
                                                ? "text-red-500"
                                                : test.status === "Đang diễn ra"
                                                    ? "text-blue-500"
                                                    : "text-green-500"
                                                }`}
                                        >
                                            {test.status || "Chưa có"}
                                        </td>

                                        {/* Cột Bài Làm */}
                                        <td className="px-4 py-4 text-center">
                                            {test.graded === "Chưa chấm" ? (
                                                <Button
                                                    label={"Chấm điểm"}
                                                    textColor="white"
                                                    backgroundColor="#C9C4C0"
                                                    size="mini"
                                                    variant="none"
                                                    onClick={() => console.log("click")}
                                                />
                                            ) : (
                                                <Button
                                                    label={"Chấm điểm"}
                                                    textColor="white"
                                                    backgroundColor="#FFB923"
                                                    size="mini"
                                                    variant="none"
                                                    onClick={() => navigate("/teacher/test-management/scoring")}
                                                />
                                            )}
                                        </td>

                                        {/* Cột Hành động */}
                                        <td className="px-4 py-4 flex justify-end space-x-2">
                                            <button className="text-orange-500 hover:text-orange-600">
                                                <FaEdit size={20} />
                                            </button>
                                            <button className="text-orange-500 hover:text-orange-600">
                                                <FaInfoCircle size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="text-center">
                                    <td colSpan={8} className="p-3">
                                        Không có dữ liệu
                                    </td>
                                </tr>
                            )}


                        </tbody>
                    </table>
                </div>

                {/* Phân trang */}
                {paginatedData.length > 0 && (
                    <div className="flex justify-between items-center mt-5">
                        <div>
                            Hiển thị
                            <input
                                type="number"
                                value={pageNumber}
                                onChange={(e) => setPageNumber(Math.min(Number(e.target.value) || 1, 8))}
                                className="p-2 rounded-md mx-2 border"
                                style={{ width: "60px" }}
                            />
                            hàng trong mỗi trang
                        </div>
                        <div className="flex items-center space-x-2">
                            <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                                &#10094;
                            </button>
                            {[...Array(totalPages)].map((_, i) =>
                                i < 2 || i > totalPages - 3 || Math.abs(i + 1 - currentPage) < 2 ? (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`px-3 py-1 ${currentPage === i + 1 ? "bg-orange-500 text-white" : "text-gray-600 hover:bg-gray-200"
                                            } rounded-full`}
                                    >
                                        {i + 1}
                                    </button>
                                ) : (i === 2 && currentPage > 3) || (i === totalPages - 3 && currentPage < totalPages - 2) ? (
                                    <span key={i} className="px-3">...</span>
                                ) : null
                            )}
                            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                                &#10095;
                            </button>
                        </div>
                    </div>
                )}

                {/* Modal xác nhận xóa */}
                {deleteId && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg" style={{ width: 435 }}>
                            <h3 className="text-2xl font-bold text-center">Xóa nhóm người dùng</h3>
                            <p className="text-base mt-5 mb-10 font-normal">
                                Xác nhận muốn xoá nhóm người dùng này? Sau khi xoá sẽ không thể hoàn tác.
                            </p>
                            <div className="flex justify-between w-full px-4 font-bold">
                                <button
                                    onClick={() => setDeleteId(null)}
                                    className="px-4 py-2 rounded-lg w-40 h-14 text-lg"
                                    style={{ backgroundColor: "#F2F2F2" }}
                                >
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
        </div>
    )
}
const styles = {
    action__icon: {
        color: '#ff7506',
        fontSize: '20px',
    },
};