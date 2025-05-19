import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Button from "../../../../components/Button";

interface ReviewItem {
    questionId: number;
    questionContent: string;
    selectedAnswerId: number;
    selectedAnswerContent: string;
    isCorrect: boolean;
}

interface AccordionResultProps {
    questions: ReviewItem[];
}

const AccordionResult: React.FC<AccordionResultProps> = ({ questions = [] }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className="flex w-full gap-12 mt-4">
            {/* Accordion - Chiếm 80% */}
            <div className="w-[80%] border rounded-lg shadow-lg">
                {/* Header */}
                <button
                    className="w-full bg-[#FF7506] text-white flex items-center px-4 py-2 text-lg font-semibold rounded-t-lg"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <FaChevronUp className="mr-2" /> : <FaChevronDown className="mr-2" />}
                    <span>Xem kết quả</span>
                </button>

                {/* Content */}
                {isOpen && (
                    <div className="p-4 bg-white">
                        {questions.map((question, index) => (
                            <div key={question.questionId} className="mb-6">
                                {/* Câu hỏi */}
                                <p className="font-semibold text-gray-900">
                                    Câu {index + 1}: {question.questionContent}
                                </p>

                                {/* Đáp án */}
                                <div className="mt-2">
                                    <div
                                        className={`p-3 rounded-md flex items-center space-x-2 ${question.isCorrect
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            checked
                                            readOnly
                                            className="form-radio text-blue-500"
                                        />
                                        <span>{question.selectedAnswerContent}</span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="flex justify-center mt-6">
                            <Button
                                label="Xác nhận"
                                textColor="white"
                                backgroundColor="#FF7506"
                                size="big"
                                variant="none"
                                onClick={() => console.log("Xác nhận xem kết quả")}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Chú thích - Chiếm 20% */}
            <div className="w-[20%] bg-white shadow-lg rounded-lg p-4 self-start">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Chú thích</h3>
                <div className="flex items-center mb-2">
                    <div className="w-6 h-6 bg-green-500 text-white flex items-center justify-center rounded-md mr-2">
                        ✓
                    </div>
                    <span className="text-gray-700">Đáp án đúng</span>
                </div>
                <div className="flex items-center">
                    <div className="w-6 h-6 bg-red-500 text-white flex items-center justify-center rounded-md mr-2">
                        ✗
                    </div>
                    <span className="text-gray-700">Đáp án sai</span>
                </div>
            </div>
        </div>
    );
};

export default AccordionResult;
