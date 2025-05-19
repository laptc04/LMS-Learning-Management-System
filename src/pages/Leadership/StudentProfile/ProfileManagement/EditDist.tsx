import { useState } from 'react';
import DatePicker from '../../../../components/DatePicker';
import { FaPaperclip } from 'react-icons/fa';

const DisciplineEdit = () => {
  const [startDate, setStartDate] = useState<string>('2025-01-01');
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">Cập nhật kỷ luật</h1>
      <div className="bg-white max-w-6xl mx-auto p-6 shadow-md rounded-lg">
        <form className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="font-medium">Học viên</label>
            <div className="w-2/3">
              <p>Nguyễn Văn A</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="font-medium">Lớp hiện tại</label>
            <div className="w-2/3">
              <p>10A9</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="font-medium">
              Ngày khen thưởng <span style={{ color: 'red', fontWeight: 'bolder' }}>*</span>
            </label>
            <div className="w-2/3 flex items-center">
              {/* DatePicker */}
              <DatePicker
                value={'1/1/2025'}
                onChange={(value) => setStartDate(value ? new Date(value).toISOString().split('T')[0] : '')}
                placeholder="Chọn ngày bắt đầu"
                className="w-150"
              />
              {/* Ô màu xám bên phải */}
              <div className="bg-gray-200 text-gray-700 px-4 py-2 ml-4 rounded">Học kì 1</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="font-medium">
              Nội dung <span style={{ color: 'red', fontWeight: 'bolder' }}>*</span>
            </label>
            <div className="w-2/3">
              <textarea
                className="w-full h-24 border border-black p-2 rounded-md"
                defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque."
              ></textarea>
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
        <div className="flex justify-center space-x-4 mt-6">
          <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded border border-gray-300 hover:bg-gray-300">Hủy</button>
          <button className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600">Lưu</button>
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
export default DisciplineEdit;
