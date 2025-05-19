import React, { useState } from "react";
import Button from "../../../../components/Button";
import { EyeIcon, EyeOffIcon } from "lucide-react";


const JoinClassForm: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleSave = () => {
        // Logic lưu (gửi dữ liệu form, ...)
        console.log('Lưu');
    };
    return (
        <div>
            <div className="flex w-full justify-center mt-20">
                <div className="bg-white p-8 rounded-2xl shadow-lg w-[550px] text-center">
                    <h2 className="text-2xl font-bold mb-6 text-center">Tham gia lớp học</h2>
                    <div className="space-y-6 px-6">
                        <input
                            type="text"
                            placeholder="ID hoặc link lớp học"
                            className="w-full px-6 py-3 border border-blue-500 text-blue-500 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Mật khẩu lớp học"
                                className="w-full px-6 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                className="absolute right-4 top-3 text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOffIcon style={styles.action__icon} /> : <EyeIcon style={styles.action__icon} />}
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-between mt-8 px-6">
                        <Button
                            label="Hủy"
                            size="big"
                            variant="solid"
                            onClick={handleSave}
                            textColor="black"
                            backgroundColor="#F2F2F2 "
                            hoverBackgroundColor="#45a049"
                        />
                        <Button
                            label="Tham gia"
                            size="big"
                            variant="solid"
                            onClick={handleSave}
                            textColor="white"
                            backgroundColor="#FF7506"
                            hoverBackgroundColor="#45a049"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
const styles = {
    action__icon: {
        color: '#ff7506',
        fontSize: '20px',
    },
};

export default JoinClassForm;