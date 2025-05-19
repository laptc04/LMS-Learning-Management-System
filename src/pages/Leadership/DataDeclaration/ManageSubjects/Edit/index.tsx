import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Button from '../../../../../components/Button';
import Dropdown from '../../../../../components/Dropdown';
import apiInstance from '../../../../../services/api';
import { useLoading } from '../../../../../context/loading';
import { showToast } from '../../../../../components/Toasted';

const ManageSubjectEdit = () => {
  const { id } = useParams();
  const { setLoading } = useLoading();
  const navigate = useNavigate(); // Hook để chuyển trang
  const [level, setLevel] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  const [semester1, setSemester1] = useState('');
  const [semester2, setSemester2] = useState('');
  const [subjectType, setSubjectType] = useState([]);
  const [selectedSubjectType, setSelectedSubjectType] = useState<string | number | null>(null);
  const [subjectGroup, setSubjectGroup] = useState([]);
  const [selectedSubjectGroup, setSelectedSubjectGroup] = useState<string | number | null>(null);

  // Fetch subject details
  useEffect(() => {
    const fetchSubjectData = async () => {
      try {
        setLoading(true);

        const response = await apiInstance.get(`/api/subject/${id}`);
        if (response.data.status === 0) {
          const subjectData = response.data.data;
          setLevel(subjectData.subjectName);
          setSubjectCode(subjectData.subjectCode);
          setSemester1(subjectData.semester1PeriodCount.toString());
          setSemester2(subjectData.semester2PeriodCount.toString());
          setSelectedSubjectType(subjectData.subjectTypeId);
          setSelectedSubjectGroup(subjectData.subjectGroupId);

        } else {
          alert('Không thể lấy thông tin môn học!');
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu môn học:', error);
        alert('Không thể tải dữ liệu môn học!');
      } finally {
        setLoading(false);


      }
    };

    fetchSubjectData();
  }, [id]);

  // Fetch dropdown options
  const fetchSubjectTypes = async () => {
    try {
      setLoading(true);

      const response = await apiInstance.get('api/subjecttype');
      if (response.data.status === 0) {
        const options = response.data.data.items.map((item: any) => ({
          id: item.id,
          value: item.name,
        }));
        setSubjectType(options);
      }
    } catch (error) {
      console.error('Lỗi lấy loại môn học:', error);
    } finally {
      setLoading(false);

    }
  };

  const fetchSubjectGroups = async () => {
    try {
      setLoading(true);

      const response = await apiInstance.get('api/subjectgroup');
      if (response.data.status === 0) {
        const options = response.data.data.items.map((item: any) => ({
          id: item.id,
          value: item.name,
        }));
        setSubjectGroup(options);
      }
    } catch (error) {
      console.error('Lỗi lấy tổ - bộ môn:', error);
    } finally {
      setLoading(false);


    }
  };

  useEffect(() => {
    fetchSubjectTypes();
    fetchSubjectGroups();
  }, []);

  const handleCancel = () => {
    alert('Hủy chỉnh sửa!');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!level || !selectedSubjectGroup || !selectedSubjectType || !semester1 || !semester2) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    setLoading(true);

    try {
      const updatedSubject = {
        id: id,
        subjectTypeId: selectedSubjectType,
        subjectGroupId: selectedSubjectGroup,
        subjectCode,
        subjectName: level,
        description: 'Updated description',
        semester1PeriodCount: parseInt(semester1),
        semester2PeriodCount: parseInt(semester2),
        isStatus: true,
      };

      const response = await apiInstance.put(`/api/subject/`, updatedSubject);

      if (response.data.status === 0) {
        showToast("Cập nhật môn học thành công!", "success");
        navigate("/leadership/data-declaration/subjects"); // Chuyển hướng đến danh sách môn học (hoặc đường dẫn khác)
      } else {
        showToast("Cập nhật môn học thất bại!", "error");
      }
    } catch (error) {
      console.error('Lỗi cập nhật môn học:', error);
      showToast("Cập nhật môn học thất bại!", "error");
    } finally {
      setLoading(false);

    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">Thiết lập môn học</h1>
      <div className="bg-white max-w-3xl mx-auto p-6 shadow-md rounded-lg">
        <form className="space-y-4" onSubmit={handleSave}>
          {/* Tổ bộ môn */}
          <div className="flex items-center justify-between">
            <label className="font-medium">Tổ - bộ môn:</label>
            <div className="relative w-2/3">
              <Dropdown
                options={subjectGroup}
                width="w-full"
                selectedId={selectedSubjectGroup}
                onChange={(option) => setSelectedSubjectGroup(option.id)}
              />
            </div>
          </div>

          {/* Tên môn học */}
          <div className="flex items-center justify-between">
            <label className="font-medium">Tên môn học:</label>
            <div className="relative w-2/3">
              <input
                type="text"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="border rounded-md px-4 py-2 w-full"
                placeholder="Nhập tên môn học"
              />
            </div>
          </div>

          {/* Mã môn */}
          <div className="flex items-center justify-between">
            <label className="font-medium">Mã môn:</label>
            <div className="relative w-2/3">
              <p>{subjectCode}</p>
            </div>
          </div>

          {/* Loại môn học */}
          <div className="flex items-center justify-between">
            <label className="font-medium">Loại môn học:</label>
            <div className="relative w-2/3">
              <Dropdown
                options={subjectType}
                width="w-full"
                selectedId={selectedSubjectType}
                onChange={(option) => setSelectedSubjectType(option.id)}
              />
            </div>
          </div>

          {/* Số tiết học */}
          <hr className="border-t border-gray-300 my-4" />
          <h3 className="text-orange-500 font-bold text-lg">Số tiết/ học kì</h3>

          <div className="flex flex-col gap-y-2">
            <div className="flex justify-between items-center">
              <label className="font-medium">Học kì 1:</label>
              <input
                type="number"
                value={semester1}
                onChange={(e) => setSemester1(e.target.value)}
                className="border rounded-md px-4 py-2 w-[171px]"
              />
              <label className="font-medium">Học kì 2:</label>
              <input
                type="number"
                value={semester2}
                onChange={(e) => setSemester2(e.target.value)}
                className="border rounded-md px-4 py-2 w-[171px]"
              />
            </div>

            {/* Buttons */}
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

export default ManageSubjectEdit;
