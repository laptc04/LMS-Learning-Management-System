import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import StatusComponent from '../../../../components/Status';
import Button from '../../../../components/Button/';
import UPaperclip from '../../../../assets/images/u_paperclip.png';
import FIDownload from '../../../../assets/images/fi_download_N.png';
import DatePicker from '../../../../components/DatePicker';
import { PaperclipIcon } from 'lucide-react';
import Dropdown from "../../../../components/Dropdown";
import Pagination from '../../../../components/Pagination';
import apiInstance from '../../../../services/api';

interface Student {
    id: string;          // Maps to `userCode`
    name: string;        // Maps to `fullName`
    dob: string;         // Maps to `birthDate`
    gender: string;      // Maps to `gender` (converted from boolean to "Nam"/"Nữ")
    ethnicity: string;   // Maps to `ethnicity`
    class: string;       // Maps to `classstudent`
    status: string;      // Maps to `status`
}

interface Option {
    id: number;
    value: string;
}

const ListStudent: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isConfirming, setIsConfirming] = useState(false);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [itemPerPages, setItemsPerPage] = useState(5);

    const [rowsPerPage, setRowsPerPage] = useState(8);
    const [isActionDropdownOpen, setIsActionDropdownOpen] = useState<{ [key: string]: boolean }>({});
    const [isUploadModalOpen, setIsUploadModalOpen] = useState<{ [key: string]: boolean }>({});
    const [isTransferClassModalOpen, setIsTransferClassModalOpen] = useState<{ [key: string]: boolean }>({});
    const [isTransferSchoolModalOpen, setIsTransferSchoolModalOpen] = useState<{ [key: string]: boolean }>({});
    const [isStudySuspensionModalOpen, setIsStudySuspensionModalOpen] = useState<{ [key: string]: boolean }>({});
    const [searchTerm, setSearchTerm] = useState<string>('');

    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [fileName, setFileName] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const allCheckboxRef = useRef<HTMLInputElement>(null);
    const [date, setDate] = useState<string>('');

    const totalPages = Math.ceil(students.length / rowsPerPage);
    const paginatedData = students.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJleGFtMUBtYWlsaW5hdG9yLmNvbSIsImp0aSI6ImNjZWEyM2Q5LWZhYTMtNDlmNS1hMWEzLWMxMzM3M2IwNjZkYiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImV4YW0xQG1haWxpbmF0b3IuY29tIiwiZXhwIjoxNzU5Mjk0MzM4LCJpc3MiOiJiYXNlV2ViQXBpSXNzZXIiLCJhdWQiOiJiYXNlV2ViQXBpSXNzZXIifQ.ADQ3q_l49NZtMq_BKvaN9I8_eZsQNne4EQ_Xkt93QIM";

    const fetchStudents = async () => {

        try {
            const response = await apiInstance.get('api/Student/getall', {
                params: {
                    academicId: 5,
                    departmentId: 1,
                    PageNumber: 1,
                    PageSize: 1000,
                    column: 'BirthDate',
                    orderBy: true,
                },
            });

            const { status, data } = response.data;
            if (status === 0 && data && data.items) {
                const mappedStudents: Student[] = data.items.map((item: any) => ({
                    id: item.userCode,
                    name: item.fullName,
                    dob: new Date(item.birthDate).toLocaleDateString('vi-VN'),
                    gender: item.gender ? 'Nam' : 'Nữ',
                    ethnicity: item.ethnicity || 'Kinh',
                    class: item.classstudent || 'Unknown',
                    status: item.status || 'Unknown',
                }));
                setStudents(mappedStudents);
            } else {
                console.error('Failed to fetch students:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const searchStudents = async (search: string) => {
        try {
            const response = await axios.get('https://khadv28.io.vn/api/Student/search', {
                params: {
                    academicId: 5,
                    departmentId: 1,
                    PageNumber: currentPage,
                    PageSize: rowsPerPage,
                    column: 'BirthDate',
                    orderBy: true,
                    search: search,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const { status, data } = response.data;
            if (status === 0 && data && data.items) {
                const mappedStudents: Student[] = data.items.map((item: any) => ({
                    id: item.userCode,
                    name: item.fullName,
                    dob: new Date(item.birthDate).toLocaleDateString('vi-VN'),
                    gender: item.gender ? 'Nam' : 'Nữ',
                    ethnicity: item.ethnicity || 'Kinh',
                    class: item.classstudent || 'Unknown',
                    status: item.status || 'Unknown',
                }));
                setStudents(mappedStudents);
            } else {
                console.error('Failed to search students:', response.data.message);
            }
        } catch (error) {
            console.error('Error searching students:', error);
        }
    };

    const deleteStudents = async (userCodes: string[]) => {
        if (!userCodes || userCodes.length === 0 || !Array.isArray(userCodes)) {
            console.error('Danh sách userCodes không hợp lệ:', userCodes);
            return false;
        }

        const invalidCodes = userCodes.filter(code => !code || typeof code !== 'string');
        if (invalidCodes.length > 0) {
            console.error('Có mã học viên không hợp lệ:', invalidCodes);
            return false;
        }

        try {
            const response = await axios.delete('https://khadv28.io.vn/api/Student/delete', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                data: { userCode: userCodes },
            });

            const { status, message } = response.data;
            if (status === 0) {
                console.log('Students deleted successfully:', message);
                return true;
            } else {
                console.error('Failed to delete students:', message);
                return false;
            }
        } catch (error) {
            console.error('Error deleting students:', error);
            if (axios.isAxiosError(error) && error.response) {
                console.log('Response data:', error.response.data);
                console.log('Response status:', error.response.status);
                console.log('Response headers:', error.response.headers);
            }
            return false;
        }
    };
    useEffect(() => {
        fetchStudents();
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value.trim() === '') {
            fetchStudents();
        } else {
            searchStudents(value);
        }
    };

    const handleDateChange = (date: string | null) => {
        if (date !== null) {
            setDate(date);
        }
    };


    const handleCheckboxChange = (id: string) => {
        const updatedSelectedIds = selectedIds.includes(id)
            ? selectedIds.filter((selectedId) => selectedId !== id)
            : [...selectedIds, id];
        setSelectedIds(updatedSelectedIds);
        console.log('Mã học viên đã chọn:', updatedSelectedIds);
    };

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentStudents = paginatedData;
        if (event.target.checked) {
            const allIds = currentStudents.map((student) => student.id);
            setSelectedIds(allIds);
            console.log('Mã học viên khi chọn tất cả:', allIds);
        } else {
            setSelectedIds([]);
            console.log('Đã bỏ chọn tất cả mã học viên');
        }
    };

    const handleFileUploadClick = () => {
        fileInputRef.current?.click();
    };


    const handleDeleteSelected = async () => {
        if (selectedIds.length === 0) {
            alert('Vui lòng chọn ít nhất một học viên để xóa.');
            return;
        }

        console.log('Mã học viên sẽ xóa:', selectedIds);

        const success = await deleteStudents(selectedIds);
        if (success) {
            setStudents(students.filter((student) => !selectedIds.includes(student.id)));
            setSelectedIds([]);
            setIsConfirming(false);
            alert('Xóa học viên thành công!');
        } else {
            alert('Có lỗi xảy ra khi xóa học viên. Vui lòng thử lại.');
        }
    };

    const optitionClass: Option[] = [
        { id: 0, value: "2021-2024" },
        { id: 1, value: "10A3" },
        { id: 2, value: "10A4" },
        { id: 3, value: "10A5" },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Đang học': return '#49C510';
            case 'Đã tốt nghiệp': return '#0B80EC';
            case 'Đã thôi học': return '#ED2025';
            case 'Chuyển lớp': return '#FF7506';
            case 'Chuyển trường': return '#373839';
            case 'Đang bảo lưu': return '#FFCC00';
            case 'Unknown': return '#373839';
            default: return '#373839';
        }
    };

    const areAllSelected = () => paginatedData.every((student) => selectedIds.includes(student.id));
    const areSomeSelected = () => selectedIds.length > 0 && !areAllSelected();

    useEffect(() => {
        if (allCheckboxRef.current) {
            allCheckboxRef.current.indeterminate = areSomeSelected();
        }
    }, [selectedIds, currentPage, rowsPerPage]);

    const handleSave = () => {
        alert('Lưu Thành Công');
    };

    const handleActionSelection = (option: string, studentId: string) => {
        console.log(`Selected option: ${option} for student ID: ${studentId}`);
        switch (option) {
            case 'Sửa hồ sơ':
                navigate(`/EditStudent/${studentId}`);
                break;
            case 'Chuyển lớp':
                setIsTransferClassModalOpen((prev) => ({ ...prev, [studentId]: true }));
                break;
            case 'Chuyển trường':
                setIsTransferSchoolModalOpen((prev) => ({ ...prev, [studentId]: true }));
                break;
            case 'Bảo lưu':
                setIsStudySuspensionModalOpen((prev) => ({ ...prev, [studentId]: true }));
                break;
            case 'Tải lên file':
                setIsUploadModalOpen((prev) => ({ ...prev, [studentId]: true }));
                break;
            default:
                break;
        }
        setIsActionDropdownOpen((prev) => ({ ...prev, [studentId]: false }));
    };

    const actionOptions: Option[] = [
        { id: 1, value: 'Sửa hồ sơ' },
        { id: 2, value: 'Chuyển lớp' },
        { id: 3, value: 'Chuyển trường' },
        { id: 4, value: 'Bảo lưu' },
    ];

    const handleUpload = (studentId: string, file: File | null) => {
        if (file) {
            console.log(`Uploading file for student ${studentId}:`, file);
        }
        setIsUploadModalOpen((prev) => ({ ...prev, [studentId]: false }));
    };

    const handleDownloadTemplate = (studentId: string) => {
        console.log(`Tải xuống mẫu file cho học viên ${studentId}...`);
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 relative">
            <div className="flex justify-between items-center mb-4">
                <div className="flex gap-4 items-center">
                    <div className="flex gap-2">
                        <Dropdown options={[{ id: 1, value: "Tất cả khối" }, { id: 2, value: "2021-2022" }]} width="medium" />
                        <Dropdown options={[{ id: 1, value: "2021-2024" }]} width="medium" />
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-black text-white px-4 py-1 rounded-lg">Tất cả hồ sơ</button>
                        <button className="bg-gray-300 px-4 py-1 rounded-lg">Khen thưởng</button>
                        <button className="bg-gray-300 px-4 py-1 rounded-lg">Kỷ luật</button>
                    </div>
                </div>
                <Button label="+ Thêm mới" variant="solid" size="medium" textColor="white" backgroundColor="#F97316" onClick={() => { }} />
            </div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold font-mulis">Danh sách học viên</h2>
                <div className="relative max-w-lg" style={{ width: 438 }}>
                    <input
                        type="text"
                        placeholder="Tìm kiếm (VD: Trần)"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="px-3 py-2 text-sm font-normal rounded-3xl w-full pl-10 focus:outline-none focus:ring-2 font-source-sans focus:ring-orange-500 bg-gray-200 italic"
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
                            <th className="px-0 py-2 text-left text-lg">
                                <input
                                    ref={allCheckboxRef}
                                    type="checkbox"
                                    checked={areAllSelected()}
                                    onChange={handleSelectAll}
                                    className="w-6 h-6 ml-6"
                                />
                            </th>
                            <th className="px-0 py-2 text-left text-lg w-1/12">
                                <div className="flex items-center">
                                    <span className="font-mulis">Mã học viên</span>
                                    <img src="/icon/u_arrow up down.png" alt="" className="w-6 h-6 ml-1" />
                                </div>
                            </th>
                            <th className="px-0 py-2 text-left text-lg w-1/12">
                                <div className="flex items-center">
                                    <span className="font-mulis">Tên học viên</span>
                                    <img src="/icon/u_arrow up down.png" alt="" className="w-6 h-6 ml-1" />
                                </div>
                            </th>
                            <th className="px-2 py-2 text-left text-lg w-1/12">
                                <div className="flex items-center">
                                    <span className="font-mulis">Ngày sinh</span>
                                    <img src="/icon/u_arrow up down.png" alt="" className="w-6 h-6 ml-1" />
                                </div>
                            </th>
                            <th className="px-4 py-2 text-left text-lg w-1/12">
                                <div className="flex items-center">
                                    <span className="font-mulis">Giới tính</span>
                                    <img src="/icon/u_arrow up down.png" alt="" className="w-6 h-6 ml-1" />
                                </div>
                            </th>
                            <th className="px-4 py-2 text-left text-lg w-1/12">
                                <div className="flex items-center">
                                    <span className="font-mulis">Dân tộc</span>
                                    <img src="/icon/u_arrow up down.png" alt="" className="w-6 h-6 ml-1" />
                                </div>
                            </th>
                            <th className="px-4 py-2 text-left text-lg w-1/12">
                                <div className="flex items-center">
                                    <span className="font-mulis">Lớp</span>
                                    <img src="/icon/u_arrow up down.png" alt="" className="w-6 h-6 ml-1" />
                                </div>
                            </th>
                            <th className="px-4 pl-12 py-2 text-left text-lg w-1/12">
                                <div className="flex items-center">
                                    <span className="font-mulis">Tình trạng</span>
                                    <img src="/icon/u_arrow up down.png" alt="" className="w-4 h-4 ml-1" />
                                </div>
                            </th>
                            <th className="px-4 py-2 text-center text-lg w-1/12"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((student, index) => (
                            <tr key={student.id + index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                <td className="px-0 py-3 text-left w-1/12">
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.includes(student.id)}
                                        onChange={() => handleCheckboxChange(student.id)}
                                        className="w-6 h-6 ml-6"
                                    />
                                </td>
                                <td className="px-0 py-3 text-left text-base font-source-sans w-1/12">{student.id}</td>
                                <td className="px-0 py-3 text-base font-source-sans w-1/12">{student.name}</td>
                                <td className="px-2 py-3 text-base font-source-sans w-1/12">{student.dob}</td>
                                <td className="px-4 py-3 text-base font-source-sans w-1/12">{student.gender}</td>
                                <td className="px-4 py-3 text-base font-source-sans w-1/12">{student.ethnicity}</td>
                                <td className="px-4 py-3 text-base font-source-sans w-1/12">{student.class}</td>
                                <td className="px-4 py-3 text-left w-1/12">
                                    <StatusComponent statusId={1} />
                                </td>
                                <td className="px-4 py-3 text-center w-2/12">
                                    <button onClick={() => navigate(`/leadership/student/profile/${student.id}`)} className="text-orange-500 hover:text-orange-700 mx-2">
                                        <img src="/icon/u_eye_HSHS.png" alt="Xem" className="w-8 h-8" />
                                    </button>
                                    <div className="relative inline-block">
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setIsActionDropdownOpen((prev) => ({ ...prev, [student.id]: !prev[student.id] }));
                                            }}
                                            className="text-orange-500 hover:text-orange-700 mx-2"
                                        >
                                            <img src="/icon/fi_edit_HSHS.png" alt="Hành động" className="w-8 h-8" />
                                        </button>
                                        {isActionDropdownOpen[student.id] && (
                                            <div
                                                className="absolute z-50 bg-white rounded-lg shadow-lg p-2"
                                                style={{
                                                    top: '-10px',
                                                    left: '-200px',
                                                    width: '200px',
                                                    border: '1px solid #e5e7eb',
                                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                                }}
                                            >
                                                {actionOptions.map((option) => (
                                                    <button
                                                        key={option.id}
                                                        onClick={() => handleActionSelection(option.value, student.id)}
                                                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                                                    >
                                                        {option.value}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <button onClick={() => setIsConfirming(true)} className="text-orange-500 hover:text-orange-700 mx-2">
                                        <img src="/icon/fi_trash-2.png" alt="Xóa" className="w-8 h-8" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-4">
                <div>
                    Hiển thị
                    <input
                        type="number"
                        value={rowsPerPage}
                        onChange={(e) => setRowsPerPage(Math.min(Number(e.target.value) || 1, 8))}
                        className="p-2 rounded-md mx-2 border"
                        style={{ width: '60px' }}
                    />
                    hàng trong mỗi trang
                </div>
                <div className="flex items-center gap-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="text-gray-600 hover:text-orange-500 disabled:text-gray-300"
                    >
                        <IoIosArrowBack />
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-1 ${currentPage === i + 1 ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-200'} rounded-full`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="text-gray-600 hover:text-orange-500 disabled:text-gray-300"
                    >
                        <IoIosArrowForward />
                    </button>
                </div>
            </div>

            {isConfirming && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg" style={{ width: 435 }}>
                        <h3 className="text-2xl font-bold text-center">Xóa học viên</h3>
                        <p className="text-base mt-5 mb-10 font-normal font-source-sans">
                            Xác nhận muốn xoá những thông tin đã chọn? Sau khi xoá sẽ không thể hoàn tác.
                        </p>
                        <div className="flex justify-between w-full px-4 font-bold">
                            <button onClick={() => setIsConfirming(false)} className="px-4 py-2 rounded-lg w-40 h-14 text-lg font-mulis" style={{ backgroundColor: "#F2F2F2" }}>
                                Hủy
                            </button>
                            <button onClick={handleDeleteSelected} className="bg-orange-500 text-white px-4 py-2 rounded-lg w-40 h-14 text-lg">
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {Object.entries(isUploadModalOpen).map(([studentId, isOpen]) =>
                isOpen && (
                    <div key={studentId} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-3 rounded-lg shadow-lg" style={{ width: 884, maxWidth: '90%' }}>
                            <h3 className="text-lg font-bold text-center mb-3">Tải lên file</h3>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <label className="text-sm font-medium text-gray-700 w-32">Tệp đính kèm:</label>
                                    <div className="flex-1 flex items-center border border-gray-300 rounded-md shadow-sm bg-white px-2 py-1">
                                        <img src={UPaperclip} alt="Paperclip" className="mr-2 w-4 h-4" />
                                        <input
                                            type="text"
                                            value={isOpen ? 'HTKT_KT45P_10A1.doc' : ''}
                                            className="flex-1 text-sm text-gray-700 border-none focus:outline-none"
                                            placeholder="Chọn loại tài liệu"
                                            readOnly
                                        />
                                        <button
                                            className="ml-3 px-3 py-1 text-sm text-orange-700 bg-orange-100 hover:bg-orange-200 rounded-r-md focus:outline-none"
                                            onClick={() => document.getElementById(`fileInput_${studentId}`)?.click()}
                                        >
                                            Chọn tệp tải lên...
                                        </button>
                                        <input
                                            id={`fileInput_${studentId}`}
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0] || null;
                                                handleUpload(studentId, file);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <label className="text-sm font-medium text-gray-700 w-32">Tải file mẫu:</label>
                                    <div className="flex-1 flex items-center border rounded-md border-none shadow-sm px-2 py-1">
                                        <button
                                            className="flex items-center space-x-2 text-sm text-gray-700 border-none focus:outline-none"
                                            onClick={() => handleDownloadTemplate(studentId)}
                                        >
                                            <img src={FIDownload} alt="Download" className="w-4 h-4" />
                                            <span>Tải xuống file mẫu</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end space-x-4">
                                <Button
                                    label="Hủy"
                                    size="medium"
                                    variant="outline"
                                    onClick={() => setIsUploadModalOpen((prev) => ({ ...prev, [studentId]: false }))}
                                    textColor="#6B7280"
                                    border="2px solid #6B7280"
                                    hoverBackgroundColor="rgba(107, 114, 128, 0.1)"
                                />
                                <Button
                                    label="Tải lên"
                                    size="medium"
                                    variant="solid"
                                    onClick={() => {
                                        const fileInput = document.getElementById(`fileInput_${studentId}`) as HTMLInputElement;
                                        const file = fileInput?.files?.[0] || null;
                                        handleUpload(studentId, file);
                                    }}
                                    textColor="#ffffff"
                                    backgroundColor="#FF7506"
                                    hoverBackgroundColor="#E06504"
                                />
                            </div>
                        </div>
                    </div>
                )
            )}

            {/* TransferClass Modal */}
            {Object.entries(isTransferClassModalOpen).map(([studentId, isOpen]) => {
                if (!isOpen) return null;
                const student = students.find((s) => s.id === studentId);
                if (!student) return null;

                return (
                    <div key={studentId} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-[884px] mx-auto">
                            <h2 className="text-28px font-bold text-center mb-4">Cập nhật chuyển lớp</h2>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <span className="font-medium w-52 text-16px">Tên học viên:</span>
                                    <span className="text-16px">{student.name}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-medium w-52 text-16px">Lớp hiện tại:</span>
                                    <span className="text-16px">{student.class}</span>
                                </div>
                                <div className="flex items-center">
                                    <label className="font-medium w-52 text-16px">Ngày chuyển lớp: <span className='text-red-500'>*</span></label>
                                    <DatePicker onChange={handleDateChange} value={date} className="max-w-full w-4/12" />
                                    <input type="text" value={"Học Kỳ I"} readOnly className="border rounded p-2 w-28 bg-gray-200 text-gray-600 cursor-not-allowed ml-5" />
                                </div>
                                <div className="flex items-center">
                                    <label className="font-medium w-52 text-16px">Chuyển đến lớp: <span className='text-red-500'>*</span></label>
                                    <Dropdown options={optitionClass} disabled={false} icon="right" width="w-2/5" state="normal" />
                                </div>
                                <div className="flex">
                                    <label className="font-medium w-52 h-40 text-16px">Lý do chuyển lớp: <span className='text-red-500'>*</span></label>
                                    <textarea className="w-2/3 border rounded p-2 text-16px max-h-72" rows={3}></textarea>
                                </div>
                                <div className="flex items-center">
                                    <label className="font-medium pr-11">Tệp đính kèm: <span className="text-red-500">*</span></label>
                                    <div className="relative flex flex-col w-9/12 pl-12">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center border rounded-md px-4 py-2 w-full">
                                                <PaperclipIcon className="w-5 h-5 text-gray-500" />
                                                <span className="flex-1 px-2 text-gray-600">{fileName || 'Chưa có tệp nào được chọn'}</span>
                                                <input ref={fileInputRef} readOnly type="file" className="hidden" />
                                            </div>
                                            <button
                                                type="button"
                                                className="w-[200px] bg-[#FFD8B8] text-black border border-orange-500 px-1 py-1 rounded-md"
                                                onClick={handleFileUploadClick}
                                            >
                                                Chọn tệp tải lên
                                            </button>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-2 italic">Kiểu file .pdf .jpeg .png .jpg với dung lượng tối đa là 100 MB.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-center space-x-4">
                                <div className="flex flex-col gap-y-1">
                                    <div className="flex justify-center space-x-6 mt-10">
                                        <Button label="Hủy" backgroundColor="#F2F2F2" size="big" variant="none" onClick={() => setIsTransferClassModalOpen((prev) => ({ ...prev, [studentId]: false }))} />
                                        <Button label="Lưu" size="big" variant="solid" onClick={handleSave} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* TransferSchool Modal */}
            {Object.entries(isTransferSchoolModalOpen).map(([studentId, isOpen]) => {
                if (!isOpen) return null;
                const student = students.find((s) => s.id === studentId);
                if (!student) return null;

                return (
                    <div key={studentId} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-[884px] mx-auto">
                            <h2 className="text-28px font-bold text-center mb-4">Cập nhật chuyển trường</h2>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <span className="font-medium w-52 text-16px">Tên học viên:</span>
                                    <span className="text-16px">{student.name}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-medium w-52 text-16px">Lớp hiện tại:</span>
                                    <span className="text-16px">{student.class}</span>
                                </div>
                                <div className="flex items-center">
                                    <label className="font-medium w-52 text-16px">Ngày chuyển trường: <span className='text-red-500'>*</span></label>
                                    <DatePicker onChange={handleDateChange} value={date} className="max-w-full w-4/12" />
                                    <input type="text" value={"Học Kỳ I"} readOnly className="border rounded p-2 w-28 bg-gray-200 text-gray-600 cursor-not-allowed ml-5" />
                                </div>
                                <div className="flex items-center">
                                    <label className="font-medium w-52 text-16px">Chuyển đến trường: <span className='text-red-500'>*</span></label>
                                    <input type="text" className="border rounded p-2 w-8/12" />
                                </div>
                                <div className="flex items-center">
                                    <label className="font-medium w-52 text-16px">Địa chỉ trường: <span className='text-red-500'>*</span></label>
                                    <input type="text" className="border rounded p-2 w-8/12" />
                                </div>
                                <div className="flex">
                                    <label className="font-medium w-52 h-40 text-16px">Lý do chuyển trường: <span className='text-red-500'>*</span></label>
                                    <textarea className="w-2/3 border rounded p-2 text-16px max-h-72" rows={3}></textarea>
                                </div>
                                <div className="flex items-center">
                                    <label className="font-medium pr-11">Tệp đính kèm: <span className="text-red-500">*</span></label>
                                    <div className="relative flex flex-col w-9/12 pl-12">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center border rounded-md px-4 py-2 w-full">
                                                <PaperclipIcon className="w-5 h-5 text-gray-500" />
                                                <span className="flex-1 px-2 text-gray-600">{fileName || 'Chưa có tệp nào được chọn'}</span>
                                                <input ref={fileInputRef} readOnly type="file" className="hidden" />
                                            </div>
                                            <button
                                                type="button"
                                                className="w-[200px] bg-[#FFD8B8] text-black border border-orange-500 px-1 py-1 rounded-md"
                                                onClick={handleFileUploadClick}
                                            >
                                                Chọn tệp tải lên
                                            </button>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-2 italic">Kiểu file .pdf .jpeg .png .jpg với dung lượng tối đa là 100 MB.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-center space-x-4">
                                <div className="flex flex-col gap-y-1">
                                    <div className="flex justify-center space-x-6 mt-10">
                                        <Button label="Hủy" backgroundColor="#F2F2F2" size="big" variant="none" onClick={() => setIsTransferSchoolModalOpen((prev) => ({ ...prev, [studentId]: false }))} />
                                        <Button label="Lưu" size="big" variant="solid" onClick={handleSave} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* StudySuspension Modal */}
            {Object.entries(isStudySuspensionModalOpen).map(([studentId, isOpen]) => {
                if (!isOpen) return null;
                const student = students.find((s) => s.id === studentId);
                if (!student) return null;

                return (
                    <div key={studentId} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-[884px] mx-auto">
                            <h2 className="text-28px font-bold text-center mb-4">Cập nhật bảo lưu</h2>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <span className="font-medium w-52 text-16px">Tên học viên:</span>
                                    <span className="text-16px">{student.name}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-medium w-52 text-16px">Lớp hiện tại:</span>
                                    <span className="text-16px">{student.class}</span>
                                </div>
                                <div className="flex items-center">
                                    <label className="font-medium w-52 text-16px">Ngày bảo lưu: <span className='text-red-500'>*</span></label>
                                    <DatePicker onChange={handleDateChange} value={date} className="max-w-full w-4/12" />
                                    <input type="text" value={"Học Kỳ I"} readOnly className="border rounded p-2 w-28 bg-gray-200 text-gray-600 cursor-not-allowed ml-5" />
                                </div>
                                <div className="flex items-center">
                                    <label className="font-medium w-52 text-16px">Thời hạn bảo lưu: <span className='text-red-500'>*</span></label>
                                    <input type="text" className="border rounded p-2 w-8/12" />
                                </div>
                                <div className="flex">
                                    <label className="font-medium w-52 h-40 text-16px">Lý do bảo lưu: <span className='text-red-500'>*</span></label>
                                    <textarea className="w-2/3 border rounded p-2 text-16px max-h-72" rows={3}></textarea>
                                </div>
                                <div className="flex items-center">
                                    <label className="font-medium pr-11">Tệp đính kèm: <span className="text-red-500">*</span></label>
                                    <div className="relative flex flex-col w-9/12 pl-12">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center border rounded-md px-4 py-2 w-full">
                                                <PaperclipIcon className="w-5 h-5 text-gray-500" />
                                                <span className="flex-1 px-2 text-gray-600">{fileName || 'Chưa có tệp nào được chọn'}</span>
                                                <input ref={fileInputRef} readOnly type="file" className="hidden" />
                                            </div>
                                            <button
                                                type="button"
                                                className="w-[200px] bg-[#FFD8B8] text-black border border-orange-500 px-1 py-1 rounded-md"
                                                onClick={handleFileUploadClick}
                                            >
                                                Chọn tệp tải lên
                                            </button>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-2 italic">Kiểu file .pdf .jpeg .png .jpg với dung lượng tối đa là 100 MB.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-center space-x-4">
                                <div className="flex flex-col gap-y-1">
                                    <div className="flex justify-center space-x-6 mt-10">
                                        <Button label="Hủy" backgroundColor="#F2F2F2" size="big" variant="none" onClick={() => setIsStudySuspensionModalOpen((prev) => ({ ...prev, [studentId]: false }))} />
                                        <Button label="Lưu" size="big" variant="solid" onClick={handleSave} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Pagination */}
            {/* <Pagination
                limit={itemsPerPage}
                activation={currentPage}
                max={Math.ceil(students.length / itemsPerPage)}
                onPageChange={setCurrentPage} // Thêm hàm xử lý thay đổi trang
                onLimitChange={setItemsPerPage} // Thêm hàm xử lý thay đổi số lượng item mỗi trang
            /> */}
        </div>
    );
};

export default ListStudent;