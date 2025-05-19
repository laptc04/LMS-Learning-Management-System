import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import Dropdown from '../../../../components/Dropdown';
import Button from '../../../../components/Button';
import DatePicker from "react-datepicker";
const AddNewClass = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const assistantGroups = [
    { id: 1, value: "Lorem ipsum dolor sit amet" },
    { id: 2, value: "Lorem ipsum dolor sit amet" },
  ];

  const subjectGroups = [
    { id: 1, label: "0", value: "0" },
    { id: 2, label: "1", value: "1" },
  ];

  const hourOptions = [
    { id: 1, label: "00", value: "00" },
    { id: 2, label: "01", value: "01" },
    { id: 3, label: "02", value: "02" },
  ];

  const minuteOptions = [
    { id: 1, label: "00", value: "00" },
    { id: 2, label: "15", value: "15" },
    { id: 3, label: "30", value: "30" },
  ];

  const handleSave = () => {
    alert(`Lưu thành công`);
  };

  const [password, setPassword] = useState("Loremipsumdolor");
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    autoStart: true,
    saveSession: false,
    allowSharing: false,
  });
  const [shareLink, setShareLink] = useState("https://example.com/meeting");

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    alert("Link đã được sao chép!");
  };

  return (
    <div>
      <div className="flex items-center space-x-5 mb-9">
        <Link to="/teacher/class-management/list" className="text-gray-300 text-[18px] font-mulish font-semibold hover:text-gray-500">
          Quản lý lớp học
        </Link>
        <span className="text-orange-500 font-mulish text-2xl">{'>'}</span>
        <h1 className="text-[40px] font-bold font-mulish">Thêm buổi học mới</h1>
      </div>

      <div className="bg-white py-6 rounded-t-2xl w-full flex justify-center">
        <div className="w-1/4"></div>
        <div className="w-3/5">
          <div className="mb-4 flex items-center">
            <label className="w-1/4 text-gray-700 font-semibold pr-4">Chủ đề</label>
            <input
              type="text"
              className="w-3/4 px-2 py-1 border border-gray-300 rounded-lg"
              placeholder="Nhập chủ đề"
              value="Lorem ipsum dolor sit amet"
            />
          </div>
          <div className="mb-4 flex items-start">
            <label className="w-1/4 text-gray-700 font-semibold mt-2 pr-4">Mô tả</label>
            <textarea
              className="w-3/4 px-2 py-1 border border-gray-300 rounded-lg h-20"
              placeholder="Nhập mô tả"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum viverra, eros et volutpat interdum, leo lectus commodo tellus.</textarea>
          </div>
          <div className="mb-4 flex items-center">
            <label className="w-1/4 text-gray-700 font-semibold pr-4">Trợ giảng</label>
            <div className="relative w-3/4">
              <Dropdown options={assistantGroups} width="full" />
              <div className="absolute inset-y-0 right-7 mr-4 w-px bg-gray-300"></div>
            </div>
          </div>
        </div>
        <div className="w-1/4"></div>
      </div>

      <div className="py-6 w-full flex justify-center shadow-md shadow-s-lg shadow-e-lg">
        <div className="w-1/4"></div>
        <div className="w-3/5">
          {/* Thời lượng */}
          <div className="flex justify-between items-center">
            <label className="w-1/4 text-gray-700 font-semibold pr-4">Thời lượng</label>
            <div className="flex items-center w-3/4 space-x-4">
              <Dropdown options={subjectGroups} width="short" />
              <span>Giờ</span>
              <Dropdown options={minuteOptions} width="short" />
              <span>Phút</span>
            </div>
          </div>

          {/* Ngày bắt đầu */}
          <div className="flex justify-between items-center my-5">
            <label className="w-1/4 text-gray-700 font-semibold pr-4">Ngày bắt đầu</label>
            <div className="flex items-center w-3/4 space-x-4">
              <div className="relative w-1/3">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="w-full border rounded-md pl-3 py-2 focus:outline-none"
                  placeholderText="dd/mm/yy"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <img
                    src={startDate ? "/icon/u_calendar-alt-black.png" : "/icon/u_calendar-alt-color.png"}
                    alt="calendar"
                    className="w-5 h-5"
                  />
                </span>
              </div>
              <div className="w-1/3 pl-3">
                <Dropdown options={hourOptions} width="short" />
              </div>
            </div>
          </div>

          {/* Ngày kết thúc */}
          <div className="flex justify-between items-center">
            <label className="w-1/4 text-gray-700 font-semibold pr-4">Ngày kết thúc</label>
            <div className="flex items-center w-3/4 space-x-4">
              <div className="relative w-1/3">
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="w-full border rounded-md pl-3 py-2 focus:outline-none"
                  placeholderText="dd/mm/yy"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <img
                    src={endDate ? "/icon/u_calendar-alt-black.png" : "/icon/u_calendar-alt-color.png"}
                    alt="calendar"
                    className="w-5 h-5"
                  />
                </span>
              </div>
              <div className="w-1/3 pl-3">
                <Dropdown options={hourOptions} width="short" />
              </div>
            </div>
          </div>

        </div>
        <div className="w-1/4"></div>
      </div>

      <div className="bg-white py-6 rounded-b-2xl w-full flex justify-center shadow-lg">
        <div className="w-1/4"></div>
        <div className="w-3/5">
          <div className="mb-4 flex items-center">
            <label className="w-1/4 text-gray-700 font-semibold">Bảo mật</label>
            <div className="relative w-3/4">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={18} className="text-[#FF7506]" />
                ) : (
                  <Eye size={18} className="text-[#FF7506]" />
                )}
              </button>
            </div>
          </div>

          <div className="mb-4 flex items-start">
            <label className="text-gray-700 font-semibold w-1/4">Cài đặt khác</label>
            <div className="relative w-3/4">
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  className="w-6 h-5 accent-blue-500 mr-2"
                  checked={settings.autoStart}
                  onChange={() => toggleSetting("autoStart")}
                />
                <span>Tự động kích hoạt buổi học khi đến thời gian bắt đầu</span>
              </div>

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  className="w-6 h-5 accent-blue-500 mr-2"
                  checked={settings.saveSession}
                  onChange={() => toggleSetting("saveSession")}
                />
                <span>Bật tính năng lưu lại buổi học</span>
              </div>

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  className="w-6 h-5 accent-blue-500 mr-2"
                  checked={settings.allowSharing}
                  onChange={() => toggleSetting("allowSharing")}
                />
                <span>Cho phép học viên/ cá nhân tham gia chia sẻ buổi học</span>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <label className="text-gray-700 font-semibold mr-4 w-1/4">Link chia sẻ</label>
            <div className="flex w-4/5">
              <input
                type="text"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              />
              <button
                className="ml-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
                onClick={copyToClipboard}
              >
                Copy link
              </button>
            </div>
          </div>

        </div>
        <div className="w-1/4"></div>
      </div>

      <div className="flex justify-center space-x-6 mt-6">
        <Button label="Hủy" backgroundColor="#F2F2F2" size="big" variant="none" onClick={() => alert('Hủy thêm!')} />
        <Button label="Lưu" size="big" variant="solid" onClick={handleSave} />
      </div>
    </div>
  );
};

export default AddNewClass;
