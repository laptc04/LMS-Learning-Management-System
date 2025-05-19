import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import apiInstance from "../../../../services/api";
import { ChevronDown, ChevronUp } from "lucide-react";
import Pagination from "../../../../components/Pagination";
import { showToast } from "../../../../components/Toasted";
import LoadingSpinner from "../../../../components/Loading";
import DeletePopup from "../../../../components/Popup/Delete";
import SearchBar from "../../../../components/SearchBar";

interface Department {
  departmentID: number;
  departmentCode: string;
  departmentName: string;
  userId: number;
  userName: string;
}

const TableRow = React.memo(
  ({
    dept,
    index,
  }: {
    dept: Department;
    index: number;
  }) => {
    return (
      <tr className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
        <td className="px-4 py-3 text-sm font-source-sans">{dept.departmentCode}</td>
        <td className="px-4 py-3 text-sm font-source-sans">{dept.departmentName}</td>
        <td className="px-4 py-3 text-center">
          <button
            data-action="navigate-list"
            data-id={dept.departmentID}
            className="text-orange-500 hover:text-orange-700 mx-1"
          >
            <img src="/icon/fi_list.png" alt="List" className="w-6 h-6" />
          </button>
          <button
            data-action="navigate-edit"
            data-id={dept.departmentID}
            className="text-orange-500 hover:text-orange-700 mx-1"
          >
            <img src="/icon/fi_edit.png" alt="Edit" className="w-6 h-6" />
          </button>
          <button
            data-action="delete"
            data-id={dept.departmentID}
            className="text-orange-500 hover:text-orange-700 mx-1"
          >
            <img src="/icon/fi_trash-2.png" alt="Trash" className="w-6 h-6" />
          </button>
        </td>
      </tr>
    );
  }
);

const ManageFaculty: React.FC = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Sorting configuration
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Department | null;
    direction: "asc" | "desc" | null;
  }>({ key: null, direction: null });

  // Fetch departments from API with AbortController
  useEffect(() => {
    const abortController = new AbortController();
    const fetchDepartments = async () => {
      setLoading(true);
      try {
        const response = await apiInstance.get("api/department", {
          params: { pageNumber: currentPage, pageSize },
          signal: abortController.signal,
        });
        if (response.data.status === 0) {
          setDepartments(response.data.data.items);
          setTotalPages(response.data.data.totalPages);
        } else {
          showToast("Failed to fetch departments: " + response.data.message, "error");
        }
      } catch (error: any) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          const errorMessage = error.response?.data?.message || "Failed to fetch departments";
          showToast(errorMessage, "error");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();

    // Cleanup: Abort the request on unmount or when dependencies change
    return () => {
      abortController.abort();
    };
  }, [currentPage, pageSize]);

  // Memoize filtered departments
  const filteredDepartments = useMemo(() => {
    return departments.filter(
      (dept) =>
        dept.departmentCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dept.departmentName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [departments, searchQuery]);

  // Memoize sorted departments
  const sortedDepartments = useMemo(() => {
    return [...filteredDepartments].sort((a, b) => {
      if (sortConfig.key) {
        const valueA = a[sortConfig.key]!.toString().toLowerCase();
        const valueB = b[sortConfig.key]!.toString().toLowerCase();
        return sortConfig.direction === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      return 0;
    });
  }, [filteredDepartments, sortConfig]);

  // Handle column sorting
  const handleSort = useCallback((key: keyof Department) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  }, []);

  // Handle department deletion
  const handleDelete = useCallback(async () => {
    if (deleteId === null) return;

    setDeleteLoading(true);
    try {
      const response = await apiInstance.delete(`api/department/${deleteId}`);
      if (response.data.status === 0) {
        setDepartments((prev) => prev.filter((d) => d.departmentID !== deleteId));
        showToast("Khoa-khối xóa thành công", "success");
      } else {
        showToast(response.data.message, "error");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to delete department";
      showToast(errorMessage, "error");
    } finally {
      setDeleteLoading(false);
      setDeleteId(null);
    }
  }, [deleteId]);

  // Handle page change
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  // Handle limit change
  const handleLimitChange = useCallback((newLimit: number) => {
    setPageSize(newLimit);
    setCurrentPage(1);
  }, []);

  // Handle navigation
  const handleNavigate = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);

  // Handle delete click
  const handleDeleteClick = useCallback((id: number) => {
    setDeleteId(id);
  }, []);

  // Handle search
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Handle table click events using Event Delegation
  const handleTableClick = useCallback((event: React.MouseEvent<HTMLTableElement>) => {
    const target = event.target as HTMLElement;
    const button = target.closest("button"); 
    if (!button) return;

    const action = button.getAttribute("data-action");
    const id = button.getAttribute("data-id");

    if (!id) return;

    const departmentId = parseInt(id, 10);

    switch (action) {
      case "navigate-list":
        handleNavigate(`list/${departmentId}`);
        break;
      case "navigate-edit":
        handleNavigate(`edit/${departmentId}`);
        break;
      case "delete":
        handleDeleteClick(departmentId);
        break;
      default:
        break;
    }
  }, [handleNavigate, handleDeleteClick]);

  return (
    <div className="p-6 bg-white rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold font-mulis">Khoa - Khối</h2>
        <div className="relative max-w-lg" style={{ width: 438 }}>
          <SearchBar onSearch={handleSearch} placeholder="Tìm kiếm" />
        </div>
      </div>

      {/* Display loading when fetching data */}
      {loading ? (
        <div className="flex justify-center items-center p-6">
          <LoadingSpinner />
        </div>
      ) : sortedDepartments.length === 0 ? (
        <div className="flex justify-center items-center p-6 text-gray-500 text-lg">
          {searchQuery
            ? "Không tìm thấy khoa/khối phù hợp với từ khóa."
            : "Danh sách khoa - khối trống."}
        </div>
      ) : (
        <>
          {/* Departments table */}
          <table
            className="w-full border-collapse shadow-sm rounded-lg overflow-hidden"
            onClick={handleTableClick} // Gắn sự kiện onClick vào table
          >
            <thead>
              <tr style={{ background: "linear-gradient(to right, #F17F21, #FF5400)" }}>
                <th className="px-3 py-3 text-left text-sm text-white">
                  <button
                    className="p-2 text-left font-medium flex items-center gap-1"
                    onClick={() => handleSort("departmentCode")}
                  >
                    Mã khoa - khối
                    <div className="flex flex-col">
                      <ChevronUp className="w-3 h-3" />
                      <ChevronDown className="w-3 h-3 -mt-0.5" />
                    </div>
                  </button>
                </th>
                <th className="px-3 py-3 text-left text-sm text-white">
                  <button
                    className="p-2 text-left font-medium flex items-center gap-1"
                    onClick={() => handleSort("departmentName")}
                  >
                    Tên khoa - khối
                    <div className="flex flex-col">
                      <ChevronUp className="w-3 h-3" />
                      <ChevronDown className="w-3 h-3 -mt-0.5" />
                    </div>
                  </button>
                </th>
                <th className="px-3 py-3 text-center text-sm text-white">Hành động</th>
              </tr>
            </thead>
            <tbody className="font-normal">
              {sortedDepartments.map((dept, index) => (
                <TableRow
                  key={dept.departmentID}
                  dept={dept}
                  index={index}
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

      {/* Delete confirmation popup using DeletePopup component */}
      <DeletePopup
        isOpen={deleteId !== null}
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Xóa Khoa - Khối"
        text="Bạn có chắc chắn muốn xóa Khoa/Khối này và tất cả thông tin của nó không? Hành động này không thể hoàn tác."
      />
    </div>
  );
};

export default ManageFaculty;