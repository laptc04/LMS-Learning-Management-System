import React, { useEffect, useState, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import apiInstance from "../../../services/api/index";
import List from "../../../assets/images/fi_list.png";
import Edit from "../../../assets/images/fi_edit.png";
import Trash from "../../../assets/images/fi_trash-2.png";
import Search from "../../../assets/images/fi_search.png";
import Cancel from '../../../assets/images/fi_x-cancel.png';


// Định nghĩa kiểu dữ liệu cho nhóm môn học từ API
interface SubjectGroup {
  id: number;
  name: string;
  subjectCode: string;
  subjectName: string;
  fullName: string;
  subjects: any[]; // Nếu có cấu trúc cụ thể, bạn có thể thay `any[]` bằng interface chi tiết hơn
}

export default function DepartmentsTable() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [subjectGroups, setSubjectGroups] = useState<SubjectGroup[]>([]);
  const [listSubjects, setListSubjects] = useState<{ id: number; subjectCode: string; subjectName: string }[]>([]);
  const [isReversed, setIsReversed] = useState(false);

  // State checkbox
  const [selectedDepartmens, setSelectedDepartmens] = useState<string[]>([]);
  const checkAllRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Gọi API 

  const fetchData = async () => {
    try {
      const response = await apiInstance.get("/api/subjectgroup");
      console.log("Dữ liệu nhận được:", response.data);

      if (response.data.status === 0) {
        setSubjectGroups(response.data.data.items);
      } else {
        throw new Error(response.data.message || "Lỗi không xác định");
      }
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Lọc nhóm môn học theo từ khóa tìm kiếm
  const filteredSubjects = subjectGroups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Phân trang
  const totalPages = Math.ceil(filteredSubjects.length / itemsPerPage);
  const displayedSubjects = filteredSubjects
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const finalDisplayedSubjects = isReversed ? [...displayedSubjects].reverse() : displayedSubjects;


  const handleEditClick = (id: number) => {
    navigate(`/leadership/data-declaration/departments/departments-edit/${id}`);
  };

  // open modal
  const handleAddDepartmentsClick = async (id: number) => {
    try {
      const response = await apiInstance.get("api/subject");
      console.log("Dữ liệu môn học:", response.data.data.items);

      if (response.data.status === 0) {
        const fetchedSubjects = response.data.data.items;

        // Lọc nhóm môn học theo ID được chọn
        const selectedGroup = subjectGroups.find(group => group.id === id);
        if (!selectedGroup) return;

        // Lấy danh sách subjectCode từ nhóm đã chọn
        const selectedCodes = new Set(selectedGroup.subjects.map(subject => subject.subjectCode));

        // So sánh từng môn học, nếu trùng subjectCode thì đánh dấu checked
        const selectedSubjectIds = fetchedSubjects
          .filter((subject: { subjectCode: any; }) => selectedCodes.has(subject.subjectCode))
          .map((subject: { id: { toString: () => any; }; }) => subject.id.toString());

        setListSubjects(fetchedSubjects);
        setSelectedDepartmens(selectedSubjectIds);
        setIsModalOpen(true);
      } else {
        throw new Error(response.data.message || "Lỗi không xác định");
      }
    } catch (err) {
      console.error("Lỗi khi lấy danh sách môn học:", err);
    }
  };

  // close modal
  const handleAddDepartmentsClose = () => {
    setIsModalOpen(false);
  };

  // checkbox row
  const handleRowCheckChange = (name: string) => {
    setSelectedDepartmens((prev) => {
      if (prev.includes(name)) {
        return prev.filter((item) => item !== name);
      } else {
        return [...prev, name];
      }
    });
  };
  //delete
  const handleDelete = async (id: number) => {
    try {
      const response = await apiInstance.delete(`api/subjectgroup/${id}`);
      if (response.data.status === 0) {
        setDeleteId(null);
        await fetchData();
        alert("Xóa thành công");
      } else {
        alert(`Lỗi: ${response.data.message}`);
      }
    } catch (err) {
      console.error("Lỗi khi xóa:", err);
      alert("Đã xảy ra lỗi khi xóa.");
    }
  };


  // checkbox Check All
  const isAllChecked = listSubjects.length > 0 && selectedDepartmens.length === listSubjects.length;

  const handleCheckAllChange = () => {
    if (isAllChecked) {
      setSelectedDepartmens([]);
    } else {
      setSelectedDepartmens(listSubjects.map((subject) => subject.id.toString()));
    }
  };

  return (
    <div className="p-4 mx-auto relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-medium">Tổ - Bộ môn</h1>
        <div className="relative">
          <input
            type="search"
            placeholder="Tìm kiếm"
            className="italic pl-10 pr-4 py-2 rounded-lg border border-gray-200 w-[300px] focus:outline-none focus:border-orange-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img
            src={Search}
            alt=""
            className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow">
        {/* Table Header */}
        <div className="grid grid-cols-2 bg-orange-500 text-white rounded-t-lg text-[18px]">
          <button className="p-4 text-left font-medium flex items-center gap-2">
            Tên tổ - bộ môn
            <div className="flex flex-col">
              <ChevronUp
                className="w-4 h-4 cursor-pointer"
                onClick={() => setIsReversed(false)}
              />
              <ChevronDown
                className="w-4 h-4 -mt-1 cursor-pointer"
                onClick={() => setIsReversed(true)}
              />
            </div>
          </button>
          <button className="p-4 text-left font-medium flex items-center gap-2">
            Trưởng bộ môn
            <div className="flex flex-col">
              <ChevronUp
                className="w-4 h-4 cursor-pointer"
                onClick={() => setIsReversed(false)}
              />
              <ChevronDown
                className="w-4 h-4 -mt-1 cursor-pointer"
                onClick={() => setIsReversed(true)}
              />
            </div>
          </button>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-100">
          {finalDisplayedSubjects.length > 0 ? (
            finalDisplayedSubjects.map((group, index) => (

              <div
                key={group.id}
                className={`grid grid-cols-2 hover:bg-gray-50 ${index % 2 === 1 ? "bg-gray-50" : ""
                  }`}
              >
                <div className="p-4 text-[16px]">{group.name}</div>
                <div className="p-4 flex items-center justify-between">
                  <span>{group.fullName}</span>
                  <div className="flex gap-2">
                    <button className="p-1 text-orange-500 hover:bg-orange-50 rounded">
                      <img src={List} alt="" className="w-6 h-6" onClick={() => handleAddDepartmentsClick(group.id)} />
                    </button>
                    <button
                      className="p-1 text-orange-500 hover:bg-orange-50 rounded"
                      onClick={() => handleEditClick(group.id)}
                    >
                      <img src={Edit} alt="" className="w-6 h-6" />
                    </button>
                    <button
                      className="p-1 text-orange-500 hover:bg-orange-50 rounded"
                      onClick={() => setDeleteId(group.id)}
                    >
                      <img src={Trash} alt="" className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">Không có dữ liệu</div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {displayedSubjects.length > 0 && (
        <div className="flex justify-between items-center mt-5">
          <div>
            <em>Hiển thị</em>
            <input
              type="number"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Math.min(Number(e.target.value) || 1, 10))}
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
              ) : null
            )}
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
              &#10095;
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg" style={{ width: 435 }}>
            <h3 className="text-2xl font-bold text-center">Xóa bộ môn</h3>
            <p className="text-base mt-5 mb-10">Xác nhận muốn xoá Tổ - Bộ môn này và toàn bộ thông tin bên trong? Sau khi xoá sẽ không thể hoàn tác.</p>
            <div className="flex justify-between px-4">
              <button onClick={() => setDeleteId(null)} className="bg-gray-200 px-12 py-2 rounded-lg">Hủy</button>
              <button onClick={() => handleDelete(deleteId)} className="bg-orange-500 text-white px-10 py-2 rounded-lg">Xác nhận</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-[884px] ">
            <div className="flex justify-end">
              <img src={Cancel} alt="cancel" className="w-6 h-6 cursor-pointer" onClick={handleAddDepartmentsClose} />
            </div>
            <h2 className="text-[28px] font-bold mb-4 text-center">Danh sách môn học</h2>
            {/* Table */}
            <div className="bg-white rounded-lg shadow">
              <div className="flex justify-end">
                <button className="p-1 text-orange-500 hover:bg-orange-50 rounded">
                  <img src={Trash} alt="trash" className="w-8 h-8" />
                </button>
              </div>

              {/* Table Header */}
              <div className="grid grid-cols-[80px_1fr_1fr] bg-orange-500 text-white rounded-t-lg text-[18px]">
                <div className="p-4 flex items-center justify-center">
                  <input ref={checkAllRef} type="checkbox" className="w-6 h-6" checked={isAllChecked} onChange={handleCheckAllChange} />
                </div>
                <button className="p-4 text-left font-medium flex items-center gap-2">
                  Mã môn học
                  <div className="flex flex-col">
                    <ChevronUp className="w-4 h-4" />
                    <ChevronDown className="w-4 h-4 -mt-1" />
                  </div>
                </button>
                <button className="p-4 text-left font-medium flex items-center gap-2">
                  Tên môn học
                  <div className="flex flex-col">
                    <ChevronUp className="w-4 h-4" />
                    <ChevronDown className="w-4 h-4 -mt-1" />
                  </div>
                </button>
              </div>

              {/* Table Body*/}
              <div className="overflow-y-auto max-h-[350px]">
                <div className="divide-y divide-gray-100">
                  {listSubjects.map((subject, index) => (
                    <div
                      key={subject.id}
                      className={`grid grid-cols-[80px_1fr_1fr] hover:bg-gray-50 ${index % 2 === 1 ? 'bg-gray-50' : ''}`}
                    >
                      <div className="p-4 flex items-center justify-center">
                        <input
                          type="checkbox"
                          className="w-6 h-6"
                          checked={selectedDepartmens.includes(subject.id.toString())}
                          onChange={() => handleRowCheckChange(subject.id.toString())}
                        />
                      </div>
                      <div className="p-4 text-[16px]">{subject.subjectCode}</div>
                      <div className="p-4">{subject.subjectName}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 pt-4 w-1/4 mx-auto">
              <button
                type="button"
                onClick={handleAddDepartmentsClose}
                className="flex-1 font-bold text-lg px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors h-[52px]"
              >
                Huỷ
              </button>
              <button type="submit" className="flex-1 font-bold text-lg px-4 py-2 bg-[#FF7506] text-white rounded-md transition-colors h-[52px]">
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
