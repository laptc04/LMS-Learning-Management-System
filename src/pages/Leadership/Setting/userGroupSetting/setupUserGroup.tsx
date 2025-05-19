import { useState } from "react";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";

export default function UserGroupPermissions() {
    const [isCustom, setIsCustom] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [groupName, setGroupName] = useState('');

    const handleCancel = () => { }

    return (
        <div className="w-[884px] mx-auto p-6 bg-white rounded-lg shadow-md border">
            <h2 className="text-2xl font-bold text-center mb-6">Thiết lập nhóm người dùng</h2>
            <div className="mb-4 flex">
                <div className="w-1/3">
                    <label className="font-medium text-sm">Tên nhóm:</label>
                </div>
                <div className="w-2/3">
                    <Input value={groupName} onChange={(e) => setGroupName(e.target.value)} background="light grey" size="full" />
                </div>
            </div>
            <div className="mb-4 flex">
                <div className="w-1/3">
                    <label className="font-medium text-sm">Ghi chú:</label>
                </div>
                <div className="w-2/3">
                    <textarea className="mt-1 w-full p-2 ps-4 border rounded h-20 bg-gray-100 focus:outline-none text-sm"></textarea>
                </div>
            </div>
            <div className="mb-6 flex">
                <div className="w-1/3">
                    <label className="font-medium text-sm">Phân quyền:</label>
                </div>
                <div className="w-2/3 flex items-center gap-4 mt-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={!isCustom}
                        onChange={() => setIsCustom(false)}
                        className="h-4 w-4"
                    />
                    <span className="text-sm" onClick={() => setIsCustom(false)}>Toàn quyền quản trị</span>
                    <input
                        type="checkbox"
                        checked={isCustom}
                        onChange={() => setIsCustom(true)}
                        className="h-4 w-4"
                    />
                    <span className="text-sm" onClick={() => setIsCustom(true)}>Tùy chọn</span>
                </div>
            </div>
            {isCustom && (
                <div className="mb-6 border p-4 rounded-lg bg-gray-100">
                    <div className="space-y-4">
                        {[
                            "Khai báo dữ liệu", "Hồ sơ học viên", "Hồ sơ giảng viên", "Thi cử", "", "Cài đặt hệ thống"
                        ].map((category, index) => (
                            <div key={index} className="grid grid-cols-5 gap-3 items-center">
                                {category !== "" ? (
                                    <>
                                        <span className="font-medium col-span-1 text-sm">{category}</span>
                                        {["Xem", "Chỉnh sửa", "Xóa", "Thêm mới"].map((perm, i) => (
                                            <label key={i} className="flex items-center gap-2 cursor-pointer">
                                                <input type="checkbox" className="h-4 w-4" /> <span className="text-sm">{perm}</span>
                                            </label>
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        <span className="font-medium col-span-1 text-sm">{category}</span>
                                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsChecked(!isChecked)}>
                                            <input type="checkbox" className="h-4 w-4" checked={isChecked} onChange={() => setIsChecked(!isChecked)} /> <span className="text-sm">Nhập điểm</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className="flex justify-center gap-4 mt-6">
                <Button label="Hủy" size="medium" variant="solid" backgroundColor="darkgray" onClick={handleCancel} />
                <Button label="Lưu" size="medium" variant="solid" onClick={handleCancel} />
            </div>
        </div>
    );
}
