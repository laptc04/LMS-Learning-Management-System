import React, { useState } from 'react';
import { FaSearch, FaSort, FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import Input from '../../../../components/Input';
import Dropdown from '../../../../components/Dropdown';
import Button from '../../../../components/Button';
import { useNavigate } from 'react-router';


const UserGroup = () => {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const [pageNumber, setPageNumber] = useState(8);

    const [currentPage, setCurrentPage] = useState(1);

    const [groups, setGroups] = useState([
        { id: 1, name: 'Quản trị viên', members: 6, notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam malesuada posuere justo.' },
        { id: 2, name: 'Phụ huynh', members: 7, notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam malesuada posuere justo.' },
        { id: 3, name: 'Học sinh tiểu học', members: 8, notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam malesuada posuere justo.' },
        { id: 4, name: 'Nhân viên', members: 5, notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam malesuada posuere justo.' },
        { id: 5, name: 'Group 5', members: 4, notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam malesuada posuere justo.' },
        { id: 6, name: 'Group 6', members: 9, notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam malesuada posuere justo.' },
        { id: 7, name: 'Group 7', members: 3, notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam malesuada posuere justo.' },
        { id: 8, name: 'Group 8', members: 2, notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam malesuada posuere justo.' },
    ]);
    const [users, setUsers] = useState([
        { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@example.com', group: 'Quản trị viên', status: 'Inactive' },
        { id: 2, name: 'Trần Thị B', email: 'tranthib@example.com', group: 'Phụ huynh', status: 'Active' },
        { id: 3, name: 'Lê Văn C', email: 'levanc@example.com', group: 'Học sinh tiểu học', status: 'Active' },
        { id: 4, name: 'Phạm Thị D', email: 'phamthid@example.com', group: 'Nhân viên', status: 'Active' },
        { id: 5, name: 'Hoàng Văn E', email: 'hoangvane@example.com', group: 'Group 5', status: 'Active' },
        { id: 6, name: 'Đặng Thị F', email: 'dangthif@example.com', group: 'Group 6', status: 'Active' },
        { id: 7, name: 'Bùi Văn G', email: 'buivang@example.com', group: 'Group 7', status: 'Active' },
        { id: 8, name: 'Đỗ Thị H', email: 'dothih@example.com', group: 'Group 8', status: 'Active' },
    ]);

    const filteredData = groups.filter((item) => item.name.toLowerCase().includes(keyword.toLowerCase()));

    const totalPages = Math.ceil(filteredData.length / pageNumber);

    const paginatedData = filteredData.slice((currentPage - 1) * pageNumber, currentPage * pageNumber);

    const filteredDataUser = users.filter((item) => item.name.toLowerCase().includes(keyword.toLowerCase()));

    const totalPageUser = Math.ceil(filteredDataUser.length / pageNumber);

    const paginatedDataUser = filteredDataUser.slice((currentPage - 1) * pageNumber, currentPage * pageNumber);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleDelete = () => {
        if (deleteId) {
            setGroups(groups.filter((type) => type.id !== deleteId));
            setDeleteId(null);
        }
    };

    const AcademicOptions = [
        { id: 1, value: 'Học kì 1' },
        { id: 2, value: 'Học kì 2' },
    ];
    const ClassOptions = [
        { id: 1, value: 'Khối A' },
        { id: 2, value: 'Khối B' },
    ];
    const [activeTab, setActiveTab] = useState("Nhóm người dùng");
    return (
        <div>
            <div className="bg-white p-4 rounded-lg shadow-md">
                {/* Tiêu đề */}
                <h1 className="text-2xl font-bold text-gray-900 mb-3">Người dùng hệ thống</h1>

                {/* Hàng thứ hai: Dropdowns, Tabs, Nút Thêm mới */}
                <div className="flex items-center gap-4">
                    {/* Dropdowns */}
                    <div className="relative">
                        <Dropdown options={AcademicOptions} />
                    </div>
                    <div className="relative">
                        <Dropdown options={ClassOptions} />
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center bg-gray-100 p-1 rounded-full">
                        <button
                            className={`px-4 py-2 text-sm font-medium rounded-full ${activeTab === "Nhóm người dùng" ? "bg-gray-800 text-white" : "text-gray-400"
                                }`}
                            onClick={() => setActiveTab("Nhóm người dùng")}
                        >
                            Nhóm người dùng
                        </button>
                        <button
                            className={`px-4 py-2 text-sm font-medium rounded-full ${activeTab === "Danh sách người dùng" ? "bg-gray-800 text-white" : "text-gray-400"
                                }`}
                            onClick={() => setActiveTab("Danh sách người dùng")}
                        >
                            Danh sách người dùng
                        </button>
                    </div>
                    {/* Nút Thêm mới (đẩy sang phải bằng ml-auto) */}
                    <div className="ml-auto flex items-center gap-2 px-4 py-2 ">
                        <Button
                            label="Thêm"
                            textColor="white"
                            backgroundColor="#FF7506"
                            size="medium"
                            variant="none"
                            onClick={() => navigate('/leadership/setting/user-group-setting/set-up-user-group')}
                            icon={<FaPlus />}
                        />
                    </div>
                </div>
            </div>


            <div className="bg-gray-100 min-h-screen  p-6">
                {activeTab === "Nhóm người dùng" && (
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-8xl p-6 mt-3">
                        {/* Phần tiêu đề */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Danh sách các nhóm người dùng</h2>
                            <Input
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                background="light grey"
                                borderRadius="24px"
                                icon={<FaSearch />}
                                placeholder="Tìm kiếm"
                            />
                        </div>

                        {/* Bảng dữ liệu */}
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto border-collapse">
                                <thead>
                                    <tr className="bg-orange-500 text-white text-sm font-semibold">
                                        <th className="px-4 py-2 text-left w-[150px]">
                                            <div className="flex items-center">
                                                <span className="me-2">Tên nhóm</span>
                                                <FaSort />
                                            </div>
                                        </th>
                                        <th className="px-4 py-2 text-center w-[200px]">
                                            <div className="flex items-center">
                                                <span className="me-2">Tổng số thành viên</span>
                                                <FaSort />
                                            </div>
                                        </th>
                                        <th className="px-4 py-2 text-left">Ghi chú</th>
                                        <th className="px-4 py-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedData.length > 0 ? (
                                        paginatedData.map((group, index) => (
                                            <tr key={index} className="odd:bg-white even:bg-gray-200">
                                                <td className="px-4 py-4 text-gray-700 text-sm">{group.name}</td>
                                                <td className="px-4 py-4 text-center text-gray-700 text-sm">{group.members}</td>
                                                <td className="px-4 py-4 text-gray-500 text-sm">{group.notes}</td>
                                                <td className="px-4 py-4 flex justify-end space-x-2">
                                                    <button className="text-blue-500 hover:text-blue-700">
                                                        <FaEdit style={styles.action__icon} />
                                                    </button>
                                                    <button onClick={() => setDeleteId(group.id)} className="text-red-500 hover:text-red-700 ml-3">
                                                        <FaTrashAlt style={styles.action__icon} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr className="text-center">
                                            <td colSpan={5} className="p-3">Không có dữ liệu</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Phân trang */}
                        {paginatedData.length > 0 && (
                            <div className="flex justify-between items-center mt-5">
                                <div>
                                    Hiển thị
                                    <input
                                        type="number"
                                        value={pageNumber}
                                        onChange={(e) => setPageNumber(Math.min(Number(e.target.value) || 1, 8))}
                                        className="p-2 rounded-md mx-2 border"
                                        style={{ width: "60px" }}
                                    />
                                    hàng trong mỗi trang
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                                        &#10094;
                                    </button>
                                    {[...Array(totalPages)].map((_, i) =>
                                        i < 2 || i > totalPages - 3 || Math.abs(i + 1 - currentPage) < 2 ? (
                                            <button
                                                key={i}
                                                onClick={() => setCurrentPage(i + 1)}
                                                className={`px-3 py-1 ${currentPage === i + 1 ? "bg-orange-500 text-white" : "text-gray-600 hover:bg-gray-200"
                                                    } rounded-full`}
                                            >
                                                {i + 1}
                                            </button>
                                        ) : (i === 2 && currentPage > 3) || (i === totalPages - 3 && currentPage < totalPages - 2) ? (
                                            <span key={i} className="px-3">...</span>
                                        ) : null
                                    )}
                                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                                        &#10095;
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Modal xác nhận xóa */}
                        {deleteId && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white p-6 rounded-lg shadow-lg" style={{ width: 435 }}>
                                    <h3 className="text-2xl font-bold text-center">Xóa nhóm người dùng</h3>
                                    <p className="text-base mt-5 mb-10 font-normal">
                                        Xác nhận muốn xoá nhóm người dùng này? Sau khi xoá sẽ không thể hoàn tác.
                                    </p>
                                    <div className="flex justify-between w-full px-4 font-bold">
                                        <button
                                            onClick={() => setDeleteId(null)}
                                            className="px-4 py-2 rounded-lg w-40 h-14 text-lg"
                                            style={{ backgroundColor: "#F2F2F2" }}
                                        >
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
                )}

                {activeTab === "Danh sách người dùng" && (
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-8xl p-6">
                        {/* Phần tiêu đề */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Danh sách người dùng trên hệ thống</h2>
                            <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} background='light grey' borderRadius='24px' icon={<FaSearch />} placeholder='Tìm kiếm' />
                        </div>

                        {/* Bảng dữ liệu */}
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto border-collapse">
                                <thead>
                                    <tr className="bg-orange-500 text-white text-sm font-semibold">
                                        <th className="px-4 py-2 text-left w-[200px]">
                                            <div className='flex items-center'>
                                                <span className='me-2'>Tên</span>
                                                <FaSort />
                                            </div>
                                        </th>
                                        <th className="px-4 py-2 text-left w-[200px]">
                                            <div className='flex items-center'>
                                                <span className='me-2'>Email</span>
                                                <FaSort />
                                            </div>
                                        </th>
                                        <th className="px-4 py-2 text-left w-[200px]">
                                            <div className='flex items-center'>
                                                <span className='me-2'>Nhóm</span>
                                                <FaSort />
                                            </div>
                                        </th>
                                        <th className="px-4 py-2 text-center w-[200px]">
                                            <div className='flex items-center'>
                                                <span className='me-2'>Trạng thái</span>
                                                <FaSort />
                                            </div>
                                        </th>
                                        <th className="px-4 py-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedDataUser.length > 0 ? (
                                        paginatedDataUser.map((user, index) => (
                                            <tr key={index} className="odd:bg-white even:bg-gray-200">
                                                <td className="px-4 py-4 text-gray-700 text-sm">{user.name}</td>
                                                <td className="px-4 py-4 text-gray-700 text-sm">{user.email}</td>
                                                <td className="px-4 py-4 text-gray-700 text-sm">{user.group}</td>
                                                <td className="px-4 py-4 text-sm">
                                                    <span className='text-gray-400 italic text-sm'>{user.status === 'Active' ? 'Đang hoạt động' : 'Đã vô hiệu hóa'}</span>
                                                </td>
                                                <td className="px-4 py-4 flex justify-end space-x-2">
                                                    <button className="text-blue-500 hover:text-blue-700">
                                                        <FaEdit style={styles.action__icon} />
                                                    </button>
                                                    <button onClick={() => setDeleteId(user.id)} className="text-red-500 hover:text-red-700 ml-3">
                                                        <FaTrashAlt style={styles.action__icon} />
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
                        {paginatedDataUser.length > 0 ? (
                            <div className="flex justify-between items-center mt-5">
                                <div>
                                    Hiển thị
                                    <input
                                        type="number"
                                        value={pageNumber}
                                        onChange={(e) => setPageNumber(Math.min(Number(e.target.value) || 1, 8))}
                                        className="p-2 rounded-md mx-2 border"
                                        style={{ width: '60px' }}
                                    />
                                    hàng trong mỗi trang
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                                        &#10094;
                                    </button>
                                    {[...Array(totalPages)].map((_, i) =>
                                        i < 2 || i > totalPages - 3 || Math.abs(i + 1 - currentPage) < 2 ? (
                                            <button
                                                key={i}
                                                onClick={() => setCurrentPage(i + 1)}
                                                className={`px-3 py-1 ${currentPage === i + 1 ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-200'} rounded-full`}
                                            >
                                                {i + 1}
                                            </button>
                                        ) : (i === 2 && currentPage > 3) || (i === totalPages - 3 && currentPage < totalPages - 2) ? (
                                            <span key={i} className="px-3">
                                                ...
                                            </span>
                                        ) : null,
                                    )}
                                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                                        &#10095;
                                    </button>
                                </div>
                            </div>
                        ) : (
                            ''
                        )}

                        {deleteId && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white p-6 rounded-lg shadow-lg" style={{ width: 435 }}>
                                    <h3 className="text-2xl font-bold text-center">Xóa người dùng</h3>
                                    <p className="text-base mt-5 mb-10 font-normal">Xác nhận muốn xoá người dùng này? Sau khi xoá sẽ không thể hoàn tác.</p>
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
                )}

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

export default UserGroup;