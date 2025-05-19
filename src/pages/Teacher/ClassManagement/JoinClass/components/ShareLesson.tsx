import { useState } from "react";
import { ChevronDown, MessageSquare, Minus, Paperclip, Send } from "lucide-react";

const ShareLesson = () => {
    const [link] = useState("https://school.edu.vn/baigiang/???????");
    const [isChatOpen, setIsChatOpen] = useState(false);
    const unreadMessages = 3; // Số tin nhắn chưa đọc
    const [messages, setMessages] = useState([
        { sender: "Thanh Tâm (GV)", text: "Các bạn có nghe rõ cô nói không?", type: "teacher" },
        { sender: "Hiền Mai", text: "Có nè cô ơi!", type: "student" },
        { sender: "Trần Thị M", text: "Kiểm tra miệng hong cô êi =))", type: "student" },
        {
            sender: "Thanh Tâm (GV)",
            text: "Địa điểm xuất phát phát triển của nền văn minh Hy Lạp là đồng bằng Thessalia màu mỡ...",
            type: "teacher",
        },
        { sender: "Thanh Tâm (GV)", text: "Có ai ý kiến gì không?", type: "teacher" },
        { sender: "Trần Thị M", text: "Có nè cô :)", type: "student" },
        { sender: "Phạm Văn C", text: "Hôm nào kiểm tra ạ?", type: "student" },
        { sender: "Thanh Tâm (GV)", text: "https://nordiccoder.com/blog", type: "teacher", link: true },
    ]);
    const [newMessage, setNewMessage] = useState("");

    const copyToClipboard = () => {
        navigator.clipboard.writeText(link);
        alert("Link đã được sao chép!");
    };

    const sendMessage = () => {
        if (newMessage.trim()) {
            setMessages([...messages, { sender: "Bạn", text: newMessage, type: "student" }]);
            setNewMessage("");
        }
    };

    return (
        <div className="relative p-4">
            {/* Chia sẻ tiết học */}
            <div className="flex flex-col bg-white rounded-lg shadow-md w-full p-3">
                <span className="text-gray-700 font-medium mb-1 text-left">Chia sẻ tiết học:</span>
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={link}
                        readOnly
                        className="border border-gray-300 rounded px-3 py-2 w-[500px] text-gray-600"
                    />
                    <button
                        onClick={copyToClipboard}
                        className="bg-orange-500 text-white px-4 py-2 rounded font-medium hover:bg-orange-600 transition"
                    >
                        Copy link
                    </button>
                </div>
            </div>

            {/* Chat Box Container */}
            <div className="fixed bottom-5 right-5 flex flex-col items-end space-y-2">
                {/* Popup Chat */}
                {isChatOpen && (
                    <div className="bg-white shadow-lg rounded-lg w-[400px] h-[50vh] border border-gray-300">
                        {/* Header */}
                        <div className="flex items-center bg-gray-100 px-4 py-2 rounded-t-lg border-b">
                            {/* Tiêu đề chat với lớp */}
                            <div className="flex items-center justify-center flex-1 space-x-2 text-gray-700 font-semibold">
                                <ChevronDown size={18} className="text-orange-500" />
                                <h3>Chat với lớp</h3>
                            </div>

                            {/* Nút thu nhỏ với icon Minus */}
                            <button onClick={() => setIsChatOpen(false)} className="text-gray-500 hover:text-black">
                                <Minus size={18} />
                            </button>
                        </div>
                        {/* Nội dung chat */}
                        <div className="p-3 h-60 overflow-y-auto text-gray-700">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex items-start space-x-2 mb-2 ${msg.type === "teacher" ? "text-blue-600" : "text-black"}`}>
                                    <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                                    <div>
                                        <span className="font-semibold">{msg.sender}:</span>{" "}
                                        {msg.link ? <a href={msg.text} className="text-blue-500 underline">{msg.text}</a> : msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Nhập tin nhắn */}
                        <div className="border-t p-2 flex items-center">
                            <button className="text-gray-400 hover:text-gray-600 p-2">
                                <Paperclip size={18} />
                            </button>
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Nhập tin nhắn..."
                                className="flex-1 border-none outline-none px-2 text-gray-600"
                            />
                            <button onClick={sendMessage} className="text-orange-500 hover:text-orange-600 p-2">
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Nút Chat với lớp */}
                <button
                    onClick={() => setIsChatOpen(!isChatOpen)}
                    className="bg-gray-300 text-black px-4 py-2 rounded-xl flex items-center space-x-2 shadow-lg hover:bg-gray-400 transition"
                >
                    <MessageSquare size={20} className="text-orange-500" />
                    <span>Chat với lớp</span>
                    {unreadMessages > 0 && (
                        <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            {unreadMessages}
                        </span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default ShareLesson;
