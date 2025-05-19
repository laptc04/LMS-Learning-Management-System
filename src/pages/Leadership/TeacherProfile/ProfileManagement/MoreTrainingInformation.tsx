import { FaPaperclip, FaPlus } from 'react-icons/fa';
import Input from '../../../../components/Input';
import { useState } from 'react';
import { Option } from '../../../../components/Dropdown/type';
import DatePicker from '../../../../components/DatePicker';

const MoreTrainingInformation = () => {
  const [trainingName, setTrainingName] = useState('Huỳnh Quốc Đại');
  const [trainingFacility, setTrainingFacility] = useState('');
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState('');
  const [certificate, setCertificate] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const specializedOtpion: Option[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    value: `12A${i + 1}`,
  }));

  return (
    <div className="w-[884px] mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-300">
      <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">Thêm mới chương trình đào tạo</h2>

      <form className="space-y-4">
        {/* Giảng viên */}
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">Giảng viên</label>
          <div className="w-2/3">
            <Input value={trainingName} onChange={(e) => setTrainingName(e.target.value)} size="full" background="dark grey" />
          </div>
        </div>

        {/* Cơ sở đào tạo */}
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">
            Cơ sở đào tạo <span className="text-[#ff7506]">*</span>
          </label>
          <div className="w-2/3">
            <Input
              value={trainingFacility}
              onChange={(e) => setTrainingFacility(e.target.value)}
              border="grey"
              size="full"
              placeholder="THPT Campus"
            />
          </div>
        </div>

        {/* Chuyên ngành */}
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">
            Chuyên ngành <span className="text-[#ff7506]">*</span>
          </label>
          <div className="w-2/3">
            <select className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-100">
              <option>Lựa chọn</option>
              {specializedOtpion.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.value}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Ngày bắt đầu */}
        <div className="flex justify-between">
          <label className="block text-sm font-medium text-gray-700">
            Ngày bắt đầu <span className="text-[#ff7506]">*</span>
          </label>
          <div className="w-2/3">
            <div className="relative">
              <DatePicker
                value={startDate}
                onChange={(date) => {
                  setStartDate(date);
                }}
              />
            </div>
            {/* Ngày kết thúc */}
            <div className="flex items-center space-x-2 mt-3">
              <input type="checkbox" className="w-4 h-4 text-blue-500" />
              <label className="text-sm text-gray-700">Kết thúc Chương trình đào tạo</label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">
            Ngày kết thúc <span className="text-[#ff7506]">*</span>
          </label>
          <div className="w-2/3">
            <DatePicker
              value={endDate}
              onChange={(date) => {
                setEndDate(date);
              }}
            />
          </div>
        </div>

        {/* Hình thức */}
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">
            Hình thức <span className="text-[#ff7506]">*</span>
          </label>
          <div className="w-2/3">
            <Input value={form} onChange={(e) => setForm(e.target.value)} background="light grey" size="full" placeholder="THPT Campus" />
          </div>
        </div>

        {/* Văn bằng / Chứng chỉ */}
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">
            Văn bằng / Chứng chỉ <span className="text-[#ff7506]">*</span>
          </label>
          <div className="w-2/3">
            <Input
              value={certificate}
              onChange={(e) => setCertificate(e.target.value)}
              background="light grey"
              size="full"
              placeholder="THPT Campus"
            />
          </div>
        </div>

        {/* Tệp đính kèm */}
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">Tệp đính kèm</label>
          <div className="w-2/3 space-x-2">
            <div className="flex items-center w-full">
              <div className="flex items-center">
                <Input icon={<FaPaperclip />} disabled value={file ? file.name : ''} onChange={() => {}} />
              </div>
              <label className="flex items-center cursor-pointer text-gray-700 ml-3">
                <input type="file" className="hidden" onChange={handleFileChange} />
                <span className="bg-orange-200 border-orange-200 text-orange-800 px-4 py-2 rounded-lg">Chọn tệp tải lên...</span>
              </label>
            </div>

            <div className="text-xs text-gray-500 italic mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
          </div>
        </div>
      </form>
      <div className="border my-5"></div>
      {/* Thêm chương trình đào tạo */}
      <div>
        <button type="button" className="text-blue-500 text-sm flex items-center">
          <FaPlus className="bg-[#2f80ed] text-[#ffffff] rounded-full mr-2 p-1" />
          <span className="font-medium">Thêm chương trình đào tạo</span>
        </button>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-center mt-4">
        <button type="button" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg w-[125px] mr-5">
          Hủy
        </button>
        <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded-lg w-[125px]">
          Lưu
        </button>
      </div>
    </div>
  );
};

export default MoreTrainingInformation;
