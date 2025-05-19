import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaSearch, FaTrashAlt, FaSort } from 'react-icons/fa';
import Input from '../../../../components/Input';
import apiInstance from '../../../../services/api/index';


interface ScoreType {
  id: number;
  pointTypeName: string;
  coefficient: number;
  minimunEntriesSem1: number;
  minimunEntriesSem2: number;
}

const TableScoreType: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [scoreTypes, setScoreTypes] = useState<ScoreType[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScoreTypes = async () => {
      setLoading(true);
      try {
        const response = await apiInstance.get(`/api/testexamtype?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        console.log('Dữ liệu từ API:', response.data);

        if (response.data?.status === 0) {
          const { items = [], totalPages = 1 } = response.data.data;
          setScoreTypes(items);
          setTotalPages(totalPages);
        }
      } catch (error) {
        console.error('Lỗi khi tải loại điểm:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchScoreTypes();
  }, [pageNumber, pageSize]);

  const filteredData = scoreTypes.filter((item) =>
    item.pointTypeName.toLowerCase().includes(keyword.toLowerCase())
  );

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await apiInstance.delete(`/api/testexamtype/${deleteId}`);
        setScoreTypes(scoreTypes.filter((type) => type.id !== deleteId));
        alert('Xóa loại điểm thành công!');
      } catch (error) {
        console.error('Lỗi khi xóa loại điểm:', error);
      }
      setDeleteId(null);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Loại điểm</h2>
        <Input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Tìm kiếm"
          icon={<FaSearch />}
          borderRadius="24px"
        />
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-center py-4">Đang tải dữ liệu...</p>
      ) : (
        <table className="w-full border-collapse shadow-sm rounded-lg overflow-hidden">
          <thead>
            <tr className="text-white" style={{ background: 'linear-gradient(to right, #F17F21, #FF5400)' }}>
              <th className="px-6 text-lg align-middle text-left w-[170px]" rowSpan={2}>
                <div className="inline-flex items-center gap-2 text-sm">
                  Loại điểm <FaSort className="cursor-pointer" />
                </div>
              </th>
              <th className="px-4 text-lg align-middle text-center" rowSpan={2}>
                <div className="inline-flex items-center gap-2 text-sm">
                  Hệ số <FaSort className="cursor-pointer" />
                </div>
              </th>
              <th className="px-4 py-2 text-center text-lg border text-sm" colSpan={2}>
                Số cột điểm tối thiểu
              </th>
              <th className="px-4 text-center text-lg align-middle"></th>
            </tr>
            <tr className="text-white" style={{ background: 'linear-gradient(to right, #F17F21, #FF5400)' }}>
              <th className="px-4 py-2 text-center text-lg border text-sm">Học kì 1</th>
              <th className="px-4 py-2 text-center text-lg border text-sm">Học kì 2</th>
              <th className="px-4 text-center text-lg align-middle"></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((type, index) => (
                <tr key={type.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                  <td className="px-6">{type.pointTypeName}</td>
                  <td className="px-4 text-center">{type.coefficient}</td>
                  <td className="px-4 text-center">{type.minimunEntriesSem1}</td>
                  <td className="px-4 text-center">{type.minimunEntriesSem2}</td>
                  <td className="px-4 text-right">
                    <button
                      onClick={() => navigate(`edit/${type.id}`)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit style={styles.action__icon} />
                    </button>
                    <button
                      onClick={() => setDeleteId(type.id)}
                      className="text-red-500 hover:text-red-700 ml-3"
                    >
                      <FaTrashAlt style={styles.action__icon} />
                    </button>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-3">Không có dữ liệu</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-5">
        <div>
          Hiển thị
          <input
            type="number"
            value={pageSize}
            onChange={(e) => setPageSize(Math.min(Number(e.target.value) || 1, 50))}
            className="p-2 rounded-md mx-2 border w-16 text-center"
          />
          hàng trên mỗi trang
        </div>
        <div className="flex items-center space-x-2">
          <button disabled={pageNumber === 1} onClick={() => setPageNumber(pageNumber - 1)} className="px-3 py-1 text-gray-600 hover:bg-gray-200 rounded-full">
            &#10094;
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPageNumber(i + 1)}
              className={`px-3 py-1 ${pageNumber === i + 1 ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-200'} rounded-full`}
            >
              {i + 1}
            </button>
          ))}
          <button disabled={pageNumber === totalPages} onClick={() => setPageNumber(pageNumber + 1)} className="px-3 py-1 text-gray-600 hover:bg-gray-200 rounded-full">
            &#10095;
          </button>
        </div>
      </div>

      {/* Confirm Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-2xl font-bold text-center">Xóa Loại Điểm</h3>
            <p className="text-base mt-5 mb-10">Xác nhận muốn xoá loại điểm này? Sau khi xoá sẽ không thể hoàn tác.</p>
            <div className="flex justify-between">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 rounded-lg w-40 bg-gray-200 text-lg">
                Hủy
              </button>
              <button onClick={handleDelete} className="bg-orange-500 text-white px-4 py-2 rounded-lg w-40 text-lg">
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
const styles = {
  action__icon: {
    fontSize: '20px',
  },
};
export default TableScoreType;
