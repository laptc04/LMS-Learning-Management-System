import React, { useEffect } from 'react'
import Dropdown from '../../../../components/Dropdown'
import Button from '../../../../components/Button';
import { FaCamera, FaCheck, FaEdit, FaPlus, FaSave, FaTimes, FaTrash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Input from '../../../../components/Input';
import DatePicker from '../../../../components/DatePicker';
import apiInstance from '../../../../services/api';
import { format } from 'date-fns';
import { showToast } from '../../../../components/Toasted';

type School = {
    id: number;
    schoolCode: string;
    name: string;
    principal: string;
    principalPhone: string;
    email: string;
    website: string;
    province: string;
    district: string;
    ward: string;
    fax: string;
    isJuniorHigh: boolean;
    isHighSchool: boolean;
    educationModel: string;
    phone: string;
    establishmentDate: string;
    headOffice: string;
    image: string;
};

interface SchoolBranch {
    id: number;
    schoolId: number;
    branchName: string;
    address: string;
    email: string;
    phone: string;
    schoolPhone: string;
    manager: string;
    image: string | null;
}

export default function SchoolPage() {
    interface DropdownOption {
        id: number;
        value: string;
    }

    interface DropdownProps {
        options: DropdownOption[];
        onChange: (selected: DropdownOption) => void;
        value?: string;
    }

    const yearOptions: DropdownOption[] = Array.from({ length: 50 }, (_, i) => {
        const startYear = 2000 + i;
        const endYear = startYear + 1;
        return {
            id: startYear,
            value: `${startYear}-${endYear}`, // Định dạng "YYYY-YYYY"
        };
    });
    const hinhThucDaoTaoOptions: DropdownOption[] = [
        { id: 1, value: "Công lập" },
        { id: 2, value: "Tư nhân" }
    ];
    const loaiTruongOptions: DropdownOption[] = [
        { id: 1, value: "Trung học cơ sở" },
        { id: 2, value: "Trung học phổ thông" }
    ];
    const navigate = useNavigate();
    const [schoolData, setSchoolData] = useState({
        email: "nguyesssss@gmail.com",
        manager: "Nguyễn Văn A",
        phone1: "014521447741",
        phone2: "014521447741",
        address: "12 Nguyễn Văn A, phường 12, Quận 6, TP. Hồ Chí Minh",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [school, setSchool] = useState<any>({});
    const [schoolBranches, setSchoolBranches] = useState<SchoolBranch[]>([]);
    const [editedBranch, setEditedBranch] = useState<Partial<SchoolBranch>>({});
    const [editingBranchId, setEditingBranchId] = useState<number | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);


    const handleChange = (field: string, value: string) => {
        setSchoolData((prev) => ({ ...prev, [field]: value }));
    };
    const fetchSchoolData = async () => {
        try {
            const response = await apiInstance.get('api/school');
            const schoolData = response.data.data?.[0]; // ✅ đúng biến tên

            console.log("Dữ liệu từ API:", schoolData);

            if (schoolData) {
                let loaiTruong = "";
                if (schoolData.isJuniorHigh && schoolData.isHighSchool) {
                    loaiTruong = "Trường liên cấp";
                } else if (schoolData.isJuniorHigh) {
                    loaiTruong = "Trung học cơ sở";
                } else if (schoolData.isHighSchool) {
                    loaiTruong = "Trung học phổ thông";
                } else {
                    loaiTruong = "Không xác định";
                }

                // Gắn loại trường vào object rồi set
                setSchool({ ...schoolData, loaiTruong });
            }
        } catch (err) {
            console.error("Lỗi khi gọi API:", err);
            setError("Không thể tải dữ liệu");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {


        fetchSchoolData();
    }, []);



    const fieldLabels: Record<string, string> = {
        schoolCode: "Mã trường",
        establishmentDate: "Ngày thành lập",
        province: "Tỉnh/Thành phố",
        ward: "Phường/Xã",
        district: "Quận/Huyện",
        headOffice: "Trụ sở chính",
        loaiTruong: "Loại trường",
        principal: "Hiệu trưởng",
        principalPhone: "SĐT Hiệu trưởng",
        email: "Email",
        website: "Website",
        fax: "Fax",
        educationModel: "Hình thức đào tạo",
        phone: "Số điện thoại",

    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            // Nếu ngày không hợp lệ, trả về chuỗi "Ngày không hợp lệ"
            return "Ngày không hợp lệ";
        }
        return format(date, "dd-MM-yyyy");
    };

    const handleDeleteBranch = async (id: number) => {
        try {
            await apiInstance.delete(`api/schoolbranch/${id}`);
            setSchoolBranches(prev => prev.filter(branch => branch.id !== id));
            showToast("Xóa chi nhánh thành công!", "success");
        } catch (error) {
            console.error("Lỗi khi xóa chi nhánh:", error);
            showToast("Xóa chi nhánh thất bại. Vui lòng thử lại.", "error");
        } finally {
            setDeleteId(null); // Đóng modal sau khi xong
        }
    };

    const fetchSchoolBranches = async () => {
        try {
            const response = await apiInstance.get('api/schoolbranch');
            const branchData: SchoolBranch[] = response.data.data;

            console.log("Dữ liệu chi nhánh từ API:", branchData);

            if (branchData) {
                setSchoolBranches(branchData);
            }
        } catch (err) {
            console.error("Lỗi khi gọi API chi nhánh:", err);
        }
    };
    useEffect(() => {
        fetchSchoolBranches();
    }, []);

    const handleBranchChange = (key: keyof SchoolBranch, value: string) => {
        setEditedBranch(prev => ({ ...prev, [key]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setEditedBranch(prev => ({
                ...prev,
                image: reader.result?.toString() || ""
            }));
        };
        reader.readAsDataURL(file); // ⬅️ Chuyển ảnh sang base64
    };

    const handleUpdateBranch = async (id: number) => {
        const formattedData = {
            id: id,
            SchoolId: editedBranch.schoolId,
            BranchName: editedBranch.branchName,
            Address: editedBranch.address,
            Email: editedBranch.email,
            Phone: editedBranch.phone,
            SchoolPhone: editedBranch.schoolPhone,
            Manager: editedBranch.manager,
            image: editedBranch.image?.startsWith("data:image") ? editedBranch.image : ""
        };

        console.log("Dữ liệu gửi lên API:", formattedData);

        try {
            const response = await apiInstance.put(`api/schoolbranch`, formattedData); // Lưu kết quả trả về

            // Cập nhật danh sách chi nhánh sau khi lưu
            await fetchSchoolBranches();

            showToast(response.data?.message || "Lưu thành công!", "success");
        } catch (error: any) {
            console.error("Lỗi cập nhật chi nhánh:", error);

            const errorMessage =
                error?.response?.data?.message ||
                "Đã xảy ra lỗi. Vui lòng thử lại sau.";

            showToast(errorMessage, "error");
        } finally {
            setEditingBranchId(null);
            setEditedBranch({});
        }
    };

    const [schoolUpdate, setSchoolUpdate] = useState<School>({
        id: 0,
        schoolCode: "",
        name: "",
        principal: "",
        principalPhone: "",
        email: "",
        website: "",
        province: "",
        district: "",
        ward: "",
        fax: "",
        isJuniorHigh: false,
        isHighSchool: false,
        educationModel: "",
        phone: "",
        establishmentDate: "",
        headOffice: "",
        image: "",
    });

    const [isEditing, setIsEditing] = useState(false);


    const handleChangeSchool = (key: keyof School, value: string | boolean) => {
        setSchoolUpdate((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleChangeImageSchool = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Image = reader.result?.toString() || "";
            setSchoolUpdate(prev => ({
                ...prev,
                image: base64Image,
            }));
        };

        reader.readAsDataURL(file); // chuyển sang base64
    };
    const convertToApiDate = (date: string | Date) => {
        if (!date) return "";

        if (typeof date === "string" && date.includes('/')) {
            const [day, month, year] = date.split('/');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00:00`;
        }

        const d = new Date(date);
        return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}T00:00:00`;
    };



    const handleSave = async () => {
        try {
            const formattedData = {
                ...schoolUpdate,
                image: schoolUpdate.image?.startsWith("data:image") ? schoolUpdate.image : "",
                establishmentDate: schoolUpdate.establishmentDate
                    ? convertToApiDate(schoolUpdate.establishmentDate)
                    : school.establishmentDate,
            };

            console.log('Log', formattedData);

            const response = await apiInstance.put(`api/school`, formattedData);
            showToast(response.data?.message || "Lưu thành công!", "success");
            await fetchSchoolData();
            setIsEditing(false);
        } catch (error) {
            console.error("Lỗi cập nhật trường:", error);
            const errorMessage =
                (error as any)?.response?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại sau.";
            showToast(errorMessage, "error");
        }
    };

    return (
        <div>
            <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-3">Thông tin nhà trường</h1>
                <div className="flex justify-between items-center w-full mb-3 mt-3">
                    {/* Dropdown nằm bên trái */}
                    <div className="w-1/2 flex">
                        <Dropdown options={yearOptions} />
                    </div>

                    {/* Hai nút nằm bên phải */}
                    <div className="w-1/2 flex justify-end gap-3">
                        <Button
                            label="Xuất file"
                            textColor="#FF7506"
                            backgroundColor="white"
                            size="mini"
                            variant="outline"
                            onClick={() => navigate('addButtonLink')}
                        />
                        <Button
                            label={isEditing ? "Lưu" : "Chỉnh sửa"}
                            textColor="white"
                            backgroundColor="#FF7506"
                            size="mini"
                            variant="none"
                            onClick={() => {
                                if (isEditing) {
                                    handleSave();
                                } else {
                                    setIsEditing(true);
                                    setSchoolUpdate(school);
                                }
                            }}
                            icon={isEditing ? <FaSave /> : <FaEdit />}
                        />
                    </div>
                </div>


            </div>
            <div className="p-6 bg-gray-100">
                {/* Thông tin chung */}
                <div className="max-h-[80vh] overflow-y-auto">
                    <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-6">
                        <div className="bg-orange-700 text-white p-4 font-semibold">Thông tin chung</div>
                        <div className="p-6 flex">
                            {/* Logo */}
                            <div className="w-1/3 flex flex-col items-center justify-center relative">
                                <img
                                    src={schoolUpdate.image || "https://via.placeholder.com/150"}
                                    alt="School Logo"
                                    className="w-40 h-40 object-cover rounded-full"
                                />

                                {isEditing && (
                                    <label className="absolute bottom-2 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-100 transition-all">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleChangeImageSchool}
                                        />
                                        <FaCamera className="text-gray-700 text-lg" />
                                    </label>
                                )}
                            </div>


                            {/* Thông tin trường */}
                            <div className="w-2/3 grid grid-cols-2 gap-x-6 gap-y-3 text-gray-700">
                                <h2 className="col-span-2 text-orange-700 font-semibold text-lg">
                                    {school.name || "Tên trường"}
                                </h2>

                                {Object.entries(fieldLabels).map(([key, label]) => (
                                    <p key={key} className="flex items-center">
                                        <strong className="w-40 capitalize">{label}:</strong>

                                        {isEditing ? (
                                            key === "establishmentDate" ? (
                                                <div className="relative overflow-visible z-50">
                                                    <DatePicker
                                                        value={schoolUpdate.establishmentDate || null}
                                                        onChange={(value) => {
                                                            if (value) {
                                                                handleChangeSchool("establishmentDate", value);
                                                            }
                                                        }}
                                                        placeholder="Chọn ngày thành lập"
                                                        className="w-50"
                                                    />
                                                </div>
                                            ) : (
                                                <Input
                                                    type="text"
                                                    value={schoolUpdate[key as keyof School]?.toString() ?? ""}
                                                    onChange={(e) =>
                                                        handleChangeSchool(key as keyof School, e.target.value)
                                                    }
                                                    border="grey"
                                                    size="medium"
                                                />
                                            )
                                        ) : key === "establishmentDate" ? (
                                            formatDate(school[key])
                                        ) : (
                                            school[key]?.toString() || ""
                                        )}
                                    </p>
                                ))}





                            </div>
                        </div>
                    </div>
                </div>


                {/* Danh sách cơ sở */}
                {schoolBranches.map((branch) => (
                    <div className="bg-white shadow-lg rounded-xl overflow-hidden relative" key={branch.id}>
                        <div className="bg-orange-700 text-white p-4 font-semibold flex justify-between">
                            <span>Danh sách cơ sở</span>
                            <div className="flex space-x-3">
                                {editingBranchId === branch.id ? (
                                    <>
                                        <FaCheck
                                            className="cursor-pointer text-white text-lg"
                                            onClick={() => handleUpdateBranch(branch.id)}
                                        />
                                        <FaTimes
                                            className="cursor-pointer text-white text-lg"
                                            onClick={() => setEditingBranchId(null)}
                                        />
                                    </>
                                ) : (
                                    <FaEdit
                                        className="cursor-pointer text-white text-lg"
                                        onClick={() => {
                                            setEditingBranchId(branch.id);
                                            setEditedBranch(branch); // preload dữ liệu hiện tại
                                        }}
                                    />
                                )}
                                <FaTrash
                                    className="cursor-pointer text-red-500 text-lg hover:text-red-700 transition"
                                    onClick={() => setDeleteId(branch.id)}

                                />
                            </div>
                        </div>

                        <div className="p-6 flex">
                            <div className="w-1/3 flex justify-center items-center relative group">
                                <img
                                    src={
                                        editingBranchId === branch.id
                                            ? editedBranch.image || "https://via.placeholder.com/200"
                                            : branch.image || "https://via.placeholder.com/200"
                                    }
                                    alt={branch.branchName}
                                    className="w-40 h-40 object-cover rounded-lg"
                                />

                                {/* Camera icon hiện khi đang chỉnh sửa */}
                                {editingBranchId === branch.id && (
                                    <>
                                        <label htmlFor={`image-upload-${branch.id}`} className="absolute bottom-2 bg-white p-2 rounded-full cursor-pointer shadow-md group-hover:opacity-100 opacity-80">
                                            <FaCamera className="text-gray-700 text-xl" />
                                        </label>
                                        <input
                                            id={`image-upload-${branch.id}`}
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageChange}
                                        />
                                    </>
                                )}
                            </div>


                            <div className="w-2/3 grid grid-cols-2 gap-x-6 gap-y-3 text-gray-700">
                                <h2 className="col-span-2 text-orange-700 font-semibold text-lg">
                                    {branch.branchName}
                                </h2>

                                {/* Email */}
                                <p className="flex items-center">
                                    <strong>Email:&nbsp;</strong>
                                    {editingBranchId === branch.id ? (
                                        <Input
                                            type="text"
                                            border="grey"
                                            size="medium"
                                            value={editedBranch.email || ""}
                                            onChange={(e) => handleBranchChange("email", e.target.value)}
                                        />
                                    ) : (
                                        branch.email
                                    )}
                                </p>

                                {/* Người phụ trách */}
                                <p className="flex items-center">
                                    <strong>Người phụ trách:&nbsp;</strong>
                                    {editingBranchId === branch.id ? (
                                        <Input
                                            type="text"
                                            border="grey"
                                            size="medium"
                                            value={editedBranch.manager || ""}
                                            onChange={(e) => handleBranchChange("manager", e.target.value)}
                                        />
                                    ) : (
                                        branch.manager
                                    )}
                                </p>

                                {/* Số điện thoại */}
                                <p className="flex items-center">
                                    <strong>SDT 1:&nbsp;</strong>
                                    {editingBranchId === branch.id ? (
                                        <Input
                                            type="text"
                                            border="grey"
                                            size="medium"
                                            value={editedBranch.phone || ""}
                                            onChange={(e) => handleBranchChange("phone", e.target.value)}
                                        />
                                    ) : (
                                        branch.phone
                                    )}
                                </p>

                                <p className="flex items-center">
                                    <strong>SDT 2:&nbsp;</strong>
                                    {editingBranchId === branch.id ? (
                                        <Input
                                            type="text"
                                            border="grey"
                                            size="medium"
                                            value={editedBranch.schoolPhone || ""}
                                            onChange={(e) => handleBranchChange("schoolPhone", e.target.value)}
                                        />
                                    ) : (
                                        branch.schoolPhone || "Không có thông tin"
                                    )}
                                </p>

                                {/* Địa chỉ */}
                                <p className="col-span-2 flex items-center">
                                    <strong>Địa chỉ:&nbsp;</strong>
                                    {editingBranchId === branch.id ? (
                                        <Input
                                            type="text"
                                            border="grey"
                                            size="medium"
                                            value={editedBranch.address || ""}
                                            onChange={(e) => handleBranchChange("address", e.target.value)}
                                        />
                                    ) : (
                                        branch.address
                                    )}
                                </p>
                            </div>


                        </div>
                    </div>
                ))}
                {deleteId && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg" style={{ width: 435 }}>
                            <h3 className="text-2xl font-bold text-center">Xóa chi nhánh</h3>
                            <p className="text-base mt-5 mb-10 font-normal">
                                Xác nhận muốn xoá chi nhánh này? Sau khi xoá sẽ không thể hoàn tác.
                            </p>
                            <div className="flex justify-between w-full px-4 font-bold">
                                <button
                                    onClick={() => setDeleteId(null)}
                                    className="px-4 py-2 rounded-lg w-40 h-14 text-lg"
                                    style={{ backgroundColor: '#F2F2F2' }}
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={() => handleDeleteBranch(deleteId)}
                                    className="bg-orange-500 text-white px-4 py-2 rounded-lg w-40 h-14 text-lg"
                                >
                                    Xác nhận
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
