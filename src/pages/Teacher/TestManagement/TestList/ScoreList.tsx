import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaDownload, FaSearch } from "react-icons/fa";
import Dropdown from "../../../../components/Dropdown";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";

const students = [
  { id: 1, name: "Nguyễn Văn A", dob: "01/02/2004", attendance: 9, oral: 7, quiz: 8, test1: 6, test2: 6, avgSemester: 7.2, avgScore: 7.0, passed: true, update: "Thứ 4, 20/10/2020 16:00" },
  { id: 2, name: "Trần Thanh B", dob: "14/12/2004", attendance: 9, oral: 7, quiz: 8, test1: 6, test2: 6, avgSemester: 7.2, avgScore: 4.8, passed: false, update: "Thứ 4, 20/10/2020 16:00" },
  { id: 3, name: "Nguyễn Văn B", dob: "14/10/2004", attendance: 9, oral: 7, quiz: 8, test1: 6, test2: 6, avgSemester: 7.2, avgScore: 7.6, passed: true, update: "Thứ 4, 20/10/2020 16:00" },
  { id: 4, name: "Nguyễn Văn X", dob: "18/02/2004", attendance: 9, oral: 7, quiz: 8, test1: 6, test2: 6, avgSemester: 7.2, avgScore: 7.2, passed: true, update: "Thứ 4, 20/10/2020 16:00" },
  { id: 5, name: "Ngô Bảo Nhi", dob: "12/04/2004", attendance: 9, oral: 7, quiz: 8, test1: 6, test2: 6, avgSemester: 8.5, avgScore: 8.5, passed: true, update: "Thứ 4, 20/10/2020 16:00" },
  { id: 6, name: "Bảo Quang Huy", dob: "26/07/2004", attendance: 9, oral: 7, quiz: 8, test1: 6, test2: 6, avgSemester: 9.3, avgScore: 9.3, passed: true, update: "Thứ 4, 20/10/2020 16:00" },
  { id: 7, name: "Bảo Quang Huy", dob: "26/07/2004", attendance: 9, oral: 7, quiz: 8, test1: 6, test2: 6, avgSemester: 9.3, avgScore: 3.3, passed: false, update: "Thứ 4, 20/10/2020 16:00" },
  { id: 8, name: "Bảo Quang Huy", dob: "26/07/2004", attendance: 9, oral: 7, quiz: 8, test1: 6, test2: 6, avgSemester: 9.3, avgScore: 9.3, passed: true, update: "Thứ 4, 20/10/2020 16:00" },
];

const yearOptions = [{ id: 1, value: "2019 - 2020" }];
const subjectOptions = [{ id: 1, value: "Ngữ Văn" }];
const gradeOptions = [{ id: 1, value: "10" }];
const classOptions = [{ id: 1, value: "10C1" }];


export default function ScoreList() {
  const [search, setSearch] = useState('');
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold ms-3">Chấm điểm</h1>

      <div className="mb-4 flex gap-4 items-center">
        <Dropdown options={yearOptions} width="medium" />
        <Dropdown options={subjectOptions} width="medium" />
        <Dropdown options={gradeOptions} width="short" />
        <Dropdown options={classOptions} width="short" />
        <Button backgroundColor="#FFD8B8" label="Tìm kiếm" size="medium" variant="solid" textColor="black" onClick={() => { }} />
      </div>
      <div className="p-4 border rounded-lg bg-orange-100 flex justify-between text-sm ">
        <div className="flex flex-col">
          <p><strong>Môn học:</strong> Ngữ Văn</p>
          <p><strong>Lớp:</strong> 10C1</p>
          <p><strong>Mã lớp:</strong> 134 2665 3563</p>
        </div>
        <div className="text-right">
          <p><strong>Thời gian bắt đầu:</strong> Thứ 6, 20/10/2020</p>
          <p>13:00 (GMT +7 Bangkok)</p>
        </div>
        <div className="bg-orange-100 rounded-lg">
          <div className="text-sm font-bold mb-2">In bảng điểm:</div>
          <div className="flex gap-2">
            <button className="bg-orange-200 text-black font-semibold px-4 py-2 rounded border border-orange-300">
              Xuất file
            </button>
            <div className="relative">
              <select className="border rounded px-4 py-2 appearance-none pr-8">
                <option>Excel -.xlsx</option>
              </select>
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black">▼</span>
            </div>
          </div>
        </div>
      </div>
      <div className="m-5 flex justify-between">
        <div>
          <h3 className="font-bold">Bảng điểm của lớp - <span className="font-bold text-green-400">35/40 học viên đạt</span></h3>
        </div>
        <div>
          <Input value={search} icon={<FaSearch />} placeholder='Tìm kiếm ...' borderRadius="16px" background="light grey" onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="overflow-y-auto max-h-96 rounded-lg shadow-md mt-5">
        <table className="w-full border-collapse text-center">
          <thead className="sticky top-0 bg-orange-500 text-white border-b border-black">
            <tr>
              <th rowSpan={2} className="p-2">STT</th>
              <th rowSpan={2} className="p-2">Họ và Tên</th>
              <th rowSpan={2} className="p-2">Ngày sinh</th>
              <th colSpan={6} className="p-2 border-l border-r border-black border-b">HỌC KỲ I</th>
              <th rowSpan={2} className="p-2">Điểm trung bình cả năm</th>
              <th rowSpan={2} className="p-2">Đạt</th>
              <th rowSpan={2} className="p-2">Ngày cập nhật</th>
            </tr>
            <tr>
              <th className="p-2 border-l border-black">Chuyên cần</th>
              <th className="p-2">Miệng</th>
              <th className="p-2">15 phút</th>
              <th className="p-2">Hệ số I</th>
              <th className="p-2">Hệ số II</th>
              <th className="p-2 border-r border-black">Trung bình</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id} className="border-b border-gray-300">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{student.name}</td>
                <td className="p-2 border-r border-black">{student.dob}</td>
                <td className="p-2">{student.attendance}</td>
                <td className="p-2">{student.oral}</td>
                <td className="p-2">{student.quiz}</td>
                <td className="p-2">{student.test1}</td>
                <td className="p-2">{student.test2}</td>
                <td className="p-2 font-bold text-blue-500 border-r border-black">{student.avgSemester.toFixed(1)}</td>
                <td className={`p-2 font-bold ${student.avgScore > 5 ? 'text-green-500' : 'text-red-500'}`}>{student.avgScore.toFixed(1)}</td>
                <td className="p-2">{student.passed ? <FaCheckCircle className="text-green-500" /> : <FaTimesCircle className="text-red-500" />}</td>
                <td className="p-2">{student.update}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
