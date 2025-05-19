import React, { useState } from "react";

const ListFaculty = () => {
    const [facultys, setFacultys] = useState([
        { id: "vl009", name: "Vật Lý 9" },
        { id: "hh010", name: "Hóa Học 10" },
        { id: "sh010", name: "Sinh Học 10" },
        { id: "vl010", name: "Vật Lý 10" },
        { id: "vl001", name: "Vật Lý 9" },
        { id: "hh002", name: "Hóa Học 10" },
        { id: "sh003", name: "Sinh Học 10" },
        { id: "vl004", name: "Vật Lý 10" },
        { id: "vl005", name: "Vật Lý 9" },
        { id: "hh006", name: "Hóa Học 10" },
        { id: "sh007", name: "Sinh Học 10" },
        { id: "vl008", name: "Vật Lý 10" },
        { id: "vl024", name: "Vật Lý 10" },
        { id: "vl025", name: "Vật Lý 9" },
        { id: "hh026", name: "Hóa Học 10" },
        { id: "sh027", name: "Sinh Học 10" },
        { id: "vl028", name: "Vật Lý 10" },
        { id: "vl014", name: "Vật Lý 10" },
        { id: "vl015", name: "Vật Lý 9" },
        { id: "hh016", name: "Hóa Học 10" },
        { id: "sh017", name: "Sinh Học 10" },
        { id: "vl018", name: "Vật Lý 10" },
    ]);

    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isConfirming, setIsConfirming] = useState(false);

    const handleCheckboxChange = (id: string) => {
        setSelectedIds(prevSelected =>
            prevSelected.includes(id)
                ? prevSelected.filter(selectedId => selectedId !== id)
                : [...prevSelected, id]
        );
    };

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelectedIds(facultys.map(faculty => faculty.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleDeleteSelected = () => {
        setFacultys(facultys.filter(faculty => !selectedIds.includes(faculty.id)));
        setSelectedIds([]);
        setIsConfirming(false);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-28px font-bold font-mulis mb-4 text-center">Danh sách lớp học</h2>

            <div className="flex justify-end mt-4">
                <button
                    onClick={() => setIsConfirming(true)}
                    disabled={selectedIds.length === 0}
                    className={`px-4 py-2 rounded-lg flex items-center`}
                >
                    <img
                        src={selectedIds.length === 0 ? "/icon/fi_trash-1.png" : "/icon/fi_trash-2.png"}
                        alt="Trash"
                        className="w-6 h-6"
                    />
                </button>
            </div>

            <div className="overflow-hidden rounded-lg shadow-sm">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="text-white" style={{ background: 'linear-gradient(to right, #F17F21, #FF5400)' }}>
                            <th className="px-4 py-2 text-left text-lg w-1/12">
                                <input
                                    type="checkbox"
                                    checked={selectedIds.length === facultys.length}
                                    onChange={handleSelectAll}
                                    className="w-6 h-6 ml-6"
                                />
                            </th>
                            <th className="px-4 py-2 text-left text-lg w-5/12">
                                <div className="flex items-center">
                                    <span className="font-mulis">Mã lớp học</span>
                                    <img src="/icon/u_arrow up down.png" alt="" className="w-6 h-6 ml-1" />
                                </div>
                            </th>
                            <th className="px-4 py-2 text-left text-lg">
                                <div className="flex items-center">
                                    <span className="font-mulis">Tên lớp học</span>
                                    <img src="/icon/u_arrow up down.png" alt="" className="w-6 h-6 ml-1" />
                                </div>
                            </th>
                        </tr>
                    </thead>
                </table>
                <div className="max-h-[307px] overflow-y-auto">
                    <table className="w-full border-collapse">
                        <tbody>
                            {facultys.map((faculty, index) => (
                                <tr key={faculty.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                                    <td className="px-4 py-3 text-left w-1/12">
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(faculty.id)}
                                            onChange={() => handleCheckboxChange(faculty.id)}
                                            className="w-6 h-6 ml-6"
                                        />
                                    </td>
                                    <td className="px-4 py-3 text-base font-source-sans w-5/12">{faculty.id}</td>
                                    <td className="pl-7 py-3 text-base font-source-sans">{faculty.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isConfirming && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg" style={{ width: 435 }}>
                        <h3 className="text-2xl font-bold text-center">Xóa</h3>
                        <p className="text-base mt-5 mb-10 font-normal font-source-sans">Xác nhận muốn xoá những thông tin đã chọn? Sau khi xoá sẽ không thể hoàn tác.</p>
                        <div className="flex justify-between w-full px-4 font-bold">
                            <button onClick={() => setIsConfirming(false)} className=" px-4 py-2 rounded-lg w-40 h-14 text-lg font-mulis" style={{ backgroundColor: "#F2F2F2" }}>
                                Hủy
                            </button>
                            <button onClick={handleDeleteSelected}
                                className="bg-orange-500 text-white px-4 py-2 rounded-lg w-40 h-14 text-lg">
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListFaculty;
