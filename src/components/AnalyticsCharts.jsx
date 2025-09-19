import React from 'react';
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

// Dummy data for analytics
const subjectScoresData = [
  { subject: 'Mathematics', score: 78 },
  { subject: 'Science', score: 85 },
  { subject: 'Physics', score: 72 },
  { subject: 'Chemistry', score: 80 },
  { subject: 'Biology', score: 88 }
];

const progressTrendData = [
  { week: 'Week 1', score: 65 },
  { week: 'Week 2', score: 70 },
  { week: 'Week 3', score: 75 },
  { week: 'Week 4', score: 78 },
  { week: 'Week 5', score: 82 },
  { week: 'Week 6', score: 85 }
];

const performanceData = [
  { name: 'Excellent (90-100)', value: 25, color: '#10B981' },
  { name: 'Good (75-89)', value: 35, color: '#F59E0B' },
  { name: 'Average (60-74)', value: 30, color: '#EF4444' },
  { name: 'Needs Improvement (<60)', value: 10, color: '#6B7280' }
];

const strengthsWeaknessesData = [
  { category: 'Problem Solving', strength: 85, weakness: 15 },
  { category: 'Conceptual Understanding', strength: 78, weakness: 22 },
  { category: 'Application', strength: 82, weakness: 18 },
  { category: 'Memory Recall', strength: 90, weakness: 10 }
];

// Subject-wise Scores Bar Chart
export const SubjectScoresChart = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Subject-wise Average Scores</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={subjectScoresData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" />
            <YAxis domain={[0, 100]} />
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Score']}
              labelStyle={{ color: '#374151' }}
              contentStyle={{ backgroundColor: '#FFF7ED', border: '1px solid #FB923C' }}
            />
            <Bar dataKey="score" fill="#FB923C" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Progress Trend Line Chart
export const ProgressTrendChart = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Progress Trend</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={progressTrendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis domain={[0, 100]} />
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Average Score']}
              labelStyle={{ color: '#374151' }}
              contentStyle={{ backgroundColor: '#ECFDF5', border: '1px solid #10B981' }}
            />
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

// Performance Distribution Pie Chart
export const PerformanceDistributionChart = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Distribution</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={performanceData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {performanceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Students']}
              contentStyle={{ backgroundColor: '#FEF3C7', border: '1px solid #F59E0B' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      {/* Legend */}
      <div className="mt-4 space-y-2">
        {performanceData.map((item, index) => (
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

// Strengths & Weaknesses Chart
export const StrengthsWeaknessesChart = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Strengths & Areas for Improvement</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={strengthsWeaknessesData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis dataKey="category" type="category" width={120} />
            <Tooltip 
              formatter={(value, name) => [`${value}%`, name === 'strength' ? 'Strength' : 'Needs Work']}
              contentStyle={{ backgroundColor: '#F0F9FF', border: '1px solid #0EA5E9' }}
            />
            <Bar dataKey="strength" stackId="a" fill="#10B981" />
            <Bar dataKey="weakness" stackId="a" fill="#EF4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-sm text-gray-600">Strengths</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-sm text-gray-600">Areas for Improvement</span>
        </div>
      </div>
    </div>
  );
};