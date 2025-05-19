import { useParams } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import caretDown from './../../../../../assets/images/caret_down.png';
import Button from '../../../../../components/Button';
import DatePicker from '../../../../../components/DatePicker';
import { PaperclipIcon, SearchIcon } from 'lucide-react';
import apiInstance from '../../../../../services/api';
import { parse, isValid, format } from 'date-fns';
import { convertFileToBase64 } from '../../../../../utils/FileBase64';
import { useLoading } from '../../../../../context/loading';
import { showToast } from '../../../../../components/Toasted';

interface ClassItem {
    id: number;
    className: string;
}

interface StudentItem {
    id: number;
    fullName: string;
}

interface Semester {
    id: number;
    academicYearId: number;
    name: string;
    dateStart: string | null;
    dateEnd: string | null;
}

const AddStudySuspension = () => {
    const { setLoading } = useLoading();
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>('');
    const [base64File, setBase64File] = useState<string | null>(null);
    const [reason, setReason] = useState<string>('');
    const [classList, setClassList] = useState<ClassItem[]>([]);
    const [studentList, setStudentList] = useState<StudentItem[]>([]);
    const [selectedClass, setSelectedClass] = useState<string>('');
    const [selectedStudent, setSelectedStudent] = useState<string>('');
    const [semester, setSemester] = useState<Semester | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    // Fetch classes
    const fetchClasses = async () => {
        try {
            setLoading(true);
            const response = await apiInstance.get('api/class/list', {
                // params: { academicYearId: 1 },
            });
            if (response.data.status === 0) {
                setClassList(response.data.data.items);
            } else {
                console.error('Error fetching classes:', response.data.message);
            }
        } catch (error) {
            console.error('Error API:', error);
        } finally {
            setLoading(false);

        }
    };

    const fetchUserIdByClassId = async () => {
        if (!selectedClass) return;
        try {
            setLoading(true);

            const response = await apiInstance.get('api/academicholds/search-users', {
                params: { classId: selectedClass },
            });
            if (response.data.status === 0) {
                setStudentList(response.data.data);
            } else {
                console.error('Error fetching students:', response.data.message);
            }
        } catch (error) {
            console.error('Error API:', error);
        } finally {
            setLoading(false);

        }
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    useEffect(() => {
        fetchUserIdByClassId();
    }, [selectedClass]);

    const handleDateChange = (date: string | null) => {
        if (date) {
            // Parse theo định dạng dd/MM/yyyy
            const parsedDate = parse(date, 'dd/MM/yyyy', new Date());

            if (isValid(parsedDate)) {
                const formattedDate = format(parsedDate, 'yyyy-MM-dd');
                setSelectedDate(formattedDate);
                fetchSemesterByDate(formattedDate);
            } else {
                console.error('Invalid date:', date);
            }
        }
    };


    const fetchSemesterByDate = async (date: string) => {
        try {
            setLoading(true);

            const response = await apiInstance.get(`/api/academicholds/semester-by-date`, {
                params: { date },
            });

            if (response.data.status === 0) {
                setSemester(response.data.data);
            }
        } catch (error: any) {
            setSemester(null);
            console.error("Error fetching semester data:", error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (semester) {
        }
    }, [semester]);

    const handleFileUploadClick = () => {
        fileInputRef.current?.click();
    };
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedFile = event.target.files[0];
            setFile(selectedFile);
            setFileName(selectedFile.name);

            try {
                const base64 = await convertFileToBase64(selectedFile);
                setBase64File(base64);
            } catch (error) {
                console.error(" Lỗi khi đọc file:", error);
            }
        }
    };





    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!file || !base64File) {
            console.error("No file selected or conversion error");
            return;
        }

        let formattedHoldDate = selectedDate ? new Date(selectedDate).toISOString() : null;

        const payload = {
            classId: selectedClass,
            userId: selectedStudent,
            holdDate: formattedHoldDate,
            reason,
            academicHoldRequest: {},
            fileName: base64File,
        };
        try {
            setLoading(true);

            const response = await apiInstance.post("/api/AcademicHolds", payload, {
                headers: { "Content-Type": "application/json" },
            });
            showToast("Thêm bảo lưu thành công!", "success");

        } catch (error: any) {
            showToast("Thêm bảo lưu thất bại!", "error");
        } finally {
            setLoading(false);

        }
    };
    return (
        <div>
            <h1 className="text-2xl font-bold text-center mb-6">Thêm hồ sơ bảo lưu</h1>
            <div className="bg-white w-full mx-auto p-6 shadow-md rounded-lg">
                <form className="space-y-4" onSubmit={handleSave}>
                    {/* Select class */}
                    <div className="flex items-center justify-between">
                        <label className="font-medium">Lớp hiện tại:</label>
                        <div className="relative w-2/3">
                            <select
                                className="border rounded-md px-4 py-2 w-full appearance-none border-black"
                                value={selectedClass}
                                onChange={(e) => setSelectedClass(e.target.value)}
                            >
                                <option value="">Lựa chọn</option>
                                {(classList ?? []).map((cls) => (
                                    <option key={cls?.id} value={cls?.id}>
                                        {cls?.className}
                                    </option>
                                ))}

                            </select>
                            <img src={caretDown} alt="caret down" className="absolute right-3 top-3 w-5 h-5 pointer-events-none" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="font-medium">Tên học viên:</label>
                        <div className="relative w-2/3">
                            <select
                                className="border rounded-md px-4 py-2 w-full appearance-none border-black"
                                value={selectedStudent}
                                onChange={(e) => setSelectedStudent(e.target.value)}
                            >
                                <option value="">Lựa chọn</option>
                                {studentList.map((std) => (
                                    <option key={std.id} value={std.id}>
                                        {std.fullName}
                                    </option>
                                ))}
                            </select>
                            <SearchIcon className="absolute right-3 top-3 w-5 h-5 text-orange-500" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label htmlFor="date-picker" className="font-medium">
                            Ngày bảo lưu: <span className="text-red-500">*</span>
                        </label>
                        <div className="relative w-2/3 flex gap-2 items-center">
                            <DatePicker
                                value={selectedDate}
                                onChange={handleDateChange}
                            />
                            <span className="bg-gray-200 text-gray-700 ms-4 px-4 py-2 rounded-md">
                                {semester?.name || 'Chưa có học kỳ'}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start justify-between">
                        <label className="font-medium">
                            Lý do bảo lưu: <span className="text-red-500">*</span>
                        </label>
                        <div className="w-2/3">
                            <textarea
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                className="border border-black rounded-md px-4 py-2 w-full"
                                placeholder="Nhập lý do..."
                                rows={6}
                            />
                            <p className="text-sm text-gray-500 mt-1 italic">Kết quả học tập của học viên sẽ được bảo lưu trong hồ sơ học viên.</p>
                        </div>
                    </div>

                    {/* File attachment */}
                    <div className="flex justify-between items-center mt-4">
                        <label className="font-medium">
                            Tệp đính kèm: <span className="text-red-500">*</span>
                        </label>
                        <div className="relative w-2/3 flex flex-col">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center border border-gray-300 rounded-md bg-gray-100 px-3 h-10 w-full">
                                    <PaperclipIcon className="w-5 h-5 text-orange-500" />
                                    <div className="w-px h-6 bg-gray-300 mx-3" />
                                    <span className={`flex-1 px-2 text-gray-600 truncate text-sm leading-10 overflow-hidden ${!fileName ? 'text-gray-400 italic' : ''}`}>
                                        {fileName || 'Chưa chọn tệp'}
                                    </span>
                                    <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
                                </div>

                                <button
                                    type="button"
                                    className="w-full max-w-[200px] h-10 bg-[#FFD8B8] text-black border border-orange-500 px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-200 transition-all duration-200"
                                    onClick={handleFileUploadClick}
                                >
                                    Chọn tệp tải lên...
                                </button>
                            </div>
                            <p className="text-sm text-gray-500 mt-2 italic">Kích thước tệp không vượt quá 250MB.</p>
                        </div>
                    </div>

                    {/* Save and cancel buttons */}
                    <div className="flex justify-center space-x-6 mt-6">
                        <Button label="Hủy" backgroundColor="#F2F2F2" size="big" variant="none" onClick={() => alert('Hủy bảo lưu!')} />
                        <Button label="Lưu" size="big" variant="solid" onClick={() => { }} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddStudySuspension;
