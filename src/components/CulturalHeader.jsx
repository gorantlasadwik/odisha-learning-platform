import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, LogOut, Settings, User, Menu, X } from 'lucide-react';

const CulturalHeader = ({ title, user, onLanguageChange, onLogout, onShowTeacherProfile, onShowSettings, showLanguageSelector = true }) => {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'or', name: 'ଓଡ଼ିଆ', flag: '🏛️' }
  ];

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    if (onLanguageChange) onLanguageChange(langCode);
    setIsLanguageMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg pattachitra-border">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center space-x-2 md:space-x-4 flex-1 min-w-0">
              <div className="w-8 h-8 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-lg md:text-2xl">🏛️</span>
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg md:text-2xl font-bold odia-text truncate">{title}</h1>
                <p className="text-xs md:text-sm opacity-80 hidden sm:block">{t('odisha_pride')}</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
              {/* Language Selector */}
              {showLanguageSelector && (
                <div className="relative group">
                  <button 
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors min-h-[44px]"
                    onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                  >
                    <Globe size={20} />
                    <span className="text-sm">{languages.find(l => l.code === i18n.language)?.flag}</span>
                  </button>
                  {isLanguageMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg py-2 min-w-[150px] z-50">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-100 flex items-center space-x-3 min-h-[44px] ${
                            i18n.language === lang.code ? 'bg-orange-50 text-orange-600' : 'text-gray-700'
                          }`}
                        >
                          <span>{lang.flag}</span>
                          <span className="odia-text">{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* User Menu */}
              {user && (
                <div className="flex items-center space-x-4">
                  <div className="text-right hidden lg:block">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs opacity-80">{user.role}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={onShowTeacherProfile}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors min-h-[44px] min-w-[44px]"
                      title="Teacher Profile"
                    >
                      <User size={18} />
                    </button>
                    <button 
                      onClick={onShowSettings}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors min-h-[44px] min-w-[44px]"
                      title="Settings"
                    >
                      <Settings size={18} />
                    </button>
                    {onLogout && (
                      <button 
                        onClick={onLogout}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-red-200 hover:text-red-100 min-h-[44px] min-w-[44px]"
                        title="Logout"
                      >
                        <LogOut size={18} />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors min-h-[44px] min-w-[44px]"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Cultural decorative border */}
        <div className="h-1 md:h-2 bg-gradient-to-r from-yellow-400 via-green-500 to-red-600"></div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50" 
            onClick={closeMobileMenu}
          ></div>
          
          {/* Menu Panel */}
          <div className="absolute top-0 right-0 w-80 max-w-full h-full bg-white shadow-xl drawer-slide-up">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Menu</h3>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-lg hover:bg-gray-100 min-h-[44px] min-w-[44px]"
                >
                  <X size={24} className="text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              {/* User Info */}
              {user && (
                <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
                  <p className="font-medium text-gray-800">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.role}</p>
                </div>
              )}
              
              {/* Language Selector */}
              {showLanguageSelector && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Language / भाषा / ଭାଷା</h4>
                  <div className="space-y-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full text-left p-4 rounded-lg border transition-colors min-h-[48px] ${
                          i18n.language === lang.code 
                            ? 'bg-orange-50 border-orange-200 text-orange-600' 
                            : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{lang.flag}</span>
                          <span className="odia-text font-medium">{lang.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Action Buttons */}
              {user && (
                <div className="space-y-3">
                  <button 
                    onClick={() => {
                      onShowTeacherProfile();
                      closeMobileMenu();
                    }}
                    className="w-full flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors min-h-[48px]"
                  >
                    <User size={20} className="text-blue-600" />
                    <span className="text-blue-700 font-medium">Teacher Profile</span>
                  </button>
                  
                  <button 
                    onClick={() => {
                      onShowSettings();
                      closeMobileMenu();
                    }}
                    className="w-full flex items-center space-x-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors min-h-[48px]"
                  >
                    <Settings size={20} className="text-gray-600" />
                    <span className="text-gray-700 font-medium">Settings</span>
                  </button>
                  
                  {onLogout && (
                    <button 
                      onClick={() => {
                        onLogout();
                        closeMobileMenu();
                      }}
                      className="w-full flex items-center space-x-3 p-4 bg-red-50 hover:bg-red-100 rounded-lg transition-colors min-h-[48px]"
                    >
                      <LogOut size={20} className="text-red-600" />
                      <span className="text-red-700 font-medium">Logout</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CulturalHeader;