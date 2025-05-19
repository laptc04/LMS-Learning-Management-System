import React, { useState } from "react";
import AllTestList from "./Completed";
import UpcomingTests from "./Upcoming";
import Upcoming from "./Upcoming";
import Completed from "./Completed";


const tabs = [
    { id: "upcoming", label: "Lớp học sắp tới" },
    { id: "completed", label: "Lớp học đã tổ chức" },
];

export default function ClassManagementList() {
    const [activeTab, setActiveTab] = useState("upcoming");

    return (
        <div>
            <div>
                <h1 className="text-3xl font-bold mb-3">Quản lý lớp học</h1>
            </div>
            <div className="flex items-center justify-between rounded-t-lg ">
                {/* Tabs */}
                <div className="flex">
                    {tabs.map((tab, index) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-[207px] h-[72px] px-6 py-3 text-sm font-extrabold  rounded-t-lg border-x border-t ${activeTab === tab.id
                                ? "bg-gradient-to-r from-orange-500 to-orange-400 text-white border-orange-500"
                                : "border-orange-500 text-gray-800 bg-white"
                                } ${index !== 0 ? "ml-2" : ""} border-b-0`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className=" bg-white rounded-tr-2xl rounded-b-2xl shadow-md">
                {activeTab === "upcoming" && <Upcoming />}
                {activeTab === "completed" && <Completed />}
            </div>
        </div>
    )
}
