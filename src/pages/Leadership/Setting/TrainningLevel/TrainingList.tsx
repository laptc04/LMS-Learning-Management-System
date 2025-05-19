import React, { useState } from 'react';
import { FaSearch, FaEdit, FaTrashAlt, FaSort } from 'react-icons/fa';
import Input from '../../../../components/Input';
import HeaderSection from '../component/HeaderSection';

const classData = [
    { type: 'THCS', status: 'Đã vô hiệu hóa', note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam malesuada posuere justo.' },
    { type: 'THPT', status: 'Đang hoạt động', note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { type: 'THCS', status: 'Đang hoạt động', note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam malesuada posuere justo.' },
    { type: 'THPT', status: 'Đang hoạt động', note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam malesuada posuere justo.' },
    { type: 'Tiểu học', status: 'Đang hoạt động', note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam malesuada posuere justo.' },
    { type: 'Đại học', status: 'Đang hoạt động', note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam malesuada posuere justo.' },
    { type: 'Đại học', status: 'Đang hoạt động', note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { type: 'Cao đẳng', status: 'Đang hoạt động', note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
];

function TrainingSetting() {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);

    const filteredTrain = classData.filter((c) => c.type.toLowerCase().includes(search.toLowerCase()));
    const totalPages = Math.ceil(filteredTrain.length / itemsPerPage);
    const displayedTrain = filteredTrain.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="p-6 bg-white shadow-lg rounded-xl border w-full mx-auto">
            {/* Search Bar */}
            <HeaderSection title='Quản lý các bậc đào tạo' addButtonLink='/leadership/setting/train-setting/training-setup' />

            <div className="relative mb-4 flex justify-between items-center">
                <h2 className="font-bold">Danh mục các bậc đào tạo</h2>
                <Input
                    type="search"
                    placeholder="Tìm kiếm..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    icon={<FaSearch />}
                    background='light grey'
                    size="medium"
                    borderRadius="16px"
                />
            </div>

            {/* Table */}
            <div className="border rounded-lg overflow-hidden">
                <table className="w-full border-collapse">
                    <thead className="bg-orange-500 text-white">
                        <tr>
                            <th className="px-4 py-2 text-left w-[150px]">
                                <div className="flex items-center">
                                    <span className="me-2">Trình độ</span>
                                    <FaSort />
                                </div>
                            </th>
                            <th className="py-2 px-4 text-left">Trạng thái</th>
                            <th className="py-2 px-4 text-left">Ghi chú</th>
                            <th className="py-2 px-4 text-right"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedTrain.map((c, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                <td className="py-3 px-4">{c.type}</td>
                                <td className={`py-3 px-4 italic ${c.status === 'Đã vô hiệu hóa' ? 'text-red-600' : 'text-blue-500'}`}>{c.status}</td>
                                <td className="py-3 px-4 truncate">{c.note}</td>
                                <td className="py-3 px-4 text-right space-x-2">
                                    <button className="text-orange-500 hover:text-orange-700 transition">
                                        <FaEdit size={18} />
                                    </button>
                                    <button className="text-red-500 hover:text-red-700 transition">
                                        <FaTrashAlt size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
                <div>
                    Hiển thị
                    <input
                        type="number"
                        value={itemsPerPage}
                        onChange={(e) => setItemsPerPage(Math.min(Number(e.target.value) || 1, 8))}
                        className="p-2 mx-2 border rounded w-16 text-center"
                    />
                    hàng trong mỗi trang
                </div>
                <div className="flex space-x-2">
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
        </div>
    );
}

export default TrainingSetting;
