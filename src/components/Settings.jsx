import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Settings as SettingsIcon, 
  Globe, 
  Bell, 
  Moon, 
  Sun, 
  Volume2, 
  VolumeX,
  Save,
  ArrowLeft,
  Monitor,
  Smartphone,
  Shield,
  Database,
  Download,
  Upload,
  Trash2,
  RefreshCw
} from 'lucide-react';

const Settings = ({ onBack, user, onLanguageChange }) => {
  const { t, i18n } = useTranslation();
  const [activeSection, setActiveSection] = useState('general');
  const [settings, setSettings] = useState({
    language: i18n.language,
    theme: localStorage.getItem('theme') || 'light',
    notifications: JSON.parse(localStorage.getItem('notifications') || 'true'),
    sound: JSON.parse(localStorage.getItem('sound') || 'true'),
    fontSize: localStorage.getItem('fontSize') || 'medium',
    autoSave: JSON.parse(localStorage.getItem('autoSave') || 'true'),
    culturalWidgets: JSON.parse(localStorage.getItem('culturalWidgets') || 'true'),
    offlineMode: JSON.parse(localStorage.getItem('offlineMode') || 'true')
  });

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'or', name: 'ଓଡ଼ିଆ', flag: '🏛️' }
  ];

  const sections = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'appearance', label: 'Appearance', icon: Monitor },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'data', label: 'Data & Storage', icon: Database },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield }
  ];

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    
    // Save to localStorage immediately
    localStorage.setItem(key, typeof value === 'boolean' ? JSON.stringify(value) : value);
    
    // Apply changes immediately
    if (key === 'language') {
      i18n.changeLanguage(value);
      if (onLanguageChange) onLanguageChange(value);
    }
    if (key === 'theme') {
      document.documentElement.setAttribute('data-theme', value);
    }
  };

  const handleSaveSettings = () => {
    // All settings are saved automatically, but we can show a confirmation
    const event = new CustomEvent('settingsSaved', { detail: settings });
    window.dispatchEvent(event);
    alert('Settings saved successfully!');
  };

  const handleExportData = () => {
    const data = {
      settings,
      userData: user,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sih2-settings-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearCache = () => {
    if (confirm('Are you sure you want to clear all cached data? This cannot be undone.')) {
      localStorage.clear();
      sessionStorage.clear();
      if ('caches' in window) {
        caches.keys().then(names => {
          names.forEach(name => caches.delete(name));
        });
      }
      alert('Cache cleared successfully! Please refresh the page.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>{t('back_to_dashboard')}</span>
          </button>
          
          <div className="flex items-center space-x-3">
            <SettingsIcon className="text-orange-600" size={24} />
            <h1 className="text-2xl font-bold text-gray-800">{t('settings')}</h1>
          </div>
          
          <button 
            onClick={handleSaveSettings}
            className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
          >
            <Save size={16} />
            <span>{t('save')}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-4">
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? 'bg-orange-100 text-orange-700 border border-orange-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <section.icon size={18} />
                    <span>{section.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-6">
              {activeSection === 'general' && (
                <GeneralSettings 
                  settings={settings} 
                  onSettingChange={handleSettingChange}
                  languages={languages}
                  t={t}
                />
              )}
              {activeSection === 'appearance' && (
                <AppearanceSettings 
                  settings={settings} 
                  onSettingChange={handleSettingChange}
                  t={t}
                />
              )}
              {activeSection === 'notifications' && (
                <NotificationSettings 
                  settings={settings} 
                  onSettingChange={handleSettingChange}
                  t={t}
                />
              )}
              {activeSection === 'data' && (
                <DataStorageSettings 
                  settings={settings} 
                  onSettingChange={handleSettingChange}
                  onExportData={handleExportData}
                  onClearCache={handleClearCache}
                  t={t}
                />
              )}
              {activeSection === 'privacy' && (
                <PrivacySettings 
                  settings={settings} 
                  onSettingChange={handleSettingChange}
                  t={t}
                />
              )}
            </div>
          </div>
        </div>

        {/* Cultural Note */}
        <div className="mt-6 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg p-6 border-l-4 border-orange-500">
          <h4 className="font-medium text-orange-800 mb-2 flex items-center">
            🏛️ {t('cultural_excellence')}
          </h4>
          <p className="text-orange-700 text-sm">
            Your settings help preserve and promote Odisha's rich cultural heritage while ensuring the best learning experience for rural students.
          </p>
        </div>
      </div>
    </div>
  );
};

// General Settings Component
const GeneralSettings = ({ settings, onSettingChange, languages, t }) => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">General Settings</h3>
    
    {/* Language */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <Globe size={16} className="inline mr-2" />
        {t('select_language')}
      </label>
      <select
        value={settings.language}
        onChange={(e) => onSettingChange('language', e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>

    {/* Auto Save */}
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium text-gray-700">Auto-save progress</label>
      <button
        onClick={() => onSettingChange('autoSave', !settings.autoSave)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          settings.autoSave ? 'bg-orange-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            settings.autoSave ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>

    {/* Cultural Widgets */}
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium text-gray-700">Show cultural widgets</label>
      <button
        onClick={() => onSettingChange('culturalWidgets', !settings.culturalWidgets)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          settings.culturalWidgets ? 'bg-orange-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            settings.culturalWidgets ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  </div>
);

// Appearance Settings Component
const AppearanceSettings = ({ settings, onSettingChange, t }) => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Appearance</h3>
    
    {/* Theme */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
      <div className="grid grid-cols-3 gap-3">
        {[
          { value: 'light', label: 'Light', icon: Sun },
          { value: 'dark', label: 'Dark', icon: Moon },
          { value: 'auto', label: 'Auto', icon: Monitor }
        ].map((theme) => (
          <button
            key={theme.value}
            onClick={() => onSettingChange('theme', theme.value)}
            className={`flex flex-col items-center p-4 border rounded-lg transition-colors ${
              settings.theme === theme.value
                ? 'border-orange-500 bg-orange-50 text-orange-700'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <theme.icon size={20} className="mb-2" />
            <span className="text-sm">{theme.label}</span>
          </button>
        ))}
      </div>
    </div>

    {/* Font Size */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
      <select
        value={settings.fontSize}
        onChange={(e) => onSettingChange('fontSize', e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
      >
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
        <option value="extra-large">Extra Large</option>
      </select>
    </div>
  </div>
);

// Notification Settings Component
const NotificationSettings = ({ settings, onSettingChange, t }) => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Notifications</h3>
    
    {/* Enable Notifications */}
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium text-gray-700">Enable notifications</label>
      <button
        onClick={() => onSettingChange('notifications', !settings.notifications)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          settings.notifications ? 'bg-orange-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            settings.notifications ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>

    {/* Sound */}
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium text-gray-700 flex items-center">
        {settings.sound ? <Volume2 size={16} className="mr-2" /> : <VolumeX size={16} className="mr-2" />}
        Sound effects
      </label>
      <button
        onClick={() => onSettingChange('sound', !settings.sound)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          settings.sound ? 'bg-orange-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            settings.sound ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  </div>
);

// Data & Storage Settings Component
const DataStorageSettings = ({ settings, onSettingChange, onExportData, onClearCache, t }) => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Data & Storage</h3>
    
    {/* Offline Mode */}
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium text-gray-700">Offline mode</label>
      <button
        onClick={() => onSettingChange('offlineMode', !settings.offlineMode)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          settings.offlineMode ? 'bg-orange-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            settings.offlineMode ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>

    {/* Data Management */}
    <div className="space-y-3">
      <h4 className="font-medium text-gray-700">Data Management</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <button
          onClick={onExportData}
          className="flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Download size={16} />
          <span>Export Data</span>
        </button>
        <button
          onClick={onClearCache}
          className="flex items-center justify-center space-x-2 p-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
        >
          <Trash2 size={16} />
          <span>Clear Cache</span>
        </button>
      </div>
    </div>
  </div>
);

// Privacy & Security Settings Component
const PrivacySettings = ({ settings, onSettingChange, t }) => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Privacy & Security</h3>
    
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <div className="flex items-center">
        <Shield className="text-yellow-600 mr-3" size={20} />
        <div>
          <h4 className="font-medium text-yellow-800">Secure Local Storage</h4>
          <p className="text-sm text-yellow-700 mt-1">
            Your data is stored securely on your device. No personal information is sent to external servers.
          </p>
        </div>
      </div>
    </div>

    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-center">
        <Database className="text-blue-600 mr-3" size={20} />
        <div>
          <h4 className="font-medium text-blue-800">Offline-First Design</h4>
          <p className="text-sm text-blue-700 mt-1">
            All educational content and progress is stored locally using IndexedDB for rural school environments.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Settings;