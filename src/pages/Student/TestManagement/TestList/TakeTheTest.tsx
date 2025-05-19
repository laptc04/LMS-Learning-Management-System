import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiInstance from "../../../../services/api/index";
import { FaPaperclip } from "react-icons/fa";
import Button from "../../../../components/Button";
import { showToast } from "../../../../components/Toasted";
// Giả sử bạn có component Button

interface Answer {
    answerId: number;
    answerText: string;
}

interface Question {
    questionId: number;
    questionNumber: string;
    question: string;
    answers: Answer[];

    // Thêm các field phụ nếu API có cung cấp
    subjectName?: string;
    className?: string;
    startDate?: string;
    duration?: string;
    title?: string;
}

const TestExamPage: React.FC = () => {
    const { id } = useParams();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [selectedQuestion, setSelectedQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: number]: number }>({});
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiInstance.get(`/api/StudentTestExam/${id}`);
                const data = response.data?.data || [];
                setQuestions(data);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu đề thi:", error);
            }
        };

        if (id) fetchData();
    }, [id]);

    const handleAnswerChange = (questionId: number, answerId: number) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionId]: answerId,
        }));
    };

    const handleNext = () => {
        if (selectedQuestion < questions.length - 1) {
            setSelectedQuestion((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (selectedQuestion > 0) {
            setSelectedQuestion((prev) => prev - 1);
        }
    };

    const handleSave = async () => {
        const unanswered = questions.filter((q) => !selectedAnswers[q.questionId]);

        if (unanswered.length > 0) {
            showToast("Vui lòng trả lời tất cả câu hỏi trước khi nộp bài!", "error");
            return;
        }

        const answerIds = Object.values(selectedAnswers).map(Number); // Đảm bảo là mảng số

        const payload = {
            TestExamId: Number(id),
            AnswerIds: answerIds
        };

        try {
            const response = await apiInstance.post("/api/StudentTestExam/TN", payload);
            const data = response.data;

            if (data.status === 0) {
                showToast(data.message || "Nộp bài thành công!", "success");
                // Điều hướng tới trang kết quả, truyền dữ liệu kết quả qua state
                navigate("/student/test-management/test-multiple-choice", {
                    state: { result: data.data }
                });
            } else {
                showToast(data.message || "Có lỗi xảy ra khi nộp bài!", "error");
            }
        } catch (error) {
            console.error("Lỗi khi nộp bài:", error);
            showToast("Lỗi kết nối khi nộp bài!", "error");
        }
    };





    if (questions.length === 0) return <p className="p-4">Đang tải câu hỏi...</p>;

    const currentQuestion = questions[selectedQuestion];
    const selectedAnswerId = selectedAnswers[currentQuestion.questionId];

    return (
        <div className="flex flex-col">
            {/* Header Section */}
            <div className="p-4 border-gray-300">
                <div className="flex items-start space-x-8">
                    <div className="pr-8 border-r border-gray-400 text-left">
                        <div className="flex">
                            <p className="font-semibold w-24">Môn học:</p>
                            <div>
                                <p>{currentQuestion.subjectName || "Toán"}</p>
                                <p>{currentQuestion.className || "6A6"}</p>
                            </div>
                        </div>
                    </div>
                    <div className="px-8 border-r border-gray-400 text-left">
                        <div className="flex">
                            <p className="font-semibold w-32">Ngày kiểm tra:</p>
                            <p>{currentQuestion.startDate || "Chưa rõ"}</p>
                        </div>
                        <div className="flex mt-2">
                            <p className="font-semibold w-32">Thời lượng:</p>
                            <p>{currentQuestion.duration || "45 phút"}</p>
                        </div>
                    </div>
                    <div className="px-8 text-left">
                        <div className="flex">
                            <p className="font-semibold w-32">Đề bài:</p>
                            <p>{currentQuestion.title || "--"}</p>
                        </div>

                    </div>
                </div>
            </div>

            {/* Header Action */}
            <div className="flex justify-between items-center p-4">
                <label className="text-black text-2xl font-bold px-6 py-2">Phần Trả Lời Học Sinh</label>
                <Button
                    label="Nộp bài"
                    size="big"
                    variant="solid"
                    onClick={handleSave}
                    textColor="white"
                    backgroundColor={selectedQuestion === questions.length - 1 ? "#FF7506" : "#c9c4c0"}
                    hoverBackgroundColor="#45a049"
                />
            </div>

            {/* Sidebar + Main Question */}
            <div className="flex">
                {/* Sidebar */}
                <div className="w-1/4 p-4 bg-gray-200 overflow-y-auto max-h-[660px]">
                    <h5 className="font-bold mb-4">Phần câu hỏi:</h5>
                    {questions.map((q, index) => {
                        const isSelected = selectedQuestion === index;
                        const isAnswered = !!selectedAnswers[q.questionId];

                        return (
                            <div
                                key={q.questionId}
                                className={`
                    p-3 cursor-pointer text-center rounded font-semibold text-lg
                    ${isSelected
                                        ? "bg-orange-500 text-white"
                                        : `bg-white border border-gray-300 hover:bg-gray-100 
                           ${isAnswered ? "text-black" : "text-red-600"}`
                                    }
                `}
                                onClick={() => setSelectedQuestion(index)}
                            >
                                Câu {index + 1}
                            </div>
                        );
                    })}
                </div>


                {/* Question Content */}
                <div className="flex-1 p-8">
                    <h3 className="font-bold text-lg mb-6">
                        {currentQuestion.questionNumber}: {currentQuestion.question}
                    </h3>
                    <div>
                        {currentQuestion.answers.map((option) => (
                            <label key={option.answerId} className="block mb-4">
                                <input
                                    type="radio"
                                    name={`question-${currentQuestion.questionId}`}
                                    value={option.answerId}
                                    checked={selectedAnswerId === option.answerId}
                                    onChange={() => handleAnswerChange(currentQuestion.questionId, option.answerId)}
                                    className="mr-2 accent-blue-600 text-lg"
                                />
                                {option.answerText}
                            </label>
                        ))}
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-center mt-72 space-x-4">
                        <Button
                            label="Quay lại"
                            size="big"
                            variant="solid"
                            onClick={handlePrevious}
                            textColor="White"
                            backgroundColor="#c9c4c0"
                            hoverBackgroundColor="#45a049"
                        />
                        <Button
                            label="Tiếp theo"
                            size="big"
                            variant="solid"
                            onClick={handleNext}
                            textColor="white"
                            backgroundColor={selectedQuestion === questions.length - 1 ? "#c9c4c0" : "#FF7506"}
                            hoverBackgroundColor="#45a049"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestExamPage;
