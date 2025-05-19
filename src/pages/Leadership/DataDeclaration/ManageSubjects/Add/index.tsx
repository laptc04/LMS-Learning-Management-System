import React, { useState, useEffect, useRef } from 'react';
import caretDown from './../../../../../assets/images/caret_down.png';
import Button from '../../../../../components/Button';
import Dropdown from '../../../../../components/Dropdown';
import apiInstance from '../../../../../services/api';
import { useLoading } from '../../../../../context/loading';
import { showToast } from '../../../../../components/Toasted';
import { useNavigate } from 'react-router-dom';

interface Option {
  id: string | number;
  value: string;
}

const ManageSubjectAdd = () => {
  const navigate = useNavigate(); // Hook để chuyển trang
  const { setLoading } = useLoading();
  const [level, setLevel] = useState<string>('Cơ bản');
  const [subjectType, setSubjectType] = useState<Option[]>([]);
  const [selectedSubjectType, setSelectedSubjectType] = useState<Option | null>(null);
  const [subjectGroup, setSubjectGroup] = useState<Option[]>([]);
  const [selectedSubjectGroup, setSelectedSubjectGroup] = useState<Option | null>(null);

  const subjectCodeRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const semester1Ref = useRef<HTMLInputElement>(null);
  const semester2Ref = useRef<HTMLInputElement>(null);

  const fetchSubjectTypes = async () => {
    try {
      setLoading(true);
      const response = await apiInstance.get('api/subjecttype');
      if (response.data.status === 0) {
        const subjectOptions = response.data.data.items.map((item: any) => ({
          id: item.id,
          value: item.name,
        }));
        setSubjectType(subjectOptions);
      } else {
        console.error('Error fetching subject types:', response.data.message);
      }
    } catch (error) {
      console.error('API Error fetching subject types:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubjectGroup = async () => {
    try {
      const response = await apiInstance.get('api/subjectgroup');
      if (response.data.status === 0) {
        const subjectOptions = response.data.data.items.map((item: any) => ({
          id: item.id,
          value: item.name,
        }));
        setSubjectGroup(subjectOptions);
      } else {
        console.error('Error fetching subject types:', response.data.message);
      }
    } catch (error) {
      console.error('API Error fetching subject types:', error);
    }
  };

  useEffect(() => {
    fetchSubjectTypes();
    fetchSubjectGroup();

  }, []);

  const handleCancel = () => {
    alert('handleCancel');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedSubjectGroup) {
      alert('Please select a subject group');
      return;
    }
    if (!selectedSubjectType) {
      alert('Please select a subject type');
      return;
    }

    const subjectData = {
      subjectTypeId: selectedSubjectType.id,
      subjectGroupId: selectedSubjectGroup?.id,
      isStatus: true,
      subjectCode: subjectCodeRef.current?.value ?? '',
      subjectName: nameRef.current?.value ?? '',
      description: 'Basic Mathematics Course',
      semester1PeriodCount: parseInt(semester1Ref.current?.value ?? '0') || 0,
      semester2PeriodCount: parseInt(semester2Ref.current?.value ?? '0') || 0,
    };
    console.log(subjectData);

    try {
      setLoading(true);
      const response = await apiInstance.post('api/subject', subjectData);
      if (response.data.status === 0) {
        showToast("Thêm môn học thành công!", "success");
        navigate("/leadership/data-declaration/subjects"); // Chuyển hướng đến danh sách môn học (hoặc đường dẫn khác)

      } else {
        showToast("Lỗi khi tạo môn học!", "error");
      }
    } catch (error) {
      showToast("Lỗi khi tạo môn học!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">Thêm môn học mới</h1>
      <div className="bg-white max-w-3xl mx-auto p-6 shadow-md rounded-lg">
        <form className="space-y-4" onSubmit={handleSave}>
          <div className="flex items-center justify-between">
            <label htmlFor="subject" className="font-medium">Tổ - bộ môn:</label>
            <Dropdown
              options={subjectGroup}
              width="w-8/12"
              // value={selectedSubjectGroup?.id}
              onChange={(option: Option) => setSelectedSubjectGroup(option)}
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="level" className="font-medium">Tên môn học:</label>
            <div className="relative w-2/3">
              <input
                ref={nameRef}
                type="text"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="border rounded-md px-4 py-2 w-full"
                placeholder="Nhập tên môn học"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="font-medium">Mã môn:</label>
            <div className="relative w-2/3">
              <input
                ref={subjectCodeRef}
                type="text"
                className="border rounded-md px-4 py-2 w-1/2"
                placeholder="Nhập mã môn"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="subjectType" className="font-medium">Loại môn học:</label>
            <Dropdown
              options={subjectType}
              // value={selectedSubjectType?.id}

              width="w-8/12"
              onChange={(option: Option) => setSelectedSubjectType(option)}
            />
          </div>

          <hr className="border-t border-gray-300 my-4" />

          <h3 className="text-orange-500 font-bold text-lg">Số tiết/ học kì</h3>

          <div className="flex flex-col gap-y-1">
            <div className="flex justify-between">
              <label className="font-medium mt-1">Học kì 1:</label>
              <input
                ref={semester1Ref}
                type="text"
                className="border rounded-md px-4 py-2 w-[171px]"
              />

              <label className="font-medium mt-1">Học kì 2:</label>
              <input
                ref={semester2Ref}
                type="text"
                className="border rounded-md px-4 py-1 w-[171px]"
              />
            </div>

            <div className="flex justify-center space-x-6 mt-10">
              <Button label="Hủy" backgroundColor="#F2F2F2" size="big" variant="none" onClick={handleCancel} />
              <Button label="Lưu" size="big" variant="solid" onClick={() => { }} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageSubjectAdd;
