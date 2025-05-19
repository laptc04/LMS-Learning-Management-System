import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from '../../../../components/Input';
import Dropdown from '../../../../components/Dropdown';
import Button from '../../../../components/Button';
import { Option } from '../../../../components/Dropdown/type';
import apiInstance from '../../../../services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateScoreType: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [scoreType, setScoreType] = useState('');
  const [coefficient, setCoefficient] = useState<string | null>(null);
  const [semester1, setSemester1] = useState('');
  const [semester2, setSemester2] = useState('');
  const [coefficients, setCoefficients] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoefficients = async () => {
      try {
        const response = await apiInstance.get('/api/testexamtype/coefficients');
        if (response.data.status === 0) {
          const options = response.data.data.map((value: number) => ({
            id: String(value),
            value: `Hệ số ${value}`,
          }));
          setCoefficients([{ id: '', value: 'Vui lòng chọn hệ số' }, ...options]);
        } else {
          toast.error('Không thể tải hệ số!');
        }
      } catch (error) {
        console.error('Lỗi khi lấy hệ số:', error);
        toast.error('Lỗi khi lấy hệ số!');
      }
    };

    fetchCoefficients();
  }, []);

  useEffect(() => {
    const fetchScoreType = async () => {
      try {
        const response = await apiInstance.get(`/api/testexamtype/${id}`);
        if (response.data.status === 0) {
          const { pointTypeName, coefficient, minimunEntriesSem1, minimunEntriesSem2 } = response.data.data;
          setScoreType(pointTypeName);
          setCoefficient(String(coefficient));
          setSemester1(String(minimunEntriesSem1));
          setSemester2(String(minimunEntriesSem2));
        } else {
          toast.error('Không tìm thấy loại điểm!');
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        toast.error('Lỗi khi lấy dữ liệu!');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchScoreType();
  }, [id]);

  const handleSave = async () => {
    if (!scoreType.trim()) {
      toast.warning('Tên loại điểm không được để trống!');
      return;
    }

    const nameRegex = /^[A-Za-zÀ-Ỹà-ỹ0-9\s]+$/;
    if (!nameRegex.test(scoreType.trim())) {
      toast.warning('Tên loại điểm chỉ được chứa chữ cái!');
      return;
    }

    if (!coefficient || isNaN(Number(coefficient)) || Number(coefficient) <= 0) {
      toast.warning('Hệ số phải là một số hợp lệ!');
      return;
    }

    if (!semester1 || isNaN(Number(semester1)) || Number(semester1) <= 0) {
      toast.warning('Học kì I phải là số lớn hơn 0!');
      return;
    }

    if (!semester2 || isNaN(Number(semester2)) || Number(semester2) <= 0) {
      toast.warning('Học kì II phải là số lớn hơn 0!');
      return;
    }

    const updatedScoreType = {
      id: Number(id),
      pointTypeName: scoreType.trim(),
      coefficient: Number(coefficient),
      minimunEntriesSem1: Number(semester1),
      minimunEntriesSem2: Number(semester2),
    };

    try {
      const response = await apiInstance.put('/api/testexamtype', updatedScoreType);
      if (response.data.status === 0) {
        toast.success('Cập nhật loại điểm thành công!');
        navigate('/leadership/data-declaration/score-type');
      } else {
        toast.error('Cập nhật loại điểm thất bại!');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật loại điểm:', error);
      toast.error('Lỗi khi cập nhật loại điểm!');
    }
  };

  const handleCancel = () => {
    navigate('/leadership/data-declaration/score-type');
  };

  if (loading) {
    return <div className="text-center mt-10">Đang tải dữ liệu...</div>;
  }


  return (
    <div className="w-full min-h-screen py-8 px-6 mt-8">
      <div className="bg-white p-6 rounded-lg shadow-lg w-700 max-w-2xl mx-auto">
        <h2 className="text-center text-lg font-semibold mb-5">Chỉnh Sửa Loại Điểm</h2>

        {/* Tên loại điểm & Hệ số */}
        <div className="flex items-center gap-8 mb-6">
          <div className="w-1/2 flex items-center gap-2">
            <label className="text-sm font-medium whitespace-nowrap">
              Tên loại điểm: <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Nhập tên loại điểm"
              value={scoreType}
              onChange={(e) => setScoreType(e.target.value)}
              size="large"
              border="grey"
              background="white"
            />
          </div>

          <div className="w-1/2 flex items-center gap-2">
            <label className="text-sm font-medium whitespace-nowrap">Hệ số:</label>
            <Dropdown
              options={coefficients}
              selectedId={coefficient}
              onChange={(option) => setCoefficient(String(option.id))}
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

        {/* Buttons */}
        <div className="flex justify-center space-x-4 mt-7 mb-3">
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
  );
};

export default UpdateScoreType;
