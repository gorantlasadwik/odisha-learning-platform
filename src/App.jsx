import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AdminLogin from './pages/AdminLogin';
import TeacherLogin from './pages/TeacherLogin';
import AdminDashboard from './pages/AdminDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import { initializeApp } from './services/indexedDB';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const { t } = useTranslation();
  
  useEffect(() => {
    const init = async () => {
      // Check saved session
      const savedUser = localStorage.getItem('currentUser');
      const savedUserType = localStorage.getItem('userType');
      
      if (savedUser && savedUserType) {
        setCurrentUser(JSON.parse(savedUser));
        setUserType(savedUserType);
      }
      
      // Initialize database in background
      try {
        await initializeApp();
      } catch (error) {
        // Silent fallback - app works offline without database
      }
      
      // Finish loading
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };
    
    init();
  }, []);

  const handleLogin = (user, type) => {
    setCurrentUser(user);
    setUserType(type);
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('userType', type);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUserType(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userType');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🏛️</div>
          <div className="w-12 h-12 mx-auto mb-4 border-4 border-gray-200 border-t-red-500 rounded-full animate-spin"></div>
          <p className="text-lg text-gray-600">Loading Odisha Learning Platform...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
        <Routes>
          <Route 
            path="/admin/login" 
            element={
              !currentUser ? (
                <AdminLogin onLogin={(user) => {
                  handleLogin(user, 'admin');
                }} />
              ) : (
                <Navigate to="/admin/dashboard" replace />
              )
            } 
          />
          <Route 
            path="/teacher/login" 
            element={
              !currentUser ? (
                <TeacherLogin onLogin={(user) => {
                  handleLogin(user, 'teacher');
                }} />
              ) : (
                <Navigate to="/teacher/dashboard" replace />
              )
            } 
          />
          <Route 
            path="/admin/dashboard" 
            element={
              currentUser && userType === 'admin' ? (
                <AdminDashboard user={currentUser} onLogout={handleLogout} />
              ) : (
                <Navigate to="/admin/login" replace />
              )
            } 
          />
          <Route 
            path="/teacher/dashboard" 
            element={
              currentUser && userType === 'teacher' ? (
                <TeacherDashboard user={currentUser} onLogout={handleLogout} />
              ) : (
                <Navigate to="/teacher/login" replace />
              )
            } 
          />
          <Route 
            path="/" 
            element={<LandingPage t={t} />} 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

// Simple Landing Page
const LandingPage = ({ t }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center px-4">
        <div className="mb-8">
          <span className="text-8xl block mb-4">🏛️</span>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            {t('welcome') || 'Welcome'}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Gamified Learning Platform for Rural Schools in Odisha
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-md md:max-w-lg mx-auto">
          <Link 
            to="/admin/login"
            className="block text-center bg-gradient-to-r from-red-600 to-orange-500 text-white font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 no-underline"
          >
            👑 Admin Login
          </Link>
          <Link 
            to="/teacher/login"
            className="block text-center bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800 font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 no-underline"
          >
            👩‍🏫 Teacher Login
          </Link>
        </div>
        
        <div className="mt-12 text-sm text-gray-500">
          <p>{t('odisha_pride') || 'Pride of Odisha'} • Offline Learning Platform</p>
          <p className="mt-2 text-xs">
            The Konark Sun Temple represents the chariot of Sun God with 24 wheels
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;