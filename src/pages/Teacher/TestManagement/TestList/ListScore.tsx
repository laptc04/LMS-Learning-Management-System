import React, { useState } from "react";
import Button from "../../../../components/Button";
import { FaSearch } from "react-icons/fa";
import Input from "../../../../components/Input";
import Dropdown from "../../../../components/Dropdown";
import DatePicker from "../../../../components/DatePicker";
import AllTestList from "./AllTestList";
import UpcomingTests from "./UpcomingTest";
import GradedTest from "./ListOfTest2/GradedTest";
import UngradedTest from "./ListOfTest2/UngradedTest";
import { useNavigate } from "react-router-dom";


const tabs = [
    { id: "all", label: "Tất cả bài kiểm tra" },
    { id: "upcoming", label: "Bài kiểm tra sắp tới" },
    { id: "graded", label: "Bài kiểm tra đã chấm" },
    { id: "ungraded", label: "Bài kiểm tra chưa chấm" },
];
interface DropdownOption {
    id: number;
    value: string;
}

interface DropdownProps {
    options: DropdownOption[];
    onChange: (selected: DropdownOption) => void;
    value?: string;
}

export default function ListScore() {
    const [activeTab, setActiveTab] = useState("all");
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const subjectOptions: DropdownOption[] = [
        { id: 1, value: "Ngữ Văn " },
        { id: 2, value: "Toán" },
        { id: 3, value: "Vật lý" }

    ];
    const blockOptions: DropdownOption[] = [
        { id: 1, value: "Khối 10 " },
        { id: 2, value: "Khối 11" },
        { id: 3, value: "Khối 12" }

    ];
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    return (
        <div>
            <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md rounded-lg">
                {/* Tabs */}
                <div className="flex">
                    {tabs.map((tab, index) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-3 text-sm font-medium rounded-t-lg border-x border-t ${activeTab === tab.id
                                ? "bg-gradient-to-r from-orange-500 to-orange-400 text-white border-orange-500 shadow-md"
                                : "border-orange-500 text-gray-800 bg-white"
                                } ${index !== 0 ? "ml-2" : ""} border-b-0`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>


                {/* Add Exam Button */}
                <Button label="Thêm bài kiểm tra" size="medium" variant="solid" backgroundColor="#FF7506" textColor="white" onClick={() => navigate("/teacher/test-management/add")} />

            </div>
            <div className="p-4 bg-white shadow-md rounded-lg mt-1">
                {activeTab === "all" && <AllTestList />}
                {activeTab === "upcoming" && <UpcomingTests />}
                {activeTab === "graded" && <GradedTest />}
                {activeTab === "ungraded" && <UngradedTest />}
            </div>
        </div>
    )
}
