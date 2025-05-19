import { useState, useRef } from 'react';
import { SearchIcon, PaperclipIcon, CalendarIcon } from 'lucide-react';
import Button from '../../../../../components/Button';
// import DatePicker from '../../../../../components/DatePicker';

const UpdateTeachingSchedule = () => {
  const [date, setDate] = useState<string>('22 tháng 10, 2020');
  const [fileName, setFileName] = useState<string>('Loremisump.pdf');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDateChange = (date: string | null) => {
    if (date !== null) {
      setDate(date);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    }
  };

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = () => {
    alert(`Lưu thành công!`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">Cập nhật lịch giảng dạy</h1>
      <div className="bg-white w-full mx-auto p-6 shadow-md rounded-lg">
        <form className="space-y-4">
          <div className="flex justify-between mb-8">
            <div className="flex gap-2">
              <span className="font-semibold">Môn học:</span>
              <span className="font-normal italic">Toán học</span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold">Giảng viên:</span>
              <span className="font-normal italic">Nguyễn Văn A</span>
            </div>
            <div className="w-1/3"></div>
          </div>

          <div className="flex items-center">
            <div className="relative w-full">
              <input type="text" className="border border-gray-300 rounded-md px-4 py-2 w-full" placeholder="Lớp học..." />
              <SearchIcon className="absolute right-3 top-3 w-5 h-5 text-orange-500" />
            </div>
          </div>

          <div className="flex flex-col">
            <textarea className="border border-gray-300 rounded-md px-4 py-2 w-full" placeholder="Mô tả và câu hỏi cho topic này..." rows={8} />
          </div>

          <div className="flex justify-between space-x-10">
            <div className="flex flex-col">
              <label className="font-medium">Thời gian bắt đầu:</label>
              <div className="flex items-center space-x-2 text-gray-500 ms-8 my-4">
                <CalendarIcon className="w-5 h-5 text-orange-500" />
                <span className="text-gray-500">{date}</span>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="font-medium">Thời gian kết thúc:</label>
              <div className="flex items-center space-x-2 text-gray-500 ms-8 my-4">
                <CalendarIcon className="w-5 h-5 text-orange-500" />
                <span className="text-gray-500">{date}</span>
              </div>
            </div>
            <div className="w-1/3"></div>
          </div>

          <div className="flex items-start space-x-2">
            <PaperclipIcon className="w-5 h-5 text-gray-400 mt-1" />
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <label className="font-medium">File đính kèm:</label>
                <span className="text-gray-600 text-sm">{fileName}</span>
              </div>
              <button
                type="button"
                className="w-[120px] h-8 bg-[#FFD8B8] border border-[#FF7506] px-3 py-1 rounded-md text-sm font-medium hover:bg-[#FFBB88] transition-all duration-200"
                onClick={handleFileUploadClick}
              >
                Tải xuống
              </button>
            </div>
          </div>

          <div className="flex justify-center space-x-6 mt-6">
            <Button label="Hủy" backgroundColor="#F2F2F2" size="big" variant="none" onClick={() => alert('Hủy cập nhật!')} />
            <Button label="Lưu" size="big" variant="solid" onClick={handleSave} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTeachingSchedule;
