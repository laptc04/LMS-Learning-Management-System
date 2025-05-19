import { useState, useEffect } from 'react';
import Input from '../../../../components/Input';
import { FaEdit, FaSearch, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import apiInstance from '../../../../services/api';
import { showToast } from '../../../../components/Toasted';

interface SchoolYear {
  id: string;
  schoolYear: string;
  timeStart: string;
  timeEnd: string;
}

const TableSchool = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);
  const [schoolYear, setSchoolYear] = useState<SchoolYear[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const endpoint = keyword
          ? `/api/AcademicYear/search?year=${keyword}`
          : `/api/AcademicYear?pageNumber=1&pageSize=30`;

        const response = await apiInstance.get(endpoint);
        const items = response.data?.data?.items || [];

        const formattedData = items.map((item: any) => ({
          id: item.id.toString(),
          schoolYear: item.name,
          timeStart: item.startDate,
          timeEnd: item.endDate,
        }));

        setSchoolYear(formattedData);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [keyword]);

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await apiInstance.delete(`/api/AcademicYear`, {
          data: { ids: [deleteId] },
        });

        setSchoolYear(schoolYear.filter((d) => d.id !== deleteId));
        setDeleteId(null);
        showToast("Niên khóa đã xóa thành công", "success");
      } catch (error) {
        console.error("Lỗi khi xóa niên khóa:", error);
        showToast("Lỗi khi xóa niên khóa", "error");
      }
    }
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Niên khóa</h2>
        <Input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Nhập năm để tìm kiếm"
          icon={<FaSearch />}
          borderRadius="24px"
        />
      </div>

      {loading ? (
        <p className="text-center text-lg font-bold">Đang tải dữ liệu...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-orange-500 text-white">
                <th className="p-2 text-center">STT</th>
                <th className="p-2 text-left">Niên khóa</th>
                <th className="p-2 text-left">Thời gian bắt đầu</th>
                <th className="p-2 text-left">Thời gian kết thúc</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {schoolYear.length > 0 ? (
                schoolYear.map((item, index) => (
                  <tr key={item.id} className="border-b odd:bg-white even:bg-gray-200">
                    <td className="p-3 text-sm text-center">{(currentPage - 1) * pageNumber + index + 1}</td>
                    <td className="p-3 text-sm text-left">{item.schoolYear}</td>
                    <td className="p-3 text-sm text-left">{formatDate(item.timeStart)}</td>
                    <td className="p-3 text-sm text-left">{formatDate(item.timeEnd)}</td>
                    <td className="p-3 text-sm text-left">
                      <button onClick={() => navigate(`${item.id}`)} className="text-blue-500 hover:text-blue-700">
                        <FaEdit className="text-lg" />
                      </button>
                      <button onClick={() => setDeleteId(item.id)} className="text-red-500 hover:text-red-700 ml-3">
                        <FaTrashAlt className="text-lg" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="text-center">
                  <td colSpan={5} className="p-3">
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg" style={{ width: 435 }}>
            <h3 className="text-2xl font-bold text-center">Xóa niên khóa</h3>
            <p className="text-base mt-5 mb-10 font-normal">Xác nhận muốn xoá niên khóa này? Sau khi xoá sẽ không thể hoàn tác.</p>
            <div className="flex justify-between w-full px-4 font-bold">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 rounded-lg w-40 h-14 text-lg" style={{ backgroundColor: '#F2F2F2' }}>
                Hủy
              </button>
              <button onClick={handleDelete} className="bg-orange-500 text-white px-4 py-2 rounded-lg w-40 h-14 text-lg">
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableSchool;
