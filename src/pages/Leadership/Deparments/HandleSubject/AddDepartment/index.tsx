import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Down from '../../../../../assets/images/caret_down.png';
import { TeacherOption, FormData } from './type';
import { useNavigate } from 'react-router-dom';
import apiInstance from "../../../../../services/api/index";


const AddDepartmentsForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    userId: '',
  });
  const [teacherList, setTeacherList] = useState<TeacherOption[]>([]);

  // State error management
  const [errors, setErrors] = useState({
    name: '',
    userId: '',
  });


  useEffect(() => {
    const fetchDatateacher = async () => {
      try {
        const response = await apiInstance.get(`api/teacher/get-all-teachers`);
        console.log("Dữ liệu nhận được:", response.data.data);

        if (response.data.status === 0) {
          setTeacherList(response.data.data);
          console.log(response.data.data);
        } else {
          throw new Error(response.data.message || "Lỗi không xác định");
        }
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err);
      }
    };

    fetchDatateacher();
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: '',
      userId: '',
    };

    if (formData.name.trim() === '') {
      newErrors.name = 'Vui lòng nhập Tên tổ - Bộ môn';
    }
    if (formData.userId.trim() === '' || formData.userId === '#') {
      newErrors.userId = 'Vui lòng chọn Trưởng tổ - Bộ môn';
    }

    setErrors(newErrors);

    if (!newErrors.name && !newErrors.userId) {
      try {
        const payload = {
          name: formData.name,
          userId: formData.userId,
          createAt: new Date().toISOString(),
        };

        const response = await apiInstance.post(`api/subjectgroup`, payload);

        if (response.data.status === 0) {
          alert('Lưu tổ - bộ môn thành công!');
          navigate('/leadership/data-declaration/departments');
        } else {
          alert(`Lỗi: ${response.data.message}`);
        }
      } catch (error) {
        console.error("Lỗi khi gửi dữ liệu:", error);
        alert("Đã xảy ra lỗi khi lưu dữ liệu.");
      }
    }
  };


  const handleClick = () => {
    navigate('/leadership/data-declaration/departments');
  };

  return (
    <div className="max-w-3/4 mx-auto p-6">
      <h1 className="text-[28px] font-medium mb-8 text-center">Thêm Tổ - Bộ môn mới</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Department Field */}
        <div className="flex flex-col">
          <div className="flex">
            <span className="block text-[16px] w-1/5 font-bold">
              Tổ - Bộ môn
              <span className="text-red-500 ml-0.5">*</span>
            </span>
            <input
              type="text"
              className="w-4/5 px-3 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
              value={formData.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setFormData({ ...formData, name: e.target.value });
                setErrors({ ...errors, name: '' });
              }}
            />
          </div>
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Department userId Field */}
        <div className="flex flex-col">
          <div className="flex">
            <span className="block text-[16px] w-1/5 font-bold">
              Trưởng tổ - Bộ môn
              <span className="text-red-500 ml-0.5">*</span>
            </span>
            <div className="relative w-4/5">
              <select
                className="w-full px-3 py-2 bg-gray-100 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-gray-200"
                value={formData.userId}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  setFormData({ ...formData, userId: e.target.value });
                  setErrors({ ...errors, userId: '' });
                }}
              >
                <option value="#">Chọn giáo viên</option>
                {teacherList?.length > 0 && teacherList.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.fullName}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <img src={Down} alt="Dropdown Icon" className="w-8 h-8" />
              </div>
            </div>
          </div>
          {errors.userId && <p className="text-red-500 text-sm mt-1">{errors.userId}</p>}
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
          <button type="submit" className="flex-1 font-bold text-lg px-4 py-2 bg-[#FF7506] text-white rounded-md transition-colors h-[52px]">
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDepartmentsForm;
