import { Mic, MicOff, Video, VideoOff, Monitor } from "lucide-react";
import { useState } from "react";
import Toolbar from "./Toolbar";

const ControlBar = () => {
    const [micOn, setMicOn] = useState(true);
    const [videoOn, setVideoOn] = useState(true);

    return (
        <div className="relative w-full h-screen">
            {/* Hình nền */}
            <img
                src="https://res.cloudinary.com/redeye/dpr_auto,f_auto,q_auto,w_1200,h_630/cms/app/uploads/2020/04/dario-veronesi-luo-bjcizea-unsplash-scaled.jpg"
                alt="Background"
                className="w-full h-full object-cover"
            />
            <Toolbar />

            {/* Nút Mic & Camera (góc dưới trái) */}
            <div className="absolute bottom-24 left-6 flex space-x-4">
                <button
                    onClick={() => setVideoOn(!videoOn)}
                    className="p-3 rounded-full bg-gray-800/80 hover:bg-gray-700 transition-all"
                >
                    {videoOn ? <Video size={24} className="text-white" /> : <VideoOff size={24} className="text-white" />}
                </button>
                <button
                    onClick={() => setMicOn(!micOn)}
                    className="p-3 rounded-full bg-gray-800/80 hover:bg-gray-700 transition-all"
                >
                    {micOn ? <Mic size={24} className="text-white" /> : <MicOff size={24} className="text-white" />}
                </button>

            </div>

            {/* Thanh điều khiển ở dưới cùng */}
            <div className="absolute bottom-0 left-0 w-full bg-[#373839] text-white flex items-center justify-between px-6 py-3">
                {/* Tiêu đề bài học */}
                <div className="text-xl">
                    <span className="text-gray-300">
                        <b>Lịch Sử Tiết 5:</b> Tìm hiểu văn hóa Hy Lạp - GV: Trần Thanh Tâm
                    </span>
                </div>

                {/* Nút mở chế độ xem */}
                <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
                    <Monitor size={24} />
                </button>
            </div>
        </div>
    );
};

export default ControlBar;
