import React, { useState } from 'react';
import arrowL from '../../assets/images/arrow_left.png';
import arrowR from '../../assets/images/arrow_right.png';
import PaginationProps from './type';

interface ExtendedPaginationProps extends PaginationProps {
  onPageChange: (page: number) => void; // Callback for page change
  onLimitChange: (limit: number) => void; // Callback for limit change
}

const Pagination: React.FC<ExtendedPaginationProps> = ({ limit, activation, max, onPageChange, onLimitChange }) => {
  const [inputLimit, setInputLimit] = useState(limit.toString()); // Local state for input

  // Function to render pagination buttons
  const renderPageNumbers = () => {
    const pages = [];

    // If page number is less than 5, show all
    if (max <= 5) {
      for (let i = 1; i <= max; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`px-4 py-2 rounded-full transition duration-200 ${activation === i ? 'bg-orange-500 text-white' : 'hover:bg-orange-500 hover:text-white'}`}
          >
            {i}
          </button>,
        );
      }
    } else {
      // The number of pages is greater than 5
      if (activation > 2) {
        pages.push(
          <button
            key={1}
            onClick={() => onPageChange(1)}
            className="px-4 py-2 rounded-full hover:bg-orange-500 hover:text-white"
          >
            1
          </button>,
        );
        if (activation > 3) {
          pages.push(
            <span key="dots-left" className="text-2xl">
              ...
            </span>,
          );
        }
      }

      // Show pages around the active page
      for (let i = Math.max(1, activation - 1); i <= Math.min(max, activation + 1); i++) {
        pages.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`px-4 py-2 rounded-full transition duration-200 ${activation === i ? 'bg-orange-500 text-white' : 'hover:bg-orange-500 hover:text-white'}`}
          >
            {i}
          </button>,
        );
      }

      // The "..." and the last page
      if (activation < max - 2) {
        pages.push(
          <span key="dots-right" className="text-2xl">
            ...
          </span>,
        );
        pages.push(
          <button
            key={max}
            onClick={() => onPageChange(max)}
            className="px-4 py-2 rounded-full hover:bg-orange-500 hover:text-white"
          >
            {max}
          </button>,
        );
      }
    }

    return pages;
  };

  // Handle limit input change
  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputLimit(value);
    const parsedLimit = parseInt(value, 10);
    if (!isNaN(parsedLimit) && parsedLimit > 0) {
      onLimitChange(parsedLimit); // Notify parent of limit change
    }
  };

  return (
    <div className="w-full bg-white py-4 px-6 flex justify-between items-center">
      <div className="flex items-center">
        <i>Hiển thị</i>
        <input
          type="number"
          value={inputLimit}
          onChange={handleLimitChange}
          className="border-2 border-orange-500 px-2 py-1 rounded m-2 w-14 text-center focus:outline-none focus:ring-2 focus:ring-orange-500"
          min="1"
          max="10"
        />
        <i>hàng trong mỗi trang</i>
      </div>

      <div className="flex space-x-2 items-center">
        {/* Previous Page Button */}
        <button
          onClick={() => onPageChange(activation - 1)}
          className="px-4 py-2 hover:bg-gray-200 rounded-full"
          disabled={activation === 1}
        >
          <img src={arrowL} alt="" className="w-6 h-6" />
        </button>

        {/* Pagination buttons */}
        {renderPageNumbers()}

        {/* Next Page Button */}
        <button
          onClick={() => onPageChange(activation + 1)}
          className="px-4 py-2 hover:bg-gray-200 rounded-full"
          disabled={activation === max}
        >
          <img src={arrowR} alt="" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;