import React from "react";
import { useNavigate } from "react-router-dom";

import { FaPlus } from "react-icons/fa";
import Button from "../../../../components/Button";
import Dropdown from "../../../../components/Dropdown";

interface DropdownOption {
    id: number;
    value: string;
}

interface DropdownProps {
    options: DropdownOption[];
    onChange: (selected: DropdownOption) => void;
    value?: string;
}

interface PageHeaderProps {
    title: string; // Tiêu đề có thể thay đổi
    addButtonLink: string; // Đường dẫn của nút "Thêm mới"
}

const HeaderSection: React.FC<PageHeaderProps> = ({ title, addButtonLink }) => {
    const navigate = useNavigate();

    const yearOptions: DropdownOption[] = Array.from({ length: 50 }, (_, i) => {
        const startYear = 2000 + i;
        const endYear = startYear + 1;
        return {
            id: startYear,
            value: `${startYear}-${endYear}`, // Định dạng "YYYY-YYYY"
        };
    });

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">{title}</h1>
            <div className="flex justify-between items-center w-full mb-3 mt-3">
                {/* Dropdown nằm bên trái */}
                <div className="flex items-center gap-4">
                    <Dropdown options={yearOptions} />
                </div>

                {/* Nút "Thêm mới" nằm bên phải */}
                <Button
                    label="Thêm mới"
                    textColor="white"
                    backgroundColor="#FF7506"
                    size="medium"
                    variant="none"
                    onClick={() => navigate(addButtonLink)} // Điều hướng theo link truyền vào
                    icon={<FaPlus />}
                />
            </div>

        </div>

    );
};

export default HeaderSection;
