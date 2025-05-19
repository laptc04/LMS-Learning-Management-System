import React, { useRef, useState } from 'react';
import DataPicker from '../../../../../components/DatePicker';
import Button from '../../../../../components/Button';
import { PaperclipIcon, XIcon } from 'lucide-react';

interface UpdateDiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Update: React.FC<UpdateDiscountModalProps> = ({ isOpen, onClose }) => {
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const today: string = formatDate(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(today);
  const [content, setContent] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [isFormChanged, setIsFormChanged] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
      checkFormChanges(event.target.files[0].name, content, selectedDate);
    }
  };

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    checkFormChanges('', content, selectedDate);
  };

  const checkFormChanges = (newFileName: string, newContent: string, newDate: string | null) => {
    if (newFileName || newContent.trim() || newDate !== today) {
      setIsFormChanged(true);
    } else {
      setIsFormChanged(false);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl md:max-w-2xl lg:max-w-[900px] pt-6 pb-6 px-4 md:pt-6 md:pb-8 md:px-14">
        <h2 className="text-[24px] sm:text-[28px] md:text-[30px] lg:text-[32px] font-bold mb-4">Cập nhật kỷ luật</h2>

        <div className="mb-5 flex">
          <p className="text-base w-1/4 font-bold text-start">Học viên:</p>
          <p className="w-3/4 text-start">Nguyễn Ngọc Tuyết</p>
        </div>

        <div className="mb-5 flex">
          <p className="text-base w-1/4 font-bold text-start">Lớp hiện tại:</p>
          <p className="w-3/4 text-start">12A1</p>
        </div>

        <div className="mb-5 flex items-center">
          <label className="block font-bold w-1/4 text-start">
            Ngày khen thưởng:
            <span className="text-red-500 font-black">*</span>
          </label>
          <div className="w-3/4 flex items-center">
            <div className="w-[28%]">
              <DataPicker
                value={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date ?? '');
                  checkFormChanges(fileName, content, date ?? '');
                }}
              />
            </div>
            <div className="w-[22%] pl-4">
              <input
                type="text"
                disabled
                className="w-full text-[#373839] !opacity-100 flex items-center justify-start px-4 py-2 rounded bg-[#c9c4c0]"
                defaultValue="Học kì I"
              />
            </div>
          </div>
        </div>

        <div className="mb-5 flex">
          <label className="block font-bold w-1/4 text-start">
            Nội dung:
            <span className="text-red-500 font-black">*</span>
          </label>
          <div className="w-3/4">
            <textarea
              rows={5}
              className="w-full flex items-center justify-start px-4 py-2 rounded bg-[#f2f2f2] resize-none focus:outline-none"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                checkFormChanges(fileName, e.target.value, selectedDate);
              }}
            ></textarea>
          </div>
        </div>

        <div className="mb-8 flex">
          <label className="block font-bold w-1/4 text-start">
            Tệp đính kèm:
            <span className="text-red-500 font-black">*</span>
          </label>
          <div className="w-3/4">
            <div className="relative flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded px-4 py-2 w-full bg-white shadow-sm">
                  <PaperclipIcon className="w-6 h-6 text-[#ff7506] pr-2 border-r border-gray-300 scale-150 block" />
                  <span className="flex-1 px-2 text-gray-600 truncate text-start pl-5">{fileName || 'Chưa chọn tệp'}</span>
                  {fileName && (
                    <button onClick={handleRemoveFile} className="text-red-500 hover:text-red-700">
                      <XIcon className="w-5 h-5" />
                    </button>
                  )}
                  <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
                </div>
                <button
                  type="button"
                  className="w-[200px] bg-[#FFD8B8] text-dark px-3 py-2 rounded border border-[#ff7506] shadow-md hover:bg-orange-600 hover:text-white transition"
                  onClick={handleFileUploadClick}
                >
                  Chọn tệp tải lên...
                </button>
              </div>
              <p className="text-sm text-gray-500">Kích thước tệp không vượt quá 250MB.</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mb-4">
          <Button label="Hủy" size="big" backgroundColor="#f2f2f2" onClick={onClose} variant="solid" textColor="black" />
          <Button
            label="Lưu"
            size="big"
            backgroundColor={isFormChanged ? '#ff7506' : '#c9c4c0'}
            hoverBackgroundColor={isFormChanged ? '#d65e00' : '#c9c4c0'}
            textColor="white"
            disabled={!isFormChanged}
            onClick={() => {
              if (isFormChanged) {
                console.log('Lưu dữ liệu...');
                setIsFormChanged(false);
              }
            }}
            variant="solid"
          />
        </div>
      </div>
    </div>
  );
};

export default Update;
