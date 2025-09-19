import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Edit2, Trash2, Users, UserCheck, BarChart3 } from 'lucide-react';
import CulturalHeader from '../components/CulturalHeader';
import Settings from '../components/Settings';
import CulturalWidgets, { DailyCulturalFactWidget } from '../components/CulturalWidgets';
import { teacherService, studentService } from '../services/indexedDB';

const AdminDashboard = ({ user, onLogout }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddTeacher, setShowAddTeacher] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [teachersData, studentsData] = await Promise.all([
        teacherService.getAllTeachers(),
        studentService.getAllStudents()
      ]);
      setTeachers(teachersData);
      setStudents(studentsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (langCode) => {
    // Language change handler for admin
  };

  const handleShowSettings = () => {
    setShowSettings(true);
  };

  const handleBackFromSettings = () => {
    setShowSettings(false);
  };

  const stats = [
    { title: 'Total Teachers', value: teachers.length, icon: UserCheck, color: 'bg-blue-500' },
    { title: 'Total Students', value: students.length, icon: Users, color: 'bg-green-500' },
    { title: 'Active Classes', value: new Set(students.map(s => s.class)).size, icon: BarChart3, color: 'bg-purple-500' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'teachers', label: t('teachers'), icon: UserCheck },
    { id: 'students', label: t('students'), icon: Users }
  ];

  if (showSettings) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
        <CulturalHeader 
          title="Settings"
          user={user}
          onLogout={onLogout}
        />
        <Settings 
          user={user}
          onBack={handleBackFromSettings}
          onLanguageChange={handleLanguageChange}
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="cultural-spinner w-12 h-12 mx-auto mb-4"></div>
          <p>{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <CulturalHeader 
        title={t('admin_panel')}
        user={user}
        onLogout={onLogout}
        onShowSettings={handleShowSettings}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 pattachitra-border">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg mr-4`}>
                  <stat.icon size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-gray-600">{stat.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cultural Widgets Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              🏰 {t('cultural_corner')}
            </h3>
            <div className="text-sm text-gray-600">
              🎨 {t('promoting_cultural_education')}
            </div>
          </div>
          <CulturalWidgets maxWidgets={4} />
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon size={20} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && <OverviewTab teachers={teachers} students={students} />}
            {activeTab === 'teachers' && (
              <TeachersTab 
                teachers={teachers} 
                onRefresh={loadData}
                showAdd={showAddTeacher}
                setShowAdd={setShowAddTeacher}
              />
            )}
            {activeTab === 'students' && (
              <StudentsTab 
                students={students} 
                teachers={teachers}
                onRefresh={loadData}
                showAdd={showAddStudent}
                setShowAdd={setShowAddStudent}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Overview Tab Component
const OverviewTab = ({ teachers, students }) => {
  const { t } = useTranslation();

  const classDistribution = students.reduce((acc, student) => {
    acc[student.class] = (acc[student.class] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">System Overview</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Class Distribution */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-700 mb-4">Class Distribution</h4>
          <div className="space-y-2">
            {Object.entries(classDistribution).map(([className, count]) => (
              <div key={className} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{className}</span>
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm font-medium">
                  {count} students
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-700 mb-4">Recent Activity</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">System initialized successfully</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Database ready for operations</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Cultural elements loaded</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cultural Snippet */}
      <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-6 border-l-4 border-orange-500">
        <h4 className="font-medium text-orange-800 mb-2">{t('did_you_know')}</h4>
        <p className="text-orange-700 text-sm">{t('cultural_fact_1')}</p>
      </div>

      {/* Cultural Dashboard Integration */}
      <div className="mt-6">
        <h4 className="font-medium text-gray-700 mb-4">🌸 Today's Cultural Corner</h4>
        <DailyCulturalFactWidget />
      </div>
    </div>
  );
};

// Teachers Tab Component
const TeachersTab = ({ teachers, onRefresh, showAdd, setShowAdd }) => {
  const { t } = useTranslation();

  const handleDeleteTeacher = async (teacherId) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        await teacherService.deleteTeacher(teacherId);
        onRefresh();
      } catch (error) {
        console.error('Error deleting teacher:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">{t('teachers')} Management</h3>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="btn-odisha flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>{t('create_teacher')}</span>
        </button>
      </div>

      {showAdd && <AddTeacherForm onSuccess={() => { setShowAdd(false); onRefresh(); }} />}

      <div className="bg-white rounded-lg overflow-hidden shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('teacher_name')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('assign_class')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{teacher.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {teacher.assignedClass}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button className="text-indigo-600 hover:text-indigo-900">
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDeleteTeacher(teacher.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Add Teacher Form Component
const AddTeacherForm = ({ onSuccess }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    assignedClass: '',
    phone: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await teacherService.createTeacher({
        ...formData,
        subjects: ['Mathematics', 'Science'] // Default subjects
      });
      onSuccess();
    } catch (error) {
      console.error('Error creating teacher:', error);
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h4 className="text-lg font-medium text-gray-800 mb-4">{t('create_teacher')}</h4>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder={t('teacher_name')}
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          required
        />
        <input
          type="email"
          placeholder={t('teacher_email')}
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          required
        />
        <input
          type="password"
          placeholder={t('password')}
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          required
        />
        <select
          value={formData.assignedClass}
          onChange={(e) => setFormData({...formData, assignedClass: e.target.value})}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          required
        >
          <option value="">{t('assign_class')}</option>
          <option value="Class 6">Class 6</option>
          <option value="Class 7">Class 7</option>
          <option value="Class 8">Class 8</option>
        </select>
        <input
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
        />
        <div className="md:col-span-2 flex space-x-4">
          <button type="submit" className="btn-odisha">
            {t('add')} Teacher
          </button>
          <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            {t('cancel')}
          </button>
        </div>
      </form>
    </div>
  );
};

// Students Tab Component  
const StudentsTab = ({ students, teachers, onRefresh, showAdd, setShowAdd }) => {
  const { t } = useTranslation();

  const handleDeleteStudent = async (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await studentService.deleteStudent(studentId);
        onRefresh();
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">{t('students')} Management</h3>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="btn-temple flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Student</span>
        </button>
      </div>

      {showAdd && <AddStudentForm teachers={teachers} onSuccess={() => { setShowAdd(false); onRefresh(); }} />}

      <div className="bg-white rounded-lg overflow-hidden shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('student_name')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('student_id')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('class')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Streaks
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{student.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{student.studentId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    {student.class}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm text-orange-600 font-medium">🔥 {student.streaks}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button className="text-indigo-600 hover:text-indigo-900">
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDeleteStudent(student.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Add Student Form Component
const AddStudentForm = ({ teachers, onSuccess }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    class: '',
    teacherId: '',
    age: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await studentService.createStudent({
        ...formData,
        age: parseInt(formData.age),
        teacherId: parseInt(formData.teacherId),
        streaks: 0,
        totalQuizzes: 0,
        averageScore: 0,
        badges: []
      });
      onSuccess();
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h4 className="text-lg font-medium text-gray-800 mb-4">Add New Student</h4>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder={t('student_name')}
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
          required
        />
        <input
          type="text"
          placeholder={t('student_id')}
          value={formData.studentId}
          onChange={(e) => setFormData({...formData, studentId: e.target.value})}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
          required
        />
        <select
          value={formData.class}
          onChange={(e) => setFormData({...formData, class: e.target.value})}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
          required
        >
          <option value="">{t('class')}</option>
          <option value="Class 6">Class 6</option>
          <option value="Class 7">Class 7</option>
          <option value="Class 8">Class 8</option>
        </select>
        <select
          value={formData.teacherId}
          onChange={(e) => setFormData({...formData, teacherId: e.target.value})}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
          required
        >
          <option value="">Assign to Teacher</option>
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.name} ({teacher.assignedClass})
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={(e) => setFormData({...formData, age: e.target.value})}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
          required
          min="10"
          max="18"
        />
        <div className="md:col-span-2 flex space-x-4">
          <button type="submit" className="btn-temple">
            {t('add')} Student
          </button>
          <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            {t('cancel')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminDashboard;