import React from 'react';
import { useTranslation } from 'react-i18next';
import { Trophy, Crown, Medal, TrendingUp, Users, Target } from 'lucide-react';

const LiveLeaderboard = ({ teams, currentTeamIndex, gamePhase, totalQuestions, currentQuestionIndex = 0 }) => {
  const { t } = useTranslation();

  // Sort teams by score (descending), then by correct answers as tiebreaker
  const sortedTeams = [...teams].sort((a, b) => {
    if (b.score === a.score) {
      return b.correctAnswers - a.correctAnswers;
    }
    return b.score - a.score;
  });

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="text-yellow-500" size={20} />;
      case 2:
        return <Medal className="text-gray-400" size={20} />;
      case 3:
        return <Medal className="text-orange-600" size={20} />;
      default:
        return <Target className="text-gray-500" size={16} />;
    }
  };

  const getRankBg = (rank, isCurrentTeam) => {
    if (isCurrentTeam) {
      return 'bg-gradient-to-r from-blue-200 to-purple-200 border-blue-400 animate-pulse';
    }
    
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-400';
      case 2:
        return 'bg-gradient-to-r from-gray-100 to-gray-200 border-gray-400';
      case 3:
        return 'bg-gradient-to-r from-orange-100 to-yellow-100 border-orange-400';
      default:
        return 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200';
    }
  };

  const getScorePercentage = (score) => {
    const maxScore = Math.max(...teams.map(t => t.score), 1);
    return (score / maxScore) * 100;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 pattachitra-border sticky top-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center">
          <Trophy className="mr-2 text-yellow-500" size={24} />
          Live Leaderboard
        </h3>
        {gamePhase === 'playing' && (
          <div className="text-sm text-gray-600 bg-blue-100 px-3 py-1 rounded-full">
            Live Updates
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-blue-600">{teams.length}</div>
          <div className="text-xs text-blue-600">Teams</div>
        </div>
        <div className="bg-green-50 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-green-600">
            {totalQuestions || 0}
          </div>
          <div className="text-xs text-green-600">Questions</div>
        </div>
      </div>

      {/* Team Rankings */}
      <div className="space-y-3">
        {sortedTeams.map((team, index) => {
          const rank = index + 1;
          const isCurrentTeam = gamePhase === 'playing' && team.id === teams[currentTeamIndex]?.id;
          const accuracyRate = totalQuestions > 0 ? Math.round((team.correctAnswers / totalQuestions) * 100) : 0;

          return (
            <div
              key={team.id}
              className={`rounded-lg p-4 border-2 transition-all duration-300 ${getRankBg(rank, isCurrentTeam)}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm">
                    {getRankIcon(rank)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">
                      {team.name}
                      {isCurrentTeam && (
                        <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                          Current Turn
                        </span>
                      )}
                    </h4>
                    <div className="text-xs text-gray-600">
                      Rank #{rank}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-800">{team.score}</div>
                  <div className="text-xs text-gray-600">points</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${getScorePercentage(team.score)}%` }}
                ></div>
              </div>

              {/* Stats */}
              <div className="flex justify-between text-xs text-gray-600">
                <span>
                  <span className="font-medium">{team.correctAnswers}</span> correct
                </span>
                {totalQuestions > 0 && (
                  <span>
                    <span className="font-medium">{accuracyRate}%</span> accuracy
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Game Progress */}
      {gamePhase === 'playing' && totalQuestions > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-800 mb-3 flex items-center">
            <TrendingUp className="mr-2" size={16} />
            Game Progress
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Questions Answered</span>
              <span className="font-medium">
                {gamePhase === 'completed' ? totalQuestions : currentQuestionIndex + 1} / {totalQuestions}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ 
                  width: `${((gamePhase === 'completed' ? totalQuestions : currentQuestionIndex + 1) / totalQuestions) * 100}%` 
                }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Winner Announcement */}
      {gamePhase === 'completed' && sortedTeams.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="text-center bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-4 border border-yellow-300">
            <Crown className="mx-auto text-yellow-600 mb-2" size={24} />
            <div className="text-sm font-bold text-yellow-800">🎉 Winner! 🎉</div>
            <div className="text-lg font-bold text-yellow-900">
              Team {sortedTeams[0].name}
            </div>
            <div className="text-sm text-yellow-700">
              {sortedTeams[0].score} points • {sortedTeams[0].correctAnswers} correct
            </div>
          </div>
        </div>
      )}

      {/* Cultural Element */}
      <div className="mt-6 pt-4 border-t border-gray-200 text-center">
        <div className="text-xs text-gray-500 odia-text">
          🙏 ଜ୍ଞାନର ଆଲୋକ • Knowledge Illuminates 📚
        </div>
      </div>
    </div>
  );
};

export default LiveLeaderboard;