import React, { useState } from 'react';
import { FaCalendarAlt, FaPlusCircle } from 'react-icons/fa';
import Input from '../../../../components/Input';
import Dropdown from '../../../../components/Dropdown';
import DatePicker from '../../../../components/DatePicker';

const AddWorkProcess = () => {
  const [isWorking, setIsWorking] = useState(true);
  const [addwordProcess, setAddwordProcess] = useState('');
  const [agency, setAgency] = useState('');
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [workProcesses, setWorkProcesses] = useState([{}]);

  const departmentOptions = [
    { id: 1, value: 'Toán' },
    { id: 2, value: 'Lý' },
  ];

  const positionOptions = [
    { id: 1, value: 'Giáo viên' },
    { id: 2, value: 'Hiệu trưởng' },
  ];

  const addWorkProcess = () => {
    setWorkProcesses([...workProcesses, {}]);
  };

  return (
    <div className="shadow-lg mb-4 my-5 border border-gray-300 rounded-xl p-6 bg-white">
      <h2 className="text-2xl font-bold text-center mb-5">Thêm mới quá trình công tác</h2>
      {workProcesses.map((_, index) => (
        <div key={index} className="space-y-4 border-b pb-4 mb-4">
          <div className="flex items-center space-x-4">
            <label className="font-semibold w-1/4">Giảng viên</label>
            <div className="w-3/4">
              <Input onChange={(e) => setAddwordProcess(e.target.value)} value={addwordProcess} placeholder='Huỳnh Quốc Nghĩa' type="text" background="light grey" borderRadius="10px" size="full" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <label className="font-semibold w-1/4">
              Cơ quan/ Đơn vị<span className="text-red-500">*</span>
            </label>
            <div className="w-3/4">
              <Input
                value={agency}
                onChange={(e) => setAgency(e.target.value)}
                type="text"
                placeholder="THPT Campus"
                border="grey"
                borderRadius="10px"
                size="full"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <label className="font-semibold w-1/4"></label>
            <div className="flex items-center space-x-2 w-3/4">
              <input type="checkbox" checked={isWorking} onChange={() => setIsWorking(!isWorking)} className="w-5 h-5" />
              <label className="text-lg">Đang làm việc tại đơn vị này</label>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <label className="font-semibold w-1/4">
              Tổ/ Bộ môn<span className="text-red-500">*</span>
            </label>
            <Dropdown options={departmentOptions} width="long" />
          </div>

          <div className="flex items-center space-x-4">
            <label className="font-semibold w-1/4">
              Chức vụ<span className="text-red-500">*</span>
            </label>
            <Dropdown options={positionOptions} width="long" />
          </div>

          <div className="flex items-center space-x-4">
            <label className="font-semibold w-1/4">
              Ngày bắt đầu<span className="text-red-500">*</span>
            </label>
            <div className="w-3/4">
              <DatePicker value={startDate} onChange={setStartDate} width='full'/>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <label className="font-semibold w-1/4">
              Ngày kết thúc<span className="text-red-500">*</span>
            </label>
            <div className="w-3/4">
              <DatePicker value={endDate} onChange={setEndDate} width='full'/>
            </div>
          </div>
        </div>
      ))}
      <button onClick={addWorkProcess} className="text-blue-500 flex items-center mt-2 font-bold">
        <FaPlusCircle className="mr-2" /> Thêm Đơn vị công tác
      </button>

      <div className="flex justify-center mt-4 space-x-4">
        <button className="px-6 py-2 border border-gray-500 rounded bg-gray-200">Hủy</button>
        <button className="px-6 py-2 bg-orange-500 text-white rounded">Lưu</button>
      </div>
    </div>
  );
};

export default AddWorkProcess;
