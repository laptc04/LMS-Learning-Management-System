import React, { useState } from 'react';
import Dropdown from '../../../../../components/Dropdown';
import { Option } from '../../../../../components/Dropdown/type';
import Button from '../../../../../components/Button';
interface UpdateDiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Update: React.FC<UpdateDiscountModalProps> = ({ isOpen, onClose }) => {
  const options: Option[] = [
    { id: 100, value: '100% học phí' },
    { id: 50, value: '50% học phí' },
    { id: 30, value: '30% học phí' },
  ];

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl md:max-w-2xl lg:max-w-[900px] pt-6 pb-6 px-4 md:pt-6 md:pb-8 md:px-14">
        <h2 className="text-[24px] sm:text-[28px] md:text-[30px] lg:text-[32px] font-bold mb-4">Cập nhật miễn giảm</h2>

        <div className="mb-5 flex">
          <p className="text-base w-1/4 font-bold text-start">Tên học viên:</p>
          <p className="w-3/4 text-start">Nguyễn Ngọc Tuyết</p>
        </div>

        <div className="mb-5 flex">
          <p className="text-base w-1/4 font-bold text-start">Lớp hiện tại:</p>
          <p className="w-3/4 text-start">12A1</p>
        </div>

        <div className="mb-5 flex items-center">
          <label className="block font-bold w-1/4 text-start">
            Đối tượng miễn giảm:
            <span className="text-red-500 font-black">*</span>
          </label>
          <div className="w-3/4">
            <Dropdown options={options} width="long" state="normal" />
          </div>
        </div>

        <div className="mb-12 flex items-center">
          <label className="block font-bold w-1/4 text-start">
            Hình thức miễn giảm:
            <span className="text-red-500 font-black">*</span>
          </label>
          <div className="w-3/4">
            <input
              type="text"
              className="w-full flex items-center justify-start px-4 py-2 border border-gray-300 rounded-lg 
             bg-white text-sm 
             hover:bg-gray-100 transition-all duration-200
             focus:outline-none focus:ring-0 focus:border-gray-300"
              defaultValue="30% học phí"
            />
          </div>
        </div>

        <div className="flex justify-center space-x-4 mb-4">
          <Button label="Hủy" size="big" backgroundColor="#f2f2f2f2" onClick={onClose} variant="solid" textColor="black" />
          <Button label="Lưu" size="big" backgroundColor="#c9c4c0" hoverBackgroundColor="#ff7506" onClick={() => {}} variant="solid" />
        </div>
      </div>
    </div>
  );
};

export default Update;
