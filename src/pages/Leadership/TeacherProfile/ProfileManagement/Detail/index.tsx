import { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import Dropdown from '../../../../../components/Dropdown';
import trashIcon from '../../../../../assets/images/fi_trash-2.png';
import { Camera, X } from 'lucide-react';


const InstructorProfile = () => {
  const [selectedTab, setSelectedTab] = useState('general');

  const [monKiemNhiem, setMonKiemNhiem] = useState(['Toán', 'Lý']);

  return (
    <div className=" px-5 ">
      <div className="flex items-center space-x-5 mb-9">
        <h1 className="text-[40px] font-bold font-mulish">Hồ sơ giảng viên</h1>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="bg-[#F2F2F2] inline-flex rounded-3xl p-2">
            <button
              className={`px-4 py-2 transition-all rounded-3xl ${
                selectedTab === 'general' ? 'bg-[#373839] text-white' : 'bg-transparent text-gray-800'
              }`}
              onClick={() => setSelectedTab('general')}
            >
              Thông tin chung
            </button>
            <button
              className={`px-4 py-2 transition-all rounded-3xl ${
                selectedTab === 'work' ? 'bg-[#373839] text-white' : 'bg-transparent text-gray-800'
              }`}
              onClick={() => setSelectedTab('work')}
            >
              Quá trình công tác
            </button>
          </div>

          
        </div>

        {/* Nút "Thêm mới" */}
        <div className="flex items-center space-x-2">
          {/* Icon thùng rác */}
          <img src={trashIcon} alt="Trash" className="w-8 h-8 cursor-pointer" />
          {/* Dấu phân cách */}
          <span className="text-gray-400">|</span>

          {/* Nút "Chỉnh sửa" */}
          <button className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-md">
            <FaEdit size={18} />
            <span>Chỉnh sửa</span>
          </button>
        </div>
      </div>
      <div className="max-w-full rounded-lg overflow-hidden shadow-lg border border-gray-200">
        <div className="bg-[#CC5C00] text-white font-bold text-lg p-3 rounded-tl-lg rounded-tr-lg">Thông tin chung</div>
        <div className="grid grid-cols-[0.75fr_1.5fr_1.5fr_1.5fr] gap-6 p-4 rounded-lg w-full">
          <div className="relative w-36 h-36">
            <img
              src="https://s3-alpha-sig.figma.com/img/40ff/4641/f62e8bafd3c8fe18d1a361f7b186bc9a?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=aqSQRAlcS9ksvkd~NVnp57HYV5qLvklnLk52Bz68VLHtWgdXgOeM8k0Rd17poaft68MZKVwSfqn5AhV25Cd2UZPls9f8MFiSNlhvBEYkjC0ywsjtBZ0YwJinqS3UP2bVTqLMURihf6nv6eSPGpBNB9fMVPV7EJQBcX~aueZ1zEi6oCXc7mkeCoVc4hml1lZ2OyqPfEh~OCMasWY3w0Ax6uJUkst4CKvra9Tri-5q0XIY4bXyC4DEEDeZrTs4c4L9caLTCjTy3I91qSEJHzUP4Qp5qkt9pDnzafz3yhtHDyIrKo3ugKeL-wuf3Sd~9f-ZgTtwmjN2YJAhF0X2eDJebA__"
              alt="Giảng viên"
              className="w-full h-full rounded-full border-2 border-gray-300"
            />
            <button className="absolute bottom--1 left-1/2 transform -translate-x-1/2 bg-gray-400 text-black p-2 rounded-full rounded-white shadow-lg">
              <Camera size={16} />
            </button>
          </div>

          <div className="col-span-2">
            <h3 className="font-bold text-[#CC5C00] text-lg mb-2">Thông tin giảng viên</h3>
            <div className="grid grid-cols-2 gap-4 py-5">
              <div className="space-y-2">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <label className="w-28 text-sm font-medium">Mã giảng viên:</label>
                    <span className="text-sm font-normal">MGV89K1095</span>
                  </div>
                  <div className="flex items-center mt-2 ml-28">
                    <input type="checkbox" id="auto-generate" className="border rounded text-sm " />
                    <label htmlFor="auto-generate" className="text-sm ml-2">
                      Sinh mã tự động
                    </label>
                  </div>
                </div>
                <div className="flex items-center">
                  <label className="w-28 text-sm font-medium">Tổ - Bộ môn:</label>
                  <span className="text-sm font-normal">Toán lý hóa</span>
                </div>
                <div className="flex items-center">
                  <label className="w-28 text-sm font-medium">Môn dạy:</label>
                  <span className="text-sm font-normal">Toán</span>
                </div>
                <div className="flex items-center">
                  <label className="w-28 text-sm font-medium">Họ và tên:</label>
                  <span className="text-sm font-normal">Nguyễn Lê Anh Khoa</span>
                </div>
                <div className="flex items-center">
                  <label className="w-28 text-sm font-medium">Ngày sinh</label>
                  <span className="text-sm font-normal">06/05/2000</span>
                </div>
                <div className="flex items-center">
                  <label className="w-28 text-sm font-medium">Giới tính:</label>
                  <span className="text-sm font-normal">Nam</span>
                </div>
                <div className="flex items-center">
                  <label className="w-28 text-sm font-medium">Dân tộc:</label>
                  <span className="text-sm font-normal">Kinh</span>
                </div>
                <div className="flex items-center">
                  <label className="w-28 text-sm font-medium">Ngày vào trường: </label>
                  <span className="text-sm font-normal">30/04/2020</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <label className="w-28 text-sm font-medium">Quốc tịch:</label>
                  <span className="text-sm font-normal">Việt Nam</span>
                </div>
                <div className="flex items-center">
                  <label className="w-28 text-sm font-medium">Tôn giáo:</label>
                  <span className="text-sm font-normal">Phật giáo</span>
                </div>
                <div className="flex items-center">
                  <label className="w-28 text-sm font-medium">Trạng thái:</label>
                  <div className="flex items-center px-3 py-1 border border-green-500 text-green-600 rounded-lg">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    <span className="text-sm font-normal">Đang giảng dạy</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <label className="w-28 text-sm font-medium">Môn kiêm nhiệm:</label>
                

                  <div className="flex flex-wrap gap-2">
                    {monKiemNhiem.map((mon, index) => (
                      <span key={index} className="flex items-center bg-blue-500 text-white text-sm px-2 py-1 rounded-full">
                        {mon}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="w-28 text-sm font-medium">Bí danh:</label>
                  <span className="text-sm font-normal">Không</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-[#CC5C00] text-lg mb-2">Địa chỉ liên hệ</h3>
            <div className="space-y-2 py-5">
              <div className="flex items-center">
                <label className="w-28 text-sm font-medium">Địa chỉ:</label>
                <span className="text-sm font-normal">An Khánh, Ninh Kiều, Cần Thơ</span>
              </div>
              <div className="flex items-center">
                <label className="w-28 text-sm font-medium">Email:</label>
                <span className="text-sm font-normal">khoacntt2003@gmail.com</span>
              </div>
              <div className="flex items-center">
                <label className="w-28 text-sm font-medium">SĐT:</label>
                <span className="text-sm font-normal">0336216546</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#F2F2F2] bg-opacity-50 text-white h-[10px]"></div>
        <div className="grid grid-cols-[0.5fr_1fr_1fr_1fr] gap-6 p-4 w-full">
          <div className="flex flex-col items-center relative"></div>

          <div className="col-span-2">
            <h3 className="font-bold text-[#CC5C00] text-lg mb-2">Thông tin cá nhân</h3>
            <div className="grid grid-cols-2 gap-4 py-5">
              <div className="space-y-2">
                <div className="flex items-center">
                  <label className="w-32 text-sm font-medium">CMND:</label>
                  <span className="text-sm font-normal">0822030XXXXX</span>
                </div>
                <div className="flex items-center">
                  <label className="w-32 text-sm font-medium">Ngày cấp:</label>
                  <span className="text-sm font-normal">20/04/2020</span>
                </div>
                <div className="flex items-center">
                  <label className="w-32 text-sm font-medium">Nơi cấp:</label>
                  <span className="text-sm font-normal">Công An Cần Thơ</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="enableDoanVien"
                    checked={true}
                    className="w-4 h-4"
                  />
                  <label htmlFor="enableDoanVien" className="text-sm font-medium">
                    Đoàn viên
                  </label>
                </div>

                <div className="flex items-center">
                  <label className="w-28 text-sm font-medium">Ngày vào đoàn: </label>
                  <span className="text-sm font-normal">20/10/2022</span>
                </div>
                <div className="flex items-center">
                  <label className="w-28 text-sm font-medium">Nơi vào đoàn</label>
                  <span className="text-sm font-normal">Cần Thơ</span>
                </div>
              </div>
            </div>
          </div>

          <div className="py-5">
            <div className="space-y-3 mt-8">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="enableDangVien"
                  checked={true}
                  className="w-4 h-4"
                />
                <label htmlFor="enableDangVien" className="text-sm font-medium">
                  Đảng viên
                </label>
              </div>

              <div className="flex items-center">
                <label className="w-28 text-sm font-medium">Ngày vào đảng: </label>
                <span className="text-sm font-normal">20/10/2022</span>
              </div>
              <div className="flex items-center">
                <label className="w-28 text-sm font-medium">Nơi vào đảng</label>
                <span className="text-sm font-normal">Cần Thơ</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#F2F2F2] bg-opacity-50 text-white h-[10px]"></div>
        <div className="grid grid-cols-[0.5fr_1fr_1fr_1fr] gap-6 p-4 w-full">
          <div></div>

          <div className="col-span-3">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-[#CC5C00] text-lg">Thông tin gia đình</h3>
            </div>
            <div className="grid grid-cols-3 gap-4 py-5">
              <div className="space-y-2">
                <div className="flex items-center">
                  <label className="w-32 text-sm font-medium">Người liên hệ:</label>
                  <span className="text-sm font-normal">Nguyễn Khoa</span>
                </div>
                <div className="flex items-center">
                  <label className="w-32 text-sm font-medium">Địa chỉ:</label>
                  <span className="text-sm font-normal">P.Nguyễn Thái Bình Q.1 TP.HCM</span>
                </div>
                <div className="flex items-center">
                  <label className="w-32 text-sm font-medium">SĐT:</label>
                  <span className="text-sm font-normal">0123456789</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <label className="w-32 text-sm font-medium">Người liên hệ 2:</label>
                  <span className="text-sm font-normal">Cao Bá Quát</span>
                </div>
                <div className="flex items-center">
                  <label className="w-32 text-sm font-medium">Địa chỉ:</label>
                  <span className="text-sm font-normal">P.Nguyễn Thái Bình Q.1 TP.HCM</span>
                </div>
                <div className="flex items-center">
                  <label className="w-32 text-sm font-medium">SĐT:</label>
                  <span className="text-sm font-normal">0123456789</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;



