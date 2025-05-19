import React from "react";
import { Link } from "react-router-dom";
import TruncatedText from "../../../utils/TruncatedText";
import List from "../../../assets/images/fi_list.png";
import Edit from "../../../assets/images/fi_edit.png";
import Trash from "../../../assets/images/fi_trash-2.png";

interface Class {
  id: number;
  classCode: string;
  className: string;
  homeroomTeacher: string;
}

interface TableRowProps {
  cls: Class;
  index: number;
  selectedClasses: number[];
  onCheckboxChange: (classId: number) => void;
  onEditClick: (classId: number) => void;
  onDeleteClick: (cls: Class) => void;
}

const TableRow = React.memo(
  ({ cls, index, selectedClasses, onCheckboxChange, onEditClick, onDeleteClick }: TableRowProps) => {
    return (
      <tr className={`hover:bg-gray-50 ${index % 2 === 1 ? "bg-gray-50" : ""}`}>
        <td className="px-4 py-1 text-center">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="hidden"
              checked={selectedClasses.includes(cls.id)}
              onChange={() => onCheckboxChange(cls.id)}
            />
            <div
              className={`w-5 h-5 border-2 rounded-sm transition-all duration-200 ${
                selectedClasses.includes(cls.id)
                  ? "bg-blue-500 border-blue-500"
                  : "border-blue-500 bg-white"
              }`}
            >
              {selectedClasses.includes(cls.id) && (
                <svg
                  className="w-[16px] h-[16px] text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 21 18"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M20.707 5.293a1 1 0 010 1.414l-10 10a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L10 14.586l9.293-9.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </label>
        </td>
        <td className="px-4 py-1 text-sm">
          <TruncatedText text={cls.classCode} maxLength={15} />
        </td>
        <td className="px-4 py-1 text-sm">
          <Link to={`/leadership/classes/detail/${cls.id}`}>{cls.className}</Link>
        </td>
        <td className="px-4 py-1 text-sm">
          <TruncatedText text={cls.homeroomTeacher} maxLength={20} />
        </td>
        <td className="px-4 py-1 flex gap-1 justify-center">
          <button className="p-1 text-orange-500 hover:bg-orange-50 rounded">
            <img src={List} alt="List" className="w-6 h-6" />
          </button>
          <button
            className="p-1 text-orange-500 hover:bg-orange-50 rounded"
            onClick={() => onEditClick(cls.id)}
          >
            <img src={Edit} alt="Edit" className="w-6 h-6" />
          </button>
          <button
            className="p-1 text-orange-500 hover:bg-orange-50 rounded"
            onClick={() => onDeleteClick(cls)}
          >
            <img src={Trash} alt="Delete" className="w-6 h-6" />
          </button>
        </td>
      </tr>
    );
  }
);

export default TableRow;