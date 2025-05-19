import { useState } from 'react';
import DatePicker from '../../../../components/DatePicker';
import { Upload, FileText } from 'lucide-react';
import Button from '../../../../components/Button';
import { FaPaperclip } from 'react-icons/fa';

const CommentdationEdit = () => {
  const [startDate, setStartDate] = useState<string>('2025-01-01');
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  // Hàm xử lý nút "Hủy"
  const handleCancel = () => {
    console.log('Đã hủy và reset form');
  };

  const handleSave = () => {
    // Logic lưu (gửi dữ liệu form, ...)
    console.log('Lưu');
  };
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">Cập Nhật Khen Thưởng</h1>
      <div className="bg-white max-w-6xl mx-auto p-6 shadow-md rounded-lg">
        <form className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="font-medium">Học viên</label>
            <div className="w-2/3">
              <p>Nguyễn Ngọc Tuyết</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="font-medium">Lớp hiện tại</label>
            <div className="w-2/3">
              <p>10A</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="font-medium">
              Ngày khen thưởng <span style={{ color: 'red', fontWeight: 'bolder' }}>*</span>
            </label>
            <div className="w-2/3 flex items-center">
              <DatePicker
                value={'1/1/2025'}
                onChange={(value) => setStartDate(value ? new Date(value).toISOString().split('T')[0] : '')}
                placeholder="Chọn ngày bắt đầu"
                className="w-150"
              />

              <div className="bg-gray-200 text-gray-700 px-4 py-2 ml-4 rounded">Học kì I</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="font-medium">
              Nội dung <span style={{ color: 'red', fontWeight: 'bolder' }}>*</span>
            </label>
            <div className="w-2/3">
              <textarea className="w-full h-24 border border-black p-2 rounded-md" placeholder="Lorem ipsum dolor sit amet..."></textarea>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="font-medium">
              Tệp đính kèm <span style={{ color: 'red', fontWeight: 'bolder' }}>*</span>
            </label>
            <div className="w-2/3 flex items-center gap-8">
              <div className="flex items-center bg-gray-100 border border-gray-300 rounded-md p-2 w-3/4">
                {/* Ô chứa icon */}
                <div className="pr-4 border-r border-gray-400 flex items-center">
                  <FaPaperclip style={styles.action__icon} />
                </div>

                {/* Ô chứa tên file */}
                <div className="pl-4 flex-1">
                  <span className="text-gray-700">{fileName || 'Chưa có tệp nào'}</span>
                </div>
              </div>

              <div className="w-1/4">
                <input type="file" id="fileUpload" className="hidden" onChange={handleFileChange} />
                <label
                  htmlFor="fileUpload"
                  className="flex items-center gap-2 bg-orange-300 text-black px-4 py-2 rounded-md cursor-pointer hover:bg-ogange-500"
                >
                  Chọn tệp tải lên...
                </label>
              </div>
            </div>
          </div>
        </form>
        <div className="flex justify-center space-x-4 mt-8">
          <Button
            label="Hủy"
            size="big"
            variant="outline"
            onClick={handleCancel}
            textColor="black"
            border="1px solid rgb(193, 189, 189)"
            backgroundColor="#fafafa"
            hoverBackgroundColor="rgba(212, 208, 205, 0.1)"
          />

          <Button
            label="Lưu"
            size="big"
            variant="solid"
            onClick={handleSave}
            textColor="white"
            backgroundColor="#ff7506"
            hoverBackgroundColor="#45a049"
          />
        </div>
      </div>
    </div>
  );
};
const styles = {
  action__icon: {
    color: '#ff7506',
    fontSize: '20px',
  },
};
export default CommentdationEdit;
