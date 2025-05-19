import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Cell, Pie, PieChart } from 'recharts';
import AccordionResult from './AccordionResult';
import ExamInfo from './ExamInfo';

export default function MultipleChoicePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const result = location.state?.result;

    if (!result) {
        return (
            <div className="p-4 text-red-500">
                Không có dữ liệu kết quả. <button className="underline" onClick={() => navigate(-1)}>Quay lại</button>
            </div>
        );
    }

    const pieData = [
        { name: 'Đúng', value: result.correctCount, color: '#34D399' },
        { name: 'Sai', value: result.incorrectCount, color: '#F87171' },
    ];

    return (
        <div>
            {/* Nếu sau này muốn hiển thị thêm thông tin đề thi */}
            {/* <ExamInfo info={{ /* some exam info *\/ }} /> */}

            <div className='mt-4'>
                <div className="relative bg-white rounded-2xl w-full h-[250px] p-6 border-2 border-transparent">
                    <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-[#FF5400] to-[#F17F21]">
                        <div className="w-full h-full bg-white rounded-2xl"></div>
                    </div>

                    <div className="relative flex flex-col items-center">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tổng điểm kiểm tra</h2>

                        <div className="w-full flex items-center justify-around">
                            <div className="w-[120px] h-[120px] flex items-center justify-center">
                                <PieChart width={120} height={120}>
                                    <Pie data={pieData} dataKey="value" innerRadius={30} outerRadius={50}>
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </div>

                            <div className="grid grid-cols-4 w-full gap-2 text-center">
                                <div>
                                    <p className="text-orange-500 font-bold text-3xl">{result.totalScore}/10</p>
                                    <p className="text-gray-600 text-2xl font-bold">Tổng điểm</p>
                                </div>
                                <div className="border-l border-gray-300">
                                    <p className="text-orange-500 font-extrabold text-[36px]">Tổng {result.totalQuestions}</p>
                                    <p className="text-gray-600 text-xl">Câu trắc nghiệm</p>
                                </div>
                                <div className="border-l border-gray-300">
                                    <p className="text-blue-500 font-extrabold text-[36px]">{result.correctCount}</p>
                                    <p className="text-gray-600 text-xl">Đáp án đúng</p>
                                </div>
                                <div className="border-l border-gray-300">
                                    <p className="text-red-500 font-extrabold text-[36px]">{result.incorrectCount}</p>
                                    <p className="text-gray-600 text-xl">Đáp án sai</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <AccordionResult questions={result.review} />
            </div>
        </div>
    );
}
