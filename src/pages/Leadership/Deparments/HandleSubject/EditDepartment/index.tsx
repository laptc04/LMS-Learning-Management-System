import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiInstance from "../../../../../services/api/index";
import Down from '../../../../../assets/images/caret_down.png';
import { TeacherOption } from './type';

const EditDeparmentsForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const departmentId = id ? parseInt(id, 10) : null;

  const [teacherList, setTeacherList] = useState<TeacherOption[]>([]);
  const [formData, setFormData] = useState({
    fullName: '',
    name: '',
    teacherId: ''
  });

  const [errors, setErrors] = useState({
    department: '',
    head: '',
  });

  // Fetch teacher list
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await apiInstance.get(`api/teacher/get-all-teachers`);
        if (response.data.status === 0) {
          setTeacherList(response.data.data);
        } else {
          throw new Error(response.data.message || "Lỗi không xác định");
        }
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu giáo viên:", err);
      }
    };

    fetchTeachers();
  }, []);

  // Fetch department details once teacherList is ready
  useEffect(() => {
    const fetchDepartment = async () => {
      if (!departmentId || teacherList.length === 0) return;
      try {
        const response = await apiInstance.get(`/api/subjectgroup/${departmentId}`);
        if (response.data.status === 0) {
          const department = response.data.data;
          const matchedTeacher = teacherList.find(teacher => teacher.fullName === department.fullName);

          setFormData({
            name: department.name || '',
            fullName: department.fullName || '',
            teacherId: matchedTeacher?.id || ''
          });
        } else {
          throw new Error(response.data.message || "Lỗi không xác định");
        }
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu tổ bộ môn:", err);
      }
    };

    fetchDepartment();
  }, [teacherList]);

  const handleClick = () => {
    navigate('/leadership/data-declaration/departments');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newErrors = {
      department: '',
      head: '',
    };

    if (formData.name.trim() === '') {
      newErrors.department = 'Vui lòng nhập Tên tổ - Bộ môn';
    }

    let updatedFormData = { ...formData };

    const selectedTeacher = teacherList.find(teacher => teacher.fullName === formData.fullName);
    if (!selectedTeacher) {
      newErrors.head = 'Tên giáo viên không hợp lệ';
    } else {
      updatedFormData.teacherId = selectedTeacher.id;
    }

    setErrors(newErrors);

    if (!newErrors.department && !newErrors.head) {
      try {
        const departmentRes = await apiInstance.get(`/api/subjectgroup/${departmentId}`);
        const departmentData = departmentRes.data.data;

        const payload = {
          name: updatedFormData.name,
          id: String(updatedFormData.teacherId),
          subjectIds: departmentData.subjects.map((s: any) => s.id),
          userId: 1
        }


        const response = await apiInstance.put(`/api/subjectgroup/${departmentId}`, payload);

        if (response.data.status === 0) {
          alert("Cập nhật thành công!");
          navigate('/leadership/data-declaration/departments');
        } else {
          alert(`Lỗi: ${response.data.message}`);
        }
      } catch (error) {
        console.error("Lỗi khi cập nhật tổ bộ môn:", error);
        alert("Đã xảy ra lỗi khi gửi dữ liệu.");
      }
    }
  };


  return (
    <div className="max-w-3/4 mx-auto p-6">
      <h1 className="text-[28px] font-medium mb-8 text-center">Thiết lập Tổ - Bộ môn mới</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Department Field */}
        <div className="flex flex-col">
          <div className="flex">
            <span className="block text-[16px] w-1/5 font-bold">Tổ - Bộ môn</span>
            <input
              type="text"
              className="w-4/5 px-3 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
              value={formData.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setFormData({ ...formData, name: e.target.value });
                setErrors({ ...errors, department: '' });
              }}
            />
          </div>
          {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
        </div>

        {/* Department Head Field */}
        <div className="flex flex-col">
          <div className="flex">
            <span className="block text-[16px] w-1/5 font-bold">Trưởng tổ - Bộ môn</span>
            <div className="relative w-4/5">
              <select
                className="w-full px-3 py-2 bg-gray-100 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-gray-200"
                value={formData.fullName}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  setFormData({ ...formData, fullName: e.target.value });
                  setErrors({ ...errors, head: '' });
                }}
              >
                <option value="0">Chọn giáo viên</option>
                {teacherList.map((teacher) => (
                  <option key={teacher.id} value={teacher.fullName}>
                    {teacher.fullName}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <img src={Down} alt="Dropdown Icon" className="w-8 h-8" />
              </div>
            </div>
          </div>
          {errors.head && <p className="text-red-500 text-sm mt-1">{errors.head}</p>}
        </div>

        <hr />

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 w-1/4 mx-auto">
          <button
            type="button"
            onClick={handleClick}
            className="flex-1 font-bold text-lg px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors h-[52px]"
          >
            Huỷ
          </button>
          <button
            type="submit"
            className="flex-1 font-bold text-lg px-4 py-2 bg-[#FF7506] text-white rounded-md transition-colors h-[52px]"
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDeparmentsForm;
