import { useParams } from 'react-router-dom';
import React, { useRef, useState } from 'react';
import caretDown from './../../../../../assets/images/caret_down.png';
import Button from '../../../../../components/Button';
import DatePicker from '../../../../../components/DatePicker';
import { PaperclipIcon, SearchIcon } from 'lucide-react';

const UpdateTransfer = () => {
  const { id } = useParams();
  const [date, setDate] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [studentName, setStudentName] = useState<string>('');
  const [transferFrom, setTransferFrom] = useState<string>('');
  const [reason, setReason] = useState<string>('');
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
    alert(`Lưu thông tin bảo lưu cho học viên: ${studentName}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">Cập nhật bảo lưu</h1>
      <div className="bg-white w-full mx-auto p-6 shadow-md rounded-lg">
        <form className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="font-medium">Lớp hiện tại:</label>
            <div className="relative w-2/3">
              <select className="border rounded-md px-4 py-2 w-full appearance-none border border-black">
                <option>Lựa chọn</option>
                <option>Lựa chọn 1</option>
                <option>Lựa chọn 2</option>
              </select>
              <img src={caretDown} alt="caret down" className="absolute right-3 top-3 w-5 h-5 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="font-medium">
              Tên học viên: <span className="text-red-500">*</span>
            </label>
            <div className="relative w-2/3">
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="border border-black rounded-md px-4 py-2 w-full"
                placeholder="Sample text"
              />
              <SearchIcon className="absolute right-3 top-3 w-5 h-5 text-orange-500" />
            </div>
          </div>

          <div className="flex items-center justify-between ">
            <label htmlFor="date-picker" className="font-medium">
              Ngày bảo lưu: <span className="text-red-500">*</span>
            </label>
            <div className="relative w-2/3 flex gap-2 items-center">
              <DatePicker onChange={handleDateChange} value={date} className="max-w-full" width="100%" />
              <span className="bg-gray-200 text-gray-700 ms-4 px-4 py-2 rounded-md">Học kỳ I</span>
            </div>
          </div>

          <div className="flex items-start justify-between">
            <label className="font-medium">
              Lý do bảo lưu: <span className="text-red-500">*</span>
            </label>
            <div className="w-2/3">
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="border border-black rounded-md px-4 py-2 w-full"
                placeholder="Lorem ipsum dolor sit amet..."
                rows={6}
              />
              <p className="text-sm text-gray-500 mt-1 italic">Kết quả học tập của học viên sẽ được bảo lưu trong hồ sơ học viên.</p>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <label className="font-medium">
              Tệp đính kèm: <span className="text-red-500">*</span>
            </label>
            <div className="relative w-2/3 flex flex-col">
              <div className="flex items-center gap-3">
                <div className={`flex items-center border border-gray-300 rounded-md bg-gray-100 px-3 h-10 w-full transition-all duration-300`}>
                  <PaperclipIcon className="w-5 h-5 text-orange-500" />
                  <div className="w-px h-6 bg-gray-300 mx-3" />
                  <span
                    className={`flex-1 px-2 text-gray-600 truncate text-sm leading-10 overflow-hidden ${!fileName ? 'text-gray-400 italic' : ''}`}
                  >
                    {fileName}
                  </span>
                  <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
                </div>

                <button
                  type="button"
                  className="w-full max-w-[200px] h-10 bg-[#FFD8B8] text-black border border-orange-500 px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-200 transition-all duration-200"
                  onClick={handleFileUploadClick}
                >
                  Chọn tệp tải lên...
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2 italic">Kích thước tệp không vượt quá 250MB.</p>
            </div>
          </div>

          <div className="flex justify-center space-x-6 mt-6">
            <Button label="Hủy" backgroundColor="#F2F2F2" size="big" variant="none" onClick={() => alert('Hủy bảo lưu!')} />
            <Button label="Lưu" size="big" variant="solid" onClick={handleSave} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTransfer;
