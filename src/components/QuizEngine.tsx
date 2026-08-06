import React, { useState } from 'react';
import { 
  CheckSquare, 
  Award, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  HelpCircle,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { QuizCategory } from '../types';

interface QuizEngineProps {
  categories: QuizCategory[];
  isDarkMode: boolean;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({ categories, isDarkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const startQuiz = (cat: QuizCategory) => {
    setSelectedCategory(cat);
    setCurrentQuestionIdx(0);
    setSelectedAnswers({});
    setIsFinished(false);
  };

  const handleSelectOption = (qId: string, optionIdx: number) => {
    if (isFinished) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    if (!selectedCategory) return { score: 0, total: 0, percentage: 0 };
    let score = 0;
    selectedCategory.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswerIndex) {
        score++;
      }
    });
    const total = selectedCategory.questions.length;
    const percentage = Math.round((score / total) * 100);
    return { score, total, percentage };
  };

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      
      {/* Quiz Category Selection View */}
      {!selectedCategory && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckSquare className="w-6 h-6 text-emerald-500" />
              <span>Java & Web Development MCQs & Online Quizzes</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Test your technical skills, prepare for certifications, and evaluate conceptual clarity with instant explanations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => startQuiz(cat)}
                className={`p-6 rounded-2xl border transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md flex flex-col justify-between group ${
                  isDarkMode ? 'bg-slate-800/80 border-slate-700 hover:border-emerald-500/50' : 'bg-white border-slate-200 hover:border-emerald-500/50'
                }`}
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
                    <Award className="w-6 h-6" />
                  </div>

                  <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-emerald-500 transition">
                    {cat.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-400">
                    {cat.questionCount} Questions
                  </span>

                  <div className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                    <span>Start Test</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Quiz Runner */}
      {selectedCategory && !isFinished && (
        <div className="space-y-6">
          <button
            onClick={() => setSelectedCategory(null)}
            className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Exit Quiz</span>
          </button>

          <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 shadow-sm ${
            isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
          }`}>
            {/* Question Header & Progress Bar */}
            <div className="flex items-center justify-between border-b pb-4 border-slate-100 dark:border-slate-700">
              <div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  {selectedCategory.title}
                </span>
                <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  Question {currentQuestionIdx + 1} of {selectedCategory.questions.length}
                </h2>
              </div>
            </div>

            {/* Question Body */}
            {(() => {
              const q = selectedCategory.questions[currentQuestionIdx];
              const selectedOpt = selectedAnswers[q.id];

              return (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                    {q.question}
                  </h3>

                  {q.codeSnippet && (
                    <div className="p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800">
                      <pre>{q.codeSnippet}</pre>
                    </div>
                  )}

                  <div className="space-y-3">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedOpt === optIdx;
                      return (
                        <div
                          key={optIdx}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`p-4 rounded-xl border cursor-pointer text-sm font-medium transition flex items-center justify-between ${
                            isSelected
                              ? 'bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-semibold'
                              : isDarkMode
                                ? 'bg-slate-900/40 border-slate-700 text-slate-200 hover:bg-slate-700'
                                : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center border ${
                              isSelected ? 'bg-emerald-500 text-white border-emerald-500' : 'border-slate-300 dark:border-slate-600'
                            }`}>
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
              <button
                onClick={() => setCurrentQuestionIdx(prev => Math.max(prev - 1, 0))}
                disabled={currentQuestionIdx === 0}
                className="px-4 py-2 rounded-xl border text-xs font-semibold text-slate-600 dark:text-slate-300 disabled:opacity-40"
              >
                Previous
              </button>

              {currentQuestionIdx < selectedCategory.questions.length - 1 ? (
                <button
                  onClick={() => setCurrentQuestionIdx(prev => prev + 1)}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow transition"
                >
                  Next Question
                </button>
              ) : (
                <button
                  onClick={() => setIsFinished(true)}
                  className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow transition"
                >
                  Submit & View Scorecard
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Finished Scorecard & Breakdown */}
      {selectedCategory && isFinished && (
        <div className="space-y-8">
          {(() => {
            const { score, total, percentage } = calculateScore();
            return (
              <div className={`p-8 rounded-3xl border text-center space-y-6 shadow-md ${
                isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
              }`}>
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8" />
                </div>

                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    Quiz Completed!
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {selectedCategory.title}
                  </p>
                </div>

                <div className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-slate-950 text-white gap-4 border border-slate-800">
                  <div>
                    <div className="text-2xl font-black text-amber-400">{score} / {total}</div>
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">Score</div>
                  </div>
                  <div className="h-8 w-px bg-slate-800" />
                  <div>
                    <div className="text-2xl font-black text-emerald-400">{percentage}%</div>
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">Accuracy</div>
                  </div>
                </div>

                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => startQuiz(selectedCategory)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Retake Quiz</span>
                  </button>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="px-5 py-2.5 rounded-xl border text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                  >
                    Browse Other Quizzes
                  </button>
                </div>

                {/* Detailed Answer Review */}
                <div className="text-left pt-6 border-t border-slate-100 dark:border-slate-700 space-y-4">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    Answer Breakdown & Explanations:
                  </h3>

                  {selectedCategory.questions.map((q, idx) => {
                    const userAns = selectedAnswers[q.id];
                    const isCorrect = userAns === q.correctAnswerIndex;

                    return (
                      <div key={q.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-bold text-slate-900 dark:text-white">
                            {idx + 1}. {q.question}
                          </span>
                          {isCorrect ? (
                            <span className="flex items-center gap-1 text-emerald-500 font-bold shrink-0">
                              <CheckCircle2 className="w-4 h-4" /> Correct
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-rose-500 font-bold shrink-0">
                              <XCircle className="w-4 h-4" /> Incorrect
                            </span>
                          )}
                        </div>

                        <div className="text-slate-600 dark:text-slate-300">
                          <strong>Correct Answer:</strong> {q.options[q.correctAnswerIndex]}
                        </div>

                        <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-900 dark:text-indigo-200 text-xs">
                          <strong>Explanation:</strong> {q.explanation}
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            );
          })()}
        </div>
      )}

    </div>
  );
};
