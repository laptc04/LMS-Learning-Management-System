import React from 'react';
import { StatusComponentProps } from './type';

// Define the type for statusMap
interface StatusMap {
  [key: number]: { status: string; color: string };
}


const StatusComponent: React.FC<StatusComponentProps> = ({ statusId }) => {
  // Mapping the statusId to corresponding status text and color
  const statusMap: StatusMap = {
    1: { status: 'Đang học', color: '#49C510' }, // Green
    2: { status: 'Đang bảo lưu', color: '#FF7506' }, // Orange
    3: { status: 'Đã tốt nghiệp', color: '#0B80EC' }, // Blue
    4: { status: 'Đã chuyển trường', color: '#373839' }, // Black
    5: { status: 'Rút lui', color: '#ED2025' }, // Red
  };

  const { status, color } = statusMap[statusId] || { status: 'Unknown', color: '#000' }; // Default fallback

  return (
    <div className="flex justify-center">
      <div
        className="inline-flex items-center justify-center px-4 py-2 rounded border gap-2 text-[15px] font-medium whitespace-nowrap"
        style={{ color: color, borderColor: color }}
      >
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></span>
        {status}
      </div>
    </div>
  );
};

export default StatusComponent;

/* Use component:
    <StatusComponent statusId={1} /> // Đang học - màu xanh là cây
    <StatusComponent statusId={2} /> // Đang bảo lưu - màu cam
    <StatusComponent statusId={3} /> // Đã tốt nghiệp - màu xanh dương
    <StatusComponent statusId={4} /> // Đã chuyển trường - màu đen
    <StatusComponent statusId={5} /> // Rút lui - màu đỏ
*/
