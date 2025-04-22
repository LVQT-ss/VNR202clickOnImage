import React, { useState, useRef } from 'react';
import hcm from './HCM.jpg';

export default function InteractivePhoto() {
    const [showQuestion, setShowQuestion] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const inputRef = useRef(null);

    const questions = [
        {
            id: 1,
            question: "Khi Bác soạn thảo cương lĩnh chính trị vào năm 1930 lấy tên là gì?",
            instruction: "Ghi hoa chữ cái đầu dòng và có dấu",
            answer: "Nguyễn Ái Quốc",
            region: { startX: 45, endX: 65, startY: 10, endY: 50 }
        },
        {
            id: 2,
            question: "Cương lĩnh chính trị của Bác ra đời vào năm nào?",
            instruction: "Nhập số năm",
            answer: "1930",
            region: { startX: 2, endX: 40, startY: 5, endY: 20 }
        }
    ];

    const handleImageClick = (e) => {
        // Tính toán vị trí click tương đối với hình ảnh
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Tính toán tỷ lệ phần trăm của vị trí click
        const percentX = (x / rect.width) * 100;
        const percentY = (y / rect.height) * 100;

        // Kiểm tra nếu click vào khu vực của các câu hỏi
        for (const q of questions) {
            const { startX, endX, startY, endY } = q.region;
            if (percentX >= startX && percentX <= endX && percentY >= startY && percentY <= endY) {
                setCurrentQuestion(q);
                setShowQuestion(true);
                setUserAnswer('');
                setShowSuccess(false);
                // Focus vào input khi hiển thị câu hỏi
                setTimeout(() => {
                    if (inputRef.current) {
                        inputRef.current.focus();
                    }
                }, 100);
                return;
            }
        }

        // Nếu không click vào khu vực nào
        setShowQuestion(false);
    };

    const handleSubmitAnswer = () => {
        if (currentQuestion && userAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase()) {
            // Nếu đáp án đúng, hiển thị thông báo chúc mừng và tăng số câu trả lời đúng
            setShowSuccess(true);
            setCorrectAnswers(prev => prev + 1);
        } else {
            // Nếu đáp án sai, chuyển hướng tới YouTube
            window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmitAnswer();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="mb-4 text-center">
                <div className="inline-block bg-blue-100 px-4 py-2 rounded-lg shadow">
                    <span className="font-bold text-blue-800">Số câu trả lời đúng: {correctAnswers}/{questions.length}</span>
                </div>
            </div>

            <div className="relative w-full max-w-2xl">
                <img
                    src={hcm}
                    alt="Hình lịch sử với nhóm người"
                    className="w-full h-auto object-cover border-2 border-gray-300 shadow-lg cursor-pointer"
                    style={{
                        filter: showQuestion ? 'brightness(70%)' : 'brightness(100%)',
                        maxWidth: '600px',
                        height: '400px'
                    }}
                    onClick={handleImageClick}
                />

                {/* Vùng đánh dấu cho câu hỏi 1 */}
                <div className="absolute" style={{
                    top: `${questions[0].region.startY}%`,
                    left: `${questions[0].region.startX}%`,
                    width: `${questions[0].region.endX - questions[0].region.startX}%`,
                    height: `${questions[0].region.endY - questions[0].region.startY}%`,
                    border: '2px ',
                    opacity: 0.5,
                    pointerEvents: 'none'
                }}></div>

                {/* Vùng đánh dấu cho câu hỏi 2 */}
                <div className="absolute" style={{
                    top: `${questions[1].region.startY}%`,
                    left: `${questions[1].region.startX}%`,
                    width: `${questions[1].region.endX - questions[1].region.startX}%`,
                    height: `${questions[1].region.endY - questions[1].region.startY}%`,
                    border: '2px',
                    opacity: 0.5,
                    pointerEvents: 'none'
                }}></div>

                {showQuestion && !showSuccess && currentQuestion && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-xl text-center w-5/6 max-w-md">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">{currentQuestion.question}</h2>
                            <h2 className="text-xl font-bold text-blue-800 mb-4">{currentQuestion.instruction}</h2>
                            <div className="mb-4">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập câu trả lời của bạn"
                                />
                            </div>

                            <div className="flex space-x-2 justify-center">
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                                    onClick={handleSubmitAnswer}
                                >
                                    Kiểm tra
                                </button>
                                <button
                                    className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
                                    onClick={() => setShowQuestion(false)}
                                >
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {showSuccess && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-green-50 p-6 rounded-lg shadow-xl text-center border-4 border-green-500">
                            <h2 className="text-2xl font-bold text-green-700 mb-4">🎉 Chúc mừng! 🎉</h2>
                            <p className="text-lg text-green-600 mb-4">Bạn đã trả lời đúng!</p>
                            <button
                                className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg font-medium"
                                onClick={() => {
                                    setShowSuccess(false);
                                    setShowQuestion(false);
                                }}
                            >
                                Tiếp tục
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-4 text-gray-600 text-center">
                <p>Nhấp vào đâu đó trên hình ảnh để hiển thị câu hỏi.</p>
                <p className="text-sm mt-2">Gợi ý: Có 2 câu hỏi ẩn trong hình ảnh.</p>
            </div>
        </div>
    );
}