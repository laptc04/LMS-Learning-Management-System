import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaChevronDown, FaEllipsisH } from 'react-icons/fa';

interface Announcement {
  id: string;
  content: string;
  time: string;
  avatar: string;
  isRead: boolean;
}

const ITEMS_PER_PAGE = 20;
const SCROLL_THRESHOLD = 10;

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    { id: '1', content: 'Lorem ipsum đã thích mẹo bình luận của bạn', time: '5 phút trước', avatar: '/icon/u_users-alt-black.png', isRead: true },
    { id: '2', content: 'Lorem ipsum đã nhắn đến bạn trong mẹo bình luận', time: '7 phút trước', avatar: '/icon/u_users-alt-color.png', isRead: false },
    { id: '3', content: 'Lorem ipsum đã nhắn đến bạn trong mẹo bình luận', time: '10 phút trước', avatar: '/icon/u_users-alt-color.png', isRead: true },
    { id: '4', content: 'Lorem ipsum đã thích mẹo bình luận của bạn', time: '1 tiếng trước 04:53', avatar: '/icon/u_users-alt-color.png', isRead: false },
    { id: '5', content: 'Lorem ipsum đã thích mẹo bình luận của bạn', time: '1 ngày trước 15:12', avatar: '/icon/u_users-alt-color.png', isRead: true },
    { id: '6', content: 'Lorem ipsum đã nhắn đến bạn trong mẹo bình luận', time: '2 ngày trước 17:50', avatar: '/icon/u_users-alt-black.png', isRead: false },
    { id: '7', content: 'Lorem ipsum đã thích mẹo bình luận của bạn', time: '26 Th11 11:20', avatar: '/icon/u_users-alt-black.png', isRead: true },
    { id: '8', content: 'Lorem ipsum đã nhắn đến bạn trong mẹo bình luận', time: '26 Th11 16:10', avatar: '/icon/u_users-alt-color.png', isRead: false },
    { id: '9', content: 'Lorem ipsum đã nhắn đến bạn trong mẹo bình luận', time: '25 Th11 08:03', avatar: '/icon/u_users-alt-black.png', isRead: true },
    { id: '10', content: 'Lorem ipsum đã nhắn đến bạn trong mẹo bình luận', time: '25 Th11 10:53', avatar: '/icon/u_users-alt-color.png', isRead: false },
    { id: '11', content: 'Lorem ipsum đã thích mẹo bình luận của bạn', time: '5 phút trước', avatar: '/icon/u_users-alt-black.png', isRead: true },
    { id: '12', content: 'Lorem ipsum đã nhắn đến bạn trong mẹo bình luận', time: '7 phút trước', avatar: '/icon/u_users-alt-black.png', isRead: false },
    { id: '13', content: 'Lorem ipsum đã nhắn đến bạn trong mẹo bình luận', time: '10 phút trước', avatar: '/icon/u_users-alt-black.png', isRead: true },
    { id: '14', content: 'Lorem ipsum đã thích mẹo bình luận của bạn', time: '1 tiếng trước 04:53', avatar: '/icon/u_users-alt-color.png', isRead: false },
    { id: '15', content: 'Lorem ipsum đã thích mẹo bình luận của bạn', time: '1 ngày trước 15:12', avatar: '/icon/u_users-alt-black.png', isRead: true },
    { id: '16', content: 'Lorem ipsum đã nhắn đến bạn trong mẹo bình luận', time: '2 ngày trước 17:50', avatar: '/icon/u_users-alt-color.png', isRead: false },
    { id: '17', content: 'Lorem ipsum đã thích mẹo bình luận của bạn', time: '26 Th11 11:20', avatar: '/icon/u_users-alt-black.png', isRead: true },
    { id: '18', content: 'Lorem ipsum đã nhắn đến bạn trong mẹo bình luận', time: '26 Th11 16:10', avatar: '/icon/u_users-alt-color.png', isRead: false },
    { id: '19', content: 'Lorem ipsum đã nhắn đến bạn trong mẹo bình luận', time: '25 Th11 08:03', avatar: '/icon/u_users-alt-black.png', isRead: true },
    { id: '20', content: 'Lorem ipsum đã nhắn đến bạn trong mẹo bình luận', time: '25 Th11 10:53', avatar: '/icon/u_users-alt-black.png', isRead: false },
    { id: '21', content: 'Lorem ipsum đã nhắn đến bạn trong mẹo bình luận', time: '2 ngày trước 17:50', avatar: '/icon/u_users-alt-color.png', isRead: true },
    { id: '22', content: 'Lorem ipsum đã thích mẹo bình luận của bạn', time: '26 Th11 11:20', avatar: '/icon/u_users-alt-color.png', isRead: false },
    { id: '23', content: 'Lorem ipsum đã nhắn đến bạn trong mẹo bình luận', time: '26 Th11 16:10', avatar: '/icon/u_users-alt-color.png', isRead: true },
    { id: '24', content: 'Lorem ipsum đã nhắn đến bạn trong mẹo bình luận', time: '25 Th11 08:03', avatar: '/icon/u_users-alt-color.png', isRead: false },
    { id: '25', content: 'Lorem ipsum đã nhắn đến bạn trong mẹo bình luận', time: '25 Th11 10:53', avatar: '/icon/u_users-alt-color.png', isRead: true },
    { id: '26', content: 'Lorem ipsum đã thích mẹo bình luận của bạn', time: '5 phút trước', avatar: '/icon/u_users-alt-color.png', isRead: false },
    { id: '27', content: 'Lorem ipsum đã nhắn đến bạn trong mẹo bình luận', time: '7 phút trước', avatar: '/icon/u_users-alt-black.png', isRead: true },
    { id: '28', content: 'Lorem ipsum đã nhắn đến bạn trong mẹo bình luận', time: '10 phút trước', avatar: '/icon/u_users-alt-black.png', isRead: false },
    { id: '29', content: 'Lorem ipsum đã thích mẹo bình luận của bạn', time: '1 tiếng trước 04:53', avatar: '/icon/u_users-alt-color.png', isRead: true },
    { id: '30', content: 'Lorem ipsum đã thích mẹo bình luận của bạn', time: '1 ngày trước 15:12', avatar: '/icon/u_users-alt-black.png', isRead: false },
  ]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddAnnouncement = (data: { recipient: string; subject: string; content: string }) => {
    console.log('New announcement:', data);
  };
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const allCheckboxRef = useRef<HTMLInputElement>(null);

  const totalPages = Math.ceil(announcements.length / ITEMS_PER_PAGE);

  const getPaginatedAnnouncements = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return announcements.slice(startIndex, endIndex);
  };

  // Hàm đánh dấu đã đọc
  const handleMarkAsRead = () => {
    if (selectedIds.length > 0) {
      setAnnouncements((prevAnnouncements) =>
        prevAnnouncements.map((announcement) =>
          selectedIds.includes(announcement.id)
            ? { ...announcement, isRead: true }
            : announcement
        )
      );
      setSelectedIds([]);
    }
    setIsMoreMenuOpen(false);
  };

  // Hàm đánh dấu chưa đọc
  const handleMarkAsUnread = () => {
    if (selectedIds.length > 0) {
      setAnnouncements((prevAnnouncements) =>
        prevAnnouncements.map((announcement) =>
          selectedIds.includes(announcement.id)
            ? { ...announcement, isRead: false }
            : announcement
        )
      );
      setSelectedIds([]);
    }
    setIsMoreMenuOpen(false);
  };

  const handleCheckboxChange = (id: string) => {
    const updatedSelectedIds = selectedIds.includes(id)
      ? selectedIds.filter((selectedId) => selectedId !== id)
      : [...selectedIds, id];
    setSelectedIds(updatedSelectedIds);
  };

  const areAllSelected = () => {
    const currentAnnouncements = getPaginatedAnnouncements();
    return currentAnnouncements.every((announcement) => selectedIds.includes(announcement.id));
  };

  const areSomeSelected = () => {
    const currentAnnouncements = getPaginatedAnnouncements();
    return selectedIds.length > 0 && !areAllSelected();
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentAnnouncements = getPaginatedAnnouncements();
    if (event.target.checked) {
      setSelectedIds(currentAnnouncements.map((announcement) => announcement.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleModalSelect = (option: 'all' | 'read' | 'unread') => {
    const currentAnnouncements = getPaginatedAnnouncements();
    switch (option) {
      case 'all':
        setSelectedIds(currentAnnouncements.map((announcement) => announcement.id));
        break;
      case 'read':
        setSelectedIds(currentAnnouncements.filter((announcement) => announcement.isRead).map((announcement) => announcement.id));
        break;
      case 'unread':
        setSelectedIds(currentAnnouncements.filter((announcement) => !announcement.isRead).map((announcement) => announcement.id));
        break;
    }
    setIsModalOpen(false);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setSelectedIds([]);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setSelectedIds([]);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    setSelectedIds([]);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  useEffect(() => {
    if (allCheckboxRef.current) {
      allCheckboxRef.current.indeterminate = areSomeSelected();
      allCheckboxRef.current.checked = areAllSelected();
    }
  }, [selectedIds]);

  return (
    <div className="p-5">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center p-4 border-b border-gray-200">
          <div className="flex items-center mr-5 relative">
            <input ref={allCheckboxRef} type="checkbox" onChange={handleSelectAll}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-0 focus:ring-offset-0" />
            <FaChevronDown className="ml-2 text-gray-400 cursor-pointer" onClick={() => setIsModalOpen(!isModalOpen)} />
            {isModalOpen && (
              <div className="absolute top-full left-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <button onClick={() => handleModalSelect('all')} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Tất cả
                </button>
                <button onClick={() => handleModalSelect('read')} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Đã đọc
                </button>
                <button onClick={() => handleModalSelect('unread')} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Chưa đọc
                </button>
              </div>
            )}
          </div>
          <div className="relative flex-grow flex items-center">
            <input type="text" placeholder="Tìm kiếm"
              className="px-3 py-2 text-sm font-normal rounded-3xl w-3/12 pl-10 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-100 italic" />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <FaSearch className="text-gray-400" />
            </div>
            {/* Nút More */}
            <div className="relative ml-auto">
              <FaEllipsisH className="text-gray-400 cursor-pointer text-xl" onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)} />
              {isMoreMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button onClick={handleMarkAsRead} disabled={selectedIds.length === 0} className={`w-full text-left px-4 py-2 text-sm
                   ${selectedIds.length === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'
                    }`}>
                    Đánh dấu đã đọc
                  </button>
                  <button onClick={handleMarkAsUnread} disabled={selectedIds.length === 0} className={`w-full text-left px-4 py-2 text-sm 
                  ${selectedIds.length === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'
                    }`}>
                    Đánh dấu chưa đọc
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <ul className="divide-y divide-gray-200"
          style={{ maxHeight: `${SCROLL_THRESHOLD * 4.5}rem`, overflowY: getPaginatedAnnouncements().length > SCROLL_THRESHOLD ? 'auto' : 'hidden', }}>
          {getPaginatedAnnouncements().map((announcement) => (
            <li key={announcement.id} className="flex items-center p-4 hover:bg-gray-50 transition-colors duration-200">
              <input type="checkbox" checked={selectedIds.includes(announcement.id)} onChange={() => handleCheckboxChange(announcement.id)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-0 focus:ring-offset-0 mr-4" />
              <img src={announcement.avatar} alt="Avatar" className="w-10 h-10 rounded-full mr-4" />
              <div className={`flex-grow text-base text-gray-800 ${!announcement.isRead ? 'font-bold' : ''}`} >
                {announcement.content}
              </div>
              <div className="text-gray-500 text-sm">{announcement.time}</div>
            </li>
          ))}
        </ul>

        {/* Pagination */}
        <div className="flex justify-center items-center p-4 border-t border-gray-200">
          <button onClick={handlePrevious} disabled={currentPage === 1}
            className={`px-3 py-1 mx-1 rounded-lg ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}>
            {'<'}
          </button>
          {getPageNumbers().map((page) => (
            <button key={page} onClick={() => handlePageClick(page)}
              className={`px-3 py-1 mx-1 rounded-lg ${currentPage === page ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
              {page}
            </button>
          ))}
          <button onClick={handleNext} disabled={currentPage === totalPages}
            className={`px-3 py-1 mx-1 rounded-lg ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}>
            {'>'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Announcements;