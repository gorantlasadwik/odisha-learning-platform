import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import KonarkWheel from '../components/KonarkWheel';
import Logo from '../components/Logo';
import { teacherService } from '../services/indexedDB';
import { initializeApp } from '../services/indexedDB';

const TeacherLogin = ({ onLogin }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: 'priya@school.edu',
    password: 'teacher123'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
      // Simple validation first
      if (!formData.email || !formData.password) {
        setError('Please enter both email and password');
        setIsLoading(false);
        return;
      }
      
      // Ensure database is initialized
      await teacherService.init();
      
      // Check if database is initialized first
      const allTeachers = await teacherService.getAllTeachers();
      
      if (allTeachers.length === 0) {
        await initializeApp();
        // Check again after initialization
        const newTeachers = await teacherService.getAllTeachers();
      }
      
      const teacher = await teacherService.validateTeacher(formData.email, formData.password);
      
      if (teacher) {
        // Navigate to dashboard
        navigate('/teacher/dashboard', { replace: true });
        
        if (onLogin && typeof onLogin === 'function') {
          onLogin(teacher);
        } else {
          setError('Login callback error. Navigation attempted directly.');
        }
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('Login failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sambalpuri-bg">
      <div className="w-full max-w-md mx-auto">
        {/* Cultural Header */}
        <div className="text-center mb-6 md:mb-8">
          <Logo size="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40" className="mx-auto mb-4 md:mb-6" />
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all pr-12"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
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
              className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mb-3"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span className="text-base">Signing in...</span>
                </>
              ) : (
                <>
                  <span className="text-lg mr-2">👩‍🏫</span>
                  <span className="text-base">{t('login')}</span>
                </>
              )}
            </button>
          </form>

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