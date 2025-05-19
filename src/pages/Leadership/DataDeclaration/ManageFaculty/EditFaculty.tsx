import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import Dropdown from "../../../../components/DropdownUpdate";
import { Option } from "../../../../components/Dropdown/type";
import apiInstance from "../../../../services/api";
import { showToast } from "../../../../components/Toasted";
import LoadingSpinner from "../../../../components/Loading";

interface FormData {
  facultyId: string;
  facultyName: string;
  leader: Option | null;
}

interface DepartmentData {
  departmentName: string;
  id: number;
  departmentCode: string;
  userId: number | null;
}

const EditFaculty: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      facultyId: "",
      facultyName: "",
      leader: null,
    },
    mode: "onChange",
  });

  const [leaders, setLeaders] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);

  // Gọi API để lấy danh sách giảng viên
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await apiInstance.get("api/teacher/get-all-teachers");
        if (response.data.status === 0) {
          const teacherOptions = response.data.data.map((teacher: { id: number; fullName: string }) => ({
            id: teacher.id,
            value: teacher.fullName,
          }));
          setLeaders(teacherOptions);
        } else {
          showToast("Lấy danh sách giảng viên thất bại: " + response.data.message, "error");
        }
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Không thể lấy danh sách giảng viên";
        showToast(errorMessage, "error");
      }
    };

    fetchTeachers();
  }, []);

  // Gọi API để lấy dữ liệu khoa - khối theo id
  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await apiInstance.get(`api/department/${id}`);
        if (response.data.status === 0) {
          const department: DepartmentData = response.data.data;
          // Cập nhật giá trị form với dữ liệu từ API
          setValue("facultyId", department.departmentCode || "");
          setValue("facultyName", department.departmentName || "");
          // Tìm leader tương ứng từ danh sách giảng viên
          const selectedLeader = leaders.find((leader) => leader.id === department.userId) || null;
          setValue("leader", selectedLeader);
        } else {
          showToast("Lấy dữ liệu khoa - khối thất bại: " + response.data.message, "error");
        }
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Lấy dữ liệu khoa - khối thất bại";
        showToast(errorMessage, "error");
      } finally {
        setLoading(false);
      }
    };

    // Chỉ gọi fetchDepartment khi đã có danh sách leaders
    if (id && leaders.length > 0) {
      fetchDepartment();
    } else if (!leaders.length) {
      // Nếu chưa có leaders, giữ trạng thái loading
      setLoading(true);
    }
  }, [id, leaders, setValue]);

  // Xử lý submit form
  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        id: Number(id),
        name: data.facultyName,
        userUpdate: data.leader?.id || null, // Lấy id từ leader
        isDelete: false,
      };

      const response = await apiInstance.put("api/department", payload);

      if (response.data.status === 0) {
        showToast("Cập nhật khoa - khối thành công", "success");
        navigate("/leadership/data-declaration/faculty");
      } else {
        showToast(response.data.message, "error");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Cập nhật khoa - khối thất bại";
      showToast(errorMessage, "error");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-6">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-[884px] mx-auto">
      <h3 className="font-bold text-center text-2xl">Chỉnh sửa Khoa - Khối</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-3">
        {/* Mã khoa - khối */}
        <div>
          <label className="block font-semibold">Mã Khoa - Khối</label>
          <Controller
            name="facultyId"
            control={control}
            render={({ field }) => (
              <input
                value={field.value}
                readOnly
                className="border p-2 w-full bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            )}
          />
        </div>

        {/* Tên khoa - khối */}
        <div>
          <label className="block font-semibold">Tên Khoa - Khối</label>
          <Controller
            name="facultyName"
            control={control}
            rules={{
              required: "Tên khoa - khối là bắt buộc",
            }}
            render={({ field }) => (
              <input
                value={field.value}
                onChange={field.onChange}
                className={`border p-2 w-full ${errors.facultyName ? "border-red-500" : ""}`}
              />
            )}
          />
          {errors.facultyName && (
            <p className="text-red-500 text-sm mt-1">{errors.facultyName.message}</p>
          )}
        </div>

        {/* Trưởng khoa - khối */}
        <div>
          <label className="block font-semibold">Trưởng Khoa - Khối</label>
          <Controller
            name="leader"
            control={control}
            render={({ field }) => (
              <Dropdown
                options={leaders}
                disabled={false}
                icon="right"
                width="w-3/6"
                state="normal"
                selectedId={field.value?.id} 
                onChange={(option: any | null) => field.onChange(option)} 
              />
            )}
          />
        </div>

        <button
          type="submit"
          className={`w-full mt-4 px-4 py-2 rounded text-white font-bold ${
            !isValid ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
          }`}
          disabled={!isValid}
        >
          Lưu
        </button>
      </form>
    </div>
  );
};

export default EditFaculty;