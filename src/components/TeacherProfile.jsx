import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  User, 
  Mail, 
  Calendar, 
  Award, 
  BookOpen, 
  Users, 
  Star,
  Edit,
  Save,
  X,
  ArrowLeft
} from 'lucide-react';

const TeacherProfile = ({ teacher, onBack, onUpdate }) => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTeacher, setEditedTeacher] = useState({
    name: teacher.name || '',
    email: teacher.email || '',
    subject: teacher.subject || '',
    experience: teacher.experience || '',
    qualifications: teacher.qualifications || '',
    bio: teacher.bio || ''
  });

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(editedTeacher);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTeacher({
      name: teacher.name || '',
      email: teacher.email || '',
      subject: teacher.subject || '',
      experience: teacher.experience || '',
      qualifications: teacher.qualifications || '',
      bio: teacher.bio || ''
    });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedTeacher(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Mock achievements data
  const achievements = [
    { 
      title: t('odisha_culture_promoter'), 
      description: t('culture_promoter_desc'),
      date: '2024-01-15',
      icon: '🏛️'
    },
    {
      title: 'Excellence in Teaching',
      description: 'Awarded for outstanding student performance improvement',
      date: '2023-12-10',
      icon: '🏆'
    },
    {
      title: 'Digital Innovation',
      description: 'Successfully integrated technology in classroom teaching',
      date: '2023-11-20',
      icon: '💻'
    }
  ];

  const stats = [
    { label: 'Students Taught', value: teacher.totalStudents || 45, icon: Users },
    { label: 'Years Experience', value: teacher.experience || 8, icon: Calendar },
    { label: 'Average Rating', value: teacher.rating || 4.8, icon: Star },
    { label: 'Subjects', value: teacher.subjectsCount || 3, icon: BookOpen }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-6">
      <div className="max-w-4xl mx-auto">
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
            {isEditing ? (
              <>
                <button 
                  onClick={handleSave}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save size={16} />
                  <span>{t('save')}</span>
                </button>
                <button 
                  onClick={handleCancel}
                  className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <X size={16} />
                  <span>{t('cancel')}</span>
                </button>
              </>
            ) : (
              <button 
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit size={16} />
                <span>{t('edit')}</span>
              </button>
            )}
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex items-start space-x-6">
            {/* Profile Picture */}
            <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              {teacher.name ? teacher.name.charAt(0).toUpperCase() : 'T'}
            </div>
            
            {/* Basic Info */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    {t('teacher_name')}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedTeacher.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-lg font-semibold text-gray-800">{teacher.name}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    {t('teacher_email')}
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedTeacher.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-600 flex items-center">
                      <Mail size={16} className="mr-2" />
                      {teacher.email}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Subject Specialization
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedTeacher.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="e.g., Mathematics, Science"
                    />
                  ) : (
                    <p className="text-gray-600">{teacher.subject || 'Mathematics & Science'}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Experience (Years)
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editedTeacher.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-600">{teacher.experience || 8} years</p>
                  )}
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Bio / Description
                </label>
                {isEditing ? (
                  <textarea
                    value={editedTeacher.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    rows="3"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="text-gray-600">
                    {teacher.bio || `Dedicated educator passionate about integrating Odisha's rich cultural heritage into modern STEM education. Committed to inspiring students through innovative teaching methods.`}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <stat.icon size={24} className="text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Achievements Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <Award className="mr-3 text-orange-600" size={24} />
            {t('achievements')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-3">
                  <div className="text-3xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-1">{achievement.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                    <p className="text-xs text-gray-500">
                      {t('earned_on')}: {new Date(achievement.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cultural Note */}
        <div className="mt-6 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg p-6 border-l-4 border-orange-500">
          <h4 className="font-medium text-orange-800 mb-2 flex items-center">
            🏛️ Cultural Excellence
          </h4>
          <p className="text-orange-700 text-sm">
            As an educator in Odisha, you play a vital role in preserving and promoting our rich cultural heritage while advancing modern education. Your dedication to integrating traditional knowledge with contemporary learning makes you a true cultural ambassador.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;