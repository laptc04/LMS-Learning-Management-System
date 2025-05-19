import React from 'react';
import AddressUrlStack from '../../../components/AddressUrlStack';
import { FaChevronDown } from 'react-icons/fa';
import Trash from '../../../assets/images/fi_trash-2.png';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { FaPlus, FaSearch } from 'react-icons/fa';
import Eye from '../../../assets/images/eye-icon.png';
import StatusComponent from '../../../components/Status';
import DropdownMenu from '../../../components/MenuDropdown';
import TeacherModal from './Modal';
import { useState } from 'react';
import { Link } from 'react-router';
const TeacherList = () => {
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState({});
  const UrlStack = [
    {
      name: 'Hồ sơ giảng viên',
      href: '#',
    },
    {
      name: 'Tất cả hồ sơ',
    },
  ];
  const rows = [
    {
      id: 1,
      ma: '2020-6A',
      ten: 'Nguyễn Văn A',
      ngaySinh: '12/02/1998',
      gioiTinh: 'Nam',
      toBoMon: 'Toán',
      chucVu: 'GV',
      tinhTrang: 'Đang giảng dạy',
    },
    { id: 2, ma: '2021-7B', ten: 'Trần Thị B', ngaySinh: '23/04/1995', gioiTinh: 'Nữ', toBoMon: 'Lý', chucVu: 'GV', tinhTrang: 'Đang giảng dạy' },
    { id: 3, ma: '2019-5C', ten: 'Lê Văn C', ngaySinh: '15/08/1992', gioiTinh: 'Nam', toBoMon: 'Hóa', chucVu: 'GV', tinhTrang: 'Nghỉ phép' },
  ];

  // Hàm xử lý khi click vào checkbox trên header
  const handleSelectAll = () => {
    const newState = !selectAll;
    setSelectAll(newState);

    // Cập nhật tất cả checkbox theo trạng thái mới
    const updatedRows = rows.reduce((acc, row) => {
      acc[row.id] = newState;
      return acc;
    }, {});

    setSelectedRows(updatedRows);
  };

  // Hàm xử lý khi click vào checkbox của từng dòng
  const handleSelectRow = (id) => {
    const updatedRows = { ...selectedRows, [id]: !selectedRows[id] };
    setSelectedRows(updatedRows);

    // Kiểm tra nếu tất cả đều được chọn thì cập nhật selectAll
    const allChecked = rows.every((row) => updatedRows[row.id]);
    setSelectAll(allChecked);
  };

  const handleDeleteClick = (id) => {
    setShowModal(true);
  };

  const handleConfirmDelete = (id) => {
    setShowModal(false);
  };

  const getMenuOptions = (rowId) => [
    {
      key: 'editProfile',
      label: 'Sửa hồ sơ',
      onClick: (id) => {
        setSelectedRowId(id);
        setModalType('editProfile');
      },
    },
    {
      key: 'retirement',
      label: 'Cập nhật nghỉ hưu',
      onClick: (id) => {
        setSelectedRowId(id);
        setModalType('retirement');
      },
    },
    {
      key: 'resignation',
      label: 'Cập nhật nghỉ việc',
      onClick: (id) => {
        setSelectedRowId(id);
        setModalType('resignation');
      },
    },
    {
      key: 'resignation',
      label: 'Cập nhật tạm nghĩ',
      onClick: (id) => {
        setSelectedRowId(id);
        setModalType('resignation');
      },
    },
  ];

  return (
    <>
      <div>
        <div>
          <AddressUrlStack breadcrumbs={UrlStack} />
        </div>
        <div className="flex justify-between items-center">
          <div className="">
            <div className="relative border border-black rounded flex items-center h-7">
              <select className="appearance-none bg-transparent pl-3 pr-5 py-1 ">
                <option value="#">2020-2021</option>
                <option value="#">2021-2022</option>
                <option value="#">2022-2023</option>
              </select>
              <div className="w-px bg-black self-stretch"></div>
              <div className="px-2 cursor-pointer">
                <FaChevronDown className="text-orange-500 w-4 h-4" />
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <button className="p-1 text-orange-500 hover:bg-orange-50 rounded" onClick={() => handleDeleteClick(1)}>
              <img src={Trash} alt="" className="w-6 h-6" />
            </button>
            <div className="border-l-2 ps-3">
              <Button label="Xuất file" textColor="#FF7506" variant="outline" border="0.8px solid" backgroundColor="white" />
            </div>
            <div className="ms-2">
              <Link to="/leadership/teacher/profile/add">
                <Button label="Thêm mới" icon={<FaPlus />} textColor="white" variant="outline" border="0.8px solid" backgroundColor="#FF7506" />
              </Link>
            </div>
          </div>
        </div>
        <div className="p-10 mt-10 !shadow-[0_0_15px_rgba(0,0,0,0.3)]  rounded-lg ">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="text-lg font-600">Danh sách giảng viên</h4>
            </div>
            <div className="">
              <Input icon={<FaSearch color="grey" />} background="light grey" placeholder="Tìm kiếm" borderRadius="16px"></Input>
            </div>
          </div>
          <div class="relative overflow-x-auto   sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-white ">
              <thead class="text-xs text-white  bg-gray-50 dark:bg-orange-500 ">
                <tr className="">
                  <th scope="col" class="px-6 py-3">
                    <input type="checkbox" className="w-5 h-5 accent-blue-500" checked={selectAll} onChange={handleSelectAll} />
                  </th>
                  <th scope="col" class="px-6 py-3 ">
                    <div class="flex items-center text-sm">
                      Mã giảng viên
                      <a href="#">
                        <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                        </svg>
                      </a>
                    </div>
                  </th>
                  <th scope="col" class="px-6 py-3">
                    <div class="flex items-center text-sm">
                      Tên giảng viên
                      <a href="#">
                        <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                        </svg>
                      </a>
                    </div>
                  </th>
                  <th scope="col" class="px-6 py-3">
                    <div class="flex items-center text-sm">
                      Ngày sinh
                      <a href="#">
                        <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                        </svg>
                      </a>
                    </div>
                  </th>
                  <th scope="col" class="px-6 py-3">
                    <div class="flex items-center text-sm">
                      Giới tính
                      <a href="#">
                        <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                        </svg>
                      </a>
                    </div>
                  </th>
                  <th scope="col" class="px-6 py-3">
                    <div class="flex items-center text-sm">
                      Tổ - Bộ môn
                      <a href="#">
                        <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                        </svg>
                      </a>
                    </div>
                  </th>
                  <th scope="col" class="px-6 py-3">
                    <div class="flex items-center">
                      Chức vụ
                      <a href="#">
                        <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                        </svg>
                      </a>
                    </div>
                  </th>
                  <th scope="col" class="px-6 py-3">
                    <div class="flex items-center">
                      Tình trạng
                      <a href="#">
                        <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                        </svg>
                      </a>
                    </div>
                  </th>
                  <th scope="col" class="px-6 py-3">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr class=" odd:bg-white even:bg-gray-300 text-black">
                    <th className="px-6 py-2">
                      <input
                        type="checkbox"
                        className="w-5 h-5 accent-blue-500"
                        checked={selectedRows[row.id] || false}
                        onChange={() => handleSelectRow(row.id)}
                      />
                    </th>
                    <td scope="row" class="px-6 py-2 ">
                      {row.ma}
                    </td>
                    <td className="px-6 py-2">{row.ten}</td>
                    <td className="px-6 py-2">{row.ngaySinh}</td>
                    <td className="px-6 py-2">{row.gioiTinh}</td>
                    <td className="px-6 py-2">{row.toBoMon}</td>
                    <td className="px-6 py-2">{row.chucVu}</td>
                    <td className="flex py-2">
                      <StatusComponent status={row.tinhTrang} color="#49C510" />
                    </td>
                    <td class="px-6 py-2 text-right">
                      <div className="flex gap-2">
                        <button className="p-1 text-orange-500 hover:bg-orange-50 rounded">
                          <img src={Eye} alt="" className="w-6 h-5" />
                        </button>
                        <button className="p-1 text-orange-500 hover:bg-orange-50 rounded" onClick={() => {}}>
                          <DropdownMenu rowId={row.id} options={getMenuOptions(row.id)} />
                        </button>
                        <button className="p-1 text-orange-500 hover:bg-orange-50 rounded" onClick={() => handleDeleteClick(1)}>
                          <img src={Trash} alt="" className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

        {/* Modal Confirm Delete */}
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
    </>
  );
};

export default TeacherList;
