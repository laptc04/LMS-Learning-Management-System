"use client";

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


interface CountdownTimerProps {
    initialMinutes?: number;
    initialSeconds?: number;
    onComplete?: () => void;
}

export default function CountdownTimer({
    initialMinutes = 30,
    initialSeconds = 0,
    onComplete,
}: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState({
        minutes: initialMinutes,
        seconds: initialSeconds,
    });

    const totalSeconds = initialMinutes * 60 + initialSeconds;
    const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds);
    const [showWarning, setShowWarning] = useState(false);
    const [isTimeout, setIsTimeout] = useState(false); // Trạng thái hết giờ
    const [countdown, setCountdown] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingSeconds((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setIsTimeout(true); // Khi hết giờ, bật modal
                    onComplete?.();
                    return 0;
                }
                return prev - 1;
            });

            setTimeLeft((prev) => {
                if (prev.seconds === 0) {
                    return { minutes: prev.minutes - 1, seconds: 59 };
                }
                return { ...prev, seconds: prev.seconds - 1 };
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [onComplete]);

    useEffect(() => {
        if (remainingSeconds === 600) {
            setShowWarning(true);
        }
    }, [remainingSeconds]);

    useEffect(() => {
        if (isTimeout) {
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        // Lấy đường dẫn hiện tại
                        const currentPath = location.pathname;

                        // Nếu đường dẫn đã có "student", thay đổi phần sau thành "overview"
                        const newPath = currentPath.includes("/student/")
                            ? currentPath.replace(/\/student\/.*/, "/student/overview")
                            : "/student/overview"; // Nếu không có, chuyển về "/student/overview"

                        navigate(newPath, { replace: true }); // Chuyển hướng
                        onComplete?.();
                        onComplete?.();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [isTimeout, navigate]);

    const formatTime = () => {
        const minutes = timeLeft.minutes.toString().padStart(2, "0");
        const seconds = timeLeft.seconds.toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    };


    useEffect(() => {
        if (showWarning) {
            document.body.style.overflow = "hidden" // Chặn cuộn
        } else {
            document.body.style.overflow = "auto" // Cho phép cuộn lại khi modal đóng
        }

        return () => {
            document.body.style.overflow = "auto" // Cleanup khi component unmount
        }
    }, [showWarning])

    const progress = (remainingSeconds / totalSeconds) * 100;
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const progressColor = remainingSeconds <= 600 ? "#F87171" : "#38BDF8";

    return (
        <div className="relative h-28 w-28 mt-[-40px]">
            <svg className="h-full w-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r={radius} fill="none" stroke="#E5E7EB" strokeWidth="5" />
                <path
                    d={`M 50,50 m 0,${-radius} a ${radius},${radius} 0 1,1 0,${2 * radius} a ${radius},${radius} 0 1,1 0,${-2 * radius}`}
                    fill="none"
                    stroke={progressColor}
                    strokeWidth="5"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference * (1 - progress / 100)}
                    transform="rotate(0 50 50) scale(-1, 1) translate(-100, 0)"
                    strokeLinecap="round"
                />
                <circle cx="50" cy="50" r="35" fill="none" stroke={progressColor} strokeWidth="2" opacity="1" />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-[76px] w-[76px] rounded-full bg-white"></div>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <div className="text-sm text-gray-500">Còn lại</div>
                <div className="text-2xl font-bold" style={{ color: progressColor }}>
                    {formatTime()}
                </div>
            </div>

            {/* THÔNG BÁO KHI CÒN 10 PHÚT */}
            {showWarning && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
                    style={{ pointerEvents: "auto", zIndex: 1000 }} // Chặn tương tác với phần tử phía sau
                >
                    <div
                        className="bg-white p-6 rounded-lg shadow-lg text-center w-1/2 font-source-sans"
                        style={{ pointerEvents: "auto" }} // Chỉ cho phép tương tác với modal
                    >
                        <h2 className="text-2xl font-bold text-center">Lưu ý</h2>
                        <p className="mt-2 text-gray-600 text-left p-4 text-16px">
                            Còn 10 phút nữa là hết thời lượng làm bài kiểm tra, học viên kiểm tra và lưu lại bài.
                            Bài kiểm tra có thể được lưu lại nhiều lần. Kết quả sẽ được tính dựa theo lần lưu sau cùng.
                        </p>
                        <p className=" text-gray-600 text-left p-4 text-16px">Hết thời gian làm bài, bài kiểm tra sẽ được hệ thống lưu tự động.</p>

                        <button
                            className="mt-4 bg-orange-500 text-white px-10 py-2 rounded-lg"
                            onClick={() => setShowWarning(false)}
                        >
                            Lưu bài
                        </button>
                    </div>
                </div>
            )}

            {/* MODAL HẾT GIỜ */}
            {isTimeout && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 font-source-sans">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center w-[60%]">
                        <h2 className="text-2xl font-bold text-center">Hết thời gian</h2>
                        <p className="mt-2 text-gray-600">
                            Hết thời gian làm bài, bài kiểm tra đã được hệ thống lưu tự động. Thông báo sẽ được gửi tới học viên khi có kết quả.
                        </p>
                        <p className="mt-4 text-gray-600">
                            Tự động quay lại trang chủ sau{" "}
                            <span className="text-orange-500 font-bold">{countdown}</span> giây...
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
