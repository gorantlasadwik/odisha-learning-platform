import React from 'react';
import { useTranslation } from 'react-i18next';
import { Trophy, Play, ArrowLeft, Award } from 'lucide-react';

// Quiz Results Component
const QuizResults = ({ teams, scores, totalQuestions, onPlayAgain, onBack }) => {
  const { t } = useTranslation();
  
  // Calculate final standings
  const finalStandings = [
    ...teams.map(team => ({
      ...team,
      finalScore: scores[team.id] || 0,
      isTeacher: false
    })),
    {
      id: 'teacher',
      name: '👨‍🏫 Teacher Team',
      finalScore: scores['teacher'] || 0,
      isTeacher: true,
      correctAnswers: 0,
      answeredQuestions: 0
    }
  ].sort((a, b) => b.finalScore - a.finalScore);
  
  const winner = finalStandings[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Completed!</h1>
          <p className="text-gray-600">Final results for {totalQuestions} questions</p>
        </div>

        {/* Winner Announcement */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-8 mb-8 text-white text-center">
          <div className="text-4xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold mb-2">
            Congratulations {winner.name}!
          </h2>
          <p className="text-lg opacity-90">
            Winner with {winner.finalScore} points
          </p>
          {winner.isTeacher && (
            <p className="text-sm mt-2 opacity-80">
              The teacher showed great knowledge by answering difficult questions!
            </p>
          )}
        </div>

        {/* Final Leaderboard */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <Trophy className="mr-2 text-yellow-500" size={24} />
            Final Standings
          </h3>
          
          <div className="space-y-4">
            {finalStandings.map((team, index) => (
              <div key={team.id} className={`p-6 rounded-lg border-2 ${
                index === 0 ? 'border-yellow-300 bg-yellow-50' :
                index === 1 ? 'border-gray-300 bg-gray-50' :
                index === 2 ? 'border-orange-300 bg-orange-50' :
                'border-gray-200 bg-white'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                      index === 0 ? 'bg-yellow-500' :
                      index === 1 ? 'bg-gray-400' :
                      index === 2 ? 'bg-orange-600' :
                      'bg-blue-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <h4 className={`text-lg font-semibold ${
                        team.isTeacher ? 'text-purple-700' : 'text-gray-800'
                      }`}>
                        {team.name}
                      </h4>
                      {!team.isTeacher && (
                        <div className="flex space-x-4 text-sm text-gray-600">
                          <span>Correct: {team.correctAnswers}</span>
                          <span>Accuracy: {team.answeredQuestions > 0 ? Math.round((team.correctAnswers / team.answeredQuestions) * 100) : 0}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-gray-800">{team.finalScore}</p>
                    <p className="text-sm text-gray-500">points</p>
                  </div>
                </div>
                
                {index === 0 && (
                  <div className="mt-4 pt-4 border-t border-yellow-200">
                    <div className="flex items-center justify-center space-x-2 text-yellow-700">
                      <Award size={16} />
                      <span className="font-medium">🏆 Champion! 🏆</span>
                      <Award size={16} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onPlayAgain}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
          >
            <Play size={20} />
            <span>Play Again</span>
          </button>
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
          >
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </button>
        </div>
        
        {/* Cultural Footer */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg p-4 border-l-4 border-orange-500">
            <p className="text-orange-800 text-sm">
              🏛️ <strong>Odisha Learning Platform:</strong> Knowledge through cultural wisdom and competitive learning!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;