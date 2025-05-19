import React, { useEffect, useState } from "react";
import Dropdown from "../../../../components/Dropdown";
import { Check, X } from "lucide-react";
import apiInstance from "../../../../services/api/index";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';// Đảm bảo đường dẫn đúng
import { showToast } from "../../../../components/Toasted";
import { error } from "console";

type DropdownOption = {
  id: number | string;
  value: string;
};

type Semester = {
  id: number;
  name: string;
};

type DropdownResponse = {
  academicId: number;
  departmentId: number;
  departmentName: string;
  academicDate: string;
  semesters: Semester[];
  active: boolean;
};
type TestExamType = {
  id: number;
  pointTypeName: string;
  coefficient: number;
  minimunEntriesSem1: number;
  minimunEntriesSem2: number;
};

const Scoreboard = () => {
  const [examTypes, setExamTypes] = useState<TestExamType[]>([]);

  const [yearOptions, setYearOptions] = useState<DropdownOption[]>([]);
  const [selectedYear, setSelectedYear] = useState<DropdownOption | null>(null);

  const [gradeOptions, setGradeOptions] = useState<DropdownOption[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<DropdownOption | null>(null);

  const [semesterOptions, setSemesterOptions] = useState<DropdownOption[]>([]);
  const [selectedSemester, setSelectedSemester] = useState<DropdownOption | null>(null);

  const [dropdownData, setDropdownData] = useState<DropdownResponse[]>([]);

  const [studentInfo, setStudentInfo] = useState<any | null>(null);
  const [transcriptData, setTranscriptData] = useState<any[]>([]);


  //Lấy thông tin học sinh từ API
  const fetchStudentTranscript = async () => {
    if (selectedGrade && selectedSemester) {
      try {
        const res = await apiInstance.get(
          `/api/Transcript?DepartmentId=${selectedGrade.id}&SemesterId=${selectedSemester.id}`
        );
        setStudentInfo(res.data.data.info);
        setTranscriptData(res.data.data.transcript);
        // Bạn có thể lưu luôn `res.data.data.transcript` nếu muốn xử lý bảng điểm
      } catch (error) {
        console.error("Lỗi khi lấy bảng điểm:", error);
      }
    }
  };
  const handleExportExcel = async () => {
    const departmentId = selectedGrade?.id;
    const semesterId = selectedSemester?.id;

    if (!departmentId || !semesterId) {
      showToast('Chưa có dữ liệu! Vui lòng chọn đầy đủ Niên khóa, Khối và Học kỳ!', 'error');
      return;
    }

    try {
      const res = await apiInstance.get('/api/Transcript/exportexcel', {
        params: {
          DepartmentId: departmentId,
          SemesterId: semesterId,
        },
      });

      if (res.data.status === 0 && res.data.data) {
        const fileUrl = res.data.data;

        // Tải file dưới dạng blob để đảm bảo luôn tải được dù mất mạng
        const fileRes = await fetch(fileUrl);
        const blob = await fileRes.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `BangDiem_${departmentId}_${semesterId}.xlsx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        showToast('Xuất Excel thành công!', 'success');
      } else {
        showToast('Không thể xuất Excel!', 'error');
      }
    } catch (error) {
      console.error("Lỗi khi export Excel:", error);
      showToast('Đã xảy ra lỗi khi xuất Excel!', 'error');
    }
  };


  const handleSearch = async () => {
    const departmentId = selectedGrade?.id;
    const semesterId = selectedSemester?.id;

    if (!departmentId || !semesterId) {
      toast.warning('Chưa có dữ liệu! Vui lòng chọn đầy đủ Niên khóa, Khối và Học kỳ!');
      return;
    }

    try {
      const res = await apiInstance.get('/api/Transcript', {
        params: {
          DepartmentId: departmentId,
          SemesterId: semesterId,
        },
      });

      if (res.data.status === 0) {
        const data = res.data.data;
        setStudentInfo(data.info);
        setTranscriptData(data.transcript);
      } else {
        toast.info('Không tìm thấy bảng điểm!');
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      toast.error('Đã xảy ra lỗi khi lấy bảng điểm!');
    }
  };

  //Lấy danh sách loại bài kiểm tra từ API
  const fetchExamTypes = async () => {
    try {
      const res = await apiInstance.get("/api/testexamtype?pageNumber=1&pageSize=10");
      setExamTypes(res.data.data.items); // Lấy mảng `items`
    } catch (err) {
      console.error("Lỗi khi lấy loại bài kiểm tra:", err);
    }
  };

  // Fetch dropdown data
  const fetchDropdownData = async () => {
    try {
      const res = await apiInstance.get("/api/Transcript/dropdownofstudent");
      const data: DropdownResponse[] = res.data.data;

      setDropdownData(data); // Gán toàn bộ data để render dropdown

      const yearMap = new Map<number, DropdownOption>();
      const gradeMap = new Map<number, DropdownOption>();

      data.forEach((item) => {
        if (!yearMap.has(item.academicId)) {
          yearMap.set(item.academicId, {
            id: item.academicId,
            value: item.academicDate,
          });
        }
        if (!gradeMap.has(item.departmentId)) {
          gradeMap.set(item.departmentId, {
            id: item.departmentId,
            value: item.departmentName,
          });
        }
      });

      const years = Array.from(yearMap.values());
      const grades = Array.from(gradeMap.values());

      setYearOptions(years);
      setGradeOptions(grades);

      // ✅ Tìm phần tử active === true đầu tiên để đặt làm mặc định
      const defaultActive = data.find((item) => item.active === true);

      if (defaultActive) {
        setSelectedYear({ id: defaultActive.academicId, value: defaultActive.academicDate });
        setSelectedGrade({ id: defaultActive.departmentId, value: defaultActive.departmentName });

        // cũng cập nhật semester ngay
        const semesters = defaultActive.semesters.map((s) => ({
          id: s.id,
          value: s.name,
        }));
        setSemesterOptions(semesters);
        setSelectedSemester(semesters[0] || null);
      } else {
        setSelectedYear(years[0] || null);
        setSelectedGrade(grades[0] || null);
      }
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    }
  };

  // Update semester options based on selected year and grade
  useEffect(() => {
    if (selectedYear && selectedGrade) {
      const match = dropdownData.find(
        (item) =>
          item.academicId === selectedYear.id &&
          item.departmentId === selectedGrade.id
      );

      if (match) {
        const semesters = match.semesters.map((s) => ({
          id: s.id,
          value: s.name,
        }));
        setSemesterOptions(semesters);
        setSelectedSemester(semesters[0] || null);
      } else {
        setSemesterOptions([]);
        setSelectedSemester(null);
      }
    }
  }, [selectedYear, selectedGrade, dropdownData]);

  useEffect(() => {
    fetchDropdownData();
    fetchExamTypes();
  }, []);

  useEffect(() => {
    fetchStudentTranscript();
  }, [selectedYear, selectedGrade, selectedSemester]);

  const passedSubjects = transcriptData.filter((s) => {
    const averageItem = s.transcripts.find((t: any) => Object.keys(t)[0] === "averageScore");
    return averageItem && averageItem.averageScore >= 5;
  }).length;
  const totalSubjects = transcriptData.length;

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-lg rounded-lg border">
      {/* Thông tin học sinh */}
      {studentInfo && (
        <>
          <div className="text-gray-400 font-light flex items-center font-bold">
            Bảng điểm <span className="text-orange-500 mx-1 text-sm">›</span>
            <span className="text-gray-900 text-xl font-bold">{studentInfo.className}</span>
          </div>

          <div className="flex items-center border-b pb-4 mb-4 mt-5">
            <img
              src={studentInfo.image || "https://via.placeholder.com/100"}
              alt="Student"
              className="w-24 h-24 rounded-lg mr-4 object-cover"
            />
            <div className="flex space-x-8 text-sm">
              <div>
                <p><strong>Họ và Tên:</strong> {studentInfo.studentName}</p>
                <p><strong>Giới tính:</strong> {studentInfo.gender ? "Nam" : "Nữ"}</p>
                <p><strong>Ngày sinh:</strong> {new Date(studentInfo.birthDate).toLocaleDateString()}</p>
                <p><strong>Email:</strong> {studentInfo.email}</p>
              </div>
              <div className="border-l border-gray-300 pl-8">
                <p><strong>Lớp:</strong> {studentInfo.className}</p>
                <p><strong>GVCN:</strong> {studentInfo.teacherName}</p>
                <p><strong>Niên khóa:</strong> {studentInfo.academic}</p>
              </div>
            </div>
          </div>
        </>
      )}


      {/* Bộ lọc */}
      <div className="flex justify-end items-center space-x-4 mb-4 border-b pb-4">
        <div>
          <label className="block text-sm font-medium">Chọn Niên khóa</label>
          <Dropdown
            options={yearOptions}
            selectedId={selectedYear?.id || null}
            onChange={(option) => setSelectedYear(option)}
            width="medium"
            icon="right"
            state="normal"
            disabled={false}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Chọn khối</label>
          <Dropdown
            options={gradeOptions}
            selectedId={selectedGrade?.id || null}
            onChange={(option) => setSelectedGrade(option)}
            width="short"
            icon="right"
            state="normal"
            disabled={false}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Chọn học kì</label>
          <Dropdown
            options={semesterOptions}
            selectedId={selectedSemester?.id || null}
            onChange={(option) => setSelectedSemester(option)}
            width="medium"
            icon="right"
            state="normal"
            disabled={false}
          />
        </div>
        <button onClick={handleSearch} className="bg-orange-500 text-white px-4 py-2 rounded mt-5">Tìm kiếm</button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold">
          HỌC KÌ {selectedSemester?.value} - <span className="text-blue-500">{passedSubjects}/{totalSubjects} môn đạt</span>
        </h2>
        <button onClick={handleExportExcel} className="border border-orange-500 text-orange-500 px-4 py-1 rounded hover:bg-orange-500 hover:text-white transition">
          In Bảng Điểm
        </button>
      </div>
      {/* Bảng điểm */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden text-sm border min-w-[1000px]">
          <thead>
            <tr className="bg-orange-400 text-white">
              <th className="p-2 whitespace-nowrap">STT</th>
              <th className="p-2 whitespace-nowrap">Môn học</th>
              <th className="p-2 whitespace-nowrap">Giảng viên</th>
              <th className="p-2 border-l border-orange-500 whitespace-nowrap">Chuyên cần</th>
              {examTypes.map((type) => (
                <th key={type.id} className="p-2 whitespace-nowrap">
                  {type.pointTypeName}
                </th>
              ))}
              <th className="p-2 font-bold border-s border-orange-500 whitespace-nowrap">Tổng điểm trung bình</th>
              <th className="p-2 whitespace-nowrap">Kết quả</th>
              <th className="p-2 whitespace-nowrap">Ngày cập nhật</th>
            </tr>
          </thead>
          <tbody>
            {transcriptData.map((subject, index) => {
              const transcriptMap: Record<string, number | string> = {};
              subject.transcripts.forEach((item: any) => {
                const key = Object.keys(item)[0];
                const value = item[key];
                transcriptMap[key] = value;
              });

              const average = transcriptMap["averageScore"] ?? 0;
              const passed = typeof average === 'number' && average >= 5;

              return (
                <tr key={index} className="text-center border-b">
                  <td className="p-2 whitespace-nowrap">{index + 1}</td>
                  <td className="p-2 whitespace-nowrap">{subject.subjectName}</td>
                  <td className="p-2 whitespace-nowrap">{subject.teacherName}</td>
                  <td className="p-2 whitespace-nowrap">--</td>

                  {examTypes.map((type) => (
                    <td key={type.id} className="p-2 whitespace-nowrap">
                      {transcriptMap[type.pointTypeName] ?? "Chưa có"}
                    </td>
                  ))}

                  <td className="p-2 whitespace-nowrap font-bold">{average}</td>
                  <td className="p-2 whitespace-nowrap">
                    {passed ? (
                      <div className="bg-green-500 rounded-full w-5 h-5 flex justify-center items-center">
                        <Check className="text-white w-4 h-4" />
                      </div>
                    ) : (
                      <div className="bg-red-500 rounded-full w-5 h-5 flex justify-center items-center">
                        <X className="text-white w-4 h-4" />
                      </div>
                    )}
                  </td>
                  <td className="p-2 whitespace-nowrap italic">
                    {subject.updateAt ? new Date(subject.updateAt).toLocaleDateString() : "Chưa cập nhật"}
                  </td>
                </tr>
              );
            })}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default Scoreboard;
