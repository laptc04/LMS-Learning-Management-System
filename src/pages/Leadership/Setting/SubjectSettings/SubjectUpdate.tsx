import { useEffect, useState } from 'react';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import apiInstance from '../../../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { showToast } from '../../../../components/Toasted';

export default function SubjectUpdate() {
    const { id } = useParams();
    const [subjectType, setSubjectType] = useState('');
    const [userGroup, setUserGroup] = useState('');
    const [isActive, setIsActive] = useState(true);
    const navigate = useNavigate();

    const [classTypeDetail, setClassTypeDetail] = useState<any>(null);

    useEffect(() => {
        const fetchClassTypeById = async () => {
            try {
                const response = await apiInstance.get(`api/subjecttype/${id}`); // truyền id vào đây
                setClassTypeDetail(response.data.data);
                console.log("Chi tiết loại môn học:", response.data.data);
            } catch (error) {
                console.error("Lỗi khi gọi API lấy chi tiết môn học:", error);
            }
        };

        if (id) {
            fetchClassTypeById();
        }
    }, [id]);

    useEffect(() => {
        if (classTypeDetail) {
            setSubjectType(classTypeDetail.name || '');
            setUserGroup(classTypeDetail.note || '');
            setIsActive(classTypeDetail.status ?? true);
        }
    }, [classTypeDetail]);


    const handleSave = async () => {
        try {
            const payload = {
                id: classTypeDetail?.id, // giữ nguyên ID
                name: subjectType || classTypeDetail?.name,
                status: isActive,
                note: userGroup || classTypeDetail?.note,
            };

            const response = await apiInstance.put(`api/subjecttype`, payload);

            console.log('✅ Cập nhật thành công:', response.data);
            showToast(response.data.message || 'Cập nhật thành công!', 'success');
            navigate('/leadership/setting/subject-setting/');
        } catch (error) {
            console.error('❌ Lỗi khi cập nhật môn học:', error);
            showToast('Có lỗi xảy ra khi cập nhật!', 'error');
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-full">
                <h2 className="text-xl font-semibold text-center mb-4">Thiết lập môn học</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 mt-2 mb-2">Loại môn học</label>
                    <Input
                        type="text"
                        border="grey"
                        size="full"
                        value={subjectType}
                        onChange={(e) => setSubjectType(e.target.value)}
                        placeholder="Nhập loại môn học"
                    />
                </div>

                <div className="mb-4 flex items-center">
                    <label className="text-gray-700 mr-2">Trạng thái:</label>
                    <input
                        type="checkbox"
                        className="toggle-checkbox hidden"
                        checked={isActive}
                        onChange={() => setIsActive(!isActive)}
                    />
                    <div
                        className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${isActive ? 'bg-blue-500' : 'bg-gray-400'
                            }`}
                        onClick={() => setIsActive(!isActive)}
                    >
                        <div
                            className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ${isActive ? 'translate-x-6' : ''
                                }`}
                        ></div>
                    </div>
                    <span className="ml-2 text-gray-700">{isActive ? 'Đang hoạt động' : 'Không hoạt động'}</span>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mt-2 mb-2">Ghi chú</label>
                    <Input
                        type="text"
                        value={userGroup}
                        onChange={(e) => setUserGroup(e.target.value)}
                        placeholder="Ghi chú"
                        border="grey"
                        size="full"
                    />
                </div>

                <div className="flex justify-center space-x-4">
                    <Button
                        label="Hủy"
                        size="medium"
                        variant="solid"
                        backgroundColor="grey"
                        textColor="black"
                        onClick={() => navigate('/leadership/setting/class-setting/')}
                    />
                    <Button label="Lưu" size="medium" variant="solid" onClick={handleSave} />
                </div>
            </div>
        </div>
    );
}
