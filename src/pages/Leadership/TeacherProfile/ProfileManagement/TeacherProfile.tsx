import React from 'react';
import { Option } from '../../../../components/Dropdown/type';
import Dropdown from '../../../../components/Dropdown';

export default function TeacherProfile() {
  const yearOptions: Option[] = Array.from({ length: 51 }, (_, i) => {
    const startYear = 2000 + i;
    return {
      id: startYear,
      value: `${startYear} - ${startYear + 1}`, // Chuyển về định dạng "YYYY - YYYY+1"
    };
  });
  const classOptions: Option[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1, // Nếu id cần là number
    value: `12A${i + 1}`,
  }));
  return (
    <div className="shadow-sm mb-4 my-5">
      <div className="flex items-center gap-4 p-2 bg-white">
        {/* Tabs */}
        <div className="flex items-center bg-gray-100 p-1 rounded-full">
          <button className="px-4 py-2 text-gray-400 font-medium rounded-full">Thông tin chung</button>
          <button className="px-4 py-2 text-white font-medium bg-gray-800 rounded-full">Quá trình học tập</button>
        </div>

        {/* Dropdown chọn năm học */}
        <div className="relative">
          <Dropdown options={yearOptions} />
        </div>

        {/* Dropdown chọn lớp */}
        <div className="relative">
          <Dropdown options={classOptions} />
        </div>

        {/* Button Xuất File */}
        <button className="ml-auto px-4 py-1 border border-orange-500 text-orange-500 rounded-md text-sm font-medium hover:bg-orange-50">
          Xuất file
        </button>
      </div>
    </div>
  );
}
