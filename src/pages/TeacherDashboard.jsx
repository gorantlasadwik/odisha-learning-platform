import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Users, 
  BookOpen, 
  BarChart3, 
  Trophy, 
  FileText, 
  Target,
  Star,
  TrendingUp,
  Calendar,
  Clock,
  Eye,
  ChevronRight
} from 'lucide-react';
import CulturalHeader from '../components/CulturalHeader';
import StudentProfile from '../components/StudentProfile';
import TeacherProfile from '../components/TeacherProfile';
import Settings from '../components/Settings';
import CulturalWidgets, { DailyCulturalFactWidget } from '../components/CulturalWidgets';
import MobileWebNavigation from '../components/MobileWebNavigation';
import InteractiveQuizGame from '../components/InteractiveQuizGame';
import { studentService } from '../services/indexedDB';
import {
  SubjectScoresChart,
  ProgressTrendChart,
  PerformanceDistributionChart,
  StrengthsWeaknessesChart
} from '../components/AnalyticsCharts';

const TeacherDashboard = ({ user, onLogout }) => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedClass, setSelectedClass] = useState(user.assignedClass || 'Class 6');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentProfile, setShowStudentProfile] = useState(false);
  const [showTeacherProfile, setShowTeacherProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showQuizGame, setShowQuizGame] = useState(false);

  useEffect(() => {
    loadStudents();
  }, [selectedClass]);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const studentsData = await studentService.getStudentsByClass(selectedClass);
      setStudents(studentsData);
    } catch (error) {
      // Handle student loading error silently
      // App continues with empty student list
    } finally {
      setLoading(false);
    }
  };

  const handleViewProfile = (student) => {
    setSelectedStudent(student);
    setShowStudentProfile(true);
  };

  const handleBackFromProfile = () => {
    setShowStudentProfile(false);
    setSelectedStudent(null);
  };

  const handleShowTeacherProfile = () => {
    setShowTeacherProfile(true);
  };

  const handleBackFromTeacherProfile = () => {
    setShowTeacherProfile(false);
  };

  const handleUpdateTeacherProfile = (updatedData) => {
    // Update teacher profile data
    // In a real app, this would sync with backend/database
    setUser({ ...user, ...updatedData });
  };

  const handleShowSettings = () => {
    setShowSettings(true);
  };

  const handleBackFromSettings = () => {
    setShowSettings(false);
  };

  const handleShowQuizGame = () => {
    setShowQuizGame(true);
  };

  const handleBackFromQuizGame = () => {
    setShowQuizGame(false);
  };

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'students', label: t('my_students'), icon: Users },
    { id: 'curriculum', label: t('curriculum'), icon: BookOpen },
    { id: 'analytics', label: t('analytics'), icon: TrendingUp },
    { id: 'quiz', label: t('quiz'), icon: FileText },
    { id: 'leaderboard', label: t('leaderboard'), icon: Trophy }
  ];

  const stats = [
    { title: 'Total Students', value: students.length, icon: Users, color: 'bg-blue-500' },
    { title: 'Active Streaks', value: students.filter(s => s.streaks > 0).length, icon: Target, color: 'bg-orange-500' },
    { title: 'Avg Score', value: Math.round(students.reduce((acc, s) => acc + s.averageScore, 0) / students.length) || 0, icon: Star, color: 'bg-green-500' },
    { title: 'Quizzes Today', value: 3, icon: Clock, color: 'bg-purple-500' }
  ];

  if (showStudentProfile && selectedStudent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
        <CulturalHeader 
          title={`${selectedStudent.name} - Profile`}
          user={user}
          onLanguageChange={handleLanguageChange}
          onLogout={onLogout}
          onShowTeacherProfile={handleShowTeacherProfile}
          onShowSettings={handleShowSettings}
        />
        <StudentProfile 
          student={selectedStudent}
          onBack={handleBackFromProfile}
          quizzes={[]}
          results={[]}
        />
      </div>
    );
  }

  if (showTeacherProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
        <CulturalHeader 
          title={`${user.name} - Teacher Profile`}
          user={user}
          onLanguageChange={handleLanguageChange}
          onLogout={onLogout}
        />
        <TeacherProfile 
          teacher={user}
          onBack={handleBackFromTeacherProfile}
          onUpdate={handleUpdateTeacherProfile}
        />
      </div>
    );
  }

  if (showSettings) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
        <CulturalHeader 
          title="Settings"
          user={user}
          onLanguageChange={handleLanguageChange}
          onLogout={onLogout}
        />
        <Settings 
          user={user}
          onBack={handleBackFromSettings}
          onLanguageChange={handleLanguageChange}
        />
      </div>
    );
  }

  if (showQuizGame) {
    return (
      <InteractiveQuizGame 
        onBack={handleBackFromQuizGame}
      />
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="cultural-spinner w-12 h-12 mx-auto mb-4"></div>
          <p>{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <CulturalHeader 
        title={t('teacher_dashboard')}
        user={user}
        onLanguageChange={handleLanguageChange}
        onLogout={onLogout}
        onShowTeacherProfile={handleShowTeacherProfile}
        onShowSettings={handleShowSettings}
      />

      {/* Mobile/Tablet Navigation */}
      <MobileWebNavigation 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="container mx-auto px-4 py-4 md:py-8 pb-24 md:pb-8">
        {/* Welcome Section - Only show on Overview tab */}
        {activeTab === 'overview' && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-4 md:p-6 mb-6 md:mb-8 text-white">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-bold mb-2 odia-text">
                  {t('welcome')}, {user.name}! 🙏
                </h2>
                <p className="opacity-90 text-sm md:text-base">{t('jagannath_blessings')} - {t('learning_journey')}</p>
              </div>
              
              {/* Class Selector */}
              <div className="bg-white/20 rounded-lg p-3 md:p-4 min-w-0 lg:min-w-[200px]">
                <label className="block text-sm font-medium mb-2">{t('select_class')}</label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full bg-white text-gray-800 rounded-lg px-3 py-2 md:px-4 md:py-2 font-medium focus:ring-2 focus:ring-yellow-300 text-sm md:text-base min-h-[44px]"
                >
                  <option value="Class 6">Class 6</option>
                  <option value="Class 7">Class 7</option>
                  <option value="Class 8">Class 8</option>
                </select>
              </div>
            </div>
            
            {/* Cultural fact */}
            <div className="mt-4 p-3 bg-white/10 rounded-lg">
              <p className="text-xs md:text-sm">
                💡 {t('did_you_know')} {t('cultural_fact_4')}
              </p>
            </div>
          </div>
        )}

        {/* Stats Cards - Only show on Overview tab */}
        {activeTab === 'overview' && (
          <div className="grid-responsive-2 mb-6 md:mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="card-responsive pattachitra-border">
                <div className="flex items-center">
                  <div className={`${stat.color} p-3 rounded-lg mr-3 md:mr-4 flex-shrink-0`}>
                    <stat.icon size={20} className="text-white md:w-6 md:h-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xl md:text-2xl font-bold text-gray-800">{stat.value}</p>
                    <p className="text-gray-600 text-xs md:text-sm truncate">{stat.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      {/* Cultural Widgets Section - Only show on Overview tab */}
      {activeTab === 'overview' && (
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              🏰 {t('cultural_corner')}
            </h3>
            <div className="text-sm text-gray-600">
              🌸 {t('arts_heritage')} • 🍛 {t('food_lifestyle')} • 🌿 {t('nature_geography')}
            </div>
          </div>
          <CulturalWidgets maxWidgets={3} />
        </div>
      )}

        {/* Page Header for Non-Overview Tabs */}
        {activeTab !== 'overview' && (
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 odia-text">
                {tabs.find(tab => tab.id === activeTab)?.label || 'Dashboard'}
              </h2>
              <div className="bg-white rounded-lg p-2 shadow-sm">
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="bg-transparent text-gray-800 font-medium focus:outline-none text-sm"
                >
                  <option value="Class 6">Class 6</option>
                  <option value="Class 7">Class 7</option>
                  <option value="Class 8">Class 8</option>
                </select>
              </div>
            </div>
          </div>
        )}

      {/* Desktop Tab Navigation (hidden on mobile/tablet) */}
        <div className="lg:block hidden bg-white rounded-xl shadow-lg mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-4 md:space-x-8 px-4 md:px-6 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 md:py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 whitespace-nowrap min-h-[48px] ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon size={18} className="md:w-5 md:h-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-4 md:p-6">
            {activeTab === 'overview' && <OverviewTab students={students} />}
            {activeTab === 'students' && <StudentsTab students={students} onViewProfile={handleViewProfile} />}
            {activeTab === 'curriculum' && <CurriculumTab selectedClass={selectedClass} />}
            {activeTab === 'analytics' && <AnalyticsTab />}
            {activeTab === 'quiz' && <QuizTab onStartQuizGame={handleShowQuizGame} />}
            {activeTab === 'leaderboard' && <LeaderboardTab students={students} />}
          </div>
        </div>

        {/* Mobile/Tablet Content Area */}
        <div className="lg:hidden bg-white rounded-xl shadow-lg mb-6">
          <div className="p-4 md:p-6">
            {activeTab === 'overview' && <OverviewTab students={students} />}
            {activeTab === 'students' && <StudentsTab students={students} onViewProfile={handleViewProfile} />}
            {activeTab === 'curriculum' && <CurriculumTab selectedClass={selectedClass} />}
            {activeTab === 'analytics' && <AnalyticsTab />}
            {activeTab === 'quiz' && <QuizTab onStartQuizGame={handleShowQuizGame} />}
            {activeTab === 'leaderboard' && <LeaderboardTab students={students} />}
          </div>
        </div>
      </div>
    </div>
  );
};

// Overview Tab Component
const OverviewTab = ({ students }) => {
  const { t } = useTranslation();

  const topPerformers = students
    .sort((a, b) => b.averageScore - a.averageScore)
    .slice(0, 3);

  const needsAttention = students
    .filter(s => s.averageScore < 60)
    .sort((a, b) => a.averageScore - b.averageScore)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
          <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
            <Trophy className="mr-2" size={20} />
            {t('top_performers')}
          </h3>
          <div className="space-y-3">
            {topPerformers.map((student, index) => (
              <div key={student.id} className="flex items-center justify-between bg-white/50 rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{student.name}</p>
                    <p className="text-sm text-gray-600">🔥 {student.streaks} {t('day_streak')}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">{student.averageScore}%</p>
                  <p className="text-xs text-gray-500">{student.totalQuizzes} quizzes</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Needs Attention */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6 border border-orange-200">
          <h3 className="text-lg font-semibold text-orange-800 mb-4 flex items-center">
            <Target className="mr-2" size={20} />
            {t('needs_attention')}
          </h3>
          <div className="space-y-3">
            {needsAttention.length > 0 ? needsAttention.map((student) => (
              <div key={student.id} className="flex items-center justify-between bg-white/50 rounded-lg p-3">
                <div>
                  <p className="font-medium text-gray-800">{student.name}</p>
                  <p className="text-sm text-gray-600">{t('last_active')}: 2 {t('days_ago')}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-orange-600">{student.averageScore}%</p>
                  <button className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded mt-1">
                    {t('help')}
                  </button>
                </div>
              </div>
            )) : (
              <div className="text-center py-4">
                <p className="text-gray-500">🎉 {t('all_students_performing_well')}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Calendar className="mr-2" size={20} />
          {t('recent_activity')}
        </h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">{t('quiz_completed_by')} Mathematics Quiz #3 - {t('score')}: 85%</span>
            <span className="text-xs text-gray-400">2 {t('min_ago')}</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">{t('new_quiz_assigned')}: Science Chapter 4</span>
            <span className="text-xs text-gray-400">1 {t('hour_ago')}</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Aisha {t('achieved_streak')} 🎉</span>
            <span className="text-xs text-gray-400">3 {t('hours_ago')}</span>
          </div>
        </div>
      </div>

      {/* Daily Cultural Corner */}
      <div className="mt-6">
        <DailyCulturalFactWidget />
      </div>
    </div>
  );
};

// Students Tab Component
const StudentsTab = ({ students, onViewProfile }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
        <h3 className="text-lg font-semibold text-gray-800">{t('my_students')}</h3>
        <div className="text-sm text-gray-600">
          {t('total_students')}: {students.length} {t('students_count')}
        </div>
      </div>

      <div className="grid-responsive-1">
        {students.map((student) => (
          <div key={student.id} className="card-responsive hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold text-gray-800 truncate">{student.name}</h4>
                <p className="text-sm text-gray-600">{student.studentId}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                  🔥 {student.streaks}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{t('average_score')}</span>
                <span className="font-medium text-gray-800">{student.averageScore}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{t('quizzes_taken')}</span>
                <span className="font-medium text-gray-800">{student.totalQuizzes}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{t('badges')}</span>
                <div className="flex space-x-1">
                  {student.badges?.map((badge, index) => (
                    <span key={index} className="text-xs">🏆</span>
                  )) || <span className="text-xs text-gray-400">{t('none')}</span>}
                </div>
              </div>
            </div>

            <button 
              onClick={() => onViewProfile(student)}
              className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 min-h-[48px]"
            >
              <Eye size={16} />
              <span>{t('view_profile')}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Curriculum Tab Component  
const CurriculumTab = ({ selectedClass }) => {
  const { t } = useTranslation();

  const curriculumData = {
    'Class 6': [
      { subject: 'Mathematics', chapters: ['Numbers', 'Algebra', 'Geometry', 'Mensuration'], progress: 75 },
      { subject: 'Science', chapters: ['Motion', 'Light', 'Electricity', 'Life Processes'], progress: 60 }
    ],
    'Class 7': [
      { subject: 'Mathematics', chapters: ['Integers', 'Fractions', 'Simple Equations', 'Triangles'], progress: 80 },
      { subject: 'Science', chapters: ['Heat', 'Acids & Bases', 'Weather', 'Soil'], progress: 70 }
    ],
    'Class 8': [
      { subject: 'Mathematics', chapters: ['Rational Numbers', 'Linear Equations', 'Quadrilaterals'], progress: 85 },
      { subject: 'Science', chapters: ['Force & Pressure', 'Friction', 'Sound', 'Chemical Effects'], progress: 75 }
    ]
  };

  const subjects = curriculumData[selectedClass] || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">{t('curriculum')} - {selectedClass}</h3>
        <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
          📚 {t('scert_syllabus')}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {subjects.map((subject, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold text-gray-800">{subject.subject}</h4>
              <div className="text-sm text-gray-600">{subject.progress}% {t('complete')}</div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full" 
                style={{ width: `${subject.progress}%` }}
              ></div>
            </div>

            <div className="space-y-2">
              {subject.chapters.map((chapter, chapterIndex) => (
                <div key={chapterIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <span className="text-sm font-medium text-gray-700">{chapter}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      ✓ {t('complete')}
                    </span>
                    <button className="text-blue-600 hover:text-blue-800 text-xs">
                      {t('view')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Cultural learning note */}
      <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg p-6 border-l-4 border-orange-500">
        <h4 className="font-medium text-orange-800 mb-2">🏛️ {t('cultural_integration')}</h4>
        <p className="text-orange-700 text-sm">
          Mathematics concepts are explained using Konark wheel geometry, and Science topics include references to traditional Odisha knowledge systems.
        </p>
      </div>
    </div>
  );
};

// Analytics Tab Component
const AnalyticsTab = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">{t('analytics')} Dashboard</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SubjectScoresChart />
        <ProgressTrendChart />
        <PerformanceDistributionChart />
        <StrengthsWeaknessesChart />
      </div>
    </div>
  );
};

// Quiz Tab Component
const QuizTab = ({ onStartQuizGame }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <div className="text-6xl mb-4">🎯</div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">{t('interactive_quiz_game')}</h3>
        <p className="text-gray-600 mb-6">
          Create engaging team-based quiz competitions with live scoring and leaderboards!
        </p>
      </div>

      {/* Game Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <div className="text-3xl mb-3">👥</div>
          <h4 className="font-semibold text-blue-800 mb-2">{t('team_competition')}</h4>
          <p className="text-blue-700 text-sm">
            Set up teams (2-6) with custom names and watch them compete in real-time
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
          <div className="text-3xl mb-3">📚</div>
          <h4 className="font-semibold text-green-800 mb-2">{t('question_banks')}</h4>
          <p className="text-green-700 text-sm">
            Choose from Science, Mathematics, History, and General Knowledge categories
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-200">
          <div className="text-3xl mb-3">🏆</div>
          <h4 className="font-semibold text-purple-800 mb-2">{t('live_leaderboard')}</h4>
          <p className="text-purple-700 text-sm">
            Dynamic scoring with teacher controls and real-time rankings
          </p>
        </div>
      </div>

      {/* Start Button */}
      <div className="text-center">
        <button 
          onClick={onStartQuizGame}
          className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg"
        >
          🚀 {t('start_interactive_quiz_game')}
        </button>
      </div>

      {/* Cultural Note */}
      <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-6 border-l-4 border-orange-500 mt-8">
        <h4 className="font-medium text-orange-800 mb-2">🏛️ {t('cultural_integration')}</h4>
        <p className="text-orange-700 text-sm">
          Quiz questions include elements of Odisha's rich heritage, traditional knowledge, and cultural wisdom alongside academic content.
        </p>
      </div>
    </div>
  );
};

// Leaderboard Tab Component
const LeaderboardTab = ({ students }) => {
  const { t } = useTranslation();

  const sortedStudents = students
    .sort((a, b) => b.averageScore - a.averageScore)
    .map((student, index) => ({ ...student, rank: index + 1 }));

  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <span className="text-6xl">🏆</span>
        <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">{t('leaderboard')}</h3>
        <p className="text-gray-600">{t('cultural_design_coming_soon')}</p>
      </div>

      <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg p-6">
        <h4 className="font-medium text-orange-800 mb-4">🎯 {t('current_class_rankings')}</h4>
        <div className="space-y-3">
          {sortedStudents.slice(0, 10).map((student) => (
            <div key={student.id} className="flex items-center justify-between bg-white/70 rounded-lg p-3">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                  student.rank === 1 ? 'bg-yellow-500' : 
                  student.rank === 2 ? 'bg-gray-400' : 
                  student.rank === 3 ? 'bg-orange-600' : 'bg-blue-500'
                }`}>
                  {student.rank}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{student.name}</p>
                  <p className="text-sm text-gray-600">🔥 {student.streaks} day streak</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-800">{student.averageScore}%</p>
                <div className="flex space-x-1">
                  {student.badges?.slice(0, 3).map((_, index) => (
                    <span key={index} className="text-xs">🏆</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;