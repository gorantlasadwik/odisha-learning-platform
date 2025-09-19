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

const MobileNavigation = ({ activeTab, onTabChange, className = '' }) => {
  const { t } = useTranslation();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3, shortLabel: 'Home' },
    { id: 'students', label: t('my_students'), icon: Users, shortLabel: 'Students' },
    { id: 'curriculum', label: t('curriculum'), icon: BookOpen, shortLabel: 'Lessons' },
    { id: 'analytics', label: t('analytics'), icon: Target, shortLabel: 'Stats' },
    { id: 'quiz', label: t('quiz'), icon: FileText, shortLabel: 'Quiz' },
    { id: 'leaderboard', label: t('leaderboard'), icon: Trophy, shortLabel: 'Ranks' }
  ];

  return (
    <div className={`mobile-nav ${className}`}>
      <div className="flex justify-around items-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-colors min-h-[48px] min-w-[48px] ${
              activeTab === tab.id
                ? 'text-orange-600 bg-orange-50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <tab.icon size={20} className="mb-1" />
            <span className="text-xs font-medium">{tab.shortLabel}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileNavigation;