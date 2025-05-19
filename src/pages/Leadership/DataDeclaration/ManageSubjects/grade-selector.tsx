'use client';

import { ChevronDownIcon, Trash2Icon } from 'lucide-react';
import * as React from 'react';

interface DropdownProps {
  label: string;
  value: string;
  options: string[];
  width?: string;
  onChange: (value: string) => void;
}

function Dropdown({ label, value, options, width = 'w-24', onChange }: DropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-900">{label}</span>
      <div className="relative" ref={dropdownRef}>
        <button
          className={`flex items-center justify-between ${width} px-2 py-1 border rounded hover:border-gray-400 transition-colors bg-white`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-sm">{value}</span>
          <ChevronDownIcon size={16} className="text-orange-500" />
        </button>
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-full bg-white border rounded shadow-lg z-10">
            {options.map((option) => (
              <button
                key={option}
                className="w-full px-2 py-1 text-left text-sm hover:bg-gray-100"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function GradeSelector() {
  const [grade, setGrade] = React.useState('6');
  const [classroom, setClassroom] = React.useState('6A1');

  const getClassrooms = (grade: string) => {
    return [`${grade}A1`, `${grade}A2`, `${grade}A3`];
  };

  return (
    <div className="flex items-center justify-between mt-[-5px]">
      <div className="flex gap-4">
        <Dropdown label="Khối" value={grade} options={['6', '7', '8', '9']} width="w-16" onChange={setGrade} />
        <Dropdown label="Lớp" value={classroom} options={getClassrooms(grade)} width="w-24" onChange={setClassroom} />
      </div>
      <div className="flex items-center">
        <button className="text-gray-400 hover:text-gray-600 transition-colors mx-[10px]">
          <Trash2Icon size={32} />
        </button>
        <div className=" w-[1.5px] h-10 bg-gray-400"></div>
      </div>
    </div>
  );
}
