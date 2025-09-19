import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import KonarkWheel from '../components/KonarkWheel';
import { teacherService } from '../services/indexedDB';
import { initializeApp } from '../services/indexedDB';

const TeacherLogin = ({ onLogin }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isInitializing, setIsInitializing] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      console.log('Attempting login with:', { email: formData.email, password: formData.password });
      
      // Check if database is initialized first
      const allTeachers = await teacherService.getAllTeachers();
      console.log('All teachers in database:', allTeachers);
      
      const teacher = await teacherService.validateTeacher(formData.email, formData.password);
      
      if (teacher) {
        console.log('Login successful for teacher:', teacher);
        onLogin(teacher);
      } else {
        console.log('Login failed - teacher not found or wrong password');
        setError('Invalid email or password. Try the demo credentials: priya@school.edu / teacher123');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again. If this persists, the database may not be initialized.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReinitializeDB = async () => {
    setIsInitializing(true);
    setError('');
    try {
      console.log('Reinitializing database...');
      await initializeApp();
      setError('Database reinitialized successfully! You can now try logging in.');
    } catch (error) {
      console.error('Database reinitialization failed:', error);
      setError('Failed to reinitialize database: ' + error.message);
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sambalpuri-bg">
      <div className="w-full max-w-md mx-auto">
        {/* Cultural Header */}
        <div className="text-center mb-6 md:mb-8">
          <KonarkWheel size={80} className="mx-auto mb-4 md:mb-6 sm:w-24 sm:h-24" />
          <h1 className="text-responsive-title text-gray-800 mb-2 odia-text">
            👩‍🏫 {t('teacher_dashboard')}
          </h1>
          <p className="text-sm md:text-base text-gray-600">{t('learning_journey')}</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 pattachitra-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail size={16} className="inline mr-2" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input-touch"
                placeholder="teacher@school.edu"
                required
                autoComplete="email"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Lock size={16} className="inline mr-2" />
                {t('password')}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="input-touch pr-12"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className={`border px-4 py-3 rounded-lg text-sm ${
                error.includes('successfully') 
                  ? 'bg-green-50 border-green-200 text-green-700'
                  : 'bg-red-50 border-red-200 text-red-700'
              }`}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-temple btn-mobile disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mb-3"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span className="text-base">Signing in...</span>
                </>
              ) : (
                <>
                  <span className="text-lg mr-2">👩‍🏫</span>
                  <span className="text-base">{t('login')}</span>
                </>
              )}
            </button>

            {/* Reinitialize Database Button */}
            <button
              type="button"
              onClick={handleReinitializeDB}
              disabled={isInitializing}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm min-h-[48px]"
            >
              {isInitializing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Initializing Database...
                </>
              ) : (
                '🔄 Reinitialize Database'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800 font-medium mb-2">📱 Demo Credentials:</p>
            <div className="space-y-1">
              <p className="text-xs md:text-sm text-blue-700">📧 Email: priya@school.edu</p>
              <p className="text-xs md:text-sm text-blue-700">🔑 Password: teacher123</p>
              <p className="text-xs md:text-sm text-blue-600 mt-2">✨ Or try: ravi@school.edu, sunita@school.edu</p>
            </div>
          </div>

          {/* Cultural Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">{t('cultural_fact_3')}</p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link 
            to="/" 
            className="text-yellow-600 hover:text-yellow-700 text-sm md:text-base font-medium inline-flex items-center p-2 min-h-[44px]"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeacherLogin;