﻿import { useTranslation } from 'react-i18next';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const SubjectScoresChart = () => {
  const { t, i18n } = useTranslation();
  
  const getSubjectData = () => [
    { subject: t('mathematics'), score: 78 },
    { subject: t('science'), score: 85 },
    { subject: t('physics'), score: 72 },
    { subject: t('chemistry'), score: 80 },
    { subject: t('biology'), score: 88 }
  ];

  return (
    <div key={`subject-scores-${i18n.language}`} className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('subject_wise_scores')}</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={getSubjectData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="score" fill="#FB923C" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const ProgressTrendChart = () => {
  const { t, i18n } = useTranslation();
  
  const getProgressData = () => [
    { week: `${t('week')} 1`, score: 65 },
    { week: `${t('week')} 2`, score: 70 },
    { week: `${t('week')} 3`, score: 75 },
    { week: `${t('week')} 4`, score: 78 },
    { week: `${t('week')} 5`, score: 82 },
    { week: `${t('week')} 6`, score: 85 }
  ];
  
  return (
    <div key={`progress-trend-${i18n.language}`} className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('progress_trend')}</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={getProgressData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="score" 
              stroke="#10B981" 
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const PerformanceDistributionChart = () => {
  const { t, i18n } = useTranslation();
  
  const getPerformanceData = () => [
    { name: t('excellent'), value: 25, color: '#10B981' },
    { name: t('good'), value: 35, color: '#F59E0B' },
    { name: t('average'), value: 30, color: '#EF4444' },
    { name: t('needs_improvement'), value: 10, color: '#6B7280' }
  ];
  
  return (
    <div key={`performance-distribution-${i18n.language}`} className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('performance_distribution')}</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={getPerformanceData()}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {getPerformanceData().map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 space-y-2">
        {getPerformanceData().map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const StrengthsWeaknessesChart = () => {
  const { t, i18n } = useTranslation();
  
  const getStrengthsData = () => [
    { category: t('problem_solving'), score: 85 },
    { category: t('conceptual_understanding'), score: 78 },
    { category: t('application'), score: 82 },
    { category: t('memory_recall'), score: 90 }
  ];
  
  return (
    <div key={`strengths-weaknesses-${i18n.language}`} className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('strengths_areas_improvement')}</h3>
      <div style={{ width: '100%', height: 350 }}>
        <ResponsiveContainer>
          <BarChart data={getStrengthsData()} margin={{ top: 20, right: 30, left: 40, bottom: 100 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="category" 
              angle={-45} 
              textAnchor="end" 
              height={100}
              interval={0}
              tick={{ fontSize: 12, fill: '#374151' }}
            />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#374151' }} />
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Score']}
              labelFormatter={(label) => `Category: ${label}`}
            />
            <Bar dataKey="score" fill="#3B82F6" radius={[4, 4, 0, 0]}>
              {getStrengthsData().map((entry, index) => {
                const color = entry.score >= 85 ? '#10B981' : entry.score >= 75 ? '#F59E0B' : '#EF4444';
                return <Cell key={`cell-${index}`} fill={color} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h4 className="font-medium text-gray-700">{t('strengths')}</h4>
          {getStrengthsData().filter(item => item.score >= 80).map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">{item.category}: {item.score}%</span>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <h4 className="font-medium text-gray-700">{t('areas_for_improvement')}</h4>
          {getStrengthsData().filter(item => item.score < 80).map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">{item.category}: {item.score}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};