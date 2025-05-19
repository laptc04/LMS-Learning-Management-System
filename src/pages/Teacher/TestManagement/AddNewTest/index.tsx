import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import { faCalendarAlt, faPaperclip, faChevronDown, faCheck } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import Dropdown from "../../../../components/Dropdown";
import DatePicker from "../../../../components/DatePicker";
import { GradeOption } from "./type";

const AddNewTest = () => {
  const [testType, setTestType] = useState("multiple-choice");
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [allClasses, setAllClasses] = useState(false);
  const [fileName, setFileName] = useState("Chọn tệp đính kèm");
  const [hourValue, setHourValue] = useState("0");
  const [minuteValue, setMinuteValue] = useState("00");
  const [gradeValue, setGradeValue] = useState("10");
  const [classificationValue, setClassificationValue] = useState("Giữa kì I");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("02/11/2020");
  const [timeValue, setTimeValue] = useState("00:00");

  const classesByGrade = {
    "10": [
      { id: "10A1", label: "10A1" },
      { id: "10A2", label: "10A2" },
      { id: "10A3", label: "10A3" },
      { id: "10A4", label: "10A4" },
    ],
    "11": [
      { id: "11A1", label: "11A1" },
      { id: "11A2", label: "11A2" },
      { id: "11A3", label: "11A3" },
      { id: "11A4", label: "11A4" },
    ],
    "12": [
      { id: "12A1", label: "12A1" },
      { id: "12A2", label: "12A2" },
      { id: "12A3", label: "12A3" },
      { id: "12A4", label: "12A4" },
    ],
  };

  const gradeOptions: GradeOption[] = [
    { id: "10", value: "10" },
    { id: "11", value: "11" },
    { id: "12", value: "12" },
  ];

  const classificationOptions = [
    { id: "midterm1", value: "Giữa kì I" },
    { id: "final1", value: "Cuối kì I" },
    { id: "midterm2", value: "Giữa kì II" },
    { id: "final2", value: "Cuối kì II" },
  ];

  const hourOptions = Array.from({ length: 10 }, (_, i) => ({ id: i.toString(), value: i.toString() }));
  const minuteOptions = Array.from({ length: 60 }, (_, i) => ({
    id: i.toString(),
    value: i.toString().padStart(2, "0"),
  }));
  const timeOptions = Array.from({ length: 24 }, (_, h) =>
    Array.from({ length: 4 }, (_, m) => ({
      id: `${h}-${m}`,
      value: `${h.toString().padStart(2, "0")}:${(m * 15).toString().padStart(2, "0")}`,
    }))
  ).flat();

  const classList = classesByGrade[gradeValue as keyof typeof classesByGrade] || [];

  const handleClassToggle = (classId: string) => {
    if (selectedClasses.includes(classId)) {
      setSelectedClasses(selectedClasses.filter((id) => id !== classId));
    } else {
      setSelectedClasses([...selectedClasses, classId]);
    }
  };

  const handleAllClassesToggle = () => {
    if (allClasses) {
      setSelectedClasses([]);
    } else {
      setSelectedClasses(classList.map((c: any) => c.id));
    }
    setAllClasses(!allClasses);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleGradeChange = (option: any) => {
    console.log("handleGradeChange called with option:", option); // Debug
    if (option && option.value) {
      console.log("Setting gradeValue to:", option.value);
      setGradeValue(option.value);
    } else {
      console.error("Invalid option received:", option);
    }
  };

  useEffect(() => {
    const validClasses = selectedClasses.filter((id) =>
      classList.some((cls: any) => cls.id === id)
    );
    if (validClasses.length !== selectedClasses.length) {
      setSelectedClasses(validClasses);
    }
    setAllClasses(validClasses.length === classList.length && classList.length > 0);
  }, [gradeValue]);

  // Log debug chỉ khi gradeValue thay đổi
  useEffect(() => {
    console.log("Grade changed to:", gradeValue);
    console.log("ClassList:", classList);
    console.log("SelectedClasses:", selectedClasses);
  }, [gradeValue]);

  return (
    <>
      <div className="flex items-center space-x-5 mb-9">
        <Link to="/teacher/test-management/list" className="text-gray-300 text-[18px] font-mulish font-semibold hover:text-gray-500">
          Bài kiểm tra
        </Link>
        <span className="text-orange-500 font-mulish text-2xl">{'>'}</span>
        <h1 className="text-[40px] font-bold font-mulish">Thêm bài kiểm tra mới</h1>
      </div>
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg">


        <div className="space-y-6">
          {/* Topic */}
          <div className="grid grid-cols-[150px_1fr] items-center">
            <label htmlFor="topic" className="font-medium">
              Chủ đề
            </label>
            <Input
              type="text"
              placeholder="Nhập chủ đề"
              value=""
              onChange={(e) => { }}
              size="full"
              border="grey"
              borderRadius="8px"
            />
          </div>

          {/* Test Type */}
          <div className="grid grid-cols-[150px_1fr] items-center">
            <span className="font-medium">Hình thức</span>
            <div className="flex gap-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  id="multiple-choice"
                  name="test-type"
                  value="multiple-choice"
                  checked={testType === "multiple-choice"}
                  onChange={() => setTestType("multiple-choice")}
                  className="sr-only"
                />
                <div
                  className={`w-4 h-4 rounded-full border ${testType === "multiple-choice" ? "border-blue-500" : "border-gray-400"
                    } relative`}
                >
                  {testType === "multiple-choice" && (
                    <div className="w-2 h-2 rounded-full bg-blue-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                  )}
                </div>
                <span className="ml-2">Trắc nghiệm</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  id="essay"
                  name="test-type"
                  value="essay"
                  checked={testType === "essay"}
                  onChange={() => setTestType("essay")}
                  className="sr-only"
                />
                <div
                  className={`w-4 h-4 rounded-full border ${testType === "essay" ? "border-blue-500" : "border-gray-400"
                    } relative`}
                >
                  {testType === "essay" && (
                    <div className="w-2 h-2 rounded-full bg-blue-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                  )}
                </div>
                <span className="ml-2">Tự luận</span>
              </label>
            </div>
          </div>

          {/* Grade Level */}
          <div className="grid grid-cols-[150px_1fr] items-start">
            <span className="font-medium pt-2">Khối</span>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Dropdown
                  options={gradeOptions}
                  width="short"
                  onChange={handleGradeChange} /* Hiện tại không hoạt động do Dropdown không hỗ trợ onChange */
                />
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    id="all-classes"
                    checked={allClasses}
                    onChange={handleAllClassesToggle}
                    className="sr-only"
                  />
                  <div
                    className={`w-4 h-4 rounded border ${allClasses ? "bg-blue-500 border-blue-500" : "border-gray-400"
                      } flex items-center justify-center`}
                  >
                    {allClasses && <FontAwesomeIcon icon={faCheck} className="h-3 w-3 text-white" />}
                  </div>
                  <span className="ml-2">Chọn tất cả các lớp</span>
                </label>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {classList.map((cls: any) => (
                  <Button
                    key={cls.id}
                    label={cls.label}
                    size="mini"
                    variant={selectedClasses.includes(cls.id) ? "solid" : "ghost"}
                    onClick={() => handleClassToggle(cls.id)}
                    backgroundColor={selectedClasses.includes(cls.id) ? "#3b82f6" : "#C9C4C0"}
                    textColor={selectedClasses.includes(cls.id) ? "#ffffff" : "#374151"}

                  />
                ))}
              </div>
            </div>
          </div>

          {/* Duration */}
          <div className="grid grid-cols-[150px_1fr] items-center">
            <span className="font-medium">Thời lượng</span>
            <div className="flex items-center gap-2">
              <Dropdown
                options={hourOptions}
                width="short"
                onChange={(option) => setHourValue(option.value)}
              />
              <span className="text-sm text-gray-500">Giờ</span>
              <Dropdown
                options={minuteOptions}
                width="short"
                onChange={(option) => setMinuteValue(option.value)}
              />
              <span className="text-sm text-gray-500">Phút</span>
            </div>
          </div>

          {/* Classification */}
          <div className="grid grid-cols-[150px_1fr] items-center">
            <span className="font-medium">Phân loại</span>
            <Dropdown
              options={classificationOptions}
              width="medium"
              onChange={(option) => setClassificationValue(option.value)}
            />
          </div>

          {/* Start Date */}
          <div className="grid grid-cols-[150px_1fr] items-center">
            <span className="font-medium">Ngày bắt đầu</span>
            <div className="flex gap-2">
              <DatePicker
                value={startDate}
                onChange={(date) => date !== null && setStartDate(date)}
                placeholder="dd/mm/yy"
                width="160px"
              />
              <Dropdown
                options={timeOptions}
                width="short"
                onChange={(option) => setTimeValue(option.value)}
              />
            </div>
          </div>

          {/* End Date */}
          <div className="grid grid-cols-[150px_1fr] items-center">
            <span className="font-medium">Ngày kết thúc</span>
            <div className="flex gap-2">
              <DatePicker
                value={endDate}
                onChange={(date) => date !== null && setEndDate(date)}
                placeholder="dd/mm/yy"
                width="160px"
              />
              <Input
                type="text"
                value="14:45"
                onChange={() => { }}
                size="small"
                border="grey"
                borderRadius="8px"
              />
            </div>
          </div>

          {/* Description and Attachment Section */}
          <div className="space-y-2">
            {/* Description */}
            <div className="grid grid-cols-[150px_1fr] items-start">
              <label htmlFor="description" className="font-medium">
                Mô tả
              </label>
              <textarea
                id="description"
                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum viverra, eros et volutpat interdum, leo lectus commodo tellus."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none text-gray-400 placeholder-gray-400"
              />
            </div>

            {/* Attachment */}
            <div className="flex ml-36">
              <span className="font-medium italic text-gray-600 w-[150px]">Tệp đính kèm</span>
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="file"
                    placeholder="Chọn tệp đính kèm"
                    id="file-upload"
                    ref={fileInputRef}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={handleFileChange}
                  />
                  <div className="bg-gray-100 rounded-md flex items-center gap-2 px-4 py-2 border border-gray-200">
                    <FontAwesomeIcon icon={faPaperclip} className="h-4 w-4 text-orange-400" />
                    <span className="text-gray-600">{fileName}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Other Settings */}
          <div className="grid grid-cols-[150px_1fr] items-start">
            <span className="font-medium pt-2">Cài đặt khác</span>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="require-attachment"
                  defaultChecked

                />

                <label htmlFor="require-attachment" className="ml-2 cursor-pointer">
                  Yêu cầu học viên đính kèm tệp
                </label>
              </div>
            </div>
          </div>

          {/* Submission Rules */}
          <div className="grid grid-cols-[150px_1fr] items-start">
            <div>
              <span className="font-medium">Quy định nộp bài</span>
            </div>
            <div className="space-y-6">

              <div className="flex gap-12">

                <div className="space-y-2">
                  <p className="text-sm text-gray-500  italic">Định dạng</p>
                  {[
                    { id: "doc", label: "Doc, Docx" },
                    { id: "ppt", label: "Power Point" },
                    { id: "xls", label: "Xls" },
                    { id: "jpeg", label: "Jpeg" },
                  ].map((format) => (
                    <div key={format.id} className="flex items-center space-x-2">
                      <input type="checkbox" id={format.id} />

                      <label htmlFor={format.id} className="ml-2 cursor-pointer">
                        {format.label}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-4 gap-x-8 gap-y-4">
                  {[...Array(4)].map((_, rowIndex) =>
                    [10, 20, 30, 40].map((size, colIndex) => (
                      <div key={`${size}-${rowIndex}-${colIndex}`} className="space-y-2">
                        {rowIndex === 0 && <div className="text-center">{size}MB</div>}
                        <div className="flex justify-center">
                          <input
                            type="radio"
                            id={`size-${size}-${rowIndex}`}
                            name="file-size"
                            value={size.toString()}
                            className="w-4 h-4"
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <p className="text-orange-500 text-sm italic text-end mr-24">*Lưu ý: Tổng dung lượng tối đa là 50MB</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-8">
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-2 my-5">
        <Button label="Hủy" size="medium" variant="none" backgroundColor="#e0e0e0" onClick={() => { }} />
        <Button label="Lưu" size="medium" variant="solid" onClick={() => { }} />
      </div>
    </>
  );
};

export default AddNewTest;