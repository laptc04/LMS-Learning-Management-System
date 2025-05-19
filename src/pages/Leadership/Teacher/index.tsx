import React, { useEffect, useState } from 'react';
import AddressUrlStack from '../../../components/AddressUrlStack';
import { FaChevronDown, FaPlus, FaSearch } from 'react-icons/fa';
import Trash from '../../../assets/images/fi_trash-2.png';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import DropdownMenu from '../../../components/MenuDropdown';
import { Link } from 'react-router-dom';
import apiInstance from '../../../services/api';
import Eye from '../../../assets/images/eye-icon.png';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import TeacherModal from './Modal';
import Dropdown from '../../../components/Dropdown';
import { useLoading } from '../../../context/loading';

interface TeacherListItem {
  userCode: string;
  fullName: string;
  birthDate: string;
  gender: boolean;
  name: string | null;
  ethnicity: string;
  roleName: string;
  teacherStatusName: string | null;
}

interface TeacherResponse {
  status: number;
  data: {
    items: TeacherListItem[];
    totalPages: number;
  };
  message?: string;
}
interface Option {
  id: string | number;
  value: string;
}
const TeacherList: React.FC = () => {
  const { setLoading } = useLoading();
  const [teacherList, setTeacherList] = useState<TeacherListItem[]>([]);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string | null>(null);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  const [selectedKhoi, setSelectedKhoi] = useState<string>('6');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8); // Use state for PageSize
  const [totalPages, setTotalPages] = useState<number>(0);
  const [selectedUserCode, setSelectedUserCode] = useState<string>('');
  const [academicYears, setAcademicYears] = useState<Option[]>([]);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState<Option | null>(null);
  const getStatusColor = (teacherStatusName: string | null) => {
    let statusColor = '#000'; // Default color

    switch (teacherStatusName) {
      case 'Đang làm việc':
        statusColor = '#49C510'; // Green
        break;
      case 'Đang bảo lưu':
        statusColor = '#FF7506'; // Orange
        break;
      case 'Đã tốt nghiệp':
        statusColor = '#0B80EC'; // Blue
        break;
      case 'Đã chuyển trường':
        statusColor = '#373839'; // Black
        break;
      case 'Rút lui':
        statusColor = '#ED2025'; // Red
        break;
      default:
        statusColor = '#000'; // Fallback to black if statusName is not recognized
        break;
    }

    return statusColor;
  };

  const UrlStack = [
    { name: 'Hồ sơ giảng viên', href: '#' },
    { name: 'Tất cả hồ sơ' },
  ];
  useEffect(() => {
    const fetchAcademicYears = async () => {
      try {
        setLoading(true);
        const response = await apiInstance.get("api/AcademicYear");
        if (response.data.status === 0) {
          const academicYearOptions = response.data.data.items.map((item: any) => ({
            id: item.id,
            value: item.name,
          }));
          setAcademicYears(academicYearOptions);
        } else {
          console.error("Error fetching academic years:", response.data.message);
        }
      } catch (error) {
        console.error("API Error fetching academic years:", error);
      }
      finally {
        setLoading(false);

      }
    };

    fetchAcademicYears();
  }, []);
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await apiInstance.get<TeacherResponse>('api/Teacher/getall', {
          params: {
            academicId: selectedAcademicYear?.id,
            pageNumber: currentPage,
            pageSize: itemsPerPage,
            khoi: selectedKhoi,
            orderBy: true,
            column: 'BirthDate',
          },
        });

        if (response.data.status === 0) {
          setTeacherList(response.data.data.items);
          setTotalPages(response.data.data.totalPages);
        } else {
          console.error('Lỗi:', response.data.message);
        }
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    };

    fetchTeachers();
  }, [currentPage, itemsPerPage, selectedKhoi, selectedAcademicYear]);

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    const updatedRows = teacherList.reduce((acc, teacher) => {
      acc[teacher.userCode] = newSelectAll;
      return acc;
    }, {} as Record<string, boolean>);

    setSelectedRows(updatedRows);
  };

  const handleSelectRow = (userCode: string) => {
    const updated = {
      ...selectedRows,
      [userCode]: !selectedRows[userCode],
    };
    setSelectedRows(updated);
    setSelectAll(Object.values(updated).every(Boolean));
  };

  const handleDeleteClick = (userCode: any) => {
    setShowModal(true);
    setSelectedUserCode(userCode); // Store the userCode to confirm later
  };

  const handleConfirmDelete = () => {
    // Perform delete operation with the selected userCode
    console.log('Deleting user with code:', selectedUserCode);
    setShowModal(false);
  };
  const getMenuOptions = (rowId: string) => [
    {
      key: 'editProfile',
      label: 'Sửa hồ sơ',
      onClick: () => {
        setSelectedRowId(rowId);
        setModalType('editProfile');
      },
    },
    {
      key: 'retirement',
      label: 'Cập nhật nghỉ hưu',
      onClick: () => {
        setSelectedRowId(rowId);
        setModalType('retirement');
      },
    },
    {
      key: 'resignation',
      label: 'Cập nhật nghỉ việc',
      onClick: () => {
        setSelectedRowId(rowId);
        setModalType('resignation');
      },
    },
    {
      key: 'temporaryLeave',
      label: 'Cập nhật tạm nghỉ',
      onClick: () => {
        setSelectedRowId(rowId);
        setModalType('temporaryLeave');
      },
    },
  ];

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('vi-VN');
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to page 1 when changing items per page
  };

  return (
    <div>
      <AddressUrlStack breadcrumbs={UrlStack} />

      <div className="flex justify-between items-center">
        <div className="relative border border-black rounded flex items-center h-7">
          <Dropdown
            options={academicYears}
            width="short"
            onChange={(option: Option) => {
              setSelectedAcademicYear(option);
            }}
          />
        </div>

        <div className="flex items-center">
          <button className="p-1 text-orange-500 hover:bg-orange-50 rounded" onClick={handleDeleteClick}>
            <img src={Trash} alt="trash" className="w-6 h-6" />
          </button>

          <div className="border-l-2 ps-3">
            <Button
              label="Xuất file"
              textColor="#FF7506"
              size="big"
              variant="outline"
              border="0.8px solid"
              backgroundColor="white"
              onClick={() => { }}
            />
          </div>

          <div className="ms-2">
            <Link to="/leadership/teacher/profile/add">
              <Button
                label="Thêm mới"
                icon={<FaPlus />}
                size="big"
                textColor="white"
                variant="outline"
                border="0.8px solid"
                backgroundColor="#FF7506"
                onClick={() => { }}
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="p-10 mt-10 shadow-[0_0_15px_rgba(0,0,0,0.3)] rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-lg font-semibold">Danh sách giảng viên</h4>
          <Input
            icon={<FaSearch color="grey" />}
            value=""
            background="light grey"
            placeholder="Tìm kiếm"
            borderRadius="16px"
          />
        </div>

        <div className="relative overflow-x-auto sm:rounded-lg">
          <table className="w-full text-sm text-left text-white">
            <thead className="text-xs bg-orange-500">
              <tr>
                <th className="px-6 py-3">
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-blue-500"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="px-6 py-3">Mã giảng viên</th>
                <th className="px-6 py-3">Tên giảng viên</th>
                <th className="px-6 py-3">Ngày sinh</th>
                <th className="px-6 py-3">Giới tính</th>
                <th className="px-6 py-3">Tổ - Bộ môn</th>
                <th className="px-6 py-3">Chức vụ</th>
                <th className="px-6 py-3">Tình trạng</th>
                <th className="px-6 py-3">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {teacherList.length === 0 ? (
                <tr>
                  <td className="text-center py-4 text-gray-500">
                    Không có dữ liệu
                  </td>
                </tr>
              ) : (
                teacherList.map((teacher: any) => {
                  const statusColor = getStatusColor(teacher.statusName);

                  return (
                    <tr key={teacher.userCode} className="text-black border-b">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          className="w-5 h-5 accent-blue-500"
                          checked={selectedRows[teacher.userCode] || false}
                          onChange={() => handleSelectRow(teacher.userCode)}
                        />
                      </td>
                      <td className="px-6 py-4">{teacher.userCode}</td>
                      <td className="px-6 py-4">{teacher.fullName}</td>
                      <td className="px-6 py-4">{formatDate(teacher.birthDate)}</td>
                      <td className="px-6 py-4">{teacher.gender ? 'Nam' : 'Nữ'}</td>
                      <td className="px-6 py-4">{teacher.ethnicity}</td>
                      <td className="px-6 py-4">{teacher.roleName}</td>
                      <td className="px-6 py-4">
                        <div
                          className="inline-flex items-center justify-center px-4 py-2 rounded border gap-2 text-[15px] font-medium whitespace-nowrap"
                          style={{ color: statusColor, borderColor: getStatusColor(teacher.teacherStatusName) }}
                        >
                          <span style={{ color: getStatusColor(teacher.teacherStatusName), fontWeight: 500 }}>
                            {teacher.teacherStatusName || 'Không rõ'}
                          </span>
                        </div>

                      </td>

                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {/* View button */}
                          <button className="p-2 text-orange-500 hover:bg-orange-50 rounded flex items-center justify-center w-10 h-10">
                            <img src={Eye} alt="Xem" className="w-6 h-6" />
                          </button>

                          {/* Dropdown button */}
                          <button className="p-2 text-orange-500 hover:bg-orange-50 rounded flex items-center justify-center w-10 h-8">
                            <DropdownMenu rowId={teacher.userCode} options={getMenuOptions(teacher.userCode)} />
                          </button>

                          {/* Delete button */}
                          <button
                            className="p-2 text-orange-500 hover:bg-orange-50 rounded flex items-center justify-center w-10 h-10"
                            onClick={() => handleDeleteClick(teacher.userCode)}
                          >
                            <img src={Trash} alt="Xoá" className="w-6 h-6" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>

          </table>
        </div>
        {selectedRowId && modalType && (
          <TeacherModal
            type={modalType}
            rowId={selectedRowId}
            onClose={() => {
              setSelectedRowId(null);
              setModalType(null);
            }}
          />
        )}
        <div className="flex justify-between mt-6">
          <div className="flex items-center">
            <label htmlFor="pageSize" className="mr-2">Số hàng:</label>
            <input
              type="number"
              id="pageSize"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border border-gray-300 rounded p-1 w-16"
              min={1}
            />
          </div>

          <div className="flex items-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2"
            >
              <ChevronsLeft />
            </button>
            <span className="px-4 py-2">{currentPage}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2"
            >
              <ChevronsRight />
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-2/6">
            <h2 className="text-xl font-bold text-center">Xóa</h2>
            <p className="mt-2">Xác nhận muốn xoá những thông tin đã chọn? Sau khi xoá sẽ không thể hoàn tác.</p>
            <div className="mt-4 flex justify-center gap-4">
              <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setShowModal(false)}>
                Hủy
              </button>
              <button className="px-4 py-2 bg-orange-500 text-white rounded" onClick={handleConfirmDelete}>
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherList;
