# HOME GROUND Attendance Management System Requirements Document

## 1. Application Overview

### 1.1 Application Name
HOME GROUND

### 1.2 Application Type
Web application with role-based login system
\n### 1.3 Application Description
An attendance management system designed for educational institutions, enabling teachers to track and manage student attendance while providing students with real-time access to their attendance records and analytics.

## 2. Authentication & User Roles

### 2.1 Account Types
- Teacher (Admin role)
- Student

### 2.2 Authentication Method
- Email-based authentication
- Password-based authentication
- No third-party or Google sign-in
- Separate account creation and login flows for Teachers and Students

## 3. Student Account Management

### 3.1 Student Registration Fields
- Full Name
- Department (dropdown selection)
- Section (optional field)
- Class Roll Number
- Email
- Password
\n### 3.2 Department-Based Subject Assignment
- System automatically assigns default subjects based on selected department
- Example for AIML Department:
  - Machine Learning (ML)
  - Operating Systems (OS)
  - Computer Organization (CO)
  - Mathematics
  - English

### 3.3 Post-Registration Process
- Student account creation
- Automatic generation of student dashboard with assigned subjects
- Initialization of attendance records for each subject

## 4. Teacher Account Management

### 4.1 Teacher Registration Fields
- Full Name
- Assigned Department (single department)
- Assigned Subjects (one or multiple subjects)
- Email
- Password
\n### 4.2 Post-Registration Process
- Teacher account creation
- Admin privileges granted for assigned department and subjects
\n## 5. Teacher Dashboard Features

### 5.1 Student Management
- View all students registered under assigned department
- Student list displays:
  - Name
  - Roll Number
  - Section
  - Department
\n### 5.2 Attendance Management
- Attendance marking interface with:
  - Subject selection dropdown
  - Date picker
  - Student list for selected department
  - Present/Absent toggle for each student
- Attendance data updates:\n  - Individual student profiles
  - Overall class records
\n### 5.3 Analytics Dashboard
- Overall class attendance analytics
- Subject-wise attendance graphs
- Overall attendance percentage calculation
- Clickable student profiles showing:\n  - Subject-wise attendance breakdown
  - Individual attendance percentage
  - Attendance history

## 6. Student Dashboard Features
\n### 6.1 Subject-Wise Attendance Display
- List of all assigned subjects
- Attendance percentage per subject
- Present/Absent count per subject

### 6.2 Overall Attendance Analytics
- Visual graphs (bar charts or pie charts) displaying:
  - Subject-wise attendance comparison
  - Overall attendance percentage\n
### 6.3 Access Permissions
- Read-only access to attendance data
- No editing capabilities
\n## 7. Data Logic & Permissions

### 7.1 Data Storage Structure
- Attendance records stored per:\n  - Subject
  - Student
  - Date
\n### 7.2 Teacher Permissions
- Access limited to students in assigned department
- Attendance marking restricted to assigned subjects only

### 7.3 Student Permissions
- View access limited to personal attendance data only
\n## 8. Design Requirements

### 8.1 Overall Design Style
- Clean and simple dashboard interface
- Professional educational theme
- Clear visual hierarchy for data presentation

### 8.2 Color Scheme
- Primary color: Deep blue (#2C3E50) for headers and navigation
- Secondary color: Fresh green (#27AE60) for positive indicators (Present)\n- Accent color: Warm orange (#E67E22) for alerts and important actions
- Background: Light gray (#F8F9FA) for content areas

### 8.3 Layout Structure
- Separate dashboard layouts for Teacher and Student roles
- Sidebar navigation with clear sections:\n  - Attendance
  - Analytics
  - Profile
- Card-based layout for data presentation
- Responsive grid system for mobile compatibility

### 8.4 Visual Elements
- Rounded corners (8px border-radius) for cards and buttons
- Subtle shadows for depth (box-shadow: 0 2px 8px rgba(0,0,0,0.1))
- Clear iconography for navigation items
- Interactive hover states for clickable elements

### 8.5 Responsive Design
- Mobile-responsive layout adapting to different screen sizes
- Touch-friendly interface elements for mobile devices