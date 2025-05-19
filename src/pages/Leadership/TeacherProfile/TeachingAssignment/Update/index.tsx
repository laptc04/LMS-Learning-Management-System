import React, { useEffect, useState } from 'react';
import { Option } from './type';
import DatePicker from '../../../../../components/DatePicker';
import MultiSelectDropdown from '../../../../../components/MultiSelectDropdown';
// import Select from 'react-select';
type TeachingAssignmentUpdateProps = {
  onClose?: () => void;
};

const TeachingAssignmentUpdate: React.FC<TeachingAssignmentUpdateProps> = ({ onClose }) => {
  const [dateStart, setDateStart] = useState<string>('');
  const [dateEnd, setDateEnd] = useState<string>('');
  const [selectedClasses, setSelectedClasses] = useState<Option[]>([]);

  useEffect(() => {
    setSelectedClasses([
      { value: '9A1', id: 1 },
      { value: '9A2', id: 2 },
      { value: '10A1', id: 3 },
      { value: '10A2', id: 4 },
    ]);
  }, []);

  const handleDateStartChange = (date: string | null) => {
    if (date !== null) {
      setDateStart(date);
    }
  };

  const handleDateEndChange = (date: string | null) => {
    if (date !== null) {
      setDateEnd(date);
    }
  };

  return (
    <div className="mx-auto p-6 bg-white w-[700px] rounded-lg">
      <h1 className="text-[28px] font-medium mb-8 text-center">Cập nhật lịch giảng dạy</h1>
      <form className="space-y-6">
        <div className="flex flex-col">
          <div className="flex">
            <span className="block text-[16px] w-1/5 font-bold">Giảng viên</span>
            <span className="block text-[16px]">Nguyễn Văn A</span>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex">
            <span className="block text-[16px] w-1/5 font-bold">Môn học</span>
            <span className="block text-[16px]">Toán đại số</span>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex">
            <span className="block text-[16px] w-1/5 font-bold pt-1">Lớp học</span>

            <span className="w-4/5">
              <MultiSelectDropdown options={selectedClasses} color="bg-orange-400" width="w-full" />
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex">
            <span className="block text-[16px] w-1/5 font-bold pt-1">Ngày bắt đầu</span>
            <DatePicker onChange={handleDateStartChange} value={dateStart} className="w-2/5" width="100%" />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex">
            <span className="block text-[16px] w-1/5 font-bold pt-1">Ngày kết thúc</span>
            <DatePicker onChange={handleDateEndChange} value={dateEnd} className="w-2/5" width="100%" />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex">
            <span className="block text-[16px] w-1/5 font-bold pt-1">Mô tả</span>
            <textarea
              className="w-4/5 p-2 border border-gray-400 rounded-md focus:ring-1 focus:ring-gray-500 focus:border-gray-500 focus:outline-none"
              rows={4}
              placeholder="Nhập mô tả..."
            ></textarea>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 w-1/4 mx-auto">
          <button type="button" onClick={onClose} className="flex-1 font-bold text-lg px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors h-[52px]">
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
export default TeachingAssignmentUpdate;
