import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Trophy, ArrowLeft, FileText, Target, Award, ChevronRight, Play, Plus, Minus
} from 'lucide-react';

// Live Leaderboard Component
const LiveLeaderboard = ({ teams, scores, onAdjustScore }) => {
  const { t } = useTranslation();
  
  // Create leaderboard data including teacher
  const leaderboardData = [
    ...teams.map(team => ({
      id: team.id,
      name: team.name,
      score: scores[team.id] || 0,
      isTeacher: false,
      correctAnswers: team.correctAnswers || 0,
      answeredQuestions: team.answeredQuestions || 0
    })),
    {
      id: 'teacher',
      name: '👨‍🏫 Teacher Team',
      score: scores['teacher'] || 0,
      isTeacher: true,
      correctAnswers: 0,
      answeredQuestions: 0
    }
  ].sort((a, b) => b.score - a.score);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <Trophy className="mr-2 text-yellow-500" size={20} />
          Live Leaderboard
        </h2>
        <div className="text-xs text-gray-500">
          Updates in real-time
        </div>
      </div>
      
      <div className="space-y-3">
        {leaderboardData.map((team, index) => (
          <div key={team.id} className={`p-4 rounded-lg border-2 transition-colors ${
            index === 0 ? 'border-yellow-300 bg-yellow-50' :
            index === 1 ? 'border-gray-300 bg-gray-50' :
            index === 2 ? 'border-orange-300 bg-orange-50' :
            'border-gray-200 bg-white'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                  index === 0 ? 'bg-yellow-500' :
                  index === 1 ? 'bg-gray-400' :
                  index === 2 ? 'bg-orange-600' :
                  'bg-blue-500'
                }`}>
                  {index + 1}
                </div>
                <div>
                  <p className={`font-medium ${
                    team.isTeacher ? 'text-purple-700' : 'text-gray-800'
                  }`}>
                    {team.name}
                  </p>
                  {!team.isTeacher && (
                    <p className="text-xs text-gray-500">
                      {team.correctAnswers}/{team.answeredQuestions} correct
                    </p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-gray-800">{team.score}</p>
                <p className="text-xs text-gray-500">points</p>
              </div>
            </div>
            
            {/* Score adjustment controls */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
              <div className="flex space-x-2">
                <button
                  onClick={() => onAdjustScore(team.id, -5)}
                  className="px-2 py-1 bg-red-100 text-red-600 rounded text-xs hover:bg-red-200"
                >
                  -5
                </button>
                <button
                  onClick={() => onAdjustScore(team.id, -1)}
                  className="px-2 py-1 bg-red-100 text-red-600 rounded text-xs hover:bg-red-200"
                >
                  -1
                </button>
              </div>
              <span className="text-xs text-gray-500">Adjust Score</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => onAdjustScore(team.id, 1)}
                  className="px-2 py-1 bg-green-100 text-green-600 rounded text-xs hover:bg-green-200"
                >
                  +1
                </button>
                <button
                  onClick={() => onAdjustScore(team.id, 5)}
                  className="px-2 py-1 bg-green-100 text-green-600 rounded text-xs hover:bg-green-200"
                >
                  +5
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Quiz Gameplay Component
const QuizGameplay = ({ 
  teams, currentQuestion, currentQuestionIndex, totalQuestions,
  currentTeamIndex, scores, showAnswer, onAnswer, onTeacherAnswer,
  onNextQuestion, onAdjustScore, onBack 
}) => {
  const { t } = useTranslation();
  const currentTeam = teams[currentTeamIndex];
  const [showAnswerLocal, setShowAnswerLocal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={20} />
            <span>End Quiz</span>
          </button>
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-800">Interactive Quiz Game</h1>
            <p className="text-sm text-gray-600">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </p>
          </div>
          <div className="text-sm text-gray-600">
            Progress: {Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}%
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Leaderboard */}
          <div className="lg:col-span-1">
            <LiveLeaderboard teams={teams} scores={scores} onAdjustScore={onAdjustScore} />
          </div>

          {/* Main Game Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Turn Indicator */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Target className="mr-2 text-orange-500" size={20} />
                  Current Turn
                </h2>
                <div className="text-sm text-gray-500">
                  Question {currentQuestionIndex + 1}
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg p-4">
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                  <span className="text-lg font-bold text-orange-800">
                    {currentTeam.name}'s Turn
                  </span>
                  <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                </div>
                <p className="text-center text-sm text-orange-700 mt-2">
                  Points for this question: {currentQuestion.points}
                </p>
              </div>
            </div>

            {/* Question Display */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <FileText className="mr-2 text-blue-500" size={20} />
                    Question
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                      currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {currentQuestion.difficulty}
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                      {currentQuestion.points} pts
                    </span>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-lg text-gray-800 leading-relaxed">
                    {currentQuestion.question}
                  </p>
                </div>
              </div>

              {/* Answer Section */}
              {showAnswer || showAnswerLocal ? (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">Correct Answer:</h4>
                    <p className="text-green-700">{currentQuestion.answer}</p>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-800 text-center font-medium">
                      All teams failed to answer correctly!
                    </p>
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      onClick={onTeacherAnswer}
                      className="flex-1 bg-purple-500 text-white py-3 px-4 rounded-lg hover:bg-purple-600 flex items-center justify-center space-x-2"
                    >
                      <Award size={16} />
                      <span>Teacher Gets Points</span>
                    </button>
                    <button
                      onClick={onNextQuestion}
                      className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 flex items-center justify-center space-x-2"
                    >
                      <ChevronRight size={16} />
                      <span>Next Question</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <p className="text-gray-600 mb-4">
                      Teacher decides if <strong>{currentTeam.name}</strong> answered correctly
                    </p>
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      onClick={() => onAnswer(true)}
                      className="flex-1 bg-green-500 text-white py-4 px-6 rounded-lg hover:bg-green-600 font-semibold text-lg flex items-center justify-center space-x-2"
                    >
                      <Trophy size={20} />
                      <span>Correct Answer</span>
                    </button>
                    <button
                      onClick={() => onAnswer(false)}
                      className="flex-1 bg-red-500 text-white py-4 px-6 rounded-lg hover:bg-red-600 font-semibold text-lg flex items-center justify-center space-x-2"
                    >
                      <Target size={20} />
                      <span>Wrong Answer</span>
                    </button>
                  </div>
                  
                  <div className="text-center">
                    <button
                      onClick={() => setShowAnswerLocal(true)}
                      className="text-gray-500 hover:text-gray-700 text-sm underline"
                    >
                      Show Answer
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { QuizGameplay, LiveLeaderboard };