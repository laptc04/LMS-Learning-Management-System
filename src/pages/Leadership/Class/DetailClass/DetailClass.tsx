import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Trash from "../../../../assets/images/fi_trash-2.png";
import Edit from "../../../../assets/images/fi_edit.png";
import { ChevronDown, ChevronUp } from 'lucide-react';
import apiInstance from "../../../../services/api";
import LoadingSpinner from "../../../../components/Loading";
import Toasted, { showToast } from '../../../../components/Toasted';
import AddressUrlStack from "../../../../components/AddressUrlStack";

interface ClassDetail {
    id: number;
    academicYearName: string;
    departmentName: string;
    classCode: string;
    className: string;
    homeroomTeacher: string;
    studentCount: string;
    classType: string;
    subjectCount: string;
    description: string;
    classDetailStudentResponse: Student[];
    classDetailSubjectResponse: Subject[];
}

interface Student {
    id: number;
    studentCode: string;
    studentName: string;
    academicYear: string;
    admissionDate: string;
    studentStatus: string;
    studentStatusId: number;
}

interface Subject {
    subjectCode: string;
    subjectName: string;
    subjectType: string;
    semester1LessonCount: string;
    semester2LessonCount: string;
}

export default function DetailClass() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("students");
    const [editingRow, setEditingRow] = useState<number | null>(null);
    const [classData, setClassData] = useState<ClassDetail | null>(null);
    const [loading, setLoading] = useState(false);

    // Sorting configuration for students
    const [studentSort, setStudentSort] = useState<{ key: keyof Student; direction: 'asc' | 'desc' }>({
        key: 'studentCode',
        direction: 'asc',
    });

    // Sorting configuration for subjects
    const [subjectSort, setSubjectSort] = useState<{ key: keyof Subject; direction: 'asc' | 'desc' }>({
        key: 'subjectCode',
        direction: 'asc',
    });

    // Fetch class detail from API
    useEffect(() => {
        const fetchClassDetail = async () => {
            if (!id) return;

            setLoading(true);
            try {
                const response = await apiInstance.get(`api/class/detail?Id=${id}`);
                if (response.data.status === 0) {
                    setClassData(response.data.data);
                } else {
                    console.error('Error fetching class detail:', response.data.message);
                    showToast('Tải thông tin lớp thất bại', 'error');
                }
            } catch (error) {
                console.error('API Error:', error);
                showToast('Tải thông tin lớp thất bại', 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchClassDetail();
    }, [id]);

    // Handle edit class navigation
    const handleEditClick = () => {
        if (classData) {
            navigate(`/leadership/data-declaration/classes/classes-edit/${classData.id}`);
        }
    };
    useEffect(() => {
        console.log(sortedStudents)
    }, [studentSort])
    // Handle delete class
    const handleDeleteClick = async () => {
        if (!classData) return;

        setLoading(true);
        try {
            await apiInstance.delete('api/class', {
                data: { ids: [classData.id] },
            });
            showToast(`Xóa lớp ${classData.className} thành công`, 'success');
            navigate('/leadership/classes');
        } catch (error) {
            console.error('Error deleting class:', error);
            showToast('Xóa lớp thất bại', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Handle sorting for students
    const handleStudentSort = (key: keyof Student) => {
        setStudentSort((prev) => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
        }));
    };

    // Handle sorting for subjects
    const handleSubjectSort = (key: keyof Subject) => {
        setSubjectSort((prev) => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
        }));
    };

    // Sort students
    const sortedStudents = classData?.classDetailStudentResponse?.sort((a, b) => {
        const valueA = a[studentSort.key].toString().toLowerCase();
        const valueB = b[studentSort.key].toString().toLowerCase();
        return studentSort.direction === "asc"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
    }) || [];

    // Sort subjects
    const sortedSubjects = classData?.classDetailSubjectResponse?.sort((a, b) => {
        const valueA = a[subjectSort.key].toString().toLowerCase();
        const valueB = b[subjectSort.key].toString().toLowerCase();
        return subjectSort.direction === "asc"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
    }) || [];


    if (!classData && !loading) {
        return <div>Không tìm thấy dữ liệu lớp học</div>;
    }
    const breadcrumbs = [
        { name: "Khai báo dữ liệu", href: "/" },
        { name: "Lớp học", href: "/leadership/data-declaration/classes" },
        { name: "Chi tiết lớp học", isActive: true },

    ];
    return (
        <div className="container mx-auto p-4 max-w-7xl">
            <AddressUrlStack breadcrumbs={breadcrumbs} />
            <Toasted />
            {loading && <LoadingSpinner />}

            {/* General Information Card */}
            <div className="border border-orange-300 rounded-lg p-6 mb-8 bg-[#FFF9F4]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-orange-700">Thông tin chung</h2>
                    <div className="flex gap-2">
                        <button className="p-2 rounded-md hover:bg-gray-100" onClick={handleEditClick}>
                            <img src={Edit || "/placeholder.svg"} alt="Edit" className="h-5 w-5 text-orange-500" />
                        </button>
                        <button className="p-2 rounded-md hover:bg-gray-100" onClick={handleDeleteClick}>
                            <img src={Trash || "/placeholder.svg"} alt="Trash" className="h-5 w-5 text-orange-500" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">Niên khóa:</div>
                            <div>{classData?.academicYearName}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">Khoa - Khối:</div>
                            <div>{classData?.departmentName}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">Mã lớp học:</div>
                            <div>{classData?.classCode}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">Tên lớp học:</div>
                            <div>{classData?.className}</div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">Giáo viên chủ nhiệm:</div>
                            <div>{classData?.homeroomTeacher}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">Số lượng học viên:</div>
                            <div>{classData?.studentCount} học viên</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">Loại lớp học:</div>
                            <div>{classData?.classType}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">Số lượng môn học:</div>
                            <div>{classData?.subjectCount} môn học</div>
                        </div>
                    </div>

                    <div>
                        <div className="font-medium mb-2">Mô tả:</div>
                        <div className="text-sm">{classData?.description}</div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                <div className="flex bg-gray-100 rounded-full p-2 mb-6 w-fit">
                    <button
                        onClick={() => setActiveTab("students")}
                        className={`px-8 py-1 rounded-full text-lg font-medium ${activeTab === "students" ? "bg-gray-800 text-white" : "text-gray-500"}`}
                    >
                        Danh sách học viên
                    </button>
                    <button
                        onClick={() => setActiveTab("subjects")}
                        className={`px-8 py-1 rounded-full text-lg font-medium ${activeTab === "subjects" ? "bg-gray-800 text-white" : "text-gray-500"}`}
                    >
                        Danh sách môn học
                    </button>
                </div>

                <div className={activeTab === "students" ? "block" : "hidden"}>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr className="bg-orange-500">
                                    <th className="text-white font-medium text-left py-3 px-4">STT</th>
                                    <th className="text-white font-medium text-left py-3 px-4">
                                        <button className="flex items-center" onClick={() => handleStudentSort('studentCode')}>
                                            <span>Mã học viên</span>
                                            <span className="ml-1 flex flex-col">
                                                <ChevronUp className="w-4 h-4" />
                                                <ChevronDown className="w-4 h-4 -mt-2" />
                                            </span>
                                        </button>
                                    </th>
                                    <th className="text-white font-medium text-left py-3 px-4">
                                        <button className="flex items-center" onClick={() => handleStudentSort('studentName')}>
                                            <span>Tên học viên</span>
                                            <span className="ml-1 flex flex-col">
                                                <ChevronUp className="w-4 h-4" />
                                                <ChevronDown className="w-4 h-4 -mt-2" />
                                            </span>
                                        </button>
                                    </th>
                                    <th className="text-white font-medium text-left py-3 px-4">Niên khóa</th>
                                    <th className="text-white font-medium text-left py-3 px-4">Ngày nhập học</th>
                                    <th className="text-white font-medium text-left py-3 px-4">
                                        <button className="flex items-center" onClick={() => handleStudentSort('studentStatus')}>
                                            <span>Tình trạng</span>
                                            <span className="ml-1 flex flex-col">
                                                <ChevronUp className="w-4 h-4" />
                                                <ChevronDown className="w-4 h-4 -mt-2" />
                                            </span>
                                        </button>
                                    </th>
                                    <th className="text-white font-medium text-left py-3 px-4"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedStudents.length > 0 ? (
                                    sortedStudents.map((student, index) => (
                                        <tr key={student.id} className={index % 2 === 1 ? "bg-gray-100" : ""}>
                                            <td className="py-3 px-4">{index + 1}</td>
                                            <td className="py-3 px-4">{student.studentCode}</td>
                                            <td className="py-3 px-4">{student.studentName}</td>
                                            <td className="py-3 px-4">{student.academicYear}</td>
                                            <td className="py-3 px-4">{student.admissionDate}</td>
                                            <td className="py-3 px-4">
                                                <StatusBadge status={student.studentStatus} />
                                            </td>
                                            <td className="p-3">
                                                {editingRow === index ? (
                                                    <button
                                                        className="bg-orange-400 text-white rounded-md px-4 py-1 hover:bg-orange-500"
                                                        onClick={() => setEditingRow(null)}
                                                    >
                                                        Lưu
                                                    </button>
                                                ) : (
                                                    <button className="p-2 rounded-md hover:bg-gray-200" onClick={() => setEditingRow(index)}>
                                                        <img src={Edit || "/placeholder.svg"} alt="Edit" className="h-5 w-5" />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="py-3 px-4 text-center text-gray-500">
                                            Không có dữ liệu học viên
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className={activeTab === "subjects" ? "block" : "hidden"}>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr className="bg-orange-500">
                                    <th className="text-white font-medium text-left py-3 px-4">STT</th>
                                    <th className="text-white font-medium text-left py-3 px-4">
                                        <button className="flex items-center" onClick={() => handleSubjectSort('subjectCode')}>
                                            <span>Mã môn học</span>
                                            <span className="ml-1 flex flex-col">
                                                <ChevronUp className="w-4 h-4" />
                                                <ChevronDown className="w-4 h-4 -mt-2" />
                                            </span>
                                        </button>
                                    </th>
                                    <th className="text-white font-medium text-left py-3 px-4">
                                        <button className="flex items-center" onClick={() => handleSubjectSort('subjectName')}>
                                            <span>Tên môn học</span>
                                            <span className="ml-1 flex flex-col">
                                                <ChevronUp className="w-4 h-4" />
                                                <ChevronDown className="w-4 h-4 -mt-2" />
                                            </span>
                                        </button>
                                    </th>
                                    <th className="text-white font-medium text-left py-3 px-4">
                                        <button className="flex items-center" onClick={() => handleSubjectSort('subjectType')}>
                                            <span>Loại môn</span>
                                            <span className="ml-1 flex flex-col">
                                                <ChevronUp className="w-4 h-4" />
                                                <ChevronDown className="w-4 h-4 -mt-2" />
                                            </span>
                                        </button>
                                    </th>
                                    <th className="text-white font-medium text-left py-3 px-4">Số tiết HK1</th>
                                    <th className="text-white font-medium text-left py-3 px-4">Số tiết HK2</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classData?.classDetailSubjectResponse && classData.classDetailSubjectResponse.length > 0 ? (
                                    sortedSubjects.map((subject, index) => (
                                        <tr key={subject.subjectCode} className={index % 2 === 1 ? "bg-gray-100" : ""}>
                                            <td className="py-3 px-4">{index + 1}</td>
                                            <td className="py-3 px-4">{subject.subjectCode}</td>
                                            <td className="py-3 px-4">{subject.subjectName}</td>
                                            <td className="py-3 px-4">{subject.subjectType}</td>
                                            <td className="py-3 px-4">{subject.semester1LessonCount}</td>
                                            <td className="py-3 px-4">{subject.semester2LessonCount}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="py-3 px-4 text-center text-gray-500">
                                            Không có dữ liệu môn học
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Status Badge Component
function StatusBadge({ status }: { status: string }) {
    let color = "";
    let text = "";

    switch (status) {
        case "Đang học":
            color = "text-green-600";
            text = "Đang học";
            break;
        case "Đang bảo lưu":
            color = "text-orange-500";
            text = "Đang bảo lưu";
            break;
        case "N/A":
            color = "text-gray-600";
            text = "Không xác định";
            break;
        default:
            color = "text-gray-600";
            text = "Không xác định";
    }

    return (
        <div
            className={`flex items-center rounded-md p-2 border-2 ${status === "Đang học" ? "border-green-600" : status === "Đang bảo lưu" ? "border-orange-500" : "border-gray-600"
                }`}
        >
            <div
                className={`w-2 h-2 rounded-full mr-2 ${status === "Đang học" ? "bg-green-600" : status === "Đang bảo lưu" ? "bg-orange-500" : "bg-gray-600"
                    }`}
            ></div>
            <span className={color}>{text}</span>
        </div>
    );
}