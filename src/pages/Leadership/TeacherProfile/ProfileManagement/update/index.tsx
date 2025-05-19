import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEye, FaAngleDown, FaAngleUp, FaSearch, FaTrash } from 'react-icons/fa';
import Dropdown from '../../../../../components/Dropdown';
import trashIcon from '../../../../../assets/images/fi_trash-2.png';
import { Camera, X } from 'lucide-react';
import { Option } from './type';
import DatePicker from '../../../../../components/DatePicker';
import Button from '../../../../../components/Button';

const InstructorUpdate = () => {
  const [selectedTab, setSelectedTab] = useState('general');

  const [toBoMon, setToBoMon] = useState<Option[]>([]);
  const [monGiangDay, setMonGiangDay] = useState<Option[]>([]);
  const [danToc, setDanToc] = useState<Option[]>([]);
  const [gioiTinh, setGioiTinh] = useState<Option[]>([]);
  const [quocTich, setQuocTich] = useState<Option[]>([]);
  const [tonGiao, setTonGiao] = useState<Option[]>([]);
  const [trangThai, setTrangthai] = useState<Option[]>([]);
  const [tinhThanh, setTinhThanh] = useState<Option[]>([]);
  const [quanHuyen, setQuanHuyen] = useState<Option[]>([]);
  const [xaPhuong, setXaPhuong] = useState<Option[]>([]);
  const [contacts, setContacts] = useState<{ id: number; name: string; address: string; phone: string }[]>([]);

  const [date, setDate] = useState<string>('');
  const [monKiemNhiem, setMonKiemNhiem] = useState(['Toán', 'Lý', 'Hóa']);
  const [showPopup, setShowPopup] = useState(false);
  const [monDaChon, setMonDaChon] = useState([...monKiemNhiem]);

  const danhSachMonHoc = ['Toán', 'Lý', 'Hóa', 'Sinh', 'Văn', 'Sử', 'Địa', 'Anh'];

  const [isEnabledDoanVien, setIsEnabledDoanVien] = useState(false);
  const [isEnabledDangVien, setIsEnabledDangVien] = useState(false);
  const handleToggleMon = (mon: string) => {
    if (monDaChon.includes(mon)) {
      setMonDaChon(monDaChon.filter((m) => m !== mon));
    } else {
      setMonDaChon([...monDaChon, mon]);
    }
  };
  const handleRemoveMon = (mon: any) => {
    setMonKiemNhiem(monKiemNhiem.filter((m) => m !== mon));
  };
  const handleSave = () => {
    setMonKiemNhiem(monDaChon);
    setShowPopup(false);
  };
  const handleDateChange = (date: string | null) => {
    if (date !== null) {
      setDate(date);
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', address: '', phone: '' });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewContact({ name: '', address: '', phone: '' }); // Reset input
  };

  const handleSaveContact = () => {
    if (!newContact.name || !newContact.address || !newContact.phone) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    setContacts([...contacts, { ...newContact, id: Date.now() }]);
    handleCloseModal();
  };
  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setToBoMon(data.ToBoMon);
        setMonGiangDay(data.MonGiangDay);
        setDanToc(data.DanToc);
        setGioiTinh(data.GioiTinh);
        setQuocTich(data.QuocTich);
        setTonGiao(data.TonGiao);
        setTrangthai(data.TrangThai);
        setTinhThanh(data.TinhThanh);
        setQuanHuyen(data.QuanHuyen);
        setXaPhuong(data.XaPhuong);
        setContacts(data.Contact);
      })
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  return (
    <div className=" px-5 ">
      <div className="flex items-center space-x-5 mb-9">
        <Link to="/leadership/teacher/profile" className="text-gray-300 text-[18px] font-mulish font-semibold hover:text-gray-500">
          Hồ sơ giảng viên
        </Link>
        <span className="text-orange-500 font-mulish text-2xl">{'>'}</span>
        <h1 className="text-[40px] font-bold font-mulish">Chỉnh sửa hồ sơ giảng viên</h1>
      </div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="bg-[#F2F2F2] inline-flex rounded-3xl p-2">
            <button
              className={`px-4 py-2 transition-all rounded-3xl ${selectedTab === 'general' ? 'bg-[#373839] text-white' : 'bg-transparent text-gray-800'
                }`}
              onClick={() => setSelectedTab('general')}
            >
              Thông tin chung
            </button>
            <button
              className={`px-4 py-2 transition-all rounded-3xl ${selectedTab === 'work' ? 'bg-[#373839] text-white' : 'bg-transparent text-gray-800'
                }`}
              onClick={() => setSelectedTab('work')}
            >
              Quá trình công tác
            </button>
          </div>

          {/* Dropdown */}
          <Dropdown
            options={[
              { id: 1, value: '2020 - 2021' },
              { id: 2, value: '2021 - 2022' },
              { id: 3, value: '2022 - 2023' },
              { id: 4, value: '2023 - 2024' },
            ]}
          />
        </div>

        {/* Nút "Thêm mới" */}
        <div className="flex items-center space-x-2">
          {/* Icon thùng rác */}
          <img src={trashIcon} alt="Trash" className="w-8 h-8 cursor-pointer" />
          {/* Dấu phân cách */}
          <span className="text-gray-400">|</span>

          {/* Nút "Thêm mới" */}
          <button className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-md">
            <FaPlus size={14} />
            <span>Thêm mới</span>
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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <label className="w-28 text-sm font-medium">Mã giảng viên</label>
                    <input type="text" className="border rounded p-2 text-sm flex-1" />
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
                  <Dropdown options={toBoMon} width="w-8/12" />
                </div>
                <div className="flex items-center">
                  <label className="w-28 text-sm font-medium">Môn dạy:</label>
                  <Dropdown options={monGiangDay} width="w-8/12" />
                </div>
                <div className="flex items-center">
                  <label className="w-28 text-sm font-medium">Họ và tên:</label>
                  <input type="text" className="border rounded p-2 text-sm flex-1" />
                </div>
                <div className="flex items-center">
                  <label className="w-28 text-sm font-medium">Ngày sinh</label>
                  <div className="relative w-2/3">
                    <DatePicker onChange={handleDateChange} value={date} className="max-w-full" width="100%" />
                  </div>
                </div>
                <div className="flex items-center">
                  <label className="w-28 text-sm font-medium">Giới tính:</label>
                  <Dropdown options={gioiTinh} width="w-8/12" />
                </div>
                <div className="flex items-center">
                  <label className="w-28 text-sm font-medium">Dân tộc:</label>
                  <Dropdown options={danToc} width="w-8/12" />
                </div>
                <div className="flex items-center">
                  <label className="w-28 text-sm font-medium">Ngày vào trường</label>
                  <div className="relative w-2/3">
                    <DatePicker onChange={handleDateChange} value={date} className="max-w-full" width="100%" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <label className="w-28 text-sm font-medium">Quốc tịch:</label>
                  <Dropdown options={quocTich} width="w-8/12" />
                </div>
                <div className="flex items-center">
                  <label className="w-28 text-sm font-medium">Tôn giáo:</label>
                  <Dropdown options={tonGiao} width="w-8/12" />
                </div>
                <div className="flex items-center">
                  <label className="w-28 text-sm font-medium">Trạng thái:</label>
                  <Dropdown options={trangThai} width="w-8/12" />
                </div>
                <div className="flex items-center">
                  <label className="w-28 text-sm font-medium">Môn kiêm nhiệm:</label>
                  <div className="flex flex-wrap gap-2">
                    {monKiemNhiem.map((mon, index) => (
                      <span key={index} className="flex items-center bg-blue-500 text-white text-sm px-2 py-1 rounded-full">
                        {mon}
                        <button onClick={() => handleRemoveMon(mon)} className="ml-2 text-white">
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                    <button onClick={() => setShowPopup(true)} className="bg-gray-300 text-gray-700 text-sm px-2 py-1 rounded-full">
                      + Thêm môn
                    </button>
                  </div>
                </div>

                {/* Popup */}
                {showPopup && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 rounded-lg shadow-lg w-[40%]">
                      <h2 className="text-lg font-semibold mb-4 text-center">Thêm môn kiêm nhiệm</h2>

                      <div className="flex items-center gap-2 mb-3">
                        <label className="text-sm font-medium w-24">Tổ - Bộ môn:</label>
                        <Dropdown options={toBoMon} width="w-8/12" />
                      </div>

                      <hr className="my-3" />

                      <h3 className="text-orange-500 text-sm font-medium mb-2">Danh sách môn học</h3>
                      <div className="flex flex-wrap gap-2">
                        {danhSachMonHoc.map((mon, index) => (
                          <button
                            key={index}
                            className={`px-3 py-1 text-sm rounded-full ${monDaChon.includes(mon) ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                              }`}
                            onClick={() => handleToggleMon(mon)}
                          >
                            {mon}
                          </button>
                        ))}
                      </div>

                      <div className="flex justify-end gap-2 mt-4">
                        <button onClick={() => setShowPopup(false)} className="px-4 py-2 bg-gray-400 text-white rounded">
                          Hủy
                        </button>
                        <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">
                          Lưu
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center">
                  <label className="w-28 text-sm font-medium">Bí danh:</label>
                  <input type="text" className="border rounded p-2 text-sm flex-1" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-[#CC5C00] text-lg mb-2">Địa chỉ liên hệ</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <label className="w-32 text-sm font-medium">Tỉnh/Thành</label>
                <Dropdown options={tinhThanh} width="w-9/12" />
              </div>
              <div className="flex items-center">
                <label className="w-32 text-sm font-medium">Xã/Phường</label>
                <Dropdown options={xaPhuong} width="w-9/12" />
              </div>
              <div className="flex items-center">
                <label className="w-32 text-sm font-medium">Quận/Huyện</label>
                <Dropdown options={quanHuyen} width="w-9/12" />
              </div>
              <div className="flex items-center">
                <label className="w-28 text-sm font-medium">Địa chỉ:</label>
                <input type="text" className="border rounded p-2 text-sm flex-1 w-12/12" />
              </div>
              <div className="flex items-center">
                <label className="w-28 text-sm font-medium">Email:</label>
                <input type="text" className="border rounded p-2 text-sm flex-1" />
              </div>
              <div className="flex items-center">
                <label className="w-28 text-sm font-medium">SĐT:</label>
                <input type="text" className="border rounded p-2 text-sm flex-1" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#F2F2F2] bg-opacity-50 text-white h-[10px]"></div>
        <div className="grid grid-cols-[0.5fr_1fr_1fr_1fr] gap-6 p-4 w-full">
          <div className="flex flex-col items-center relative"></div>

          <div className="col-span-2">
            <h3 className="font-bold text-[#CC5C00] text-lg mb-2">Thông tin cá nhân</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <label className="w-32 text-sm font-medium">Giới tính</label>
                  <Dropdown options={gioiTinh} width="long" />
                </div>
                <div className="flex items-center">
                  <label className="w-32 text-sm font-medium">Dân tộc</label>
                  <Dropdown options={danToc} width="long" />
                </div>
                <div className="flex items-center">
                  <label className="w-28 text-sm font-medium">Ngày vào trường</label>
                  <div className="relative w-2/3">
                    <DatePicker onChange={handleDateChange} value={date} className="max-w-full" width="100%" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="enableDoanVien"
                    checked={isEnabledDoanVien}
                    onChange={(e) => setIsEnabledDoanVien(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <label htmlFor="enableDoanVien" className="text-sm font-medium">
                    Đoàn viên
                  </label>
                </div>

                <div className={`flex items-center ${!isEnabledDoanVien ? 'pointer-events-none opacity-50' : ''}`}>
                  <label className="w-28 text-sm font-medium">Dân tộc</label>
                  <Dropdown options={danToc} width="long" />
                </div>

                <div className={`flex items-center ${!isEnabledDoanVien ? 'pointer-events-none opacity-50' : ''}`}>
                  <label className="w-28 text-sm font-medium">Ngày vào đoàn</label>
                  <div className="relative w-2/3">
                    <DatePicker onChange={handleDateChange} value={date} className="max-w-full" width="100%" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="space-y-3 mt-8">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="enableDangVien"
                  checked={isEnabledDangVien}
                  onChange={(e) => setIsEnabledDangVien(e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="enableDangVien" className="text-sm font-medium">
                  Đảng viên
                </label>
              </div>

              <div className={`flex items-center ${!isEnabledDangVien ? 'pointer-events-none opacity-50' : ''}`}>
                <label className="w-28 text-sm font-medium">Dân tộc</label>
                <Dropdown options={danToc} width="long" />
              </div>

              <div className={`flex items-center ${!isEnabledDangVien ? 'pointer-events-none opacity-50' : ''}`}>
                <label className="w-28 text-sm font-medium">Ngày vào đảng</label>
                <div className="relative w-2/3">
                  <DatePicker onChange={handleDateChange} value={date} className="max-w-full" width="100%" />
                </div>
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
              <button onClick={handleOpenModal} className="bg-[#CC5C00] text-white px-4 py-2 rounded">
                Thêm
              </button>
            </div>

            <table className="w-full border border-gray-300 mt-3">
              <thead>
                <tr className="bg-[#373839] text-white">
                  <th className="px-4 py-2 text-left">Người liên hệ</th>
                  <th className="px-4 py-2 text-left">Địa chỉ</th>
                  <th className="px-4 py-2 text-left">SĐT</th>
                  <th className="px-4 py-2 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact, index) => (
                  <tr key={contact.id} className={`border-b border-gray-300 ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                    <td className="px-4 py-2">{contact.name}</td>
                    <td className="px-4 py-2">{contact.address}</td>
                    <td className="px-4 py-2">{contact.phone}</td>
                    <td className="px-4 py-2">
                      <img src={trashIcon} alt="Trash" className="w-8 h-8 cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
              <div className="bg-white p-6 rounded-lg w-[40%]">
                <h2 className="text-lg font-bold mb-4 text-center">Thêm người liên hệ</h2>

                <div className="flex items-center mb-3">
                  <label className="w-24">Họ và tên:</label>
                  <input
                    type="text"
                    className="flex-1 border border-gray-300 p-2 rounded"
                    value={newContact.name}
                    onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  />
                </div>

                <div className="flex items-center mb-3">
                  <label className="w-24">Địa chỉ:</label>
                  <input
                    type="text"
                    className="flex-1 border border-gray-300 p-2 rounded"
                    value={newContact.address}
                    onChange={(e) => setNewContact({ ...newContact, address: e.target.value })}
                  />
                </div>

                <div className="flex items-center mb-3">
                  <label className="w-24">Số điện thoại:</label>
                  <input
                    type="text"
                    className="flex-1 border border-gray-300 p-2 rounded"
                    value={newContact.phone}
                    onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  />
                </div>

                {/* Nút Hủy và Lưu */}
                <div className="flex justify-center gap-3 mt-4">
                  <Button label="Hủy" backgroundColor="#F2F2F2" size="big" variant="none" onClick={() => setShowPopup(false)} />
                  <Button label="Lưu" size="big" variant="solid" onClick={handleSaveContact} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorUpdate;
