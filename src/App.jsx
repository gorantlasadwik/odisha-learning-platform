import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Loading from './components/Loading';
import AdminLogin from './pages/AdminLogin';
import TeacherLogin from './pages/TeacherLogin';
import AdminDashboard from './pages/AdminDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import { initializeApp } from './services/indexedDB';

// Debug component to show current route
const RouteDebug = () => {
  const location = useLocation();
  if (process.env.NODE_ENV === 'development') {
    console.log('Current route:', location.pathname);
  }
  return null;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [userType, setUserType] = useState(null); // 'admin' or 'teacher'
  const { t } = useTranslation();


  useEffect(() => {
    initApp();
  }, []);

  const initApp = async () => {
    try {
      console.log('🚀 Initializing app...');
      setIsLoading(true);
      
      // Check for saved session first
      const savedUser = localStorage.getItem('currentUser');
      const savedUserType = localStorage.getItem('userType');
      
      if (savedUser && savedUserType) {
        console.log('💾 Found saved session:', JSON.parse(savedUser).email);
        setCurrentUser(JSON.parse(savedUser));
        setUserType(savedUserType);
      }
      
      // Initialize database with timeout protection
      const initTimeout = setTimeout(() => {
        console.log('⚠️ Database initialization timeout - continuing anyway');
        setIsLoading(false);
      }, 5000); // Increased to 5 seconds for better reliability
      
      try {
        console.log('💾 Initializing database...');
        await initializeApp();
        console.log('✅ Database initialization completed successfully');
        clearTimeout(initTimeout);
      } catch (dbError) {
        console.warn('⚠️ Database initialization failed, but app will continue:', dbError);
        clearTimeout(initTimeout);
        // Don't fail the entire app if database fails
      }
      
      // Small delay for smooth UX
      setTimeout(() => {
        console.log('✅ App ready!');
        setIsLoading(false);
      }, 500);
      
    } catch (error) {
      console.error('❌ Critical app initialization error:', error);
      // Even if initialization fails, show the app
      setIsLoading(false);
    }
  };

  const handleLogin = (user, type) => {
    console.log('Login successful:', { user: user.name || user.email, type });
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
    return <Loading message={t('loading')} />;
  }

  return (
    <Router>
      <RouteDebug />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 sambalpuri-bg">
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/admin/login" 
            element={
              !currentUser ? (
                <AdminLogin onLogin={(user) => handleLogin(user, 'admin')} />
              ) : (
                <Navigate to="/admin/dashboard" replace />
              )
            } 
          />
          <Route 
            path="/teacher/login" 
            element={
              !currentUser ? (
                <TeacherLogin onLogin={(user) => handleLogin(user, 'teacher')} />
              ) : (
                <Navigate to="/teacher/dashboard" replace />
              )
            } 
          />

          {/* Protected Routes */}
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

          {/* Landing Page Route */}
          <Route 
            path="/" 
            element={<LandingPage />} 
          />
          
          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

// Simple Landing Page Component
const LandingPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center px-4">
        <div className="mb-8">
          <span className="text-8xl block mb-4">🏛️</span>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4 odia-text">
            {t('welcome')}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Gamified Learning Platform for Rural Schools in Odisha
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-md md:max-w-lg mx-auto">
          <Link 
            to="/admin/login"
            className="btn-odisha block text-center text-white no-underline py-4 px-8 rounded-lg"
          >
            👑 Admin Login
          </Link>
          <Link 
            to="/teacher/login"
            className="btn-temple block text-center text-gray-800 no-underline py-4 px-8 rounded-lg"
          >
            👩‍🏫 Teacher Login
          </Link>
        </div>
        
        <div className="mt-12 text-sm text-gray-500">
          <p>{t('odisha_pride')} • Offline Learning Platform</p>
          <p className="mt-2 text-xs">{t('cultural_fact_1')}</p>
        </div>
      </div>
    </div>
  );
};

export default App;