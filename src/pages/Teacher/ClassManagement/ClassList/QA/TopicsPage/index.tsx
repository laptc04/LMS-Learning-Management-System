import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaSearch, FaEye, FaComment } from "react-icons/fa";
import { FaPaperclip, FaPaperPlane, FaClock, FaCalendarAlt } from "react-icons/fa";


const QnAList: React.FC = () => {
    const location = useLocation();
    const [questions, setQuestions] = useState<any[]>([]);
    const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);

    useEffect(() => {
        fetch("/qna.json")
            .then((res) => res.json())
            .then((data) => setQuestions(data));
    }, []);

    const getTabFilter = () => {
        if (location.pathname.includes("answered")) return "answered";
        if (location.pathname.includes("recent")) return "recent";
        if (location.pathname.includes("topics")) return "topics";
        return "all";
    };

    const selectedTab = getTabFilter();

    const filteredQuestions = questions.filter((q) => {
        if (selectedTab === "answered") return q.answered;
        if (selectedTab === "recent") return new Date(q.time) > new Date("2024-03-06");
        if (selectedTab === "topics") return q.topic;
        return true;
    });


    const formatTime = (time: string) => {
        const date = new Date(time);
        const now = new Date();

        // Nếu là hôm nay, chỉ hiển thị giờ:phút
        if (date.toDateString() === now.toDateString()) {
            return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        }

        return date.toLocaleDateString("vi-VN", { day: "numeric", month: "long", year: "numeric" });
    };

    const selectedQ = questions.find((q) => q.id === selectedQuestion);

    const [isReplying, setIsReplying] = useState(false);
    const [replyText, setReplyText] = useState("");

    const handleReplyClick = () => {
        setIsReplying(!isReplying);
    };

    const handleSendReply = () => {
        if (replyText.trim() === "") return;

        // Xử lý gửi phản hồi (có thể gọi API)
        console.log("Gửi phản hồi:", replyText);

        // Đặt lại trạng thái
        setReplyText("");
        setIsReplying(false);
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="max-w-[350px] rounded-lg bg-white shadow-lg p-4 flex flex-col overflow-hidden">
                <div className="relative w-full mb-4">
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên topic"
                        className="px-3 py-2 text-sm font-normal rounded-3xl w-full pl-10 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-[#EFEFEF] italic"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <FaSearch className="text-gray-400" />
                    </div>
                </div>

                <div className="space-y-3 flex-grow overflow-y-auto max-h-screen">
                    {questions.map((q) => (
                        <div
                            key={q.id}
                            className={`p-4 border rounded-lg cursor-pointer ${selectedQuestion === q.id ? "bg-gray-100" : "border-orange-300"
                                }`}
                            onClick={() => setSelectedQuestion(q.id)}
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold text-gray-800">Tại sao nước biển lại mặn hehe</h3>
                                <span className="text-sm text-gray-500">15 Th10</span>
                            </div>
                            <p className="text-gray-600 text-sm mt-1">{q.message.slice(0, 100)}...</p>
                            <div className="flex items-center text-xs text-gray-500 mt-2">
                                <FaEye className="mr-1" /> {q.views}
                                <FaComment className="ml-3 mr-1" /> {q.comments}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Nội dung chi tiết */}
            
                {selectedQ ? (
                    <div className="flex-1 flex flex-col shadow-lg rounded-lg bg-white p-6 ml-4">
                        {/* Hàng ngang chứa avatar, tên, thời gian và nút trả lời */}
                        <div className="flex items-center justify-between border border-gray-300 p-4 rounded-lg shadow-sm">
                        <div className="flex items-center space-x-3 ">
                                
                                <div>
                                    <h4 className="font-bold text-orange-600">Tại sao nước biển lại mặn</h4>
                                    <div className="flex items-center space-x-4 text-gray-500 text-sm mt-[5px]">
                                        <div className="flex items-center space-x-1">
                                            <FaClock className="text-gray-400" />
                                            <span>16:00</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <FaCalendarAlt className="text-gray-400" />
                                            <span>{formatTime(selectedQ.time)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                className={`px-5 py-1 rounded-md font-bold focus:outline-none 
                                            ${isReplying
                                        ? "text-orange-500 bg-transparent"  // Khi là nút Hủy
                                        : "text-black bg-orange-200 border border-orange-500"}`} // Khi là nút Trả lời
                                onClick={handleReplyClick}
                            >
                                {isReplying ? "Hủy" : "Trả lời"}
                            </button>
                        </div>

                        {/* Nội dung câu hỏi */}
                        <div className="ml-6 mt-4 text-gray-700 whitespace-pre-line">
                            {questions.find((q) => q.id === selectedQuestion)?.message}
                        </div>


                


                        {/* Danh sách phản hồi */}

                    <div className="max-h-[500px] overflow-y-auto">
                        <div className="mb-2">
                            <div className="flex items-center space-x-3 pl-12 pr-12 mt-3">
                                <img src={selectedQ.avatar} alt={selectedQ.sender} className="w-10 h-10 rounded-full" />
                                <div className="w-full">
                                    <h4 className="font-bold text-orange-600">{selectedQ.sender}</h4>
                                    <div className="flex justify-between text-gray-500 text-sm w-full">
                                        <span>{formatTime(selectedQ.time)}</span>
                                        <span>16:30</span>
                                    </div>
                                </div>

                            </div>

                            {/* Nội dung câu hỏi */}
                            <div className="mt-2 text-gray-700 whitespace-pre-line pl-12 pr-12">
                                {selectedQ.message}
                            </div>

                        </div>
                        <div className="mb-2">
                            <div className="flex items-center space-x-3 pl-12 pr-12 mt-3">
                                <img src={selectedQ.avatar} alt={selectedQ.sender} className="w-10 h-10 rounded-full" />
                                <div className="w-full">
                                    <h4 className="font-bold text-orange-600">{selectedQ.sender}</h4>
                                    <div className="flex justify-between text-gray-500 text-sm w-full">
                                        <span>{formatTime(selectedQ.time)}</span>
                                        <span>16:30</span>
                                    </div>
                                </div>

                            </div>

                            {/* Nội dung câu hỏi */}
                            <div className="mt-2 text-gray-700 whitespace-pre-line pl-12 pr-12">
                                {selectedQ.message}
                            </div>

                        </div>
                        <div className="mb-2">
                            <div className="flex items-center space-x-3 pl-12 pr-12 mt-3">
                                <img src={selectedQ.avatar} alt={selectedQ.sender} className="w-10 h-10 rounded-full" />
                                <div className="w-full">
                                    <h4 className="font-bold text-orange-600">{selectedQ.sender}</h4>
                                    <div className="flex justify-between text-gray-500 text-sm w-full">
                                        <span>{formatTime(selectedQ.time)}</span>
                                        <span>16:30</span>
                                    </div>
                                </div>

                            </div>

                            {/* Nội dung câu hỏi */}
                            <div className="mt-2 text-gray-700 whitespace-pre-line pl-12 pr-12">
                                {selectedQ.message}
                            </div>

                        </div>
                        <div className="mb-2">
                            <div className="flex items-center space-x-3 pl-12 pr-12 mt-3">
                                <img src={selectedQ.avatar} alt={selectedQ.sender} className="w-10 h-10 rounded-full" />
                                <div className="w-full">
                                    <h4 className="font-bold text-orange-600">{selectedQ.sender}</h4>
                                    <div className="flex justify-between text-gray-500 text-sm w-full">
                                        <span>{formatTime(selectedQ.time)}</span>
                                        <span>16:30</span>
                                    </div>
                                </div>

                            </div>

                            {/* Nội dung câu hỏi */}
                            <div className="mt-2 text-gray-700 whitespace-pre-line pl-12 pr-12">
                                {selectedQ.message}
                            </div>

                        </div>
                        <div className="mb-2">
                            <div className="flex items-center space-x-3 pl-12 pr-12 mt-3">
                                <img src={selectedQ.avatar} alt={selectedQ.sender} className="w-10 h-10 rounded-full" />
                                <div className="w-full">
                                    <h4 className="font-bold text-orange-600">{selectedQ.sender}</h4>
                                    <div className="flex justify-between text-gray-500 text-sm w-full">
                                        <span>{formatTime(selectedQ.time)}</span>
                                        <span>16:30</span>
                                    </div>
                                </div>

                            </div>

                            {/* Nội dung câu hỏi */}
                            <div className="mt-2 text-gray-700 whitespace-pre-line pl-12 pr-12">
                                {selectedQ.message}
                            </div>

                        </div>
                        <div className="mb-2">
                            <div className="flex items-center space-x-3 pl-12 pr-12 mt-3">
                                <img src={selectedQ.avatar} alt={selectedQ.sender} className="w-10 h-10 rounded-full" />
                                <div className="w-full">
                                    <h4 className="font-bold text-orange-600">{selectedQ.sender}</h4>
                                    <div className="flex justify-between text-gray-500 text-sm w-full">
                                        <span>{formatTime(selectedQ.time)}</span>
                                        <span>16:30</span>
                                    </div>
                                </div>

                            </div>

                            {/* Nội dung câu hỏi */}
                            <div className="mt-2 text-gray-700 whitespace-pre-line pl-12 pr-12">
                                {selectedQ.message}
                            </div>

                        </div>
                        
                        
                    
                    </div>
                    

                    

                        {/* Ô nhập câu trả lời (chỉ hiển thị khi bấm Trả lời) */}
                        {isReplying && (
                            <div className="relative mt-14">
                                {/* Input box */}
                                <textarea
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    className="w-full border font-source-sans text-gray-400 rounded-lg p-5 pt-3 pl-20 pr-14 focus:outline-none h-32 resize-none"
                                    spellCheck={false} // Tắt kiểm tra chính tả
                                />
                                {/* Icon Paperclip */}
                                <FaPaperclip className="absolute left-12 top-4 text-gray-400 text-xl" />
                                {/* Placeholder (chỉ hiển thị nếu chưa nhập nội dung) */}
                                {!replyText && (
                                    <span className="absolute left-20 top-4 text-gray-400 text-base pointer-events-none">
                                        Nhập câu trả lời...
                                    </span>
                                )}
                                {/* Send Button */}
                                <button onClick={handleSendReply}>
                                    <FaPaperPlane className="absolute right-4 top-4 text-orange-500 text-xl cursor-pointer" />
                                </button>
                            </div>
                        )}

                    </div>
                ) : (
                    <div className="flex-1 flex flex-col shadow-lg rounded-lg bg-white p-6 ml-4">
                        <p className="text-gray-700">Chưa có topic</p>
                    </div>
                )}
            


        </div>
    );
};

export default QnAList;
