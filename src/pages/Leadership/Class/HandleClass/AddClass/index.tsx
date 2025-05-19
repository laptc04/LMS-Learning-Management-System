import React, { useState, useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import Dropdown from "../../../../../components/DropdownUpdate";
import apiInstance from "../../../../../services/api";
import { showToast } from "../../../../../components/Toasted";

// Define interfaces for dropdown data
interface DropdownOption {
  id: number;
  value: string;
}

interface Subject {
  value: string;
}

// Define the form data type
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

const AddClassForm: React.FC = () => {
  // State for dropdown data
  const [schoolYears, setSchoolYears] = useState<DropdownOption[]>([]);
  const [grades, setGrades] = useState<DropdownOption[]>([]);
  const [classTypes, setClassTypes] = useState<DropdownOption[]>([]);
  const [teachers, setTeachers] = useState<DropdownOption[]>([]);
  const [availableSubjects, setAvailableSubjects] = useState<DropdownOption[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [inheritYears, setInheritYears] = useState<DropdownOption[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Initialize React Hook Form
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

  // Fetch dropdown data from APIs
  useEffect(() => {
    const fetchDropdownData = async () => {
      setLoading(true);
      try {
        // Fetch academic years
        const academicYearsResponse = await apiInstance.get("api/academicyear/get-all-academic-years");
        const academicYearsData = academicYearsResponse.data.data.map((year: any) => ({
          id: year.id,
          value: year.name || year,
        }));
        setSchoolYears(academicYearsData);

        // Fetch departments (grades)
        const departmentsResponse = await apiInstance.get("api/department/get-all-departments");
        const departmentsData = departmentsResponse.data.data.map((dept: any) => ({
          id: dept.id,
          value: dept.name || dept,
        }));
        setGrades(departmentsData);

        // Fetch class types
        const classTypesResponse = await apiInstance.get("api/classtype/get-all-classtypes");
        const classTypesData = classTypesResponse.data.data.map((type: any) => ({
          id: type.id,
          value: type.name || type,
        }));
        setClassTypes(classTypesData);

        // Fetch teachers
        const teachersResponse = await apiInstance.get("api/teacher/get-all-teachers");
        const teachersData = teachersResponse.data.data.map((teacher: any) => ({
          id: teacher.id,
          value: teacher.fullName || teacher,
        }));
        setTeachers(teachersData);

        // Fetch subjects
        const subjectsResponse = await apiInstance.get("api/subject/get-all-subjects");
        const subjectsData = subjectsResponse.data.data.map((subject: any) => ({
          id: subject.id,
          value: subject.name || subject,
        }));
        setAvailableSubjects(subjectsData);

        // Populate inherit years
        const inheritYearsData = ["2015-2016", "2016-2017", "2017-2018", "2018-2019"].map(
          (year, index) => ({
            id: index,
            value: year,
          })
        );
        setInheritYears(inheritYearsData);

        // Set default values for the form after data is fetched
        reset({
          schoolYear: academicYearsData[0] || null,
          grade: departmentsData[0] || null,
          className: "",
          numberOfStudents: "",
          classType: classTypesData[0] || null,
          teacher: teachersData[0] || null,
          note: "",
          inheritYear: inheritYearsData[0] || null,
        });
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Không thể lấy dữ liệu danh sách dropdown";
        showToast(errorMessage, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchDropdownData();
  }, [reset]);

  // Filter available subjects
  const filteredSubjects = availableSubjects.filter(
    (subject) => !subjects.some((s) => s.value === subject.value)
  );

  // Add a subject to the list
  const handleAddSubject = useCallback((subject: string) => {
    setSubjects((prev) => [...prev, { value: subject }]);
    setIsDropdownOpen(false);
  }, []);

  // Remove a subject from the list
  const handleRemoveSubject = useCallback((index: number) => {
    setSubjects((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // Handle form submission
  const onSubmit = async (data: ClassFormData) => {
    setLoading(true);
    try {
      // Validate academicyearId
      if (!data.schoolYear || !data.schoolYear.id) {
        throw new Error("Niên khóa không hợp lệ. Vui lòng chọn niên khóa.");
      }

      const subjectIds = availableSubjects
        .filter((subject) => subjects.some((s) => s.value === subject.value))
        .map((subject) => subject.id);

      const payload = {
        academicyearId: data.schoolYear.id,
        departmentid: data.grade?.id ?? 0,
        classtypeid: data.classType?.id ?? 0,
        userid: data.teacher?.id ?? null,
        classname: data.className,
        studentcount: Number(data.numberOfStudents),
        description: data.note || "",
        ids: subjectIds,
        inheritYear: data.inheritYear?.value ?? null,
      };

      console.log("Submitting payload:", payload);
      await apiInstance.post("api/class/create", payload);
      showToast("Tạo lớp học thành công!", "success");
      reset();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Tạo lớp học thất bại";
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-h-[600px] overflow-y-auto p-2">
      <h1 className="text-2xl font-medium mb-6 text-center">Thêm lớp học mới</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="text-[#CC5C00] font-bold text-lg mb-4">Thông tin chung</div>
        <div className="flex space-x-14">
          {/* School Year */}
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

          {/* Grade */}
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

        {/* Class Name */}
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

        {/* Number of Students */}
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

        {/* Class Type */}
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

        {/* Teacher */}
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

        {/* Note */}
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
            <div className=" max-h-48 overflow-y-auto bg-white border border-gray-300 shadow-md rounded-md w-48">
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

        {/* Action Buttons */}
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
            disabled={loading}
          >
            {loading ? "Đang lưu..." : "Lưu"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClassForm;