import React, { useState, useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import Dropdown from "../../../../../components/DropdownUpdate";
import apiInstance from "../../../../../services/api";
import { showToast } from "../../../../../components/Toasted";
import { useParams } from "react-router-dom";

interface DropdownOption {
  id: number;
  value: string;
}

interface Subject {
  value: string;
}

interface ClassFormData {
  schoolYear: DropdownOption | null;
  grade: DropdownOption | null;
  className: string;
  numberOfStudents: string;
  classType: DropdownOption | null;
  teacher: DropdownOption | null;
  note: string;
  inheritYear: DropdownOption | null;
}

interface ClassDetailResponse {
  id: number;
  academicyearId?: number;
  departmentId?: number;
  classtypeId?: number;
  userId?: number;
  academicYearName: string;
  departmentName: string;
  classCode: string;
  className: string;
  homeroomTeacher: string;
  studentCount: string;
  classType: string;
  subjectCount: string;
  description: string;
  inheritYear?: string;
  classDetailStudentResponse: any[];
  classDetailSubjectResponse: { subjectCode: string; subjectName: string; subjectType: string; semester1LessonCount: string; semester2LessonCount: string }[];
}

const EditClassForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [classData, setClassData] = useState<ClassDetailResponse | null>(null);

  const [schoolYears, setSchoolYears] = useState<DropdownOption[]>([]);
  const [grades, setGrades] = useState<DropdownOption[]>([]);
  const [classTypes, setClassTypes] = useState<DropdownOption[]>([]);
  const [teachers, setTeachers] = useState<DropdownOption[]>([]);
  const [availableSubjects, setAvailableSubjects] = useState<DropdownOption[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [inheritYears, setInheritYears] = useState<DropdownOption[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ClassFormData>({
    defaultValues: {
      schoolYear: null,
      grade: null,
      className: "",
      numberOfStudents: "",
      classType: null,
      teacher: null,
      note: "",
      inheritYear: null,
    },
  });

  const normalizeString = (str: string): string => {
    return str.trim().replace(/\s*-\s*/g, "-");
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const classResponse = await apiInstance.get(`api/class/detail?Id=${id}`);
        const classDetail: ClassDetailResponse = classResponse.data.data;

        const academicYearsResponse = await apiInstance.get("api/academicyear/get-all-academic-years");
        const academicYearsData = academicYearsResponse.data.data.map((year: any) => ({
          id: year.id,
          value: normalizeString(year.name || year),
        }));
        const normalizedAcademicYearName = normalizeString(classDetail.academicYearName);
        const matchedAcademicYear = academicYearsData.find(
          (y: any) => y.value === normalizedAcademicYearName
        );
        classDetail.academicyearId = matchedAcademicYear?.id;
        if (!matchedAcademicYear) {
          showToast(
            `Niên khóa "${classDetail.academicYearName}" không tồn tại trong danh sách hiện tại. Vui lòng chọn niên khóa khác.`,
            "error"
          );
          academicYearsData.push({ id: -1, value: normalizedAcademicYearName });
        }
        setSchoolYears(academicYearsData);

        const departmentsResponse = await apiInstance.get("api/department/get-all-departments");
        const departmentsData = departmentsResponse.data.data.map((dept: any) => ({
          id: dept.id,
          value: dept.name || dept,
        }));
        const matchedDepartment = departmentsData.find((d: any) => d.value === classDetail.departmentName);
        classDetail.departmentId = matchedDepartment?.id;
        if (!matchedDepartment) {
          showToast(
            `Khóa - Khối "${classDetail.departmentName}" không tồn tại trong danh sách hiện tại. Vui lòng chọn khóa khác.`,
            "error"
          );
          departmentsData.push({ id: -1, value: classDetail.departmentName });
        }
        setGrades(departmentsData);

        const classTypesResponse = await apiInstance.get("api/classtype/get-all-classtypes");
        const classTypesData = classTypesResponse.data.data.map((type: any) => ({
          id: type.id,
          value: type.name || type,
        }));
        const matchedClassType = classTypesData.find((ct: any) => ct.value === classDetail.classType);
        classDetail.classtypeId = matchedClassType?.id;
        if (!matchedClassType) {
          showToast(
            `Phân loại lớp "${classDetail.classType}" không tồn tại trong danh sách hiện tại. Vui lòng chọn phân loại khác.`,
            "error"
          );
          classTypesData.push({ id: -1, value: classDetail.classType });
        }
        setClassTypes(classTypesData);

        const teachersResponse = await apiInstance.get("api/teacher/get-all-teachers");
        const teachersData = teachersResponse.data.data.map((teacher: any) => ({
          id: teacher.id,
          value: teacher.fullName || teacher,
        }));
        const matchedTeacher = teachersData.find((t: any) => t.value === classDetail.homeroomTeacher);
        classDetail.userId = matchedTeacher?.id;
        if (classDetail.homeroomTeacher && !matchedTeacher) {
          showToast(
            `Giáo viên "${classDetail.homeroomTeacher}" không tồn tại trong danh sách hiện tại.`,
            "error"
          );
          teachersData.push({ id: -1, value: classDetail.homeroomTeacher });
        }
        setTeachers(teachersData);

        const subjectsResponse = await apiInstance.get("api/subject/get-all-subjects");
        const subjectsData = subjectsResponse.data.data.map((subject: any) => ({
          id: subject.id,
          value: subject.name || subject,
        }));
        setAvailableSubjects(subjectsData);

        const inheritYearsData = ["2015-2016", "2016-2017", "2017-2018", "2018-2019"].map(
          (year, index) => ({
            id: index,
            value: year,
          })
        );
        if (classDetail.inheritYear && !inheritYearsData.some((iy) => iy.value === classDetail.inheritYear)) {
          inheritYearsData.push({ id: -1, value: classDetail.inheritYear });
        }
        setInheritYears(inheritYearsData);

        const initialSubjects = classDetail.classDetailSubjectResponse.map((subject) => ({
          value: subject.subjectName,
        }));
        setSubjects(initialSubjects);

        setClassData(classDetail);

        // Đặt giá trị mặc định cho form dựa trên phản hồi API
        reset({
          schoolYear: matchedAcademicYear || { id: -1, value: normalizedAcademicYearName },
          grade: matchedDepartment || { id: -1, value: classDetail.departmentName },
          className: classDetail.className || "",
          numberOfStudents: classDetail.studentCount || "",
          classType: matchedClassType || { id: -1, value: classDetail.classType },
          teacher: matchedTeacher || (classDetail.homeroomTeacher ? { id: -1, value: classDetail.homeroomTeacher } : null),
          note: classDetail.description || "",
          inheritYear: inheritYearsData.find((iy) => iy.value === classDetail.inheritYear) || inheritYearsData[0] || null,
        });

        setDataLoaded(true);
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Không thể lấy dữ liệu lớp học";
        showToast(errorMessage, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, reset]);

  const filteredSubjects = availableSubjects.filter(
    (subject) => !subjects.some((s) => s.value === subject.value)
  );

  const handleAddSubject = useCallback((subject: string) => {
    setSubjects((prev) => [...prev, { value: subject }]);
    setIsDropdownOpen(false);
  }, []);

  const handleRemoveSubject = useCallback((index: number) => {
    setSubjects((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const validateDropdownSelection = (data: ClassFormData) => {
    if (!data.schoolYear || data.schoolYear.id === -1) {
      showToast("Niên khóa không hợp lệ. Vui lòng chọn một niên khóa khác.", "error");
      return false;
    }
    if (!data.grade || data.grade.id === -1) {
      showToast("Khóa - Khối không hợp lệ. Vui lòng chọn một khóa khác.", "error");
      return false;
    }
    if (!data.classType || data.classType.id === -1) {
      showToast("Phân loại lớp không hợp lệ. Vui lòng chọn một phân loại khác.", "error");
      return false;
    }
    return true;
  };

  const onSubmit = async (data: ClassFormData) => {
    if (!dataLoaded) {
      showToast("Vui lòng chờ dữ liệu tải xong trước khi lưu!", "error");
      return;
    }

    if (!validateDropdownSelection(data)) {
      return;
    }

    setLoading(true);
    try {
      const subjectIds = availableSubjects
        .filter((subject) => subjects.some((s) => s.value === subject.value))
        .map((subject) => subject.id);

      const payload = {
        id: Number(id),
        academicyearId: data?.schoolYear?.id ,
        departmentid: data?.grade?.id,
        classtypeid: data?.classType?.id,
        userid: data.teacher?.id ?? null,
        classname: data.className,
        studentcount: Number(data.numberOfStudents),
        description: data.note || "",
        ids: subjectIds,
        inheritYear: data.inheritYear?.value ?? null,
      };

      console.log("Gửi payload:", payload);
      await apiInstance.put("api/class/update", payload);
      showToast("Cập nhật lớp học thành công!", "success");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Cập nhật lớp học thất bại";
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-h-[600px] overflow-y-auto p-2">
      <h1 className="text-2xl font-medium mb-6 text-center">Chỉnh sửa lớp học</h1>
      {loading && !dataLoaded ? (
        <p className="text-center">Đang tải dữ liệu...</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="text-[#CC5C00] font-bold text-lg mb-4">Thông tin chung</div>
          <div className="flex space-x-14">
            {/* Niên khóa */}
            <div className="flex items-start w-1/3">
              <span className="block text-sm font-semibold pt-2 mr-2">Niên khóa:</span>
              <Controller
                name="schoolYear"
                control={control}
                rules={{ required: "Vui lòng chọn niên khóa" }}
                render={({ field }) => (
                  <Dropdown
                    options={schoolYears}
                    width="medium"
                    value={field.value}
                    onChange={(option) => field.onChange(option)}
                  />
                )}
              />
            </div>
            {errors.schoolYear && (
              <p className="text-red-500 text-xs mt-1">{errors.schoolYear.message}</p>
            )}

            {/* Khóa - Khối */}
            <div className="flex-1 flex items-start">
              <span className="block text-sm font-semibold w-1/4 pt-1">
                Khóa - Khối: <span className="text-red-500 ml-1">*</span>
              </span>
              <Controller
                name="grade"
                control={control}
                rules={{ required: "Vui lòng chọn khóa - khối" }}
                render={({ field }) => (
                  <Dropdown
                    options={grades}
                    width="medium"
                    value={field.value}
                    onChange={(option) => field.onChange(option)}
                  />
                )}
              />
            </div>
            {errors.grade && (
              <p className="text-red-500 text-xs mt-1">{errors.grade.message}</p>
            )}
          </div>

          {/* Tên lớp */}
          <div className="flex items-start">
            <span className="block text-sm font-semibold w-1/3 pt-2">
              Tên lớp: <span className="text-red-500 ml-1">*</span>
            </span>
            <Controller
              name="className"
              control={control}
              rules={{ required: "Vui lòng nhập tên lớp" }}
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  className="w-2/3 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#FF7506]"
                />
              )}
            />
          </div>
          {errors.className && (
            <p className="text-red-500 text-xs ml-1/3 mt-1">{errors.className.message}</p>
          )}

          {/* Số lượng học viên */}
          <div className="flex items-start">
            <span className="block text-sm font-semibold w-1/3 pt-2">
              Số lượng học viên: <span className="text-red-500 ml-1">*</span>
            </span>
            <Controller
              name="numberOfStudents"
              control={control}
              rules={{
                required: "Vui lòng nhập số lượng học viên",
                validate: (value) =>
                  (!isNaN(Number(value)) && Number(value) > 0) ||
                  "Vui lòng nhập số lượng học viên hợp lệ (số dương)",
              }}
              render={({ field }) => (
                <input
                  type="number"
                  {...field}
                  className="w-2/3 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#FF7506]"
                />
              )}
            />
          </div>
          {errors.numberOfStudents && (
            <p className="text-red-500 text-xs ml-1/3 mt-1">{errors.numberOfStudents.message}</p>
          )}

          {/* Phân loại lớp */}
          <div className="flex items-start">
            <span className="block text-sm font-semibold w-1/3 pt-2">
              Phân loại lớp: <span className="text-red-500 ml-1">*</span>
            </span>
            <Controller
              name="classType"
              control={control}
              rules={{ required: "Vui lòng chọn phân loại lớp" }}
              render={({ field }) => (
                <Dropdown
                  options={classTypes}
                  width="medium"
                  value={field.value}
                  onChange={(option) => field.onChange(option)}
                />
              )}
            />
          </div>
          {errors.classType && (
            <p className="text-red-500 text-xs ml-1/3 mt-1">{errors.classType.message}</p>
          )}

          {/* Giáo viên chủ nhiệm */}
          <div className="flex items-start">
            <span className="block text-sm font-semibold w-1/3 pt-2">Giáo viên chủ nhiệm:</span>
            <Controller
              name="teacher"
              control={control}
              render={({ field }) => (
                <Dropdown
                  options={teachers}
                  width="medium"
                  value={field.value}
                  onChange={(option) => field.onChange(option)}
                />
              )}
            />
          </div>

          {/* Mô tả */}
          <div className="flex items-start">
            <span className="block text-sm font-semibold w-1/3 mb-2">Mô tả:</span>
            <Controller
              name="note"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  className="w-2/3 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#FF7506] h-20"
                />
              )}
            />
          </div>

          <hr className="my-6 border-gray-300" />

          <div className="space-y-4">
            <h2 className="text-[#CC5C00] font-bold text-[18px]">Danh sách môn học</h2>
            <div className="mb-4 flex items-center">
              <input type="checkbox" className="mr-2 w-4 h-4 accent-blue-500" />
              <span className="block text-sm font-semibold">Kế thừa dữ liệu:</span>
              <div className="ml-2">
                <Controller
                  name="inheritYear"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      width="medium"
                      options={inheritYears}
                      value={field.value}
                      onChange={(option) => field.onChange(option)}
                    />
                  )}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              {subjects.map((subject, index) => (
                <div key={index} className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleRemoveSubject(index)}
                    className="flex items-center justify-center w-6 h-6 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span>{subject.value}</span>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 text-blue-500 hover:text-blue-700 group"
            >
              <span
                className="flex items-center justify-center w-6 h-6 rounded-full border border-blue-500 transition-colors group-hover:bg-blue-500 group-hover:text-white"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m-7-7h14" />
                </svg>
              </span>
              <span className="text-base font-bold">Thêm môn học mới</span>
            </button>
            {isDropdownOpen && (
              <div className="max-h-48 overflow-y-auto bg-white border border-gray-300 shadow-md rounded-md w-48">
                {filteredSubjects.length > 0 ? (
                  filteredSubjects.map((subject) => (
                    <button
                      key={subject.id}
                      onClick={() => handleAddSubject(subject.value)}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                    >
                      {subject.value}
                    </button>
                  ))
                ) : (
                  <p className="px-4 py-2 text-gray-500">Không còn môn nào để thêm</p>
                )}
              </div>
            )}
          </div>

          {/* Nút hành động */}
          <div className="flex gap-3 pt-6 w-1/3 mx-auto">
            <button
              type="button"
              className="flex-1 text-lg font-semibold px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              disabled={loading}
            >
              Huỷ
            </button>
            <button
              type="submit"
              className="flex-1 text-lg font-semibold px-4 py-2 bg-[#FF7506] text-white rounded-md hover:bg-[#e66b05] transition-colors"
              disabled={loading || !dataLoaded}
            >
              {loading ? "Đang lưu..." : "Lưu"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditClassForm;