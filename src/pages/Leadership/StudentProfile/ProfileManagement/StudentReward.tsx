import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Dropdown from "../../../../components/Dropdown";
import Button from "../../../../components/Button";

const students = [
  { id: "20206A", name: "Trần Trung", dob: "10/10/2002", gender: "Nam", awards: 2 },
  { id: "20206A", name: "Nguyễn Ngọc Tuyết", dob: "10/10/2002", gender: "Nữ", awards: 2 },
  { id: "20206A", name: "Hoàng Việt Cường", dob: "10/10/2002", gender: "Nam", awards: 2 },
  { id: "20206A", name: "Trần Thanh Tâm", dob: "10/10/2002", gender: "Nữ", awards: 2 },
  { id: "20206A", name: "Tôn Thưởng Nguyệt", dob: "10/10/2002", gender: "Nữ", awards: 2 },
  { id: "20206A", name: "Nguyễn Nhật Triều", dob: "10/10/2002", gender: "Nam", awards: 2 },
  { id: "20206A", name: "Trần Ngọc Diệu", dob: "10/10/2002", gender: "Nữ", awards: 2 },
  { id: "20206A", name: "Ngọc Thanh Tâm", dob: "10/10/2002", gender: "Nữ", awards: 2 },
  { id: "20206A", name: "Ngọc Thanh Tâm", dob: "10/10/2002", gender: "Nữ", awards: 2 },
];

const StudentReward = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  
  const totalPages = Math.ceil(students.length / rowsPerPage);
  const paginatedData = students.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  
  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4 items-center">
          <div className="flex gap-2">
            <Dropdown 
              options={[{ id: 1, value: "2020-2021" }, { id: 2, value: "2021-2022" }]} 
              width="medium" 
            />
            <Dropdown 
              options={[{id : 1, value:"Chọn lớp"}]}
              width="medium"
            />
          </div>
          <div className="flex gap-2">
            <button className="bg-gray-300 px-4 py-1 rounded-lg">Tất cả hồ sơ</button>
            <button className="bg-black text-white px-4 py-1 rounded-lg">Khen thưởng</button>
            <button className="bg-gray-300 px-4 py-1 rounded-lg">Kỷ luật</button>
          </div>
        </div>
        <Button label="+ Thêm mới" variant="solid" size="medium" textColor="white" backgroundColor="#F97316" onClick={() => {}}/>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="overflow-x-auto">
          <div className="flex justify-between items-center mb-5">
            <h5 className="font-bold text-left">Danh sách khen thưởng của học viên</h5>
            <input type="text" placeholder="Tìm kiếm" className="bg-gray-100 px-4 py-2 rounded-full text-sm w-64" />
          </div>
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-orange-500 text-white">
<th className="py-3 px-4">Mã học viên</th>
                <th className="py-3 px-4">Tên học viên</th>
                <th className="py-3 px-4">Ngày sinh</th>
                <th className="py-3 px-4">Giới tính</th>
                <th className="py-3 px-4">Số lần khen thưởng</th>
                <th className="py-3 px-4">Xem</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((student, index) => (
                <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} text-center`}>
                  <td className="py-3 px-4">{student.id}</td>
                  <td className="py-3 px-4">{student.name}</td>
                  <td className="py-3 px-4">{student.dob}</td>
                  <td className="py-3 px-4">{student.gender}</td>
                  <td className="py-3 px-4">{student.awards}</td>
                  <td className="py-3 px-4">
                    <button className="text-orange-500 hover:text-orange-700">
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div>
            Hiển thị
            <input
              type="number"
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Math.min(Number(e.target.value) || 1, 8))}
              className="p-2 rounded-md mx-2 border"
              style={{ width: '60px' }}
            />
            hàng trong mỗi trang
          </div>
          <div className="flex items-center gap-2">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
              <IoIosArrowBack />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 ${currentPage === i + 1 ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-200'} rounded-full`}
              >
                {i + 1}
              </button>
            ))}
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentReward;