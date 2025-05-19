import React, { useState, useEffect } from 'react';
import { Info } from 'lucide-react';
import DatePicker from '../../../../components/DatePicker';
import Dropdown from '../../../../components/Dropdown';
import apiInstance from '../../../../services/api';
import { showToast } from '../../../../components/Toasted';
import { useNavigate } from 'react-router-dom';

interface DropdownOption {
  id: number;
  value: string;
}

interface Semester {
  name: string;
  dateStart: string;
  dateEnd: string;
}

const fixedYears: DropdownOption[] = Array.from({ length: 31 }, (_, i) => {
  const year = 2020 + i;
  return { id: year, value: year.toString() };
});

const AddSchoolYear: React.FC = ({ }) => {
  const [startYear, setStartYear] = useState(2025);
  const [endYear, setEndYear] = useState(2026);
  const [inheritData, setInheritData] = useState(false);
  const [inheritYear, setInheritYear] = useState<number | null>(2024);
  const [semesters, setSemesters] = useState<Semester[]>([
    { name: 'Học Kỳ I', dateStart: '2025-09-22', dateEnd: '2025-12-30' },
    { name: 'Học Kỳ II', dateStart: '2026-01-01', dateEnd: '2026-06-22' }
  ]);
  const navigate = useNavigate();

  // Hàm chuyển đổi ngày sang định dạng yyyy-MM-dd
  const formatDate = (date: string) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Thêm 1 vì tháng bắt đầu từ 0
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const updateSemesterField = (index: number, field: keyof Semester, value: string) => {
    setSemesters((prev) =>
      prev.map((semester, i) => (i === index ? { ...semester, [field]: value } : semester))
    );
  };

  const addSemester = () => {
    setSemesters((prev) => [
      ...prev,
      { name: `Học Kỳ ${prev.length + 1}`, dateStart: "", dateEnd: "" },
    ]);
  };

  const removeSemester = (index: number) => {
    setSemesters((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    navigate('/leadership/data-declaration/academic-year');
  };

  const handleSave = async () => {
    if (endYear < startYear) {
      showToast('Năm kết thúc phải lớn hơn hoặc bằng năm bắt đầu.', 'error');
      return;
    }

    // Chuyển đổi ngày tháng thành định dạng yyyy-MM-dd
    const formattedStartDate = formatDate(`${startYear}-01-01`);
    const formattedEndDate = formatDate(`${endYear}-12-30`);

    const formattedSemesters = semesters.map(semester => ({
      ...semester,
      dateStart: formatDate(semester.dateStart),
      dateEnd: formatDate(semester.dateEnd)
    }));

    await new Promise((resolve) => setTimeout(resolve, 0));
    const requestData = {
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      name: `${startYear}-${endYear}`,
      isInherit: inheritData,
      academicParent: inheritData ? inheritYear : null,
      semesters: formattedSemesters,
    };

    console.log('Dữ liệu gửi lên API:', requestData);

    try {
      const response = await apiInstance.post('/api/AcademicYear', requestData);
      console.log('Dữ liệu đã lưu:', response.data);

      if (response.data.status === 0) {
        showToast(response.data.message || 'Lưu thành công!', 'success');
        navigate('/leadership/data-declaration/academic-year');
      } else {
        const errorMessage = response.data.message || 'Có lỗi xảy ra, vui lòng thử lại!';
        showToast(errorMessage, 'error');
      }
    } catch (error: any) {
      console.error('Lỗi khi lưu:', error.response?.data || error.message);

      const detailedError = error.response?.data?.data;
      const generalMessage = error.response?.data?.message || error.message;

      if (detailedError) {
        console.log('Chi tiết lỗi:', detailedError);
        showToast(`Lỗi: ${detailedError}`, 'error');
      } else {
        showToast(`Có lỗi xảy ra: ${generalMessage}`, 'error');
      }
    }
  };


  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">
      <div className="p-6 bg-white shadow-lg rounded-2xl w-full h-full border border-gray-300">
        <h2 className="text-2xl font-bold mb-6">Thêm niên khóa mới</h2>

        <div className="flex justify-between items-start space-x-4 mb-6">
          <div>
            <label className="text-gray-800 font-medium block">Niên khóa:</label>
            <div className="flex items-center space-x-2 mt-2">
              <Dropdown
                options={fixedYears}
                selectedId={startYear}
                onChange={(option) => setStartYear(Number(option.id))}
              />
              <span className="text-gray-800 font-medium">đến</span>
              <Dropdown
                options={fixedYears}
                selectedId={endYear}
                onChange={(option) => setEndYear(Number(option.id))}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={inheritData}
                onChange={() => setInheritData(!inheritData)}
                className="form-checkbox border-orange-500 w-6 h-6"
              />
              <span className="text-gray-800 font-medium">Kế thừa dữ liệu:</span>
              <Dropdown
                options={fixedYears}
                selectedId={inheritYear}
                onChange={(option) => setInheritYear(Number(option.id))}
              />
            </div>
            <div className="flex items-start space-x-2 text-sm text-gray-500 mt-2">
              <Info className="w-5 h-5 text-orange-500 mt-0.5" />
              <span>
                Dữ liệu được kế thừa bao gồm:
                <br />- Thông tin học viên và Danh sách lớp học
                <br />- Thông tin môn học
                <br />- Phân công giảng dạy
              </span>
            </div>
          </div>
        </div>

        <hr className="my-6 border-t border-gray-300" />

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-orange-500 mb-4">Cài đặt thời gian</h3>
          {semesters.map((semester, index) => (
            <div key={index} className="flex space-x-4 items-center mb-4">
              <button
                onClick={() => removeSemester(index)}
                className={`w-6 h-6 flex items-center justify-center ${semesters.length === 1 ? 'bg-gray-200' : 'bg-gray-400 hover:bg-gray-600'
                  } rounded-full`}
                disabled={semesters.length === 1}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                </svg>
              </button>

              <label className="text-gray-700 font-medium">Tên học kì:</label>
              <input
                type="text"
                value={semester.name}
                onChange={(e) => updateSemesterField(index, 'name', e.target.value)}
                className="border p-1 rounded w-80"
                placeholder="Nhập tên học kì"
              />

              <label className="text-gray-700">Từ</label>
              <DatePicker
                value={semester.dateStart}
                onChange={(value) => updateSemesterField(index, 'dateStart', value || '')}
                placeholder="Chọn ngày bắt đầu"
                className="w-50"
              />

              <label className="text-gray-700">đến</label>
              <DatePicker
                value={semester.dateEnd}
                onChange={(value) => updateSemesterField(index, 'dateEnd', value || '')}
                placeholder="Chọn ngày kết thúc"
                className="w-50"
              />
            </div>
          ))}

          <button onClick={addSemester} className="flex items-center space-x-2">
            <div className="w-6 h-6 flex items-center justify-center bg-blue-400 rounded-full hover:bg-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m-7-7h14" />
              </svg>
            </div>
            <span className="text-blue-500 font-semibold">Thêm học kì mới</span>
          </button>
        </div>

        <div className="flex justify-center space-x-4 mt-6">
          <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded border border-gray-300 hover:bg-gray-300" onClick={handleCancel}>Hủy</button>
          <button onClick={handleSave} className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600">
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSchoolYear;
