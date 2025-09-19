import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Users, 
  BookOpen, 
  BarChart3, 
  Trophy, 
  FileText, 
  Target
} from 'lucide-react';

const MobileWebNavigation = ({ activeTab, onTabChange, className = '' }) => {
  const { t } = useTranslation();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3, shortLabel: 'Home' },
    { id: 'students', label: t('my_students'), icon: Users, shortLabel: 'Students' },
    { id: 'curriculum', label: t('curriculum'), icon: BookOpen, shortLabel: 'Lessons' },
    { id: 'analytics', label: t('analytics'), icon: Target, shortLabel: 'Stats' },
    { id: 'quiz', label: t('quiz'), icon: FileText, shortLabel: 'Quiz' },
    { id: 'leaderboard', label: t('leaderboard'), icon: Trophy, shortLabel: 'Ranks' }
  ];

  const handleTabChange = (tabId) => {
    onTabChange(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 ${className}`}>
        <div className="flex justify-around items-center py-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all duration-200 min-h-[60px] min-w-[50px] ${
                activeTab === tab.id
                  ? 'text-orange-600 bg-orange-50 border-2 border-orange-200'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 border-2 border-transparent'
              }`}
            >
              <tab.icon 
                size={20} 
                className={`mb-1 transition-all duration-200 ${
                  activeTab === tab.id ? 'text-orange-600' : 'text-gray-500'
                }`}
                strokeWidth={activeTab === tab.id ? 2.5 : 2} 
              />
              <span className={`text-xs font-medium transition-all duration-200 ${
                activeTab === tab.id ? 'text-orange-600' : 'text-gray-500'
              }`}>{tab.shortLabel}</span>
              {activeTab === tab.id && (
                <div className="w-6 h-1 bg-orange-600 rounded-full mt-1"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tablet Horizontal Navigation */}
      <div className="hidden md:block lg:hidden bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex space-x-2 overflow-x-auto py-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-colors min-h-[48px] ${
                  activeTab === tab.id
                    ? 'bg-orange-100 text-orange-600 border border-orange-200'
                    : 'text-gray-600 hover:bg-gray-100 border border-transparent'
                }`}
              >
                <tab.icon size={18} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile spacer to prevent content being hidden behind bottom nav */}
      <div className="md:hidden h-20"></div>
    </>
  );
};

export default MobileWebNavigation;