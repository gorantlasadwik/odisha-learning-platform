import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Users, Play, Trophy, Plus, Minus, RotateCcw, CheckCircle, XCircle,
  ArrowLeft, ArrowRight, Edit3, BookOpen, Target, Crown, Star
} from 'lucide-react';
import { 
  questionBank, getRandomQuestions, getMixedQuestions, 
  getAllCategories, getCategoryDisplayName 
} from '../data/questionBank';
import Logo from './Logo';
import LiveLeaderboard from './LiveLeaderboard';

const InteractiveQuizGame = ({ onBack }) => {
  const { t } = useTranslation();
  const [gamePhase, setGamePhase] = useState('setup'); // setup, playing, completed
  const [numberOfTeams, setNumberOfTeams] = useState(2);
  const [teams, setTeams] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(30); // Default for 2 subjects (2 x 15)
  const [questionSource, setQuestionSource] = useState('inbuilt');
  const [selectedCategories, setSelectedCategories] = useState(['science', 'mathematics']);
  const [customQuestions, setCustomQuestions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [questionStartingTeam, setQuestionStartingTeam] = useState(0); // Track which team starts each question
  const [showAnswer, setShowAnswer] = useState(false);
  const [newQuestion, setNewQuestion] = useState({ question: '', answer: '', points: 10 });
  const [editingCustomQuestion, setEditingCustomQuestion] = useState(-1);

  // Helper function to get translated question content
  const getTranslatedQuestion = (questionData) => {
    if (questionData.questionKey) {
      return t(questionData.questionKey, questionData.question || 'Question not available');
    }
    return questionData.question || 'Question not available';
  };

  const getTranslatedAnswer = (questionData) => {
    if (questionData.answerKey) {
      return t(questionData.answerKey, questionData.answer || 'Answer not available');
    }
    return questionData.answer || 'Answer not available';
  };

  useEffect(() => {
    const newTeams = [];
    for (let i = 0; i < numberOfTeams; i++) {
      const existingTeam = teams[i];
      newTeams.push({
        id: i,
        name: existingTeam?.name || String.fromCharCode(65 + i),
        score: existingTeam?.score || 0,
        correctAnswers: existingTeam?.correctAnswers || 0,
        totalAttempts: existingTeam?.totalAttempts || 0 // Track individual team attempts
      });
    }
    setTeams(newTeams);
  }, [numberOfTeams]);

  const handleTeamNameChange = (teamIndex, name) => {
    const updatedTeams = [...teams];
    updatedTeams[teamIndex].name = name;
    setTeams(updatedTeams);
  };

  const handleCategoryToggle = (category) => {
    let newSelectedCategories;
    if (selectedCategories.includes(category)) {
      newSelectedCategories = selectedCategories.filter(c => c !== category);
    } else {
      newSelectedCategories = [...selectedCategories, category];
    }
    setSelectedCategories(newSelectedCategories);
    
    // Auto-calculate total questions: 15 per subject
    setTotalQuestions(newSelectedCategories.length * 15);
  };

  const addCustomQuestion = () => {
    if (newQuestion.question.trim() && newQuestion.answer.trim()) {
      const question = {
        id: `custom_${Date.now()}`,
        question: newQuestion.question.trim(),
        answer: newQuestion.answer.trim(),
        points: parseInt(newQuestion.points) || 10,
        difficulty: 'custom'
      };
      
      if (editingCustomQuestion >= 0) {
        const updated = [...customQuestions];
        updated[editingCustomQuestion] = question;
        setCustomQuestions(updated);
        setEditingCustomQuestion(-1);
      } else {
        setCustomQuestions([...customQuestions, question]);
      }
      
      setNewQuestion({ question: '', answer: '', points: 10 });
    }
  };

  const deleteCustomQuestion = (index) => {
    const updated = customQuestions.filter((_, i) => i !== index);
    setCustomQuestions(updated);
    if (editingCustomQuestion === index) {
      setEditingCustomQuestion(-1);
      setNewQuestion({ question: '', answer: '', points: 10 });
    }
  };

  const startQuiz = () => {
    let gameQuestions = [];
    
    if (questionSource === 'inbuilt') {
      if (selectedCategories.length > 0) {
        // Calculate questions per subject
        const questionsPerSubject = Math.floor(totalQuestions / selectedCategories.length);
        const extraQuestions = totalQuestions % selectedCategories.length;
        
        // Get questions for each subject
        selectedCategories.forEach((category, index) => {
          const questionsForThisSubject = questionsPerSubject + (index < extraQuestions ? 1 : 0);
          const categoryQuestions = getRandomQuestions([category], questionsForThisSubject);
          gameQuestions = [...gameQuestions, ...categoryQuestions];
        });
      }
    } else if (questionSource === 'custom') {
      gameQuestions = [...customQuestions].slice(0, totalQuestions);
    }
    
    if (gameQuestions.length === 0) {
      setFeedback('Please select categories or add custom questions to start the quiz!');
      return;
    }
    
    // Shuffle questions for random order
    gameQuestions = gameQuestions.sort(() => 0.5 - Math.random());
    setQuestions(gameQuestions);
    setGamePhase('playing');
    setCurrentQuestionIndex(0);
    setCurrentTeamIndex(0);
    setQuestionStartingTeam(0); // First question starts with Team 1
    setShowAnswer(false);
  };

  const handleCorrectAnswer = () => {
    const updatedTeams = [...teams];
    const currentQuestion = questions[currentQuestionIndex];
    updatedTeams[currentTeamIndex].score += currentQuestion.points;
    updatedTeams[currentTeamIndex].correctAnswers += 1;
    updatedTeams[currentTeamIndex].totalAttempts += 1; // Increment attempts for this team
    setTeams(updatedTeams);
    
    // Team answered correctly, move to next question
    // Next question starts with the OTHER team (alternating)
    nextQuestion();
  };

  const handleWrongAnswer = () => {
    // Increment attempts for current team (they tried and failed)
    const updatedTeams = [...teams];
    updatedTeams[currentTeamIndex].totalAttempts += 1;
    setTeams(updatedTeams);
    
    // Current team got it wrong, pass to next team
    const nextTeam = (currentTeamIndex + 1) % teams.length;
    
    // Check if we've gone through all teams for this question
    if (nextTeam === questionStartingTeam) {
      // All teams have attempted this question, show answer and move to next
      setShowAnswer(true);
    } else {
      // Pass question to next team
      setCurrentTeamIndex(nextTeam);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextQuestionIndex = currentQuestionIndex + 1;
      
      // Determine which team starts the next question (alternating)
      const nextStartingTeam = (questionStartingTeam + 1) % teams.length;
      
      setCurrentQuestionIndex(nextQuestionIndex);
      setCurrentTeamIndex(nextStartingTeam);
      setQuestionStartingTeam(nextStartingTeam);
      setShowAnswer(false);
    } else {
      setGamePhase('completed');
    }
  };

  const adjustTeamScore = (teamIndex, change) => {
    const updatedTeams = [...teams];
    updatedTeams[teamIndex].score = Math.max(0, updatedTeams[teamIndex].score + change);
    setTeams(updatedTeams);
  };

  const resetQuiz = () => {
    setGamePhase('setup');
    setCurrentQuestionIndex(0);
    setCurrentTeamIndex(0);
    setQuestionStartingTeam(0);
    setShowAnswer(false);
    const resetTeams = teams.map(team => ({ ...team, score: 0, correctAnswers: 0, totalAttempts: 0 }));
    setTeams(resetTeams);
  };

  // Setup Phase UI
  if (gamePhase === 'setup') {
    return (
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </button>
          <div className="flex items-center space-x-3">
            <Logo size="w-12 h-12 md:w-14 md:h-14" />
            <h1 className="text-2xl font-bold text-gray-800 odia-text">🎯 Interactive Quiz Game</h1>
          </div>
          <div></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Team Setup */}
          <div className="bg-white rounded-xl shadow-lg p-6 pattachitra-border">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Users className="mr-2" size={24} />
              Team Setup
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Teams (2-8)
                </label>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => setNumberOfTeams(Math.max(2, numberOfTeams - 1))}
                    className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-xl font-bold text-gray-800 min-w-[3rem] text-center">
                    {numberOfTeams}
                  </span>
                  <button 
                    onClick={() => setNumberOfTeams(Math.min(8, numberOfTeams + 1))}
                    className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Team Names</label>
                <div className="space-y-2">
                  {teams.map((team, index) => (
                    <div key={team.id} className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-600 w-12">Team {index + 1}:</span>
                      <input
                        type="text"
                        value={team.name}
                        onChange={(e) => handleTeamNameChange(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        placeholder={`Team ${String.fromCharCode(65 + index)}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quiz Configuration */}
          <div className="bg-white rounded-xl shadow-lg p-6 pattachitra-border">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <BookOpen className="mr-2" size={24} />
              Quiz Configuration
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Questions ({selectedCategories.length} subjects × {selectedCategories.length > 0 ? Math.floor(totalQuestions / selectedCategories.length) : 0} = {totalQuestions})
                  {questionSource === 'inbuilt' && (
                    <span className="text-red-600 text-xs ml-2">
                      (Max: {selectedCategories.length * 15} from question bank)
                    </span>
                  )}
                </label>
                <input
                  type="number"
                  min="1"
                  max={questionSource === 'inbuilt' ? selectedCategories.length * 15 : 500}
                  value={totalQuestions}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow empty string for editing
                    if (value === '') {
                      setTotalQuestions('');
                    } else {
                      const numValue = parseInt(value);
                      const maxQuestions = questionSource === 'inbuilt' ? selectedCategories.length * 15 : 500;
                      if (!isNaN(numValue) && numValue >= 1 && numValue <= maxQuestions) {
                        setTotalQuestions(numValue);
                      }
                    }
                  }}
                  onBlur={(e) => {
                    // If field is empty on blur, set to minimum value
                    if (e.target.value === '' || parseInt(e.target.value) < 1) {
                      setTotalQuestions(selectedCategories.length > 0 ? selectedCategories.length : 1);
                    }
                    // Enforce maximum for in-built questions
                    if (questionSource === 'inbuilt') {
                      const maxQuestions = selectedCategories.length * 15;
                      if (parseInt(e.target.value) > maxQuestions) {
                        setTotalQuestions(maxQuestions);
                      }
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder={questionSource === 'inbuilt' ? `Max: ${selectedCategories.length * 15}` : 'No limit for custom questions'}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {questionSource === 'inbuilt' ? (
                    selectedCategories.length > 0 
                      ? `💡 ${Math.floor(totalQuestions / selectedCategories.length)} questions per subject (${totalQuestions % selectedCategories.length > 0 ? `+${totalQuestions % selectedCategories.length} extra` : 'evenly distributed'}) - Limited by question bank`
                      : 'Select subjects to see distribution'
                  ) : (
                    `💡 Using custom questions - No limit (you can add as many as needed)`
                  )}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Question Source</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="questionSource"
                      value="inbuilt"
                      checked={questionSource === 'inbuilt'}
                      onChange={(e) => {
                        setQuestionSource(e.target.value);
                        // Reset to recommended value for in-built questions
                        setTotalQuestions(selectedCategories.length * 15);
                      }}
                      className="text-orange-500 focus:ring-orange-500"
                    />
                    <span>In-built Question Bank (Max: {selectedCategories.length * 15} questions)</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="questionSource"
                      value="custom"
                      checked={questionSource === 'custom'}
                      onChange={(e) => {
                        setQuestionSource(e.target.value);
                        // Reset to a reasonable default for custom questions
                        setTotalQuestions(Math.min(20, customQuestions.length));
                      }}
                      className="text-orange-500 focus:ring-orange-500"
                    />
                    <span>Custom Questions (No limit - add as many as you want)</span>
                  </label>
                </div>
              </div>

              {questionSource === 'inbuilt' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Select Categories</label>
                  <div className="grid grid-cols-2 gap-2">
                    {getAllCategories().map((category) => (
                      <label key={category} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryToggle(category)}
                          className="text-orange-500 focus:ring-orange-500"
                        />
                        <span className="text-sm">{getCategoryDisplayName(category)}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Custom Questions Section */}
        {questionSource === 'custom' && (
          <div className="bg-white rounded-xl shadow-lg p-6 pattachitra-border">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Edit3 className="mr-2" size={24} />
              Custom Questions ({customQuestions.length})
            </h2>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-5">
                  <input
                    type="text"
                    placeholder="Enter your question..."
                    value={newQuestion.question}
                    onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="md:col-span-4">
                  <input
                    type="text"
                    placeholder="Enter the answer..."
                    value={newQuestion.answer}
                    onChange={(e) => setNewQuestion({...newQuestion, answer: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <input
                    type="number"
                    placeholder="Points"
                    min="1"
                    max="50"
                    value={newQuestion.points}
                    onChange={(e) => setNewQuestion({...newQuestion, points: parseInt(e.target.value) || 10})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="md:col-span-1">
                  <button 
                    onClick={addCustomQuestion}
                    className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {customQuestions.map((question, index) => (
                <div key={question.id} className="bg-white rounded-lg p-4 border border-gray-200 flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 truncate">{question.question}</p>
                    <p className="text-sm text-gray-600 truncate">Answer: {question.answer}</p>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{question.points} pts</span>
                  </div>
                  <button 
                    onClick={() => deleteCustomQuestion(index)}
                    className="p-2 text-red-600 hover:text-red-800 ml-4"
                  >
                    <XCircle size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <button 
            onClick={startQuiz}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition-opacity flex items-center space-x-3 shadow-lg"
          >
            <Play size={24} />
            <span>Start Quiz Game! 🎯</span>
          </button>
        </div>
      </div>
    );
  }

  // Playing Phase
  if (gamePhase === 'playing') {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <button onClick={resetQuiz} className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
            <RotateCcw size={20} />
            <span>Reset Quiz</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-800 odia-text">
            🎯 Quiz Game - Question {currentQuestionIndex + 1}/{questions.length}
          </h1>
          <div className="text-sm text-gray-600">Round {Math.floor(currentQuestionIndex / teams.length) + 1}</div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8 pattachitra-border">
              <div className="text-center mb-6">
                <div className="text-sm text-gray-500 mb-2">
                  {getCategoryDisplayName(questions[currentQuestionIndex]?.difficulty || 'general')} • 
                  {questions[currentQuestionIndex]?.points || 10} Points
                </div>
                <h2 className="text-2xl font-bold text-gray-800 leading-relaxed">
                  {getTranslatedQuestion(questions[currentQuestionIndex])}
                </h2>
              </div>

              <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-6 mb-6">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">Current Turn</div>
                  <div className="text-3xl font-bold text-blue-800">Team {teams[currentTeamIndex]?.name}</div>
                  <div className="text-sm text-gray-600 mt-2">Current Score: {teams[currentTeamIndex]?.score} points</div>
                </div>
              </div>

              <div className="space-y-4">
                {!showAnswer ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button 
                      onClick={handleCorrectAnswer}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
                    >
                      <CheckCircle size={24} />
                      <span>✅ Correct Answer</span>
                    </button>
                    <button 
                      onClick={handleWrongAnswer}
                      className="bg-gradient-to-r from-red-500 to-pink-600 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
                    >
                      <XCircle size={24} />
                      <span>❌ Wrong Answer</span>
                    </button>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="bg-yellow-100 rounded-lg p-6 border-l-4 border-yellow-500">
                      <h3 className="text-lg font-semibold text-yellow-800 mb-2">Correct Answer:</h3>
                      <p className="text-xl text-yellow-900 font-medium">
                        {getTranslatedAnswer(questions[currentQuestionIndex])}
                      </p>
                    </div>
                    <button 
                      onClick={nextQuestion}
                      className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 mx-auto"
                    >
                      <ArrowRight size={20} />
                      <span>Next Question</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 pattachitra-border">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Edit3 className="mr-2" size={20} />
                Manual Score Adjustment
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {teams.map((team, index) => (
                  <div key={team.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="text-center mb-3">
                      <div className="font-medium text-gray-800">{team.name}</div>
                      <div className="text-2xl font-bold text-blue-600">{team.score}</div>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => adjustTeamScore(index, -5)}
                        className="flex-1 bg-red-100 text-red-600 py-2 rounded hover:bg-red-200 transition-colors"
                      >
                        <Minus size={16} className="mx-auto" />
                      </button>
                      <button 
                        onClick={() => adjustTeamScore(index, 5)}
                        className="flex-1 bg-green-100 text-green-600 py-2 rounded hover:bg-green-200 transition-colors"
                      >
                        <Plus size={16} className="mx-auto" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="xl:col-span-1">
            <LiveLeaderboard 
              teams={teams}
              currentTeamIndex={currentTeamIndex}
              gamePhase={gamePhase}
              totalQuestions={questions.length}
              currentQuestionIndex={currentQuestionIndex}
            />
          </div>
        </div>
      </div>
    );
  }

  // Completed Phase
  if (gamePhase === 'completed') {
    const sortedTeams = [...teams].sort((a, b) => {
      if (b.score === a.score) {
        return b.correctAnswers - a.correctAnswers;
      }
      return b.score - a.score;
    });

    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 odia-text">🎉 Quiz Completed! 🏆</h1>
          <p className="text-lg text-gray-600">Great job everyone! Here are the final results.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8 pattachitra-border">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Crown className="mr-3 text-yellow-500" size={28} />
              Final Rankings
            </h2>
            
            <div className="space-y-4">
              {sortedTeams.map((team, index) => {
                const rank = index + 1;
                const isWinner = rank === 1;
                
                return (
                  <div 
                    key={team.id} 
                    className={`rounded-lg p-6 border-2 ${isWinner ? 'bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-400 animate-pulse' : 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-3xl">
                          {rank === 1 ? '👑' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{team.name}</h3>
                          <p className="text-sm text-gray-600">
                            {team.correctAnswers}/{team.totalAttempts} correct • 
                            {team.totalAttempts > 0 ? Math.round((team.correctAnswers / team.totalAttempts) * 100) : 0}% accuracy
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-gray-800">{team.score}</div>
                        <div className="text-sm text-gray-600">points</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 pattachitra-border">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Star className="mr-2 text-blue-500" size={24} />
                Quiz Statistics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{currentQuestionIndex + 1}</div>
                  <div className="text-sm text-blue-600">Questions Attempted</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-600">{questions.length}</div>
                  <div className="text-sm text-gray-600">Total Available</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {teams.reduce((acc, t) => acc + t.correctAnswers, 0)}
                  </div>
                  <div className="text-sm text-green-600">Total Correct</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.round(teams.reduce((acc, t) => acc + t.score, 0) / teams.length)}
                  </div>
                  <div className="text-sm text-purple-600">Avg Score</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 pattachitra-border">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">What's Next?</h3>
              <div className="space-y-3">
                <button 
                  onClick={resetQuiz}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
                >
                  <RotateCcw size={20} />
                  <span>Start New Quiz</span>
                </button>
                <button 
                  onClick={onBack}
                  className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
                >
                  <ArrowLeft size={20} />
                  <span>Back to Dashboard</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl p-8 border-l-4 border-orange-500">
            <h3 className="text-2xl font-bold text-orange-800 mb-3 odia-text">
              🙏 Jagannath's Blessings to All! 🌸
            </h3>
            <p className="text-orange-700">
              Knowledge shared is knowledge multiplied. Well done, everyone! 📚✨
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default InteractiveQuizGame;