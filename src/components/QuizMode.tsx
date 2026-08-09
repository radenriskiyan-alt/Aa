import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { HelpCircle, CheckCircle, XCircle, RotateCcw, ArrowRight, Award, BookOpen } from 'lucide-react';

interface QuizModeProps {
  questions: QuizQuestion[];
  onSelectPoint?: (pointId: string) => void;
}

export const QuizMode: React.FC<QuizModeProps> = ({ questions, onSelectPoint }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null) return; // Prevent changing answer
    setSelectedOption(idx);
    setShowExplanation(true);
    setAnsweredCount((prev) => prev + 1);

    if (idx === currentQ.correctAnswerIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setAnsweredCount(0);
    setCompleted(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      {/* Header Banner */}
      <div className="bg-[#5A5A40] text-[#fdfcf8] p-6 rounded-[28px] card-shadow border border-[#5A5A40]/20 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-[#fdfcf8]/15 border border-[#fdfcf8]/30 flex items-center justify-center text-[#f1d08e]">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="serif-title text-base sm:text-lg font-bold text-[#fdfcf8]">Kuis Pemahaman Tauhid</h2>
            <p className="text-xs text-[#e6e6da] italic">
              Uji pemahaman Anda tentang materi Syarah Tijan ad-Darari
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-[#e6e6da] uppercase tracking-wider block">Skor Saat Ini</span>
          <span className="text-xl font-bold text-[#f1d08e] serif-title">
            {score} / {questions.length}
          </span>
        </div>
      </div>

      {!completed ? (
        <div className="bg-paper border border-[#5A5A40]/15 rounded-[28px] p-6 sm:p-7 card-shadow space-y-5">
          {/* Progress bar */}
          <div className="flex items-center justify-between text-xs font-bold olive-accent serif-title">
            <span>Soal {currentIndex + 1} dari {questions.length}</span>
            <span>{Math.round(((currentIndex + 1) / questions.length) * 100)}% Selesai</span>
          </div>
          <div className="w-full bg-[#f5f5f0] rounded-full h-2 overflow-hidden border border-[#5A5A40]/10">
            <div
              className="bg-[#5A5A40] h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <h3 className="serif-title text-base sm:text-lg font-bold text-[#2d3a29] leading-snug">
            {currentQ.question}
          </h3>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt, idx) => {
              let optionStyle =
                'bg-[#f5f5f0] border-[#5A5A40]/20 text-[#2d3a29] hover:bg-[#edebe1]';

              if (selectedOption !== null) {
                if (idx === currentQ.correctAnswerIndex) {
                  optionStyle = 'bg-[#e3ebd9] border-[#5A5A40] text-[#1d2f23] font-bold';
                } else if (idx === selectedOption) {
                  optionStyle = 'bg-[#f8e5e5] border-red-400 text-red-950 font-bold';
                } else {
                  optionStyle = 'bg-[#f5f5f0] border-[#5A5A40]/10 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={selectedOption !== null}
                  className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition flex items-center justify-between ${optionStyle}`}
                >
                  <span className="leading-snug">{opt}</span>
                  {selectedOption !== null && idx === currentQ.correctAnswerIndex && (
                    <CheckCircle className="w-4 h-4 text-[#5A5A40] shrink-0 ml-2" />
                  )}
                  {selectedOption !== null && idx === selectedOption && idx !== currentQ.correctAnswerIndex && (
                    <XCircle className="w-4 h-4 text-red-600 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box after answer */}
          {showExplanation && (
            <div className="bg-[#f7f5ed] border-l-4 border-[#5A5A40] p-4 rounded-r-2xl space-y-2 text-xs sm:text-sm text-[#2d3a29]">
              <div className="font-bold flex items-center gap-1.5 olive-accent serif-title">
                <span>Penjelasan Ilmiah:</span>
              </div>
              <p className="leading-relaxed text-[#2d3748]">{currentQ.explanation}</p>

              {currentQ.relatedPointId && onSelectPoint && (
                <button
                  onClick={() => onSelectPoint(currentQ.relatedPointId!)}
                  className="olive-accent hover:underline font-bold text-xs inline-flex items-center gap-1 pt-1"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Lihat Poin Materi Terkait</span>
                </button>
              )}
            </div>
          )}

          {/* Next Button */}
          {showExplanation && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="bg-[#5A5A40] hover:bg-[#4a553f] text-[#fdfcf8] font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-xs flex items-center gap-1.5"
              >
                <span>{currentIndex < questions.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Kuis'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Complete Screen */
        <div className="bg-paper border border-[#5A5A40]/15 rounded-[28px] p-8 text-center space-y-5 card-shadow">
          <div className="w-16 h-16 rounded-full bg-[#f5f2e6] text-[#5A5A40] flex items-center justify-center mx-auto card-shadow">
            <Award className="w-8 h-8" />
          </div>

          <h3 className="serif-title text-xl font-bold text-[#2d3a29]">Alhamdulillah! Kuis Selesai</h3>
          <p className="text-xs sm:text-sm text-[#2d3748]">
            Anda berhasil menjawab benar <strong className="olive-accent font-black">{score}</strong> dari <strong className="text-[#1e293b]">{questions.length}</strong> pertanyaan tentang Syarah Tijan ad-Darari.
          </p>

          <div className="pt-2">
            <button
              onClick={handleReset}
              className="bg-[#5A5A40] hover:bg-[#4a553f] text-[#fdfcf8] font-bold text-xs px-6 py-3 rounded-xl transition shadow-xs inline-flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi Kuis</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
