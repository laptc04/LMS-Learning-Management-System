import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaPaperclip, FaPaperPlane } from "react-icons/fa";

const QnAList: React.FC = () => {
    const location = useLocation();
    const [questions, setQuestions] = useState<any[]>([]);
    const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch("/qna.json")
            .then((res) => res.json())
            .then((data) => {
                console.log("Dữ liệu nhận được:", data);
                setQuestions(data);
            })
    }, []);

    const getTabFilter = () => {
        if (location.pathname.includes("answered")) return "answered";
        if (location.pathname.includes("recent")) return "recent";
        if (location.pathname.includes("topics")) return "topics";
        return "all";
    };

    const selectedTab = getTabFilter();

    const filteredQuestions = questions
        .filter((q) => {
            if (selectedTab === "answered") return q.answered;
            if (selectedTab === "recent") return new Date(q.time) > new Date("2024-03-06");
            if (selectedTab === "topics") return q.topic;
            return true;
        })
        .filter((q) => q.sender.toLowerCase().includes(searchTerm.toLowerCase()));

    const formatTime = (time: string) => {
        const date = new Date(time);
        const now = new Date();

        // Định dạng giờ và phút
        const timeString = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        // Nếu là hôm nay, chỉ hiển thị giờ
        if (date.toDateString() === now.toDateString()) {
            return timeString;
        }

        // Nếu khác ngày, hiển thị ngày/tháng/năm + giờ
        const dateString = date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });

        return `${dateString} ${timeString}`;
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
        <div className="grid grid-cols-4 gap-6 mt-4">
            <div className="col-span-1 shadow-lg rounded-lg bg-white p-4">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/3 transform -translate-y-1/3 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên topic..."
                        className="w-full p-2 pl-10 rounded-3xl mb-3 bg-gray-100"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="space-y-2 overflow-y-auto max-h-[500px]">
                    {filteredQuestions.map((q) => (
                        <div
                            key={q.id}
                            className={`p-3 flex items-center justify-between rounded-lg cursor-pointer ${selectedQuestion === q.id ? "bg-gray-200" : ""
                                }`}
                            onClick={() => setSelectedQuestion(q.id)}
                        >
                            <div className="flex items-center">
                                <span
                                    className={`w-2 h-2 bg-yellow-500 rounded-full mr-2 ${q.answered ? "invisible" : "visible"
                                        }`}
                                ></span>
                                <img src={q.avatar} alt="avatar" className="w-12 h-12 rounded-full" />
                            </div>

                            <div className="flex-1 ml-3 text-xs overflow-hidden">
                                <p className={`${q.answered ? "text-gray-500" : "font-bold text-black"} truncate`}>
                                    {q.sender}
                                </p>
                                <p className={`${q.answered ? "text-gray-500" : "font-bold text-black"} truncate`}>
                                    {q.message}
                                </p>
                            </div>

                            <div className="text-right text-xs text-gray-500">
                                <p>👁 {q.views}</p>
                                <p>{formatTime(q.time)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="col-span-3 flex flex-col shadow-lg rounded-lg bg-white p-6">
                <div >
                    {selectedQ ? (
                        <div className="col-span-3">
                            {/* Hàng ngang chứa avatar, tên, thời gian và nút trả lời */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <img src={selectedQ.avatar} alt={selectedQ.sender} className="w-10 h-10 rounded-full" />
                                    <div>
                                        <h4 className="font-bold text-orange-600">{selectedQ.sender}</h4>
                                        <span className="text-gray-500 text-sm">{formatTime(selectedQ.time)}</span>
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
                            <div className="ml-12 mt-4 text-gray-700 whitespace-pre-line">
                                {selectedQ.message}
                            </div>

                            {/* Danh sách phản hồi ------------------------------begin*/}
                            <div className="ml-14 mt-4 mb-4 space-y-4">
                                <div className="flex space-x-3 border-l-2 border-gray-300 pl-4">
                                    <img src={selectedQ.avatar} alt={selectedQ.sender} className="w-8 h-8 rounded-full" />
                                    <div>
                                        <h4 className="font-bold text-orange-600">{selectedQ.sender} <span className="text-gray-500 font-normal">— Giáo viên</span></h4>
                                        <span className="text-gray-500 text-sm">{formatTime(selectedQ.time)}</span>
                                        <p className="mt-2 text-gray-700">{selectedQ.answer}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="ml-14 mt-4 mb-4 space-y-4">
                                <div className="flex space-x-3 border-l-2 border-gray-300 pl-4">
                                    <img src={selectedQ.avatar} alt={selectedQ.sender} className="w-8 h-8 rounded-full" />
                                    <div>
                                        <h4 className="font-bold text-orange-600">{selectedQ.sender} <span className="text-gray-500 font-normal">— Giáo viên</span></h4>
                                        <span className="text-gray-500 text-sm">{formatTime(selectedQ.time)}</span>
                                        <p className="mt-2 text-gray-700">{selectedQ.answer}</p>
                                    </div>
                                </div>
                            </div>
                            {/* Danh sách phản hồi ------------------------------end*/}

                            {/* Hàng ngang chứa avatar, tên, thời gian */}
                            <div className="flex items-center space-x-3">
                                <img src={selectedQ.avatar} alt={selectedQ.sender} className="w-10 h-10 rounded-full" />
                                <div>
                                    <h4 className="font-bold text-orange-600">{selectedQ.sender}</h4>
                                    <span className="text-gray-500 text-sm">{formatTime(selectedQ.time)}</span>
                                </div>
                            </div>

                            {/* Nội dung câu hỏi */}
                            <div className="ml-12 mt-4 text-gray-700 whitespace-pre-line">
                                {selectedQ.message}
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
                        <p className="text-gray-700">Chưa có câu trả lời.</p>
                    )}
                </div>

            </div>
        </div>
    );
};

export default QnAList;
