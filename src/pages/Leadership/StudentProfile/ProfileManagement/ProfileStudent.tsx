import React from 'react';

const ClassInfo: React.FC = () => {
  return (
    <div className="p-6 bg-[#FFF9F4] shadow-md rounded-lg border border-[#FF7506] my-5">
      <h1 className="text-xl font-bold mb-4 text-left text-[#CC5C00]">Thông tin chung</h1>
      <div className="flex flex-wrap -mx-2">
        <div className="w-full md:w-1/3 px-2 mb-4 text-left">
          <p>
            <span className="font-bold">Niên khoá:</span> 2020 - 2021
          </p>
          <p>
            <span className="font-bold">Khoa - Khối:</span> Khối 6
          </p>
          <p>
            <span className="font-bold">Mã lớp học:</span> 2020-6A1
          </p>
          <p>
            <span className="font-bold">Tên lớp học:</span> 6A1
          </p>
        </div>
        <div className="w-full md:w-1/3 px-2 mb-4 text-left">
          <p>
            <span className="font-bold">Giáo viên chủ nhiệm:</span> Phạm Thị B
          </p>
          <p>
            <span className="font-bold">Số lượng học viên:</span> 45 học viên
          </p>
          <p>
            <span className="font-bold">Loại lớp học:</span> Lớp học cần bản
          </p>
          <p>
            <span className="font-bold">Số lượng môn học:</span> 10 môn học
          </p>
        </div>
        <div className="w-full md:w-1/3 px-2 mb-4 text-left">
          <h2 className="text-lg font-bold">Mô tả:</h2>
          <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla maximus quam vel aliquam lacinia.</p>
        </div>
      </div>
    </div>
  );
};

export default ClassInfo;
