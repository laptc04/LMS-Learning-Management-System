import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../../../../config/scss/FormSchools.module.scss'; // SCSS module
import Dropdown from '../../../../components/Dropdown';
// import { Option } from '../../../../components/Dropdown/type';
import Input from '../../../../components/Input';
import { FaMinus, FaPlus } from 'react-icons/fa';
import DatePicker from '../../../../components/DatePicker';
import Button from '../../../../components/Button';
import apiInstance from '../../../../services/api';
import DatePickerWrapper from './DatePickerWrapperProps';
import { format, isValid, parse } from 'date-fns';
import { showToast } from '../../../../components/Toasted';
interface AcademicYear {
  id: number;
  name: string;
  isInherit?: boolean;
}

interface Option {
  id: number | string;
  value: string;
}


const FormSchools: React.FC = ({ }) => {
  const { id } = useParams(); // Lấy id từ URL
  const [keThua, setKeThua] = useState<boolean>(false);
  const [semesters, setSemesters] = useState<string[]>(['Học kì I']);
  const [semesterDates, setSemesterDates] = useState<string[]>(['']);
  // State để kiểm soát việc mở/đóng form (nếu cần)
  const [isFormOpen, setIsFormOpen] = useState<boolean>(true);
  const [startDate, setStartDate] = useState<string>(''); // startDate của niên khóa
  const [endDate, setEndDate] = useState<string>('');     // endDate của niên khóa
  const [startDateSemester, setStartDateSemester] = useState<string[]>([]);
  const [endDateSemester, setEndDateSemester] = useState<string[]>([]);
  const [originalSemesterData, setOriginalSemesterData] = useState<any[]>([]);
  const navigate = useNavigate();
  const [parentAcademic, setParentAcademic] = useState(null); // Lưu id và name của niên khóa đã chọn
  const [nameOption, setNameOption] = useState<Option[]>([]); // Dữ liệu niên khóa cho dropdown
  const [selectedYear, setSelectedYear] = useState<string | number | null>(null);  // Lưu selectedYear là id
  const [isInherit, setIsInherit] = useState<boolean>(false);

  const [academicYearName, setAcademicYearName] = useState<string>('');
  const [nameOptionYear, setNameOptionYear] = useState<any[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [academicParentName, setAcademicParentName] = useState<string | number | null>(null);

  const [dropdownOptions, setDropdownOptions] = useState<Option[]>([]);

  const formatDateResponse = (dateString: any) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchAcademicYear = async () => {
      try {
        const response = await apiInstance.get(`/api/AcademicYear/${id}`);
        const data = response.data.data; // Đừng quên `.data.data` vì phản hồi có thêm lớp bên ngoài

        console.log('Dữ liệu niên khóa:', data);
        // Lấy startDate và endDate của niên khóa
        setStartDate(formatDateResponse(data.startDate));
        setEndDate(formatDateResponse(data.endDate));

        // Lấy dữ liệu học kỳ
        const semesters: { startDate: string; endDate: string }[] = data.semesters || [];

        // Tên học kỳ (ví dụ: Học kì I, II,...)
        const semesterNames = semesters.map((_, i) => `Học kì ${i + 1}`);
        setSemesters(semesterNames);

        // Ngày bắt đầu và kết thúc của từng học kỳ
        const semesterStartDates = semesters.map((s) => formatDateResponse(s.startDate) || '');
        const semesterEndDates = semesters.map((s) => formatDateResponse(s.endDate) || '');
        setStartDateSemester(semesterStartDates);
        setEndDateSemester(semesterEndDates);
        setOriginalSemesterData(semesters);

        if (data.academicParent) {
          setKeThua(true);  // Nếu có academicParent, bật kế thừa
        } else {
          setKeThua(data.isInherit || false);  // Nếu không có academicParent, dùng giá trị isInherit
        }



      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu niên khóa:', error);
      }
    };

    if (id) {
      fetchAcademicYear();
    }
  }, [id]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Lấy danh sách tất cả các năm học
        const listResponse = await apiInstance.get('/api/academicyear/get-all-academic-years');
        const academicYears: AcademicYear[] = listResponse.data.data;

        // 2. Tạo danh sách Option cho Dropdown
        const nameOptionData = academicYears.map((item: AcademicYear) => ({
          id: item.id,
          value: item.name,
        }));
        setNameOptionYear(nameOptionData);

        // 3. Tìm niên khóa hiện tại theo id
        const currentAcademicYear = academicYears.find((item: AcademicYear) => item.id === Number(id));
        if (currentAcademicYear) {
          setSelectedYear(currentAcademicYear.id.toString());
        }

        // 4. Gọi API chi tiết để lấy ra academicParent
        const detailResponse = await apiInstance.get(`/api/AcademicYear/${id}`);
        const detailData = detailResponse.data.data;
        const academicParentId = detailData.academicParent;

        if (academicParentId) {
          const parentYear = nameOptionData.find((item) => item.id === academicParentId);
          if (parentYear) {
            setAcademicParentName(parentYear.id); // dùng id để set cho selectedId
            setSelectedYear(parentYear.id);       // cũng set selected
          }
        }
        setDropdownOptions([...(nameOptionData || [])]);

      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);








  const addSemester = () => {
    setSemesters([...semesters, `Học kì ${semesters.length + 1}`]);
    setSemesterDates([...semesterDates, '']);
  };

  const removeSemester = (index: number) => {
    setSemesters(semesters.filter((_, i) => i !== index));
    setSemesterDates(semesterDates.filter((_, i) => i !== index));
  };
  // Danh sách các năm cho dropdown
  const yearOptions: Option[] = Array.from({ length: 51 }, (_, i) => ({
    id: 2000 + i,
    value: (2000 + i).toString(),
  }));



  // Hàm xử lý nút "Hủy"
  const handleCancel = () => {
    navigate('/leadership/data-declaration/academic-year');
  };


  const parseDateString = (dateStr: string) => {
    if (!dateStr) return null;

    const date = new Date(dateStr);

    if (!isValid(date)) {
      console.warn('⛔ Ngày không hợp lệ:', dateStr);
      return null;
    }

    return format(date, 'yyyy-MM-dd'); // ✅ đảm bảo chuẩn backend cần
  };
  const handleSave = async () => {
    const academicYearIdNumber = Number(id); // ép string => number

    const updatedSemesters = semesters.map((name, index) => ({
      // id: originalSemesterData?.[index]?.id || 0,
      academicYearId: academicYearIdNumber,
      name,
      dateStart: parseDateString(startDateSemester[index]),
      dateEnd: parseDateString(endDateSemester[index])
    }));

    const payload = {
      id: academicYearIdNumber,
      startDate: parseDateString(startDate),
      endDate: parseDateString(endDate),
      isInherit: keThua,
      academicParent: Number(selectedYear),
      Semesters: updatedSemesters,
    };

    console.log('🎯 Dữ liệu gửi lên:', payload);

    try {
      const response = await apiInstance.put('/api/AcademicYear', payload);

      // Kiểm tra nếu có lỗi từ API (status 1)
      if (response.data.status === 1) {
        const errorMessage = response.data.message || 'Có lỗi xảy ra, vui lòng thử lại!';
        showToast(errorMessage, 'error');
        return; // Dừng lại nếu có lỗi
      }

      // Nếu không có lỗi thì thực hiện hành động thành công
      showToast(response.data.message || 'Lưu thành công!', 'success');
      console.log('✅ Lưu thành công:', response.data);

      // Điều hướng sang trang khác
      navigate('/leadership/data-declaration/academic-year');

    } catch (error: any) {
      console.error('Lỗi khi lưu:', error.response?.data || error.message);

      const detailedError = error.response?.data?.data;
      const generalMessage = error.response?.data?.message || error.message;

      if (detailedError) {
        console.log('Chi tiết lỗi:', detailedError);
        showToast(`Lỗi: ${detailedError}`, 'error');
      } else {
        showToast(`Có lỗi xảy ra: ${generalMessage}`, 'error');
      }
    }

  };


  const formatDate = (date: string) => {
    // Kiểm tra nếu ngày hợp lệ
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return ''; // Trả về rỗng nếu không hợp lệ
    }
    return parsedDate.toISOString().split('T')[0]; // Lấy định dạng yyyy-MM-dd
  };

  const handleSelect = (selectedOption: any) => {
    setSelectedYear(selectedOption.id);  // Lưu ID của niên khóa đã chọn vào state
    console.log('Niên khóa đã chọn:', selectedOption);
  };
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);

    if (!isDropdownOpen) {
      console.log("Danh sách ID từ dropdown:");
      nameOptionYear.forEach((item) => {
        console.log(item.id);
      });
    }
  };

  return (
    <div className="w-full min-h-screen py-8 px-6 mt-8">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
        {/* Tiêu đề chính */}
        <h2 className={`${styles['form-title']} text-center mb-4`}>Thiết lập niên khóa {academicYearName ?? ''}</h2>

        {/* Niên khóa & Kế thừa dữ liệu */}
        <div className="flex items-start gap-8 mb-6">
          {/* Cột trái: Niên khóa */}
          <div className="w-1/2">
            <div className="flex flex-col items-start">
              <label className={`${styles['text-menu']} text-left`}>Niên khóa:</label>
              <div className="flex items-center space-x-2 mt-1">
                <Dropdown
                  options={yearOptions}
                  width="short"
                  state="normal"
                  selectedId={new Date(startDate).getFullYear()}
                  onChange={(option: Option) => {
                    const year = option.id;
                    setStartDate(`${year}-09-01`);
                  }}
                />


                <span className={`${styles['text-content']} text-center`}>đến</span>
                <Dropdown
                  options={yearOptions}
                  width="short"
                  state="normal"
                  selectedId={new Date(endDate).getFullYear()}
                  onChange={(option: Option) => {
                    const year = option.id;
                    setEndDate(`${year}-05-30`);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="w-1/2">
            <div className="flex items-center mt-1 ml-0">
              <input
                type="checkbox"
                checked={keThua}
                onChange={(e) => setKeThua(e.target.checked)}
                className="w-6 h-6 border-2 border-blue-600 rounded-md accent-blue-500 mr-2 cursor-pointer"
              />
              <label className={`${styles['text-menu']} text-left mr-2 pl-0`}>Kế thừa dữ liệu:</label>
              <Dropdown
                options={dropdownOptions}
                width="medium"
                state="normal"
                onChange={handleSelect}
                selectedId={selectedYear}
                onClick={handleDropdownToggle}
              />

            </div>
            {/* Phần cảnh báo nằm dưới */}
            <div className="flex items-start mt-2 ml-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-orange-600 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                />
              </svg>
              <div className="ml-2 pl-0">
                <p className={`${styles['text-note']} pl-0`}>Dữ liệu được kế thừa bao gồm các thông tin:</p>
                <p className={`${styles['text-note']} pl-0`}>- Thông tin học viên và Danh sách lớp học</p>
                <p className={`${styles['text-note']} pl-0`}>- Thông tin môn học</p>
                <p className={`${styles['text-note']} pl-0`}>- Phân công giảng dạy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Đường gạch ngang phân cách */}
        <hr className="my-6 border-t border-gray-300" />

        {/* Cài đặt thời gian */}
        <h3 className={`${styles['text-sub-note']} text-lg mb-2`}>Cài đặt thời gian</h3>
        {semesters.map((semester, index) => (
          <div key={index} className="semester-row mb-2 flex items-center gap-2">
            {/* Nút xóa học kỳ */}
            <div className="semester-remove-btn mr-2">
              <button onClick={() => removeSemester(index)} className="w-6 h-6 flex items-center justify-center bg-blue-500 text-white rounded-full">
                <FaMinus />
              </button>
            </div>

            {/* Tên học kỳ */}
            <div className="semester-label mr-2">
              <label className={`${styles['text-menu']} text-left`}>Tên học kỳ:</label>
            </div>

            {/* Input tên học kỳ */}
            <div className="semester-input w-1/5 h-16">
              <Input
                type="text"
                value={semester}
                onChange={(e) => {
                  const newSemesters = [...semesters];
                  newSemesters[index] = e.target.value;
                  setSemesters(newSemesters);
                }}
                size="small"
                border="grey"
                background="white"
              />
            </div>

            {/* Thời gian: Từ... đến... */}
            <div className="semester-dates flex items-center w-3/5 gap-2">
              <div>
                <label className={`${styles['text-content']} text-right`}>Từ:</label>
              </div>
              <div className="w-45">

                <DatePickerWrapper
                  value={startDateSemester[index] || null} // Truyền value từ startDateSemester tại index tương ứng
                  onChange={(dateString) => {
                    // Kiểm tra và cập nhật lại state sau khi thay đổi ngày
                    setStartDateSemester((prevDates) => {
                      const newDates = [...prevDates];
                      newDates[index] = dateString || ''; // Gán giá trị dateString đã được format vào index tương ứng
                      return newDates;
                    });
                  }}
                />

              </div>
              <div>
                <span className={`${styles['text-content']} text-center`}>đến</span>
              </div>
              <div className="w-45">
                <DatePickerWrapper
                  value={endDateSemester[index] || null}
                  onChange={(dateString) => {
                    // Kiểm tra và cập nhật lại state sau khi thay đổi ngày
                    setEndDateSemester((prevDates) => {
                      const newDates = [...prevDates];
                      newDates[index] = dateString || ''; // Gán giá trị dateString đã được format vào index tương ứng
                      return newDates;
                    });
                  }}
                />
              </div>
            </div>
          </div>
        ))}

        <div className="mb-6 flex items-center gap-2">
          <button onClick={addSemester} className="w-6 h-6 flex items-center justify-center bg-blue-500 text-white rounded-full">
            <FaPlus />
          </button>
          <div className="semester-label">
            <label className={`${styles['text-menu']} text-left ms-2 text-[#0B80EC]`}>Thêm học kỳ mới</label>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
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

export default FormSchools;