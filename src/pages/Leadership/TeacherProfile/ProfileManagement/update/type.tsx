import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
export interface Option {
  id: number;
  value: string;
}
export interface SidebarProps {
  setSelectedContent: (content: string) => void;
  selectedContent: string;
}

const Counter = () => {
  const dispatch = useDispatch();

  // Cập nhật useSelector để chỉ định loại RootState
};

export default Counter;
