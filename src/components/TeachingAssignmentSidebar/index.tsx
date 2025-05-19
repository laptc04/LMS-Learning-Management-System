import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Option, SidebarProps } from './type';
import Dropdown from '../Dropdown';
import apiInstance from '../../../src/services/api';
import { set } from 'date-fns';

const filter1Options: Option[] = [
  { id: 'all', value: '2020-2021' },
  { id: 'option2', value: '2021-2022' },
];

const filter2Options: Option[] = [
  { id: 'all', value: 'Toán đại số' },
  { id: 'option2', value: 'Toán hình học' },
];

const TeachingAssignmentSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null);
  const [subjects, setSubjects] = useState<{ id: number; name: string }[]>([]);
  const [instructors, setInstructors] = useState<{ id: number; name: string }[]>([]);

  const fetchDataSubjects = async () => {
    try {
      const response = await apiInstance.get(
        `api/subject/get-all-subjects`
      );

      if (response.data.status === 0) {
        const subject = response.data.data;
        setSubjects(subject);
        setSelectedSubjectId(subject[0].id); // Chọn môn đầu tiên trong danh sách
        // setLoading(false); // Đánh dấu là đã tải xong
      } else {
        throw new Error(response.data.message || "Lỗi không xác định");
      }
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu:", err);
    }
  };

  const fetchDataSchoolTransfer = async (subjectId: number) => {
    try {
      const response = await apiInstance.get(
        `api/teacher/get-all-teacher-by-subjectId/${subjectId}`
      );

      // Vì response.data.data là 1 mảng, không phải { items: [...] }
      if (response.data.status === 0 && Array.isArray(response.data.data)) {
        const transformed = response.data.data.map((item: any) => ({
          id: item.id,
          name: item.fullName,
        }));
        setInstructors(transformed);
      } else {
        console.error("Dữ liệu không hợp lệ:", response.data);
      }
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu:", err);
    }
  };

  useEffect(() => {
    fetchDataSubjects(); // chỉ gọi API subject khi mount
  }, []);

  useEffect(() => {
    if (selectedSubjectId !== null) {
      fetchDataSchoolTransfer(selectedSubjectId);
    }
  }, [selectedSubjectId]);

  const dropdownFilter1 = filter1Options.map((opt) => ({
    id: Number(opt.id),
    value: opt.value,
  }));

  const dropdownFilter2 = subjects.map((opt) => ({
    id: Number(opt.id),
    value: opt.name,
  }));
  return (
    <div className="w-70 h-full">
      <div className="bg-[#373839] p-3 rounded-t-xl mb-4">
        <p className="text-sm text-white font-medium mb-3">Đang chọn xem:</p>
        <div className="flex items-center mb-2">
          <label className="text-sm text-white font-medium w-20">Niên khóa:</label>
          <Dropdown options={dropdownFilter1} width="medium" />
        </div>

        <div className="flex items-center">
          <label className="text-sm text-white font-medium w-20">Bộ môn:</label>
          <Dropdown
            options={dropdownFilter2}
            width="medium"
            onChange={(option: any) => {
              setSelectedSubjectId(option.id);
            }}
          />
        </div>
      </div>

      <ul className="space-y-3">
        {instructors.map((instructor) => (
          <li
            key={instructor.id}
            onClick={() => navigate(`/leadership/teacher/teaching-assignment/${instructor.id}`)}
            className={`p-3 py-4 mx-8 border border-[#FF7506] rounded-lg cursor-pointer 
        ${location.pathname.includes(instructor.id.toString()) ? 'bg-[#823B00] text-white' : 'bg-[#FFF9F4] text-black hover:bg-[#823B00] hover:text-white'
              }`}
          >
            {instructor.name}
          </li>
        ))}
      </ul>

    </div>
  );
};

export default TeachingAssignmentSidebar;
