import { Volume2, Monitor, ZoomIn, Maximize, LogOut, Volume } from "lucide-react";
import { useState } from "react";

export default function Toolbar() {
    const [volume, setVolume] = useState(50); // Giá trị mặc định của volume
    const [zoom, setZoom] = useState(90); // Giá trị mặc định của zoom

    return (
        <div className=" absolute top-0 left-0 flex items-center justify-between w-full px-4 py-2 bg-black/60  text-white">
            {/* Âm lượng & số slide */}
            <div className="flex items-center space-x-4">
                {/* Thanh âm lượng */}
                <div className="flex items-center space-x-2">
                    <Volume2 size={20} />
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                        className="w-24"
                    />
                </div>
            </div>

            {/* Số lượng slide (nằm giữa) */}
            <div className="flex items-center space-x-2 flex-1 justify-center">
                <Monitor size={20} />
                <span className="text-sm">09/45 slides</span>
            </div>

            {/* Zoom & Fullscreen (nằm giữa bên phải) */}
            <div className="flex items-center space-x-4 mr-24">
                <div className="flex items-center space-x-2">
                    <span className="text-sm bg-white text-black px-2 py-1 rounded">{zoom}%</span>
                    <ZoomIn size={20} />
                </div>
                <button>
                    <Maximize size={20} />
                </button>
            </div>

            {/* Nút Logout (nằm bên phải) */}
            <button className="ml-4">
                <LogOut size={20} />
            </button>
        </div>



    );
}
