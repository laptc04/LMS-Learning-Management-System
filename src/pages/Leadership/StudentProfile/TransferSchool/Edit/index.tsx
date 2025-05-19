import { useParams } from 'react-router-dom';
import React, { useRef, useState } from 'react';
import caretDown from './../../../../../assets/images/caret_down.png';
import Button from '../../../../../components/Button';
import DatePicker from '../../../../../components/DatePicker';
import { PaperclipIcon } from 'lucide-react';

const AddTransferSchool = () => {
  const { id } = useParams();
  const [date, setDate] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleDateChange = (date: string | null) => {
    if (date !== null) {
      setDate(date);
    }
  };
  const handleCancel = () => {
    alert('Hủy chỉnh sửa!');
  };
  const handleSave = () => {
    alert(`Đã chinh sửa cho môn học có  ${id}`);
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    }
  };

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">Tiếp nhận chuyển trường</h1>
      <div className="bg-white w-full mx-auto p-6 shadow-md rounded-lg">
        <form className="space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="level" className="font-medium">
              Tên học viên:<span className="text-red-500">*</span>
            </label>
            <div className="relative w-2/3">
              <input id="level" type="text" className="border rounded-md px-4 py-2 w-full" placeholder="Nhập tên học viên" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="level" className="font-medium">
              Mã học viên:<span className="text-red-500">*</span>
            </label>
            <div className="relative w-2/3">
              <input id="level" type="text" className="border rounded-md px-4 py-2 w-full" placeholder="Nhập mã học viên" />
            </div>
          </div>

          <div className="flex items-center justify-between ">
            <label htmlFor="date-picker" className="font-medium">
              Ngày chuyển đến:<span className="text-red-500">*</span>
            </label>
            <div className="relative w-2/3">
              <DatePicker onChange={handleDateChange} value={date} className="max-w-full" width="100%" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="font-medium">
              Học kỳ chuyển: <span className="text-red-500">*</span>
            </label>
            <div className="relative w-2/3">
              <p>Học kỳ I</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="subject" className="font-medium">
              Tỉnh/Thành:<span className="text-red-500">*</span>
            </label>
            <div className="relative w-2/3">
              <select id="subject" className="border rounded-md px-4 py-2 w-full appearance-none pr-8">
                <option>Cần Thơ</option>
                <option>Đà Nẵng</option>
                <option>Cà Mau</option>
              </select>
              <img src={caretDown} alt="caret" className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="subject" className="font-medium">
              Quận/Huyện:<span className="text-red-500">*</span>
            </label>
            <div className="relative w-2/3">
              <select id="subject" className="border rounded-md px-4 py-2 w-full appearance-none pr-8">
                <option>Quận 1</option>
                <option>Quận 2</option>
                <option>Quận 3</option>
              </select>
              <img src={caretDown} alt="caret" className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="level" className="font-medium">
              Chuyển từ:<span className="text-red-500">*</span>
            </label>
            <div className="relative w-2/3">
              <input id="level" type="text" className="border rounded-md px-4 py-2 w-full" placeholder="Nhập chuyển từ đâu" />
            </div>
          </div>

          <div className="flex justify-between">
            <label htmlFor="level" className="font-medium">
              Lý do:
            </label>
            <div className="relative w-2/3">
              <textarea
                id="level"
                // value={level}
                // onChange={(e) => setLevel(e.target.value)}
                className="border rounded-md px-4 py-2 w-full"
                placeholder="Nhập lý do"
                rows={5}
              />
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <label className="font-medium">
              Tệp đính kèm: <span className="text-red-500">*</span>
            </label>
            <div className="relative w-2/3 flex flex-col">
              <div className="flex items-center gap-3">
                <div className="flex items-center border rounded-md px-4 py-2 w-full">
                  <PaperclipIcon className="w-5 h-5 text-gray-500" />
                  <span className="flex-1 px-2 text-gray-600">{fileName || 'Chưa có tệp nào được chọn'}</span>
                  <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
                </div>

                <button
                  type="button"
                  className="w-[200px] bg-[#FFD8B8] text-black border border-orange-500 px-1 py-1 rounded-md"
                  onClick={handleFileUploadClick}
                >
                  Chọn tệp tải lên
                </button>
              </div>

              <p className="text-sm text-gray-500 mt-2"> Kích thước tệp không vượt quá 250MB.</p>
            </div>
          </div>

          <div className="flex flex-col gap-y-1">
            <div className="flex justify-center space-x-6 mt-10">
              <Button label="Hủy" backgroundColor="#F2F2F2" size="big" variant="none" onClick={handleCancel} />
              <Button label="Lưu" size="big" variant="solid" onClick={handleSave} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransferSchool;
