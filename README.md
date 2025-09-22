# 🏛️ ShikshaMitra - Odisha Learning Platform

<div align="center">
  
  **A culturally-integrated, offline-first learning platform for rural schools in Odisha**
  
  *Combining modern technology with rich Odia heritage through gamification and multilingual support*

  [![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat&logo=react)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-7.1.5-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
  [![IndexedDB](https://img.shields.io/badge/IndexedDB-Offline%20First-orange?style=flat)](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
  [![i18next](https://img.shields.io/badge/i18next-15.7.3-green?style=flat)](https://www.i18next.com/)

  ![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)
  ![Offline Ready](https://img.shields.io/badge/Offline-Ready-orange?style=for-the-badge)
  ![Mobile Optimized](https://img.shields.io/badge/Mobile-Optimized-blue?style=for-the-badge)
  
</div>

---

## 🎯 Project Overview

**ShikshaMitra** addresses the unique challenges of rural education in Odisha through an innovative platform that works completely offline while celebrating local heritage.

### Problem & Solution
- **Challenge**: Limited internet, cultural disconnect, resource constraints
- **Solution**: Offline-first platform with deep Odia cultural integration
- **Impact**: Engaging, culturally-relevant education for rural students

## ✨ Key Features

### 🌐 Complete Offline Functionality
- Works entirely without internet using IndexedDB
- All progress, quizzes, and content stored locally
- Instant loading with no connectivity delays

### 🎨 Rich Cultural Integration
- **Konark Sun Temple** inspired design elements
- **Traditional Odia colors**: Temple red, mustard gold, sacred green
- **Pattachitra art motifs** and **Sambalpuri patterns**
- Cultural facts woven into educational content

### 🌍 Multilingual Education
- **Triple language support**: English, Hindi, Odia (ଓଡ଼ିଆ)
- **Real-time switching** without page reload
- **Proper Odia script** with Noto Sans Oriya font

### 🎮 Advanced Gamification
- Daily streak tracking with cultural rewards
- Multi-tier badges (Bronze, Silver, Gold, Diamond)
- Interactive leaderboards with heritage themes
- Progress visualization through beautiful charts

### 📊 Comprehensive Analytics
- Real-time performance tracking across subjects
- Visual data insights with interactive charts
- Class and individual benchmarking
- Cultural engagement metrics

## 🛠️ Technology Stack

### Frontend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| **React.js** | 19.1.1 | UI Framework |
| **Vite** | 7.1.5 | Build Tool |
| **TailwindCSS** | 3.4.17 | Styling |
| **Recharts** | 3.2.0 | Data Visualization |
| **react-i18next** | 15.7.3 | Internationalization |

### Data & Storage
- **IndexedDB**: Client-side database for offline storage
- **idb**: Promise-based IndexedDB wrapper
- **LocalStorage**: Settings and preferences

### Cultural Assets
- **Konark Wheel Loader**: CSS animation of temple wheel
- **Odia Typography**: Noto Sans Oriya font
- **Traditional Patterns**: Pattachitra and Sambalpuri designs

## 🏗️ Architecture

```
ShikshaMitra Platform
│
├── 🌐 Frontend (React SPA)
│   ├── 🧩 Components (Cultural UI)
│   ├── 📄 Pages (Dashboards)
│   ├── 🛠️ Services (Database)
│   └── 🎨 Styles (Heritage Themes)
│
├── 🗄️ IndexedDB Storage
│   ├── 👥 Users & Analytics
│   ├── 📚 Educational Content
│   └── 🎯 Gamification Data
│
└── 🎯 Offline-First Design
    ├── 📋 Local Persistence
    └── 🎨 Cultural Assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16.0+
- npm 7.0+
- Modern browser
- 2GB RAM minimum

### Installation
```bash
# Clone repository
git clone https://github.com/your-username/shiksha-mitra-odisha.git

# Install dependencies
cd shiksha-mitra-odisha
npm install

# Start development server
npm run dev

# Access at http://localhost:3003/
```

### Demo Accounts
**Admin**: `admin@odisha-learning.edu` / `admin123`
**Teacher**: `priya@school.edu` / `teacher123`

## 📱 User Experience

### 👑 Admin Dashboard
- User management (teachers/students)
- System analytics and insights
- Cultural content administration

### 👩‍🏫 Teacher Dashboard
- Multi-class management (Grades 6-8)
- Performance analytics with charts
- Quiz creation and management
- Cultural leaderboards

### 👧👦 Student Experience
- Gamified learning journey
- Interactive team-based quizzes
- Progress tracking with badges
- Multilingual content access

## 🎮 Gamification System

### Achievement Badges
| Level | Name | Cultural Meaning | Requirements |
|-------|------|------------------|-------------|
| 🥉 Bronze | "Shuru Karta" | The Beginner | First quiz, 3-day streak |
| 🥈 Silver | "Gyan Sadhak" | Knowledge Seeker | 70%+ average, 7-day streak |
| 🥇 Gold | "Vidya Shree" | Excellence in Education | 85%+ average, 15-day streak |
| 💎 Diamond | "Guru Ratna" | Precious Teacher | 90%+ average, 30-day streak |

## 🌍 Offline Capabilities

✅ Complete offline operation  
✅ User authentication & sessions  
✅ Quiz creation, taking, and scoring  
✅ Progress tracking & analytics  
✅ Gamification with badges & streaks  
✅ Language switching & cultural content  

## 🎨 Cultural Integration

### Visual Elements
- **Konark Sun Temple**: 24-spoke wheel loader animation
- **Traditional Colors**: Temple red (#CC0000), Mustard gold (#FFD700)
- **Art Patterns**: Pattachitra borders, Sambalpuri backgrounds
- **Typography**: Authentic Odia script rendering

### Educational Context
- Heritage-based STEM learning
- Cultural facts in "Did you know?" sections
- Traditional greetings and terminology
- Festival-integrated content

## 📊 Analytics & Reports

- **Student Performance**: Subject-wise progress charts
- **Engagement Metrics**: Daily activity and cultural interaction
- **Class Insights**: Aggregate statistics and trends
- **Visual Reports**: Mobile-optimized charts with cultural colors

## 🔧 Development

### Project Structure
```
src/
├── components/         # Reusable UI components
├── pages/             # Route components
├── services/          # Database operations
├── utils/             # i18n and utilities
├── data/              # Static cultural data
└── App.jsx            # Main application
```

### Build Commands
```bash
npm run dev        # Development server
npm run build      # Production build
npm run preview    # Preview build
```

## 🚀 Deployment

### Static Hosting
```bash
# Build for production
npm run build

# Deploy to Netlify/Vercel
npx netlify deploy --prod --dir=dist
npx vercel --prod dist
```

### School Setup
1. Deploy on local server for LAN access
2. Install PWA on student tablets
3. Ensure offline operation
4. Regular data backup

## 🤝 Contributing

### How to Contribute
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

### Areas for Contribution
- Cultural content and Odia heritage facts
- Hindi/Odia translation improvements
- Educational content and assessments
- Device testing and feedback
- Documentation improvements

## 📄 License

**Educational Use License**

This project is developed for educational purposes, specifically for rural schools in Odisha, India.

- ✅ Free for educational institutions
- ✅ Open source for community benefit
- ✅ Cultural preservation initiative
- ✅ Rural school priority access

**Smart India Hackathon 2024** - Transforming rural education through culturally-integrated technology.

---

<div align="center">
  
  ### 🏛️ **"Transforming Education with Culture and Technology"** 📚✨
  
  **Connecting Rural Odisha Students with Their Heritage Through Digital Learning**
  
  *Built with ❤️ for Odisha's educational future*
  
  [![Made for Odisha](https://img.shields.io/badge/Made%20for-Odisha%20Schools-orange?style=for-the-badge)]() 
  [![Culturally Integrated](https://img.shields.io/badge/Culturally-Integrated-red?style=for-the-badge)]() 
  [![Offline First](https://img.shields.io/badge/Offline-First-green?style=for-the-badge)]()
  
  **Star ⭐ this repository if it helped your educational journey!**
  
</div>