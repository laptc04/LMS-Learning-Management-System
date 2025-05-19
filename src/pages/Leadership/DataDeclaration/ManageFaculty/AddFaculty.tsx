import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Dropdown from "../../../../components/Dropdown";
import { Option } from "../../../../components/Dropdown/type";
import apiInstance from "../../../../services/api";
import { showToast } from "../../../../components/Toasted";
import { useNavigate } from "react-router";

interface FormData {
    facultyId: string;
    facultyName: string;
    leader: Option | null;
}

const AddFaculty = () => {
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<FormData>({
        defaultValues: {
            facultyId: "",
            facultyName: "",
            leader: null,
        },
        mode: "onChange",
    });

    const [leaders, setLeaders] = useState<Option[]>([]);
    const navigator = useNavigate();

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
                    console.error("Error fetching teachers:", response.data.message);
                    showToast(response.data.message, "error");
                }
            } catch (error) {
                console.error("API Error:", error);
                showToast("Không thể lấy danh sách giáo viên", "error");
            }
        };

        fetchTeachers();
    }, []);

    const onSubmit = async (data: FormData) => {
        try {
            const payload = {
                departmentCode: data.facultyId,
                name: data.facultyName,
                userId: data.leader?.id || null, // Lấy id từ leader
            };

            const response = await apiInstance.post("api/department", payload);

            if (response.data.status === 0) {
                showToast("Thêm khoa - khối thành công", "success");
                reset();
                navigator("/leadership/data-declaration/faculty");
            } else {
                console.log("Error adding department:", response.data.message);
                showToast(response.data.message, "error");
            }
        } catch (error: any) {
            console.error("Error adding department:", error);
            const errorMessage =
                error.response?.data?.message || "Thêm khoa - khối thất bại";
            showToast(errorMessage, "error");
        }
    };

    return (
        <div className="p-6 bg-white rounded-2xl shadow-lg w-full max-w-4xl mx-auto">
            <h3 className="font-bold text-center mb-6 text-2xl font-mulish">
                Thêm Khoa - Khối mới
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-source-sans">
                <div className="flex items-center">
                    <label className="w-1/4 text-lg font-bold">Mã khoa - khối:</label>
                    <div className="w-2/3">
                        <Controller
                            name="facultyId"
                            control={control}
                            rules={{
                                required: "Mã khoa - khối là bắt buộc",
                            }}
                            render={({ field }) => (
                                <input
                                    type="text"
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                                        errors.facultyId ? "border-red-500 focus:ring-red-500" : "focus:ring-orange-500"
                                    } text-lg italic`}
                                    {...field}
                                />
                            )}
                        />
                        {errors.facultyId && (
                            <p className="text-red-500 text-sm mt-1">{errors.facultyId.message}</p>
                        )}
                    </div>
                </div>

                <div className="flex items-center">
                    <label className="w-1/4 text-lg font-bold">Khoa - khối:</label>
                    <div className="w-2/3">
                        <Controller
                            name="facultyName"
                            control={control}
                            rules={{
                                required: "Tên khoa - khối là bắt buộc",
                            }}
                            render={({ field }) => (
                                <input
                                    type="text"
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                                        errors.facultyName ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                                    } text-lg`}
                                    {...field}
                                />
                            )}
                        />
                        {errors.facultyName && (
                            <p className="text-red-500 text-sm mt-1">{errors.facultyName.message}</p>
                        )}
                    </div>
                </div>

                <div className="flex items-center">
                    <label className="w-1/4 text-lg font-bold">Trưởng khoa - khối:</label>
                    <div className="w-2/3">
                        <Controller
                            name="leader"
                            control={control}
                            render={({ field }) => (
                                <Dropdown
                                    options={leaders}
                                    disabled={false}
                                    icon="right"
                                    width="w-full"
                                    state="normal"
                                    selectedId={field.value?.id} // Hiển thị giá trị đã chọn
                                    onChange={(option: Option | null) => field.onChange(option)} // Lưu toàn bộ option
                                />
                            )}
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-center mt-6 font-mulish">
                    <button
                        type="button"
                        className="bg-gray-200 font-bold px-6 py-2 text-lg rounded-lg w-32 mr-4 hover:bg-gray-300"
                        onClick={() => window.history.back()}
                    >
                        Quay lại
                    </button>
                    <button
                        type="submit"
                        className={`font-bold text-lg px-6 py-2 rounded-lg w-32 ${
                            !isValid
                                ? "bg-gray-400 text-white cursor-not-allowed"
                                : "bg-orange-500 text-white hover:bg-orange-600"
                        }`}
                        disabled={!isValid}
                    >
                        Lưu
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddFaculty;