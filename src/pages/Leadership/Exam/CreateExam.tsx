import React, { useState, useEffect, useRef } from 'react';
import SubjectButton from '../../../components/SubjectButton/index';
import DatePicker from '../../../components/DatePicker';
import { Option } from '../../../components/Dropdown/type';
import SearchImg from '../../../assets/images/fi_search.png';

interface CustomDropdownProps {
    options: Option[];
    value: string;
    onChange: (option: Option | null) => void;
    placeholder?: string;
    width?: string;
    disabled?: boolean;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
    options,
    value,
    onChange,
    placeholder = 'Tùy chọn',
    width = 'full',
    disabled = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Option | null>(options.find(option => option.value === value) || null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    const handleSelect = (option: Option) => {
        setSelectedOption(option);
        onChange(option);
        setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={`relative ${width === 'full' ? 'w-full' : ''}`} ref={dropdownRef}>
            <div
                className={`flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg cursor-pointer bg-white ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-400'}`}
                onClick={handleToggle}
            >
                <span className="text-gray-700">
                    {selectedOption ? selectedOption.value : placeholder}
                </span>
                <svg
                    className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
            {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {options.map((option) => (
                        <div
                            key={option.id}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSelect(option)}
                        >
                            {option.value}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

interface AddExamScheduleForm {
    semester: string;
    gradeLevel: string;
    classType: string[];
    subject: string;
    examType: string;
    duration: number;
    examDate: string | null;
    assignedTeachers: string[];
}

const AddExamSchedule: React.FC = () => {
    const [formData, setFormData] = useState<AddExamScheduleForm>({
        semester: '',
        gradeLevel: '',
        classType: [],
        subject: '',
        examType: '',
        duration: 0,
        examDate: null,
        assignedTeachers: [],
    });

    const semesterOptions: Option[] = [
        { id: 1, value: 'Niên khóa 2023-2024' },
        { id: 2, value: 'Niên khóa 2024-2025' },
    ];

    const gradeLevelOptions: Option[] = [
        { id: 1, value: 'Khối 6' },
        { id: 2, value: 'Khối 7' },
        { id: 3, value: 'Khối 8' },
        { id: 4, value: 'Khối 9' },
    ];

    const subjectOptions: Option[] = [
        { id: 1, value: 'Toán Đại Số' },
        { id: 2, value: 'Toán Nâng cao' },
        { id: 3, value: 'Vật Lý' },
    ];

    const examTypeOptions: Option[] = [
        { id: 1, value: 'Học kỳ 1' },
        { id: 2, value: 'Học kỳ 2' },
    ];

    const classOptions: string[] = [
        '9A1', '9A2', '9B1', '9B2', '9C1', '9C2', '9D1', '9D2',
    ];

    const teacherByClass: Record<string, string[]> = {
        '9A1': ['Nguyễn Văn A', 'Trần Thị D'],
        '9A2': ['Nguyễn Văn B', 'Trần Thị E'],
        '9B1': ['Nguyễn Văn C', 'Trần Thị D'],
        '9B2': ['Nguyễn Văn A', 'Trần Thị E'],
        '9C1': ['Nguyễn Văn B', 'Trần Thị D'],
        '9C2': ['Nguyễn Văn C', 'Trần Thị E'],
        '9D1': ['Nguyễn Văn A', 'Trần Thị D'],
        '9D2': ['Nguyễn Văn B', 'Trần Thị E'],
    };

    const [classSearchTerm, setClassSearchTerm] = useState<string>('');
    const [teacherSearchTerm, setTeacherSearchTerm] = useState<string>('');

    const handleDropdownChange = (field: keyof AddExamScheduleForm, option: Option | null) => {
        setFormData({
            ...formData,
            [field]: option?.value || '',
        });
    };

    const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            duration: parseInt(e.target.value) || 0,
        });
    };

    const handleDateChange = (date: string | null) => {
        setFormData({
            ...formData,
            examDate: date,
        });
    };

    const handleClassToggle = (className: string) => {
        setFormData({
            ...formData,
            classType: formData.classType.includes(className)
                ? formData.classType.filter(c => c !== className)
                : [...formData.classType, className],
        });
    };

    const handleTeacherToggle = (teacher: string) => {
        setFormData({
            ...formData,
            assignedTeachers: formData.assignedTeachers.includes(teacher)
                ? formData.assignedTeachers.filter(t => t !== teacher)
                : [...formData.assignedTeachers, teacher],
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        if (formData.examDate) {
            const [day, month, year] = formData.examDate.split('/').map(Number);
            const dateObject = new Date(year, month - 1, day);
            console.log('Converted date:', dateObject);
        }
    };

    const filteredClasses = classOptions.filter(className =>
        className.toLowerCase().includes(classSearchTerm.toLowerCase())
    );

    const availableTeachers = formData.classType
        .flatMap(className => teacherByClass[className] || [])
        .filter((teacher, index, self) => self.indexOf(teacher) === index)
        .filter(teacher => teacher.toLowerCase().includes(teacherSearchTerm.toLowerCase()));

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-[900px] p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Thêm lịch thi mới</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700 w-1/4">Niên khóa:</label>
                        <div className="w-3/4">
                            <CustomDropdown
                                options={semesterOptions}
                                value={formData.semester}
                                onChange={(option) => handleDropdownChange('semester', option)}
                                placeholder="Tùy chọn"
                                width="full"
                                disabled={false}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700 w-1/4">Khối:</label>
                        <div className="w-3/4">
                            <CustomDropdown
                                options={gradeLevelOptions}
                                value={formData.gradeLevel}
                                onChange={(option) => handleDropdownChange('gradeLevel', option)}
                                placeholder="Tùy chọn"
                                width="full"
                                disabled={false}
                            />
                        </div>
                    </div>

                    <div className="flex items-start justify-between">
                        <label className="text-sm font-medium text-gray-700 w-1/4">Lớp học:</label>
                        <div className="w-3/4 space-y-2">
                            <div className="flex items-center space-x-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="classType"
                                        value="Tất cả lớp"
                                        onChange={() => setFormData({ ...formData, classType: [] })}
                                        className="mr-2"
                                    />
                                    Tất cả lớp
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="classType"
                                        value="Lớp cơ bản"
                                        className="mr-2"
                                    />
                                    Lớp cơ bản
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="classType"
                                        value="Lớp nâng cao"
                                        className="mr-2"
                                    />
                                    Lớp nâng cao
                                </label>
                            </div>
                            <label className="flex items-center mt-2">
                                <input
                                    type="radio"
                                    name="classType"
                                    value="Tùy chọn"
                                    checked={Array.isArray(formData.classType) && formData.classType.length > 0}
                                    onChange={() => setFormData({ ...formData, classType: formData.classType.length > 0 ? [] : [''] })}
                                    className="mr-2"
                                />
                                Tùy chọn
                            </label>
                            {Array.isArray(formData.classType) && formData.classType.length > 0 && (
                                <>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Tìm kiếm lớp học..."
                                            value={classSearchTerm}
                                            onChange={(e) => setClassSearchTerm(e.target.value)}
                                            className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mb-2"
                                        />
                                        <img
                                            src={SearchImg}
                                            alt="Search"
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 orange-filter"
                                        />
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.classType.map((className) => (
                                            <SubjectButton
                                                key={className}
                                                label={className}
                                                active={true}
                                                removable={true}
                                                size="small"
                                                onRemove={() => handleClassToggle(className)}
                                            />
                                        ))}
                                        {filteredClasses
                                            .filter(className => !formData.classType.includes(className))
                                            .map((className) => (
                                                <SubjectButton
                                                    key={className}
                                                    label={className}
                                                    active={false}
                                                    removable={false}
                                                    size="small"
                                                />
                                            ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700 w-1/4">Môn thi:</label>
                        <div className="w-3/4">
                            <CustomDropdown
                                options={subjectOptions}
                                value={formData.subject}
                                onChange={(option) => handleDropdownChange('subject', option)}
                                placeholder="Tùy chọn"
                                width="full"
                                disabled={false}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700 w-1/4">Tên kỳ:</label>
                        <div className="w-3/4 space-y-2">
                            <input
                                type="text"
                                placeholder="Nhập tên kỳ thi"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            <div className="flex items-center space-x-4">
                                {examTypeOptions.map(option => (
                                    <label key={option.id} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={formData.examType === option.value}
                                            onChange={() => setFormData({ ...formData, examType: option.value })}
                                            className="mr-2"
                                        />
                                        {option.value}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700 w-1/4">Thời lượng làm bài:</label>
                        <div className="w-3/4">
                            <input
                                type="number"
                                value={formData.duration}
                                onChange={handleDurationChange}
                                placeholder="Nhập số phút"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700 w-1/4">Ngày làm bài:</label>
                        <div className="w-3/4">
                            <DatePicker
                                value={formData.examDate}
                                onChange={handleDateChange}
                                placeholder="Chọn ngày thi"
                                width="40%"
                                height="40px"
                            />
                        </div>
                    </div>

                    <hr className="border-t-2 border-gray-300 my-4" />

                    <div className="flex items-start justify-between">
                        <label className="text-sm font-bold text-orange-500 w-1/4 mt-2">Phân công chấm thi:</label>
                        <div className="w-3/4 space-y-2">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="teacherAssignment"
                                    checked={formData.assignedTeachers.length === 0}
                                    onChange={() => setFormData({ ...formData, assignedTeachers: [] })}
                                    className="mr-2"
                                />
                                Áp dụng cho tất cả lớp
                            </label>
                            {formData.assignedTeachers.length === 0 && (
                                <>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Tìm kiếm giáo viên..."
                                            value={teacherSearchTerm}
                                            onChange={(e) => setTeacherSearchTerm(e.target.value)}
                                            className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mb-2"
                                        />
                                        <img
                                            src={SearchImg}
                                            alt="Search"
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 orange-filter"
                                        />
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {availableTeachers
                                            .filter(teacher => teacher.toLowerCase().includes(teacherSearchTerm.toLowerCase()))
                                            .map((teacher) => (
                                                <SubjectButton
                                                    key={teacher}
                                                    label={teacher}
                                                    active={false}
                                                    removable={false}
                                                    size="small"
                                                />
                                            ))}
                                    </div>
                                </>
                            )}

                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="teacherAssignment"
                                    checked={formData.assignedTeachers.length > 0}
                                    onChange={() => setFormData({ ...formData, assignedTeachers: formData.assignedTeachers.length > 0 ? [] : [''] })}
                                    className="mr-2"
                                />
                                Tùy chọn
                            </label>
                            {formData.assignedTeachers.length > 0 && (
                                <>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Tìm kiếm giáo viên..."
                                            value={teacherSearchTerm}
                                            onChange={(e) => setTeacherSearchTerm(e.target.value)}
                                            className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mb-2"
                                        />
                                        <img
                                            src={SearchImg}
                                            alt="Search"
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 orange-filter"
                                        />
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.assignedTeachers.map((teacher) => (
                                            <SubjectButton
                                                key={teacher}
                                                label={teacher}
                                                active={true}
                                                removable={true}
                                                size="small"
                                                onRemove={() => handleTeacherToggle(teacher)}
                                            />
                                        ))}
                                        {availableTeachers
                                            .filter(teacher => !formData.assignedTeachers.includes(teacher))
                                            .map((teacher) => (
                                                <SubjectButton
                                                    key={teacher}
                                                    label={teacher}
                                                    active={false}
                                                    removable={false}
                                                    size="small"
                                                />
                                            ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                            onClick={() => setFormData({
                                semester: '',
                                gradeLevel: '',
                                classType: [],
                                subject: '',
                                examType: '',
                                duration: 0,
                                examDate: null,
                                assignedTeachers: [],
                            })}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                        >
                            Lưu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddExamSchedule;