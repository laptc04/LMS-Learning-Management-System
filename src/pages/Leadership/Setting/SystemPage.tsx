import React, { useEffect, useState } from 'react';
import Dropdown from "../../../components/Dropdown";
import Button from "../../../components/Button";
import apiInstance from '../../../services/api';

const LanguageOptions = [
    { id: 1, value: 'Tiếng việt' },
    { id: 2, value: 'Tiếng Anh' },
    { id: 3, value: 'Tiếng Trung' },
];

const ConfigPage = () => {
    const [isFormOpen, setIsFormOpen] = useState<boolean>(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [theme, setTheme] = useState('');
    const [captchaEnabled, setCaptchaEnabled] = useState(false);
    const [language, setLanguage] = useState('');
    useEffect(() => {
        const fetchSystemData = async () => {
            try {
                const response = await apiInstance.get('/api/SystemSetting');
                const systemData = response.data.data;
                console.log("Dữ liệu từ API:", systemData);

                // Lưu dữ liệu vào state
                setTheme(systemData.currentTheme);
                setCaptchaEnabled(systemData.captchaEnabled);
                setLanguage(systemData.language);

            } catch (err) {
                console.error("Lỗi khi gọi API:", err);
                setError("Không thể tải dữ liệu");
            } finally {
                setLoading(false);
            }
        };

        fetchSystemData();
    }, []);

    const handleSave = () => {
        console.log('Saving:');
    };
    const handleCancel = () => {
        setIsFormOpen(false);
        console.log('Đã hủy và reset form');
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Cấu hình</h1>
            <div className="p-6 min-h-screen flex ">
                <div className="bg-white p-6 rounded-lg shadow-[0px_4px_6px_#9ACAF540] h-auto lg:h-[80vh] w-full max-w-[90%] flex flex-col">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-grow">
                        {/* Left Section */}
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Cấu hình</h2>
                            <div className="border-2 border-orange-400 rounded-lg h-80 flex items-center justify-center text-gray-400">
                                Theme đang sử dụng <span className="ml-2 text-orange-600">{theme}</span>
                            </div>
                            <div className="mt-4 flex items-center">
                                <label className="font-semibold mr-2 me-5">Captcha:</label>
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 accent-blue-500 mr-2"
                                    checked={captchaEnabled}
                                    readOnly
                                />
                                <span>Kích hoạt captcha khi đăng nhập vào hệ thống</span>
                            </div>
                            <div className="mt-4 flex items-center">
                                <label className="font-semibold mr-2 me-5">Ngôn ngữ:</label>
                                <Dropdown
                                    options={LanguageOptions}
                                    width="long"
                                    selectedId={language}
                                />
                            </div>
                        </div>

                        {/* Right Section */}
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Theme hiện có</h2>
                            <div className="grid grid-cols-3 gap-4">
                                {[...Array(6)].map((_, index) => (
                                    <div key={index} className="bg-blue-100 h-28 rounded-lg flex items-center justify-center">
                                        Lorem ipsum dolor sit
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Buttons (inside the white box, aligned right) */}
                    <div className="flex justify-end space-x-4 mt-6">
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
        </div>
    );
};

export default ConfigPage;
