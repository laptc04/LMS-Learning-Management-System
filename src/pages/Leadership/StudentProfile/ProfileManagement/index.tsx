import { useState } from "react";
import Dropdown from "../../../../components/Dropdown";
import CommendationList from "./CommendationList";
import Accordion from "./ListDist";
import AccordionStudy from "./ResultStudy";
import GeneralStudent from "./General";

interface Option {
  id: string | number;
  value: string;
}

const ProfileManagement = () => {
  const [activeTab, setActiveTab] = useState<"info" | "study">("study");

  const classTypes: Option[] = ["Lớp chuyên ban", "Lớp cá nhân", "Lớp thông thường"].map((type, index) => ({
    id: index,
    value: type,
  }));

  return (
    <div className="">
      <h1 className="text-3xl font-bold">Trang hồ sơ</h1>

      {/* Tabs + Dropdowns + Button cùng hàng */}
      <div className="flex  gap-4 p-2 bg-white">
        {/* Tabs */}
        <div className="flex items-center bg-gray-100 p-1 rounded-full">
          <button
            className={`px-4 py-2 font-medium rounded-full ${activeTab === "info" ? "bg-gray-800 text-white" : "text-gray-400"
              }`}
            onClick={() => setActiveTab("info")}
          >
            Thông tin chung
          </button>
          <button
            className={`px-4 py-2 font-medium rounded-full ${activeTab === "study" ? "bg-gray-800 text-white" : "text-gray-400"
              }`}
            onClick={() => setActiveTab("study")}
          >
            Quá trình học tập
          </button>
        </div>

        {/* Dropdowns */}
        {activeTab === "study" && (
          <div className="flex items-center gap-4">
            <div className="relative">
              <Dropdown options={classTypes} />
            </div>
            <div className="relative">
              <Dropdown options={classTypes} />
            </div>
          </div>
        )}

        {/* Nút Xuất File */}
        {activeTab === "study" && (
          <button className="ml-auto px-4 py-1 border border-orange-500 text-orange-500 rounded-md text-sm font-medium hover:bg-orange-50">
            Xuất file
          </button>
        )}
      </div>

      {/* Nội dung tab "Thông tin chung" */}
      {activeTab === "info" && (
        <GeneralStudent />
      )}

      {/* Nội dung tab "Quá trình học tập" */}
      {activeTab === "study" && (
        <div>
          <AccordionStudy title="Kết quả học tập" />
          <CommendationList title="Danh sách khen thưởng" />
          <Accordion title="Danh sách kỷ luật" />
        </div>
      )}
    </div>
  );
};

export default ProfileManagement;
