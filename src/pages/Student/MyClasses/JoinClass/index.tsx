// Lớp học của tôi (Class List)
import React, { useRef, useState } from "react";
import Button from "../../../../components/Button";
import { FaChevronLeft, FaChevronRight, FaPlus, FaEdit, FaTimes, FaLink } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Sử dụng nếu đang dùng React Router
import DatePicker from "react-datepicker";
import Dropdown from "../../../../components/Dropdown";
import { Eye, EyeOff } from "lucide-react";

const JoinClass = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const [editTest, setEditTest] = useState<{ id: number, title: string, date: string, time: string } | null>();

  const [lessons, setLessons] = useState<
    { id: number; title: string; date: string; time: string; color: string; disabled?: boolean }[]
  >([
    { id: 1, title: "Buổi 1", date: "19/08/2020", time: "14:00-14:45", color: "bg-gray-300", disabled: true },
    { id: 2, title: "Buổi 2", date: "20/08/2020", time: "14:00-14:45", color: "bg-orange-500" },
    { id: 3, title: "Buổi 3", date: "21/08/2020", time: "14:00-14:45", color: "bg-sky-500" },
    { id: 4, title: "Buổi 4", date: "22/08/2020", time: "14:00-14:45", color: "bg-sky-500" },
    { id: 5, title: "Buổi 5", date: "23/08/2020", time: "14:00-14:45", color: "bg-sky-500" },
    { id: 6, title: "Buổi 6", date: "24/08/2020", time: "14:00-14:45", color: "bg-sky-500" },
    { id: 7, title: "Buổi 7", date: "24/08/2020", time: "14:00-14:45", color: "bg-sky-500" },
  ]);

  const hourOptions = [
    { id: 1, label: "00", value: "00" },
    { id: 2, label: "01", value: "01" },
    { id: 3, label: "02", value: "02" },
  ];


  const handleDeleteClick = (id: number) => {
    setShowModal(true);
  };
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  const showEditTest = (id: number, title: string, date: string, time: string) => {
    setEditTest(
      {
        id: id,
        title: title,
        date: date,
        time: time
      }
    )
  }
  const [shareLink, setShareLink] = useState("https://example.com/meeting");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    alert("Link đã được sao chép!");
  };


  const assistantGroups = [
    { id: 1, value: "Lorem ipsum dolor sit amet" },
    { id: 2, value: "Lorem ipsum dolor sit amet" },
  ];

  const subjectGroups = [
    { id: 1, label: "0", value: "0" },
    { id: 2, label: "1", value: "1" },
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

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };


  return (
    <>
      <div>
        <div className="pt-2 mt-10 !shadow-[0_0_15px_rgba(0,0,0,0.3)] rounded-lg ">
          <div className="flex justify-center">
            <div className="w-full">
              <div className="px-36  flex">
                <div className="rounded-full w-[110px] h-[110px] mr-4">
                  <img className="w-full rounded-full" alt="" src="https://cdn.kona-blue.com/upload/kona-blue_com/post/images/2024/09/19/465/avatar-trang-1.jpg"></img>
                </div>
                <div className="w-2/4">
                  <div className="flex mt-4 mb-4">
                    <div className="w-1/4">
                      <p className="font-600">Giáo viên</p>
                    </div>
                    <div className="w-3/4">
                      <p className="">Nguyễn Võ Văn A</p>
                    </div>
                  </div>
                  <div className="flex mt-4 mb-4">
                    <div className="w-1/4">
                      <p className="font-600">Bộ môn</p>
                    </div>
                    <div className="w-3/4">
                      <p className="">Lịch sử</p>
                    </div>
                  </div>
                </div>
                <div className="w-2/4" >
                  <div className="flex mt-4 mb-4">
                    <div className="w-1/4">
                      <p className="font-600">Mô tả</p>
                    </div>
                    <div className="w-3/4">
                      <p className="">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    </div>
                  </div>
                  <div className="flex mt-4 mb-4">
                    <div className="w-1/4">
                      <p className="font-600">Lớp</p>
                    </div>
                    <div className="w-3/4">
                      <p className="">10A1</p>
                    </div>
                  </div>
                </div>

              </div>
              <div className="bg-gray-100 pt-2 pb-4">
                <div className="px-64">
                  <div className="flex mt-4 mb-4">
                    <div className="w-1/4">
                      <p className="font-600">Lịch học</p>
                    </div>
                    <div className="w-3/4">
                      <p className="">Tổng số 06 buổi</p>
                    </div>
                  </div>
                  <div className="flex mt-4 mb-4">
                    <div className="w-1/4">
                      <p className="font-600">Thời lượng</p>
                    </div>
                    <div className="w-3/4">
                      <p className="">15 phút</p>
                    </div>
                  </div>
                  <div className="flex mt-4 mb-4">
                    <div className="w-1/4">
                      <p className="font-600">Ngày bắt đầu</p>
                    </div>
                    <div className="w-3/4">
                      <p className="">10/03/2025</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="w-1/4 font-600 pr-4">Ngày kết thúc</label>
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
                <div className="flex items-center justify-center px-40">
                  {/* Nút trái */}
                  <button onClick={() => scroll("left")} className="p-2 rounded-full bg-transparent hover:bg-gray-200">
                    <FaChevronLeft className="text-orange-500 w-5 h-5 " />
                  </button>

                  {/* Slider - Giữ max 6 item hiển thị */}
                  <div
                    ref={scrollRef}
                    className="flex space-x-4 overflow-hidden whitespace-nowrap scroll-smooth px-2"
                    style={{ width: "780px" }} // Giữ cố định kích thước
                  >
                    {lessons.map((lesson) => (
                      <div>

                        <div
                          key={lesson.id}
                          className={`w-24 h-24 p-4 rounded-xl text-white flex flex-col items-center shrink-0 ${lesson.color} ${lesson.disabled ? "opacity-90" : ""
                            }`}
                        >
                          <span className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">{lesson.title}</span>
                          <p className="text-xs mt-2">{lesson.date}</p>
                          <p className="text-xs font-bold">{lesson.time}</p>
                        </div>
                      </div>

                    ))}

                    {/* Luôn có thẻ dấu cộng ở cuối */}
                    <div
                      className="w-24 h-24 p-4 rounded-xl flex justify-center items-center bg-sky-500 cursor-pointer hover:bg-sky-600 shrink-0"
                      onClick={() => navigate("/add-new")}
                    >
                      <FaPlus className="text-white w-8 h-8" />
                    </div>
                  </div>

                  {/* Nút phải */}
                  <button onClick={() => scroll("right")} className="p-2 rounded-full bg-transparent hover:bg-gray-200">
                    <FaChevronRight className="text-orange-500 w-6 h-6" />
                  </button>
                </div>
                {editTest && (
                  <div className="px-64">
                    <div className="flex mt-4 mb-4">
                      <div className="w-1/4">
                        <p className="font-600">Nội dung</p>
                      </div>
                      <div className="w-3/4">
                        <p className="text-gray-400 font-600">{editTest?.title}</p>
                      </div>
                    </div>
                    <div className="flex mt-4 mb-4">
                      <div className="w-1/4">
                        <p className="font-600">Ngày kiểm tra</p>
                      </div>
                      <div className="w-3/4">
                        <div className="flex items-center space-x-2">
                          <DatePicker value={''} onChange={() => { }} />
                          <Dropdown options={[{ id: 1, value: "01:00" }, { id: 2, value: "02:00" }]} />
                          <Button label="Lưu" onClick={() => { setEditTest(null) }} size="medium" variant="solid" />
                        </div>
                      </div>
                    </div>

                  </div>
                )}
              </div>
              <div className="px-64">
                <div className="flex mt-4 mb-2">
                  <div className="w-1/4">
                    <p className="font-600">Mã lớp</p>
                  </div>
                  <div className="w-3/4">
                    <p>7862 827 22</p>
                  </div>
                </div>
                <div className="mb-4 flex items-center">
                  <label className="w-1/4 font-600">Bảo mật</label>
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
                <div className="flex items-center mb-4">
                  <label className="font-600  w-1/4">Link chia sẻ</label>
                  <div className="flex w-3/4">
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

                <div className="flex mt-4 mb-4">
                  <div className="w-1/4">
                    <p className="font-600">Cài đặt khác</p>
                  </div>
                  <div className="relative w-3/4">
                    <div className="flex items-center mb-4">
                      <input className="w-6 h-5 mr-2" type="checkbox" />
                      <span> Tự động kích hoạt buổi học khi thời gian bắt đầu</span>
                    </div>
                    <div className="flex items-center mb-4">
                      <input className="w-6 h-5 mr-2" type="checkbox" />
                      <span> Bật tính năng lưu lại buổi học</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <Button label="Tham gia lớp học" onClick={() => { }} size="medium" variant="solid" />
        </div>
      </div>
    </>
  )

};

export default JoinClass;
