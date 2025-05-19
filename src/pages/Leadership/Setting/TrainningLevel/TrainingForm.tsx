import { useState } from "react";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";

function TrainingSetup() {
    const [subjectType, setSubjectType] = useState("");
    const [trainingType, setTrainingType] = useState("");
    const [studyDuration, setStudyDuration] = useState("");
    const [note, setNote] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [selected, setSelected] = useState<string[]>(["tinchi"]);
    const [userGroup, setUserGroup] = useState('');

    const handleCheckboxChange = (value: string) => {
        setSelected((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    return (
        <div className="flex justify-center items-center">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-2xl">
                <h2 className="text-2xl font-semibold text-center mb-6">Thiết lập Bậc đào tạo</h2>

                {/* Trình độ đào tạo */}
                <div className="mb-4 flex items-center">
                    <label className="w-1/4 text-gray-900 font-medium">Trình độ đào tạo:</label>
                    <div className="w-3/4 flex items-center gap-2">
                        <Input
                            type="text"
                            border="grey"
                            size="full"
                            value={trainingType}
                            onChange={(e) => setTrainingType(e.target.value)}
                        />
                    </div>
                </div>

                {/* Hình thức đào tạo */}
                <div className="mb-4 flex items-center">
                    <label className="w-1/4 text-gray-900 font-medium">Hình thức đào tạo:</label>
                    <div className="w-3/4 flex items-center gap-2">
                        <Input
                            type="text"
                            border="grey"
                            size="full"
                            value={trainingType}
                            onChange={(e) => setTrainingType(e.target.value)}
                        />
                    </div>
                </div>

                {/* Checkbox Niên chế & Tín chỉ */}
                {/* Checkbox Niên chế & Tín chỉ */}
                <div className="mb-4 flex">
                    {/* Phần trống bên trái chiếm 25% */}
                    <div className="w-1/4"></div>

                    {/* Phần checkbox chiếm 75% */}
                    <div className="w-3/4">
                        {/* Niên chế */}
                        <label className="flex items-start gap-2 cursor-pointer mb-4">
                            <input
                                type="checkbox"
                                value="nienche"
                                checked={selected.includes("nienche")}
                                onChange={() => handleCheckboxChange("nienche")}
                                className="w-5 h-5 accent-blue-500 mt-1"
                            />
                            <div>
                                <span className="font-medium">Niên chế</span>
                                <p className="text-gray-600 italic text-sm leading-relaxed">
                                    Đào tạo theo niên chế là đào tạo theo đơn vị năm học. <br />
                                    Mỗi chương trình đào tạo của một ngành, nghề được thực hiện trong một số tháng hoặc năm nhất định. <br />
                                    Mỗi năm học thường được tổ chức thành hai học kỳ.
                                </p>
                            </div>
                        </label>

                        {/* Tín chỉ */}
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                value="tinchi"
                                checked={selected.includes("tinchi")}
                                onChange={() => handleCheckboxChange("tinchi")}
                                className="w-5 h-5 accent-blue-500"
                            />
                            <span className="font-medium">Tín chỉ</span>
                        </label>
                    </div>
                </div>


                {/* Thời gian đào tạo */}
                <div className="mb-4 flex items-center">
                    <label className="w-1/4 text-gray-900 font-medium">Thời gian đào tạo:</label>
                    <div className="flex gap-4 w-3/4">
                        <Input
                            type="text"
                            value={userGroup}
                            onChange={(e) => setUserGroup(e.target.value)}
                            placeholder=""
                            border="grey"
                            size="small"
                        />
                        <span className="text-gray-700 self-center">Năm</span>
                        <Input
                            type="text"
                            value={userGroup}
                            onChange={(e) => setUserGroup(e.target.value)}
                            placeholder=""
                            border="grey"
                            size="small"
                        />
                        <Input
                            type="text"
                            value={userGroup}
                            onChange={(e) => setUserGroup(e.target.value)}
                            placeholder=""
                            border="grey"
                            size="small"
                        />
                    </div>
                </div>

                {/* Ghi chú */}
                <div className="mb-4 flex">
                    <label className="w-1/4 text-gray-900 font-medium">Ghi chú:</label>
                    <textarea
                        className="w-3/4 border border-gray-300 rounded-lg p-2 h-24"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder=""
                    ></textarea>
                </div>

                {/* Kích hoạt */}
                {/* Kích hoạt */}
                <div className="mb-4 flex">
                    {/* Phần trống bên trái chiếm 25% */}
                    <div className="w-1/4"></div>

                    {/* Phần checkbox chiếm 75% */}
                    <div className="w-3/4 flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={isActive}
                            onChange={() => setIsActive(!isActive)}
                            className="w-5 h-5 accent-blue-500"
                        />
                        <span className="font-medium">Kích hoạt</span>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-center space-x-4 mt-6">
                    <Button label="Hủy" size="medium" variant="solid" backgroundColor="#E0E0E0" textColor="black" onClick={() => console.log('Hủy')} />
                    <Button label="Lưu" size="medium" variant="solid" backgroundColor="#FF7506" textColor="white" onClick={() => console.log('Lưu')} />
                </div>
            </div>
        </div>
    );
}

export default TrainingSetup;
