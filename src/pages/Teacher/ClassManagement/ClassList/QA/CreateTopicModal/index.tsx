import React from "react";
import { FaClock, FaCalendarAlt } from "react-icons/fa";
import { CreateTopicModalProps } from './type';

const CreateTopicModal: React.FC<CreateTopicModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]" onClick={onClose}>
            <div className="bg-white p-6 rounded-lg w-[700px] shadow-lg" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-bold mb-4 text-center">Tạo topic mới</h2>

                <input
                    type="text"
                    placeholder="Tiêu đề topic"
                    className="w-full p-2 border rounded mb-3 border-gray-300 focus:border-gray-600 focus:outline-none"
                />

                <textarea
                    rows={3}
                    placeholder="Nhập nội dung..."
                    className="w-full p-2 border rounded mb-3 border-gray-300 focus:border-gray-600 focus:outline-none"
                ></textarea>

                <div className="flex justify-between items-center">
                    <div>
                        <span className="text-sm">Thời gian đóng topic:</span>
                        <div className="flex items-center space-x-4 text-gray-500 text-sm mt-[5px]">
                            <div className="flex items-center space-x-1">
                                <FaClock className="text-[#ff7506]" />
                                <span>16:00</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <FaCalendarAlt className="text-[#ff7506]" />
                                <span>20/11/2025</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span className="text-sm">File đính kèm</span>
                        <div className="flex items-center space-x-4 text-gray-500 text-sm mt-[5px]">
                            <input
                                type="file"
                                // text-black bg-orange-200 border border-orange-500
                                className="border p-1 rounded file:bg-[#ff7506] file:text-white file:border-none file:px-2 file:py-1 file:rounded file:cursor-pointer hover:file:bg-[#e06504]"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-4 space-x-2 mt-[20px]">
                    <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
                        Hủy
                    </button>
                    <button className="px-4 py-2 bg-[#ff7506] text-white rounded">
                        Tạo Topic
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateTopicModal;