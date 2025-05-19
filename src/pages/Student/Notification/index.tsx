import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaChevronDown, FaEllipsisH } from 'react-icons/fa';
import { Announcement } from './type';
import apiInstance from '../../../services/api';
import LoadingSpinner from '../../../components/Loading';
import { showToast } from '../../../components/Toasted';

const ITEMS_PER_PAGE = 10;
const SCROLL_THRESHOLD = 10;

interface ApiNotification {
  id: number;
  subject: string;
  content: string;
  type: string;
  senderName: string;
  createAt: string;
  isRead: boolean;
}

const Announcements = () => {
  const [notificationType, setNotificationType] = useState<'user' | 'system'>('user');
  const [userAnnouncements, setUserAnnouncements] = useState<Announcement[]>([]);
  const [systemAnnouncements, setSystemAnnouncements] = useState<Announcement[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const allCheckboxRef = useRef<HTMLInputElement>(null);

  const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} giây trước`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} phút trước`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
    return `${Math.floor(diffInSeconds / 86400)} ngày trước`;
  };

  const fetchAnnouncements = async (page: number) => {
    setLoading(true);
    try {
      const response = await apiInstance.get(`api/Notifications?pageNumber=${page}&pageSize=${ITEMS_PER_PAGE}`);
      const apiData = response.data.data;

      const mappedAnnouncements: Announcement[] = apiData.map((item: ApiNotification) => ({
        id: item.id.toString(),
        content: item.content,
        time: formatTimeAgo(item.createAt),
        avatar: item.type === 'User' ? '/icon/u_users-alt-color.png' : '/icon/u_users-alt-black.png',
        isRead: item.isRead,
      }));

      const userNotifs = mappedAnnouncements.filter((item) => item.avatar === '/icon/u_users-alt-color.png');
      const systemNotifs = mappedAnnouncements.filter((item) => item.avatar === '/icon/u_users-alt-black.png');

      setUserAnnouncements(userNotifs);
      setSystemAnnouncements(systemNotifs);

      const activeAnnouncements = notificationType === 'user' ? userNotifs : systemNotifs;
      setTotalPages(Math.ceil(activeAnnouncements.length / ITEMS_PER_PAGE));
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Không thể lấy dữ liệu thông báo";
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (ids: string[]) => {
    setLoading(true);
    try {
      const numericIds = ids.map(id => parseInt(id));
      await apiInstance.put('api/Notifications/mark-read-multiple/user', { ids: numericIds });
      const updatedUserAnnouncements = userAnnouncements.map((announcement) =>
        ids.includes(announcement.id) ? { ...announcement, isRead: true } : announcement
      );
      const updatedSystemAnnouncements = systemAnnouncements.map((announcement) =>
        ids.includes(announcement.id) ? { ...announcement, isRead: true } : announcement
      );
      setUserAnnouncements(updatedUserAnnouncements);
      setSystemAnnouncements(updatedSystemAnnouncements);
      setSelectedIds([]);
      showToast("Đánh dấu đã đọc thành công!", "success");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Không thể đánh dấu đã đọc";
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const markAsUnread = async (ids: string[]) => {
    setLoading(true);
    try {
      const updatedUserAnnouncements = userAnnouncements.map((announcement) =>
        ids.includes(announcement.id) ? { ...announcement, isRead: false } : announcement
      );
      const updatedSystemAnnouncements = systemAnnouncements.map((announcement) =>
        ids.includes(announcement.id) ? { ...announcement, isRead: false } : announcement
      );
      setUserAnnouncements(updatedUserAnnouncements);
      setSystemAnnouncements(updatedSystemAnnouncements);
      setSelectedIds([]);
      showToast("Đánh dấu chưa đọc thành công!", "success");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Không thể đánh dấu chưa đọc";
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    setSelectedIds([]);
    fetchAnnouncements(1);
  }, [notificationType]);

  const getPaginatedAnnouncements = () => {
    const activeAnnouncements = notificationType === 'user' ? userAnnouncements : systemAnnouncements;
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return activeAnnouncements.slice(startIndex, endIndex);
  };

  const handleMarkAsRead = () => {
    if (selectedIds.length > 0) {
      markAsRead(selectedIds);
    }
    setIsMoreMenuOpen(false);
  };

  const handleMarkAsUnread = () => {
    if (selectedIds.length > 0) {
      markAsUnread(selectedIds);
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
    return currentAnnouncements.length > 0 && currentAnnouncements.every((announcement) => selectedIds.includes(announcement.id));
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
      {loading && <LoadingSpinner />}
      <div>
        <h1 className="text-3xl font-bold">Thông báo</h1>
        <div className="inline-flex items-center bg-gray-100 p-1 rounded-full my-5">
          <button
            className={`px-4 py-2 font-medium rounded-full ${notificationType === 'user'
              ? 'text-white bg-gray-800'
              : 'text-gray-400'
              }`}
            onClick={() => setNotificationType('user')}
          >
            Thông báo người dùng
          </button>
          <button
            className={`px-4 py-2 font-medium rounded-full ${notificationType === 'system'
              ? 'text-white bg-gray-800'
              : 'text-gray-400'
              }`}
            onClick={() => setNotificationType('system')}
          >
            Thông báo hệ thống
          </button>
        </div>
      </div>

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
          {loading ? (
            <li className="p-4 text-center text-gray-500">Đang tải dữ liệu...</li>
          ) : getPaginatedAnnouncements().length > 0 ? (
            getPaginatedAnnouncements().map((announcement) => (
              <li key={announcement.id} className="flex items-center p-4 hover:bg-gray-50 transition-colors duration-200">
                <input type="checkbox" checked={selectedIds.includes(announcement.id)} onChange={() => handleCheckboxChange(announcement.id)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-0 focus:ring-offset-0 mr-4" />
                <img src={announcement.avatar} alt="Avatar" className="w-10 h-10 rounded-full mr-4" />
                <div className={`flex-grow text-base text-gray-800 ${!announcement.isRead ? 'font-bold' : ''}`} >
                  {announcement.content}
                </div>
                <div className="text-gray-500 text-sm">{announcement.time}</div>
              </li>
            ))
          ) : (
            <li className="p-4 text-center text-gray-500">Không có thông báo nào</li>
          )}
        </ul>

        {totalPages > 0 && (
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
        )}
      </div>
    </div>
  );
};

export default Announcements;