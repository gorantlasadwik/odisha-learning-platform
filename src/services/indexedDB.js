import { openDB } from 'idb';

const DB_NAME = 'OdishaLearningPlatform';
const DB_VERSION = 1;

// Database schema
const STORES = {
  admins: 'admins',
  teachers: 'teachers', 
  students: 'students',
  quizzes: 'quizzes',
  results: 'results',
  analytics: 'analytics',
  curriculum: 'curriculum',
  settings: 'settings'
};

// Initialize database
export const initDB = async () => {
  return await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Admins store
      if (!db.objectStoreNames.contains(STORES.admins)) {
        const adminStore = db.createObjectStore(STORES.admins, { keyPath: 'id', autoIncrement: true });
        adminStore.createIndex('email', 'email', { unique: true });
      }

      // Teachers store
      if (!db.objectStoreNames.contains(STORES.teachers)) {
        const teacherStore = db.createObjectStore(STORES.teachers, { keyPath: 'id', autoIncrement: true });
        teacherStore.createIndex('email', 'email', { unique: true });
        teacherStore.createIndex('assignedClass', 'assignedClass');
      }

      // Students store
      if (!db.objectStoreNames.contains(STORES.students)) {
        const studentStore = db.createObjectStore(STORES.students, { keyPath: 'id', autoIncrement: true });
        studentStore.createIndex('studentId', 'studentId', { unique: true });
        studentStore.createIndex('class', 'class');
        studentStore.createIndex('teacherId', 'teacherId');
      }

      // Quizzes store
      if (!db.objectStoreNames.contains(STORES.quizzes)) {
        const quizStore = db.createObjectStore(STORES.quizzes, { keyPath: 'id', autoIncrement: true });
        quizStore.createIndex('subject', 'subject');
        quizStore.createIndex('class', 'class');
        quizStore.createIndex('createdBy', 'createdBy');
      }

      // Results store
      if (!db.objectStoreNames.contains(STORES.results)) {
        const resultStore = db.createObjectStore(STORES.results, { keyPath: 'id', autoIncrement: true });
        resultStore.createIndex('studentId', 'studentId');
        resultStore.createIndex('quizId', 'quizId');
        resultStore.createIndex('date', 'date');
      }

      // Analytics store
      if (!db.objectStoreNames.contains(STORES.analytics)) {
        db.createObjectStore(STORES.analytics, { keyPath: 'id', autoIncrement: true });
      }

      // Curriculum store
      if (!db.objectStoreNames.contains(STORES.curriculum)) {
        const curriculumStore = db.createObjectStore(STORES.curriculum, { keyPath: 'id', autoIncrement: true });
        curriculumStore.createIndex('subject', 'subject');
        curriculumStore.createIndex('class', 'class');
      }

      // Settings store
      if (!db.objectStoreNames.contains(STORES.settings)) {
        db.createObjectStore(STORES.settings, { keyPath: 'key' });
      }
    },
  });
};

// Generic CRUD operations
export class DatabaseService {
  constructor() {
    this.db = null;
  }

  async init() {
    this.db = await initDB();
    return this.db;
  }

  // Create
  async create(store, data) {
    const db = await this.getDB();
    const tx = db.transaction(store, 'readwrite');
    const result = await tx.store.add({ ...data, createdAt: new Date(), updatedAt: new Date() });
    await tx.done;
    return result;
  }

  // Read
  async getById(store, id) {
    const db = await this.getDB();
    return await db.get(store, id);
  }

  async getAll(store) {
    const db = await this.getDB();
    return await db.getAll(store);
  }

  async getByIndex(store, indexName, value) {
    const db = await this.getDB();
    return await db.getAllFromIndex(store, indexName, value);
  }

  // Update
  async update(store, id, data) {
    const db = await this.getDB();
    const tx = db.transaction(store, 'readwrite');
    const existing = await tx.store.get(id);
    if (existing) {
      const updated = { ...existing, ...data, updatedAt: new Date() };
      await tx.store.put(updated);
      await tx.done;
      return updated;
    }
    throw new Error('Record not found');
  }

  // Delete
  async delete(store, id) {
    const db = await this.getDB();
    const tx = db.transaction(store, 'readwrite');
    await tx.store.delete(id);
    await tx.done;
  }

  // Helper method
  async getDB() {
    if (!this.db) {
      this.db = await initDB();
    }
    return this.db;
  }
}

// Specialized services
export class AdminService extends DatabaseService {
  async createAdmin(adminData) {
    return await this.create(STORES.admins, adminData);
  }

  async getAdminByEmail(email) {
    const admins = await this.getByIndex(STORES.admins, 'email', email);
    return admins[0] || null;
  }

  async validateAdmin(email, password) {
    try {
      console.log('Validating admin:', email);
      const admin = await this.getAdminByEmail(email);
      console.log('Found admin:', admin);
      if (admin && admin.password === password) {
        console.log('Admin validation successful');
        return admin;
      } else {
        console.log('Admin validation failed - wrong password or admin not found');
        return null;
      }
    } catch (error) {
      console.error('Error validating admin:', error);
      throw error;
    }
  }
}

export class TeacherService extends DatabaseService {
  async createTeacher(teacherData) {
    return await this.create(STORES.teachers, teacherData);
  }

  async getAllTeachers() {
    return await this.getAll(STORES.teachers);
  }

  async getTeacherByEmail(email) {
    const teachers = await this.getByIndex(STORES.teachers, 'email', email);
    return teachers[0] || null;
  }

  async updateTeacher(id, data) {
    return await this.update(STORES.teachers, id, data);
  }

  async deleteTeacher(id) {
    return await this.delete(STORES.teachers, id);
  }

  async validateTeacher(email, password) {
    try {
      console.log('Validating teacher:', email);
      const teacher = await this.getTeacherByEmail(email);
      console.log('Found teacher:', teacher);
      if (teacher && teacher.password === password) {
        console.log('Teacher validation successful');
        return teacher;
      } else {
        console.log('Teacher validation failed - wrong password or teacher not found');
        return null;
      }
    } catch (error) {
      console.error('Error validating teacher:', error);
      throw error;
    }
  }
}

export class StudentService extends DatabaseService {
  async createStudent(studentData) {
    return await this.create(STORES.students, studentData);
  }

  async getAllStudents() {
    return await this.getAll(STORES.students);
  }

  async getStudentsByClass(className) {
    return await this.getByIndex(STORES.students, 'class', className);
  }

  async getStudentsByTeacher(teacherId) {
    return await this.getByIndex(STORES.students, 'teacherId', teacherId);
  }

  async updateStudent(id, data) {
    return await this.update(STORES.students, id, data);
  }

  async deleteStudent(id) {
    return await this.delete(STORES.students, id);
  }
}

export class QuizService extends DatabaseService {
  async createQuiz(quizData) {
    return await this.create(STORES.quizzes, quizData);
  }

  async getQuizzesBySubject(subject) {
    return await this.getByIndex(STORES.quizzes, 'subject', subject);
  }

  async getQuizzesByClass(className) {
    return await this.getByIndex(STORES.quizzes, 'class', className);
  }
}

export class ResultService extends DatabaseService {
  async recordResult(resultData) {
    return await this.create(STORES.results, resultData);
  }

  async getResultsByStudent(studentId) {
    return await this.getByIndex(STORES.results, 'studentId', studentId);
  }

  async getResultsByQuiz(quizId) {
    return await this.getByIndex(STORES.results, 'quizId', quizId);
  }
}

export class SettingsService extends DatabaseService {
  async getSetting(key) {
    return await this.getById(STORES.settings, key);
  }

  async setSetting(key, value) {
    const db = await this.getDB();
    const tx = db.transaction(STORES.settings, 'readwrite');
    await tx.store.put({ key, value, updatedAt: new Date() });
    await tx.done;
  }
}

// Initialize services
export const adminService = new AdminService();
export const teacherService = new TeacherService();
export const studentService = new StudentService();
export const quizService = new QuizService();
export const resultService = new ResultService();
export const settingsService = new SettingsService();

// Initialize database and default data
export const initializeApp = async () => {
  try {
    console.log('🚀 Starting database initialization...');
    await adminService.init();
    
    // Create default admin if none exists
    const existingAdmins = await adminService.getAll(STORES.admins);
    console.log('📊 Existing admins:', existingAdmins.length);
    
    if (existingAdmins.length === 0) {
      console.log('👑 Creating default admin...');
      const adminId = await adminService.createAdmin({
        email: 'admin@odisha-learning.edu',
        password: 'admin123', // In production, this should be hashed
        name: 'System Administrator',
        role: 'admin'
      });
      console.log('✅ Default admin created with ID:', adminId);
    } else {
      console.log('✅ Admin already exists:', existingAdmins[0].email);
    }

    // Check and seed teacher data
    const existingTeachers = await teacherService.getAllTeachers();
    console.log('👩‍🏫 Existing teachers:', existingTeachers.length);
    
    if (existingTeachers.length === 0) {
      console.log('📚 Seeding demo data...');
      await seedDummyData();
    } else {
      console.log('✅ Teachers already exist:', existingTeachers.map(t => t.email));
    }
    
    console.log('🎉 Database initialized successfully!');
    return true;
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
};

// Seed dummy data for demonstration
const seedDummyData = async () => {
  try {
    // Check if data already exists
    const existingTeachers = await teacherService.getAllTeachers();
    if (existingTeachers.length > 0) {
      console.log('✅ Demo data already exists, skipping seeding');
      return;
    }

    console.log('🌱 Creating sample teachers...');
    // Create sample teachers for different classes
    const teacher1 = await teacherService.createTeacher({
      name: 'Priya Patel',
      email: 'priya@school.edu',
      password: 'teacher123',
      assignedClass: 'Class 6',
      subjects: ['Mathematics', 'Science'],
      phone: '+91 9876543210'
    });

    const teacher2 = await teacherService.createTeacher({
      name: 'Ravi Kumar',
      email: 'ravi@school.edu', 
      password: 'teacher123',
      assignedClass: 'Class 7',
      subjects: ['Physics', 'Chemistry'],
      phone: '+91 9876543211'
    });

    const teacher3 = await teacherService.createTeacher({
      name: 'Sunita Mohanty',
      email: 'sunita@school.edu',
      password: 'teacher123',
      assignedClass: 'Class 7',
      subjects: ['Mathematics', 'Biology'],
      phone: '+91 9876543212'
    });

    const teacher4 = await teacherService.createTeacher({
      name: 'Rajesh Sahoo',
      email: 'rajesh@school.edu',
      password: 'teacher123',
      assignedClass: 'Class 8',
      subjects: ['Physics', 'Mathematics'],
      phone: '+91 9876543213'
    });

    const teacher5 = await teacherService.createTeacher({
      name: 'Deepika Nayak',
      email: 'deepika@school.edu',
      password: 'teacher123',
      assignedClass: 'Class 8',
      subjects: ['Chemistry', 'Biology'],
      phone: '+91 9876543214'
    });

    console.log('👨‍🎓 Creating sample students...');
    // Create sample students for Class 6, 7, and 8
    const students = [
      // Class 6 Students
      { name: 'Aarav Sharma', studentId: 'STU001', class: 'Class 6', teacherId: teacher1, age: 12 },
      { name: 'Aisha Patel', studentId: 'STU002', class: 'Class 6', teacherId: teacher1, age: 11 },
      { name: 'Arjun Singh', studentId: 'STU003', class: 'Class 6', teacherId: teacher1, age: 12 },
      { name: 'Meera Dash', studentId: 'STU004', class: 'Class 6', teacherId: teacher1, age: 11 },
      { name: 'Siddharth Jena', studentId: 'STU005', class: 'Class 6', teacherId: teacher1, age: 12 },
      
      // Class 7 Students
      { name: 'Kavya Reddy', studentId: 'STU006', class: 'Class 7', teacherId: teacher2, age: 13 },
      { name: 'Rohit Gupta', studentId: 'STU007', class: 'Class 7', teacherId: teacher2, age: 12 },
      { name: 'Sneha Das', studentId: 'STU008', class: 'Class 7', teacherId: teacher2, age: 13 },
      { name: 'Ankit Behera', studentId: 'STU009', class: 'Class 7', teacherId: teacher3, age: 13 },
      { name: 'Rina Pradhan', studentId: 'STU010', class: 'Class 7', teacherId: teacher3, age: 12 },
      { name: 'Subham Mishra', studentId: 'STU011', class: 'Class 7', teacherId: teacher2, age: 13 },
      { name: 'Pragya Swain', studentId: 'STU012', class: 'Class 7', teacherId: teacher3, age: 12 },
      { name: 'Nikhil Barik', studentId: 'STU013', class: 'Class 7', teacherId: teacher2, age: 13 },
      
      // Class 8 Students
      { name: 'Aditi Mohapatra', studentId: 'STU014', class: 'Class 8', teacherId: teacher4, age: 14 },
      { name: 'Vivek Panda', studentId: 'STU015', class: 'Class 8', teacherId: teacher4, age: 13 },
      { name: 'Shreya Biswal', studentId: 'STU016', class: 'Class 8', teacherId: teacher5, age: 14 },
      { name: 'Karthik Rout', studentId: 'STU017', class: 'Class 8', teacherId: teacher4, age: 13 },
      { name: 'Priyanka Sethy', studentId: 'STU018', class: 'Class 8', teacherId: teacher5, age: 14 },
      { name: 'Ashish Parida', studentId: 'STU019', class: 'Class 8', teacherId: teacher4, age: 13 },
      { name: 'Divya Maharana', studentId: 'STU020', class: 'Class 8', teacherId: teacher5, age: 14 },
      { name: 'Rahul Lenka', studentId: 'STU021', class: 'Class 8', teacherId: teacher4, age: 13 },
      { name: 'Sonali Tripathy', studentId: 'STU022', class: 'Class 8', teacherId: teacher5, age: 14 }
    ];

    for (const student of students) {
      await studentService.createStudent({
        ...student,
        streaks: Math.floor(Math.random() * 15) + 1,
        totalQuizzes: Math.floor(Math.random() * 20) + 5,
        averageScore: Math.floor(Math.random() * 40) + 60,
        badges: ['bronze_badge', 'knowledge_seeker'],
        parentContact: `+91 98765432${Math.floor(Math.random() * 90) + 10}`,
        address: `Bhubaneswar, Odisha`,
        dateOfBirth: new Date(2010 + (14 - student.age), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
      });
    }

    console.log('✅ Demo data seeded successfully!');
    console.log('👩‍🏫 Available teachers:');
    console.log('  - priya@school.edu / teacher123 (Class 6)');
    console.log('  - ravi@school.edu / teacher123 (Class 7)');
    console.log('  - sunita@school.edu / teacher123 (Class 7)');
    console.log('  - rajesh@school.edu / teacher123 (Class 8)');
    console.log('  - deepika@school.edu / teacher123 (Class 8)');
    console.log(`👨‍🎓 Created ${students.length} students across classes 6, 7, and 8`);
  } catch (error) {
    console.error('❌ Error seeding dummy data:', error);
    throw error;
  }
};