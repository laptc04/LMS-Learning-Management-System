import Input from '../../../../components/Input';
import DatePicker from '../../../../components/DatePicker';
import { useState } from 'react';
import { FaLink } from 'react-icons/fa';
import Button from '../../../../components/Button';

const TeacherModal = ({ rowId, type, onClose }: { rowId: string | number; type: string; onClose: () => void }) => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const modalTitles: { [key: string]: string } = {
    updateInfo: 'Cập nhật thông tin',
    retirement: 'Cập nhật nghỉ hưu',
    resignation: 'Cập nhật nghỉ việc',
    temporaryLeave: 'Cập nhật tạm nghỉ',
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()} // Nhấn ra ngoài modal để đóng
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/6" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-semibold mb-4 text-center">{modalTitles[type] || 'Tùy chọn khác'}</h2>

        <form className="p-4">
          <div className="flex w-2/2 justify-between items-center mb-4">
            <div className="w-1/5">
              <label className="font-600">
                Ngày nghĩ hưu <span className="text-red-600">*</span>
              </label>
            </div>
            <div className="w-4/5">
              <DatePicker value={'12/01/2025'} onChange={() => {}} />
            </div>
          </div>

          <div className="flex w-2/2 justify-between items-center mb-3">
            <div className="w-1/5">
              <label className="font-600">
                Ghi chú <span className="text-red-600">*</span>
              </label>
            </div>
            <div className="w-4/5">
              <textarea
                className="w-full h-32 p-3 resize-none bg-gray-100 border-none rounded-md text-gray-500 italic focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="Thêm ghi chú..."
              ></textarea>
            </div>
          </div>

          <div className="flex w-2/2 justify-between items-center">
            <div className="w-1/5">
              <label className="font-600">Quyết định nghỉ hưu</label>
            </div>
            <div className="w-4/5">
              <div className="flex items-center justify-between gap-2">
                <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} />
                <label htmlFor="file-upload" className="flex items-center w-2/3 h-10 px-3 bg-gray-100 border rounded-md cursor-pointer">
                  <span className="text-orange-500 border-r-2 pe-2">
                    <FaLink />
                  </span>
                  <input
                    type="text"
                    value={fileName}
                    placeholder="Chưa có tệp nào"
                    className="w-full bg-transparent border-none outline-none focus:ring-0 text-gray-600"
                    disabled
                  />
                </label>
                <label htmlFor="file-upload" className="px-4 py-2 text-orange-500 border border-orange-500 rounded-md cursor-pointer bg-orange-50">
                  Chọn tệp tải lên...
                </label>
              </div>
            </div>
          </div>

          <p className="mt-1 text-sm italic text-gray-500 w-4/5 ml-auto">Kiểu file .pdf .jpeg .jpg. Dung lượng tối đa 100MB.</p>

          <div className="flex gap-2 justify-center mt-4">
            <Button textColor="black" backgroundColor="#F2F2F2" label="Hủy" size="big" variant="ghost" onClick={onClose} />
            <Button textColor="white" backgroundColor="#C9C4C0" label="Lưu" size="big" variant="ghost" onClick={() => {}} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherModal;
