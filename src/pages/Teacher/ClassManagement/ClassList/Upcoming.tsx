import React, { useState, useEffect } from 'react';
import { FaInfoCircle, FaSort } from 'react-icons/fa';
import Button from '../../../../components/Button';
import Dropdown from '../../../../components/Dropdown';
import SearchBar from '../../../../components/SearchBar'; // Component SearchBar mới
import apiInstance from '../../../../services/api';
import LoadingSpinner from '../../../../components/Loading';
import { showToast } from '../../../../components/Toasted';

interface DropdownOption {
    id: number;
    value: string;
}

interface ClassItem {
    teachingAssignmentId: number;
    classCode: string;
    subjectName: string;
    startDate: string;
    teacherName: string;
    statusClass: number;
}

interface Subject {
    id: number;
    name: string;
}

export default function Upcoming() {
    const [keyword, setKeyword] = useState('');
    const [pageNumber, setPageNumber] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [tests, setTests] = useState<ClassItem[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [subjects, setSubjects] = useState<DropdownOption[]>([]);
    const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null);

    const fetchSubjects = async () => {
        try {
            const response = await apiInstance.get('api/subject/get-all-subjects');
            const apiData = response.data.data;

            const uniqueSubjects = Array.from(
                new Map(apiData.map((item: Subject) => [item.name, item])).values()
            );

            const subjectOptions: DropdownOption[] = uniqueSubjects.map((subject: any) => ({
                id: subject.id,
                value: subject.name,
            }));

            setSubjects(subjectOptions);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Không thể lấy danh sách môn học";
            showToast(errorMessage, "error");
        }
    };

    const fetchClasses = async (page: number) => {
        setLoading(true);
        try {
            const response = await apiInstance.get(
                `api/class/future?keyword=${keyword}&subjectId=${
                    selectedSubjectId || ''
                }&pageNumber=${page}&pageSize=${pageNumber}`
            );
            const apiData = response.data.data.items;

            const currentDate = new Date();
            const upcomingClasses = apiData.filter((item: ClassItem) => new Date(item.startDate) > currentDate);

            setTests(upcomingClasses);
            setTotalPages(Math.ceil(upcomingClasses.length / pageNumber));
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Không thể lấy dữ liệu lớp học";
            showToast(errorMessage, "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubjects();
    }, []);

    useEffect(() => {
        fetchClasses(currentPage);
    }, [currentPage, keyword, selectedSubjectId]);

    const paginatedData = tests.slice((currentPage - 1) * pageNumber, currentPage * pageNumber);

    const handleDelete = () => {
        if (deleteId) {
            setTests(tests.filter((type) => type.teachingAssignmentId !== deleteId));
            setDeleteId(null);
        }
    };

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

    return (
        <div>
            {loading && <LoadingSpinner />}
            <div className="bg-white rounded-lg shadow-lg w-full max-w-8xl p-6">
                <div className="flex items-center justify-between bg-white pb-4">
                    <div className="flex items-center gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700">Chọn tổ</label>
                            <Dropdown
                                options={[{ id: 0, value: "Tất cả tổ" }]} 
                                width="long"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700">Chọn bộ môn</label>
                            <Dropdown
                                options={[{ id: 0, value: "Tất cả môn học" }, ...subjects]}
                                width="long"
                                onChange={(option) => setSelectedSubjectId(option.id === 0 ? null : option.id as number)}
                            />
                        </div>
                    </div>
                    <div className="relative w-3/12">
                        <SearchBar
                            placeholder="Tìm kiếm..."
                            onSearch={(query) => setKeyword(query)}
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse">
                        <thead>
                            <tr className="bg-orange-500 text-white text-sm font-semibold">
                                <th className="px-4 py-2 text-center w-[200px]">Mã lớp</th>
                                <th className="px-4 py-2 text-center w-[200px]">
                                    <div className="flex items-center justify-center">
                                        <span className="me-2">Môn học</span>
                                        <FaSort />
                                    </div>
                                </th>
                                <th className="px-4 py-2 text-center w-[200px]">
                                    <div className="flex items-center justify-center">
                                        <span className="me-2">Thời gian</span>
                                        <FaSort />
                                    </div>
                                </th>
                                <th className="px-4 py-2 text-center w-[200px]">Giảng viên</th>
                                <th className="px-4 py-2 text-center w-[200px]">Trạng thái</th>
                                <th className="px-4 py-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.length > 0 ? (
                                paginatedData.map((test, index) => (
                                    <tr key={index} className="odd:bg-white even:bg-gray-200">
                                        <td className="px-4 py-4 text-gray-700 text-sm text-center">{test.classCode}</td>
                                        <td className="px-4 py-4 text-gray-700 text-sm text-center">{test.subjectName}</td>
                                        <td className="px-4 py-4 text-gray-700 text-sm text-center">{formatDateIntl(test.startDate)}</td>
                                        <td className="px-4 py-4 text-center">{test.teacherName}</td>
                                        <td className="px-4 py-4 text-center">
                                            <Button
                                                label="Bắt đầu"
                                                textColor="white"
                                                backgroundColor="#FF7506"
                                                size="mini"
                                                variant="none"
                                                onClick={() => console.log("click")}
                                            />
                                        </td>
                                        <td className="px-4 py-4 flex justify-center space-x-2">
                                            <button className="text-orange-500 hover:text-orange-600">
                                                <FaInfoCircle size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="text-center">
                                    <td colSpan={7} className="p-3">Không có dữ liệu</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {paginatedData.length > 0 && (
                    <div className="flex justify-between items-center mt-5">
                        <div>
                            Hiển thị
                            <input
                                type="number"
                                value={pageNumber}
                                onChange={(e) => setPageNumber(Math.min(Number(e.target.value) || 1, 10))}
                                className="p-2 rounded-md mx-2 border"
                                style={{ width: "60px" }}
                            />
                            hàng trong mỗi trang
                        </div>
                        <div className="flex items-center space-x-2">
                            <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                                ❮
                            </button>
                            {[...Array(totalPages)].map((_, i) =>
                                i < 2 || i > totalPages - 3 || Math.abs(i + 1 - currentPage) < 2 ? (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`px-3 py-1 ${
                                            currentPage === i + 1 ? "bg-orange-500 text-white" : "text-gray-600 hover:bg-gray-200"
                                        } rounded-full`}
                                    >
                                        {i + 1}
                                    </button>
                                ) : (i === 2 && currentPage > 3) || (i === totalPages - 3 && currentPage < totalPages - 2) ? (
                                    <span key={i} className="px-3">...</span>
                                ) : null
                            )}
                            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                                ❯
                            </button>
                        </div>
                    </div>
                )}
                {deleteId && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg" style={{ width: 435 }}>
                            <h3 className="text-2xl font-bold text-center">Xóa buổi học</h3>
                            <p className="text-base mt-5 mb-10 font-normal">
                                Xác nhận muốn xóa buổi học này? Sau khi xóa sẽ không thể hoàn tác.
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
    );
}