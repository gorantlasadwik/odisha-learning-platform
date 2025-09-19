import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  User, 
  Calendar, 
  TrendingUp, 
  Award, 
  BookOpen, 
  Target,
  Clock,
  Star,
  Activity,
  BarChart3,
  ChevronLeft,
  Trophy,
  Flame,
  CheckCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar } from 'recharts';

const StudentProfile = ({ student, onBack, quizzes = [], results = [] }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');
  const [performanceData, setPerformanceData] = useState([]);
  const [subjectAnalysis, setSubjectAnalysis] = useState([]);

  useEffect(() => {
    generatePerformanceData();
    generateSubjectAnalysis();
  }, [student, results]);

  const generatePerformanceData = () => {
    // Generate mock performance data over time
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const data = months.map(month => ({
      month,
      score: Math.floor(Math.random() * 30) + 70,
      attendance: Math.floor(Math.random() * 15) + 85,
      participation: Math.floor(Math.random() * 20) + 75
    }));
    setPerformanceData(data);
  };

  const generateSubjectAnalysis = () => {
    const subjects = ['Mathematics', 'Science', 'Physics', 'Chemistry', 'Biology'];
    const data = subjects.map(subject => ({
      subject,
      strength: Math.floor(Math.random() * 40) + 60,
      improvement: Math.floor(Math.random() * 30) + 50,
      engagement: Math.floor(Math.random() * 35) + 65
    }));
    setSubjectAnalysis(data);
  };

  const tabs = [
    { id: 'overview', label: t('overview'), icon: User },
    { id: 'performance', label: t('performance'), icon: TrendingUp },
    { id: 'curriculum', label: t('curriculum'), icon: BookOpen },
    { id: 'achievements', label: t('achievements'), icon: Award }
  ];

  const badges = [
    { name: 'Quick Learner', icon: '⚡', color: 'bg-yellow-100 text-yellow-800', earned: true },
    { name: 'Math Wizard', icon: '🧮', color: 'bg-blue-100 text-blue-800', earned: true },
    { name: 'Science Explorer', icon: '🔬', color: 'bg-green-100 text-green-800', earned: false },
    { name: 'Consistent Performer', icon: '🎯', color: 'bg-purple-100 text-purple-800', earned: true },
    { name: 'Team Player', icon: '🤝', color: 'bg-orange-100 text-orange-800', earned: false },
    { name: 'Cultural Knowledge', icon: '🏛️', color: 'bg-red-100 text-red-800', earned: true }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 pb-20 md:pb-8">
      <div className="container mx-auto px-4 py-4 md:py-6 max-w-7xl">
        {/* Mobile Header */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-white/50 min-h-[44px]"
          >
            <ChevronLeft size={20} />
            <span className="text-sm md:text-base">{t('back_to_students')}</span>
          </button>
          <h1 className="text-lg md:text-2xl font-bold text-gray-800 truncate ml-4">{t('student_profile')}</h1>
        </div>

        {/* Student Info Card */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-4 md:mb-6 pattachitra-border">
          <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
            {/* Avatar */}
            <div className="flex-shrink-0 self-center md:self-start">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-xl md:text-2xl font-bold text-white">
                  {student?.name?.charAt(0) || 'S'}
                </span>
              </div>
            </div>

            {/* Basic Info */}
            <div className="flex-1 min-w-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="col-span-1 lg:col-span-1">
                  <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2 truncate">{student?.name}</h2>
                  <p className="text-sm md:text-base text-gray-600">ID: {student?.studentId}</p>
                  <p className="text-sm md:text-base text-gray-600">{student?.class} • Age: {student?.age}</p>
                </div>
                
                <div className="col-span-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Flame className="text-orange-500 flex-shrink-0" size={16} />
                    <span className="text-xs md:text-sm text-gray-700 truncate">Streak: <strong>{student?.streaks || 0} days</strong></span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Trophy className="text-yellow-500 flex-shrink-0" size={16} />
                    <span className="text-xs md:text-sm text-gray-700 truncate">Badges: <strong>{badges.filter(b => b.earned).length}</strong></span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="text-blue-500 flex-shrink-0" size={16} />
                    <span className="text-xs md:text-sm text-gray-700 truncate">Avg: <strong>{student?.averageScore || 85}%</strong></span>
                  </div>
                </div>

                <div className="col-span-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="text-green-500 flex-shrink-0" size={16} />
                    <span className="text-xs md:text-sm text-gray-700 truncate">Quizzes: <strong>{student?.totalQuizzes || 0}</strong></span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="text-purple-500 flex-shrink-0" size={16} />
                    <span className="text-xs md:text-sm text-gray-700 truncate">Joined: <strong>Jan 2024</strong></span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Activity className="text-indigo-500 flex-shrink-0" size={16} />
                    <span className="text-xs md:text-sm text-gray-700 truncate">Active: <strong>Today</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg mb-4 md:mb-6">
          <div className="border-b border-gray-200">
            {/* Mobile Tab Navigation - Horizontal Scroll */}
            <nav className="flex md:space-x-8 px-4 md:px-6 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 md:py-4 px-2 md:px-2 border-b-2 font-medium text-xs md:text-sm flex items-center space-x-1 md:space-x-2 whitespace-nowrap min-h-[48px] flex-shrink-0 ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon size={16} className="md:w-5 md:h-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-4 md:p-6">
            {activeTab === 'overview' && <OverviewTab student={student} performanceData={performanceData} />}
            {activeTab === 'performance' && <PerformanceTab performanceData={performanceData} subjectAnalysis={subjectAnalysis} />}
            {activeTab === 'curriculum' && <CurriculumTab student={student} />}
            {activeTab === 'achievements' && <AchievementsTab badges={badges} student={student} />}
          </div>
        </div>
      </div>
    </div>
  );
};

// Overview Tab Component
const OverviewTab = ({ student, performanceData }) => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
        {/* Performance Trend */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-700 mb-4 flex items-center text-sm md:text-base">
            <TrendingUp size={18} className="mr-2 text-blue-500 flex-shrink-0" />
            <span className="truncate">Performance Trend</span>
          </h4>
          <div className="w-full overflow-hidden">
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#f97316" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-700 mb-4 flex items-center text-sm md:text-base">
            <BarChart3 size={18} className="mr-2 text-green-500 flex-shrink-0" />
            <span className="truncate">Quick Stats</span>
          </h4>
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div className="text-center p-2 bg-white rounded-lg">
              <div className="text-lg md:text-2xl font-bold text-blue-600">{student?.averageScore || 85}%</div>
              <div className="text-xs md:text-sm text-gray-600 truncate">Average Score</div>
            </div>
            <div className="text-center p-2 bg-white rounded-lg">
              <div className="text-lg md:text-2xl font-bold text-green-600">{student?.streaks || 7}</div>
              <div className="text-xs md:text-sm text-gray-600 truncate">Day Streak</div>
            </div>
            <div className="text-center p-2 bg-white rounded-lg">
              <div className="text-lg md:text-2xl font-bold text-purple-600">{student?.totalQuizzes || 12}</div>
              <div className="text-xs md:text-sm text-gray-600 truncate">Quizzes Done</div>
            </div>
            <div className="text-center p-2 bg-white rounded-lg">
              <div className="text-lg md:text-2xl font-bold text-orange-600">4</div>
              <div className="text-xs md:text-sm text-gray-600 truncate">Badges Earned</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-700 mb-4 flex items-center text-sm md:text-base">
          <Clock size={18} className="mr-2 text-indigo-500 flex-shrink-0" />
          <span className="truncate">Recent Activity</span>
        </h4>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <span className="text-xs md:text-sm text-gray-700 block">Completed Mathematics Quiz - Score: 92%</span>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <span className="text-xs md:text-sm text-gray-700 block">Earned "Quick Learner" badge</span>
              <span className="text-xs text-gray-500">1 day ago</span>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <span className="text-xs md:text-sm text-gray-700 block">Participated in Science Lab Activity</span>
              <span className="text-xs text-gray-500">2 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Performance Tab Component
const PerformanceTab = ({ performanceData, subjectAnalysis }) => {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Performance Over Time */}
      <div className="bg-gray-50 rounded-lg p-4 md:p-6">
        <h4 className="font-medium text-gray-700 mb-4 text-sm md:text-base">Performance Over Time</h4>
        <div className="w-full overflow-hidden">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#f97316" strokeWidth={2} name="Quiz Score" />
              <Line type="monotone" dataKey="attendance" stroke="#22c55e" strokeWidth={2} name="Attendance" />
              <Line type="monotone" dataKey="participation" stroke="#3b82f6" strokeWidth={2} name="Participation" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
        {/* Subject Analysis Radar */}
        <div className="bg-gray-50 rounded-lg p-4 md:p-6">
          <h4 className="font-medium text-gray-700 mb-4 text-sm md:text-base">Subject Analysis</h4>
          <div className="w-full overflow-hidden">
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={subjectAnalysis}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" fontSize={10} />
                <PolarRadiusAxis fontSize={10} />
                <Radar name="Strength" dataKey="strength" stroke="#f97316" fill="#f97316" fillOpacity={0.3} />
                <Radar name="Engagement" dataKey="engagement" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject Scores Bar Chart */}
        <div className="bg-gray-50 rounded-lg p-4 md:p-6">
          <h4 className="font-medium text-gray-700 mb-4 text-sm md:text-base">Subject Performance</h4>
          <div className="w-full overflow-hidden">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={subjectAnalysis}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" fontSize={10} angle={-45} textAnchor="end" height={80} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="strength" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

// Curriculum Tab Component
const CurriculumTab = ({ student }) => {
  const curriculumProgress = [
    { subject: 'Mathematics', chapter: 'Algebra Basics', progress: 85, status: 'completed' },
    { subject: 'Mathematics', chapter: 'Geometry', progress: 60, status: 'in-progress' },
    { subject: 'Science', chapter: 'Motion and Force', progress: 90, status: 'completed' },
    { subject: 'Science', chapter: 'Light and Sound', progress: 30, status: 'in-progress' },
    { subject: 'Physics', chapter: 'Electricity', progress: 75, status: 'completed' },
    { subject: 'Chemistry', chapter: 'Acids and Bases', progress: 0, status: 'not-started' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'not-started': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} className="text-green-600 flex-shrink-0" />;
      case 'in-progress': return <Clock size={16} className="text-yellow-600 flex-shrink-0" />;
      case 'not-started': return <Target size={16} className="text-gray-600 flex-shrink-0" />;
      default: return <Target size={16} className="text-gray-600 flex-shrink-0" />;
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="bg-gray-50 rounded-lg p-4 md:p-6">
        <h4 className="font-medium text-gray-700 mb-4 md:mb-6 text-sm md:text-base">Curriculum Progress</h4>
        <div className="space-y-3 md:space-y-4">
          {curriculumProgress.map((item, index) => (
            <div key={index} className="bg-white rounded-lg p-3 md:p-4 border border-gray-200">
              <div className="flex items-start justify-between mb-3 space-x-3">
                <div className="flex items-start space-x-2 md:space-x-3 min-w-0 flex-1">
                  {getStatusIcon(item.status)}
                  <div className="min-w-0 flex-1">
                    <h5 className="font-medium text-gray-800 text-sm md:text-base truncate">{item.chapter}</h5>
                    <p className="text-xs md:text-sm text-gray-600 truncate">{item.subject}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 ${getStatusColor(item.status)}`}>
                  {item.status.replace('-', ' ').toUpperCase()}
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs md:text-sm text-gray-600">
                <span>Progress</span>
                <span>{item.progress}% Complete</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Achievements Tab Component
const AchievementsTab = ({ badges, student }) => {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Badges Grid */}
      <div className="bg-gray-50 rounded-lg p-4 md:p-6">
        <h4 className="font-medium text-gray-700 mb-4 md:mb-6 text-sm md:text-base">Achievement Badges</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4">
          {badges.map((badge, index) => (
            <div key={index} className={`p-3 md:p-4 rounded-lg border-2 ${
              badge.earned 
                ? 'border-orange-200 bg-white shadow-sm' 
                : 'border-gray-200 bg-gray-50 opacity-60'
            }`}>
              <div className="text-center">
                <div className="text-2xl md:text-3xl mb-2">{badge.icon}</div>
                <h5 className="font-medium text-gray-800 mb-1 text-xs md:text-sm truncate">{badge.name}</h5>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  badge.earned ? badge.color : 'bg-gray-200 text-gray-600'
                }`}>
                  {badge.earned ? 'Earned' : 'Not Earned'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements Timeline */}
      <div className="bg-gray-50 rounded-lg p-4 md:p-6">
        <h4 className="font-medium text-gray-700 mb-4 md:mb-6 text-sm md:text-base">Achievement Timeline</h4>
        <div className="space-y-4">
          <div className="flex items-start space-x-3 md:space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <Trophy size={16} className="text-orange-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm font-medium text-gray-800">Earned "Math Wizard" Badge</p>
              <p className="text-xs text-gray-600">Completed 5 consecutive math quizzes with 90%+ score</p>
              <p className="text-xs text-gray-500 mt-1">2 days ago</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 md:space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Star size={16} className="text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm font-medium text-gray-800">Reached 7-day Learning Streak</p>
              <p className="text-xs text-gray-600">Consistent daily learning for a week</p>
              <p className="text-xs text-gray-500 mt-1">1 week ago</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 md:space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Award size={16} className="text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm font-medium text-gray-800">Earned "Quick Learner" Badge</p>
              <p className="text-xs text-gray-600">Completed first quiz within 5 minutes</p>
              <p className="text-xs text-gray-500 mt-1">2 weeks ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;