import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../../components/Input';
import Dropdown from '../../../../components/Dropdown';
import apiInstance from '../../../../services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddPoints = () => {
  const navigate = useNavigate();
  const [typePoint, setTypePoint] = useState('');
  const [semester1, setSemester1] = useState('');
  const [semester2, setSemester2] = useState('');
  const [coefficients, setCoefficients] = useState([]);
  const [selectedCoefficient, setSelectedCoefficient] = useState<number | null>(null);

  // Lấy danh sách hệ số từ API
  useEffect(() => {
    const fetchCoefficients = async () => {
      try {
        const response = await apiInstance.get('/api/testexamtype/coefficients');
        if (response.data.status === 0) {
          setCoefficients(response.data.data);
        } else {
          toast.error('Không thể lấy danh sách hệ số!');
        }
      } catch (error) {
        console.error('Lỗi khi lấy hệ số:', error);
        toast.error('Lỗi khi lấy hệ số!');
      }
    };
    fetchCoefficients();
  }, []);

  // Xử lý thêm loại điểm
  const handleSubmit = async () => {
    const nameRegex = /^[A-Za-zÀ-Ỹà-ỹ0-9\s]+$/;
    if (!typePoint || !nameRegex.test(typePoint)) {
      toast.warning('Tên loại điểm không hợp lệ! Vui lòng nhập chữ cái.');
      return;
    }

    if (!semester1 || isNaN(Number(semester1)) || Number(semester1) <= 0) {
      toast.warning('Học kỳ 1 phải là số hợp lệ lớn hơn 0.');
      return;
    }

    if (!semester2 || isNaN(Number(semester2)) || Number(semester2) <= 0) {
      toast.warning('Học kỳ 2 phải là số hợp lệ lớn hơn 0.');
      return;
    }

    if (!selectedCoefficient) {
      toast.warning('Vui lòng chọn hệ số.');
      return;
    }

    const newPointType = {
      pointTypeName: typePoint,
      coefficient: selectedCoefficient,
      minimunEntriesSem1: Number(semester1),
      minimunEntriesSem2: Number(semester2),
    };

    try {
      const response = await apiInstance.post('/api/testexamtype', newPointType);
      if (response.data.status === 0) {
        toast.success('Thêm loại điểm thành công!');
        // Optional: Reset form hoặc điều hướng
        // navigate('/leadership/data-declaration/score-type');
      } else {
        toast.error('Thêm loại điểm thất bại!');
      }
    } catch (error) {
      console.error('Lỗi khi thêm loại điểm:', error);
      toast.error('Lỗi khi thêm loại điểm!');
    }
  };

  const handleCancel = () => {
    navigate('/leadership/data-declaration/score-type');
  };


  return (
    <div className="inset-0 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-[884px]">
        <div className="p-4 border-b">
          <h2 className="text-center text-xl font-semibold text-gray-800">Thêm loại điểm mới</h2>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-3 gap-2 pb-4 border-b border-gray-300">
            <div className="flex items-center col-span-2">
              <label className="pe-3 text-sm font-medium text-gray-700">Tên loại điểm: <span className="text-red-500">*</span></label>
              <Input type="text"
                placeholder="Nhập tên loại điểm" value={typePoint} onChange={(e) => setTypePoint(e.target.value)} size="large"
                border="grey"
                background="white" />
            </div>
            <div className="flex items-center col-span-1">
              <label className="pe-3 text-sm font-medium text-gray-700">Hệ số:</label>
              <Dropdown
                options={[
                  { id: '', value: 'Vui lòng chọn hệ số' }, // Tùy chọn mặc định
                  ...coefficients.map((value) => ({ id: value, value: `Hệ số ${value}` })),
                ]}
                onChange={(option) => {
                  const coefficient = Number(option.id);
                  setSelectedCoefficient(isNaN(coefficient) ? null : coefficient);
                }}
              />
            </div>

          </div>

          {/* Số cột điểm tối thiểu */}
          <h3 className="mt-6 text-orange-600 font-semibold mb-3">Số cột điểm tối thiểu</h3>
          <div className="flex gap-4 mt-2">
            <div className="flex-1 flex items-center gap-2">
              <label className="text-sm font-medium whitespace-nowrap">Học kì I:</label>
              <Input
                type="number"
                placeholder="Nhập số"
                value={semester1}
                onChange={(e) => setSemester1(e.target.value)}
                size="small"
                border="grey"
                background="white"
              />
            </div>
            <div className="flex-1 flex items-center gap-2">
              <label className="text-sm font-medium whitespace-nowrap">Học kì II:</label>
              <Input
                type="number"
                placeholder="Nhập số"
                value={semester2}
                onChange={(e) => setSemester2(e.target.value)}
                size="small"
                border="grey"
                background="white"
              />
            </div>
          </div>
        </div>

        <div className="p-4 rounded-b-xl flex justify-center gap-4 pb-8">
          <button className="px-10 py-2 bg-gray-300 text-gray-700 rounded-lg" onClick={handleCancel}>Hủy</button>
          <button className="px-10 py-2 bg-orange-500 text-white rounded-lg" onClick={handleSubmit}>Lưu</button>
        </div>
      </div>
    </div>
  );
};

export default AddPoints;
