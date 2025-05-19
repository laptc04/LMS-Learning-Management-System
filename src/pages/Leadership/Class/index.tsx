import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../components/Pagination/index";
import apiInstance from "../../../services/api";
import { showToast } from "../../../components/Toasted";
import LoadingSpinner from "../../../components/Loading";
import DeletePopup from "../../../components/Popup/Delete";
import TableRow from "./TableRow";
import SearchBar from "../../../components/SearchBar";

interface Class {
  id: number;
  classCode: string;
  className: string;
  homeroomTeacher: string;
}

export default function ClassTable() {
  const navigate = useNavigate();
  const [classes, setClasses] = useState<Class[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [selectedClasses, setSelectedClasses] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Sorting configuration
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Class | null;
    direction: "asc" | "desc" | null;
  }>({ key: null, direction: null });

  // Fetch classes from API with AbortController
  useEffect(() => {
    const abortController = new AbortController();
    const fetchClasses = async () => {
      setLoading(true);
      try {
        const response = await apiInstance.get("api/class/list", {
          params: { pageNumber: currentPage, pageSize },
          signal: abortController.signal,
        });
        if (response.data.status === 0) {
          setClasses(response.data.data.items);
          setTotalPages(response.data.data.totalPages);
        } else {
          showToast("Lấy danh sách lớp thất bại: " + response.data.message, "error");
        }
      } catch (error: any) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          const errorMessage = error.response?.data?.message || "Lấy danh sách lớp thất bại";
          showToast(errorMessage, "error");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();

    return () => {
      abortController.abort();
    };
  }, [currentPage, pageSize]);

  // Memoize filtered classes
  const filteredClasses = useMemo(() => {
    return classes.filter(
      (cls) =>
        cls.classCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.className.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.homeroomTeacher.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [classes, searchQuery]);

  // Memoize sorted classes
  const sortedClasses = useMemo(() => {
    return [...filteredClasses].sort((a, b) => {
      if (sortConfig.key) {
        const valueA = a[sortConfig.key]!.toString().toLowerCase();
        const valueB = b[sortConfig.key]!.toString().toLowerCase();
        return sortConfig.direction === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      return 0;
    });
  }, [filteredClasses, sortConfig]);

  // Handle sorting
  const handleSort = useCallback((key: keyof Class) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  }, []);

  // Handle checkbox change for individual class
  const handleCheckboxChange = useCallback((classId: number) => {
    setSelectedClasses((prev) =>
      prev.includes(classId) ? prev.filter((id) => id !== classId) : [...prev, classId]
    );
  }, []);

  // Handle select all checkboxes
  const handleSelectAll = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedClasses(sortedClasses.map((cls) => cls.id));
    } else {
      setSelectedClasses([]);
    }
  }, [sortedClasses]);

  // Handle edit navigation
  const handleEditClick = useCallback((classId: number) => {
    navigate(`/leadership/data-declaration/classes/classes-edit/${classId}`);
  }, [navigate]);

  // Handle delete click (single class)
  const handleDeleteClick = useCallback((cls: Class) => {
    setSelectedClass(cls);
    setShowModal(true);
  }, []);

  // Handle confirm delete (single class)
  const handleConfirmDelete = useCallback(async () => {
    if (!selectedClass) return;

    setLoading(true);
    try {
      await apiInstance.delete("api/class/delete", {
        data: { ids: [selectedClass.id] },
      });
      setClasses((prev) => prev.filter((c) => c.id !== selectedClass.id));
      showToast(`Xóa lớp ${selectedClass.className} thành công`, "success");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Xóa lớp thất bại";
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
      setShowModal(false);
      setSelectedClass(null);
    }
  }, [selectedClass]);

  // Handle bulk delete
  const handleBulkDelete = useCallback(() => {
    if (selectedClasses.length === 0) {
      showToast("Vui lòng chọn ít nhất một lớp để xóa", "error");
      return;
    }
    setShowModal(true);
  }, [selectedClasses]);

  // Handle confirm bulk delete
  const handleConfirmBulkDelete = useCallback(async () => {
    setLoading(true);
    try {
      await apiInstance.delete("api/class/delete", {
        data: { ids: selectedClasses },
      });
      setClasses((prev) => prev.filter((c) => !selectedClasses.includes(c.id)));
      setSelectedClasses([]);
      showToast("Xóa các lớp thành công", "success");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Xóa các lớp thất bại";
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  }, [selectedClasses]);

  // Handle page change
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    setSelectedClasses([]);
  }, []);

  // Handle limit change
  const handleLimitChange = useCallback((newLimit: number) => {
    setPageSize(newLimit);
    setCurrentPage(1);
    setSelectedClasses([]);
  }, []);

  // Handle search
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);
  const handleExport = useCallback(async () => {
    try {
      const response = await apiInstance.get("api/class/export-class-list");
      
      const fileUrl = response?.data?.data; 
  
      if (fileUrl) {
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = "danh_sach_lop.xlsx"; 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
  
        showToast("Xuất file thành công", "success");
      } else {
        showToast("Không tìm thấy file để tải xuống", "error");
      }
    } catch (error) {
      showToast("Xuất file thất bại", "error");
    }
  }, []);
  
  return (
    <div className="mx-auto h-full flex flex-col">
      {/* Loading Spinner */}
      {loading && <LoadingSpinner />}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Lớp học</h1>
        <div className="flex items-center gap-4">
          {selectedClasses.length > 0 && (
            <button
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              onClick={handleBulkDelete}
            >
              Xóa hàng loạt ({selectedClasses.length})
            </button>
          )}
          <button
              className="px-4 py-2 border-2 text-orange-500 font-semibold border-orange-500 rounded-md"
              onClick={handleExport}
            >
              Xuất file
            </button>
          <div className="relative" style={{ width: 300 }}>
            <SearchBar onSearch={handleSearch} placeholder="Tìm kiếm" />
          </div>
        </div>
      </div>

      {/* Table or No Data Message */}
      {loading ? (
        <div className="flex justify-center items-center p-6">
          <LoadingSpinner />
        </div>
      ) : sortedClasses.length === 0 ? (
        <div className="flex justify-center items-center p-6 text-gray-500 text-lg">
          {searchQuery
            ? "Không tìm thấy lớp phù hợp với từ khóa."
            : "Danh sách lớp trống."}
        </div>
      ) : (
        <>
          {/* Table */}
          <table className="w-full border-collapse shadow-sm rounded-lg overflow-hidden">
            {/* Table Head */}
            <thead>
              <tr className="bg-orange-500 text-white text-sm">
                <th className="px-3 py-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="hidden" onChange={handleSelectAll} />
                    <div
                      className={`w-5 h-5 border-2 rounded-sm transition-all duration-200 ${
                        selectedClasses.length === sortedClasses.length && sortedClasses.length > 0
                          ? "bg-blue-500 border-blue-500"
                          : "border-blue-500 bg-white"
                      }`}
                    >
                      {selectedClasses.length === sortedClasses.length &&
                        sortedClasses.length > 0 && (
                          <svg
                            className="w-[16px] h-[16px] text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 21 18"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M20.707 5.293a1 1 0 010 1.414l-10 10a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L10 14.586l9.293-9.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                    </div>
                  </label>
                </th>
                <th className="px-3 py-1 text-left font-medium">
                  <button className="flex items-center gap-1" onClick={() => handleSort("classCode")}>
                    Mã lớp
                    <div className="flex flex-col">
                      <ChevronUp className="w-3 h-3" />
                      <ChevronDown className="w-3 h-3 -mt-0.5" />
                    </div>
                  </button>
                </th>
                <th className="px-3 py-1 text-left font-medium">
                  <button className="flex items-center gap-1" onClick={() => handleSort("className")}>
                    Tên lớp
                    <div className="flex flex-col">
                      <ChevronUp className="w-3 h-3" />
                      <ChevronDown className="w-3 h-3 -mt-0.5" />
                    </div>
                  </button>
                </th>
                <th className="px-3 py-1 text-left font-medium">
                  <button
                    className="flex items-center gap-1"
                    onClick={() => handleSort("homeroomTeacher")}
                  >
                    Giáo viên chủ nhiệm
                    <div className="flex flex-col">
                      <ChevronUp className="w-3 h-3" />
                      <ChevronDown className="w-3 h-3 -mt-0.5" />
                    </div>
                  </button>
                </th>
                <th className="px-3 py-1 text-center font-medium">Hành động</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100">
              {sortedClasses.map((cls, index) => (
                <TableRow
                  key={cls.id}
                  cls={cls}
                  index={index}
                  selectedClasses={selectedClasses}
                  onCheckboxChange={handleCheckboxChange}
                  onEditClick={handleEditClick}
                  onDeleteClick={handleDeleteClick}
                />
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <Pagination
            limit={pageSize}
            activation={currentPage}
            max={totalPages}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
          />
        </>
      )}

      {/* Modal Confirm Delete using DeletePopup */}
      <DeletePopup
        isOpen={showModal}
        onCancel={() => {
          setShowModal(false);
          setSelectedClass(null);
        }}
        onConfirm={selectedClass ? handleConfirmDelete : handleConfirmBulkDelete}
        title="Xóa Lớp"
        text={
          selectedClass
            ? `Xác nhận muốn xóa lớp ${selectedClass.className}? Sau khi xóa sẽ không thể hoàn tác.`
            : `Xác nhận muốn xóa ${selectedClasses.length} lớp đã chọn? Sau khi xóa sẽ không thể hoàn tác.`
        }
      />
    </div>
  );
}