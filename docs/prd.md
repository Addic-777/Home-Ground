# HOME GROUND Attendance Management System Requirements Document

## 1. Application Overview

### 1.1 Application Name\nHOME GROUND

### 1.2 Application Type
Web application with role-based login system
\n### 1.3 Application Description
An attendance management system designed for educational institutions, enabling teachers to track and manage student attendance while providing students with real-time access to their attendance records and analytics.

## 2. Authentication & User Roles

### 2.1 Account Types
- Teacher (Admin role)
- Student\n
### 2.2 Authentication Method
- Email-based authentication
- Password-based authentication
- No third-party or Google sign-in
- Separate account creation and login flows for Teachers and Students

## 3. Student Account Management

### 3.1 Student Registration Fields
- Full Name
- Department (dropdown selection)\n- Section (optional field)
- Class Roll Number
- Email
- Password

### 3.2 Department-Based Subject Assignment
- System automatically assigns default subjects based on selected department\n- Example for AIML Department:
  - Machine Learning (ML)
  - Operating Systems (OS)
  - Computer Organization (CO)
  - Mathematics
  - English

### 3.3 Post-Registration Process
- Student account creation
- Automatic generation of student dashboard with assigned subjects
- Initialization of attendance records for each subject
\n## 4. Teacher Account Management

### 4.1 Teacher Registration Fields
- Full Name
- Assigned Department (single department)
- Assigned Subjects (one or multiple subjects)\n- Email
- Password\n
### 4.2 Post-Registration Process
- Teacher account creation
- Admin privileges granted for assigned department and subjects

## 5. Teacher Dashboard Features

### 5.1 Student Management
- View all students registered under assigned department\n- Student list displays:
  - Name
  - Roll Number
  - Section
  - Department

### 5.2 Attendance Management\n- Attendance marking interface with:\n  - Subject selection dropdown
  - Date picker
  - Student list for selected department
  - Present/Absent toggle for each student
- Attendance data updates:
  - Individual student profiles\n  - Overall class records

### 5.3 Analytics Dashboard
- Overall class attendance analytics
- Subject-wise attendance graphs
- Overall attendance percentage calculation
- Clickable student profiles showing:
  - Subject-wise attendance breakdown
  - Individual attendance percentage
  - Attendance history

### 5.4 Smart QR Attendance Management
- QR code generation for each assigned subject:\n  - Unique QR code per subject
  - QR codes visible in teacher dashboard
  - Each QR code contains encoded information: Teacher ID, Subject ID, Department\n- QR code sharing options:
  - Direct link generation for each QR code
  - Share via social media platforms
  - Download QR code image
- QR code display interface:
  - Subject-wise QR code list
  - QR code preview with subject name
  - Copy link button for easy sharing

## 6. Student Dashboard Features

### 6.1 Subject-Wise Attendance Display\n- List of all assigned subjects\n- Attendance percentage per subject\n- Present/Absent count per subject

### 6.2 Overall Attendance Analytics\n- Visual graphs (bar charts or pie charts) displaying:
  - Subject-wise attendance comparison
  - Overall attendance percentage

### 6.3 Access Permissions
- Read-only access to attendance data
- No editing capabilities

### 6.4 Smart QR Attendance Scanner
- QR code scanner feature:
  - Camera access integration for scanning
  - Real-time QR code detection
  - Scan button to activate camera
- Automatic attendance marking:
  - Scanned QR code validates subject and teacher information
  - Attendance automatically marked as 'Present' for the specific subject
  - Timestamp recorded for scan time
  - Instant confirmation message after successful scan
- Scanner interface:
  - Camera viewfinder with scanning frame
  - Clear instructions for positioning QR code
  - Success/error feedback messages

## 7. Data Logic & Permissions
\n### 7.1 Data Storage Structure
- Attendance records stored per:
  - Subject\n  - Student
  - Date
- QR attendance records include:
  - Scan timestamp
  - QR code ID
  - Validation status
\n### 7.2 Teacher Permissions
- Access limited to students in assigned department
- Attendance marking restricted to assigned subjects only\n- Generate and manage QR codes for assigned subjects only

### 7.3 Student Permissions
- View access limited to personal attendance data only
- QR scanner access for marking own attendance
- Cannot scan QR codes for subjects not assigned to them

### 7.4 QR Attendance Validation Rules
- Each QR code scan validates:
  - Student is enrolled in the scanned subject
  - QR code belongs to student's department
  - Prevents duplicate scans on the same day for the same subject
  - Records attendance with scan timestamp
\n## 8. Design Requirements\n
### 8.1 Overall Design Style
- Clean and simple dashboard interface
- Professional educational theme
- Clear visual hierarchy for data presentation

### 8.2 Color Scheme
- Primary color: Deep blue (#2C3E50) for headers and navigation
- Secondary color: Fresh green (#27AE60) for positive indicators (Present)
- Accent color: Warm orange (#E67E22) for alerts and important actions
- Background: Light gray (#F8F9FA) for content areas

### 8.3 Layout Structure
- Separate dashboard layouts for Teacher and Student roles
- Sidebar navigation with clear sections:
  - Attendance
  - Analytics
  - Profile
  - QR Attendance (new section)
- Card-based layout for data presentation
- Responsive grid system for mobile compatibility

### 8.4 Visual Elements
- Rounded corners (8px border-radius) for cards and buttons
- Subtle shadows for depth (box-shadow: 0 2px 8px rgba(0,0,0,0.1))
- Clear iconography for navigation items
- Interactive hover states for clickable elements
- QR code display with clear borders and subject labels
- Camera scanner interface with centered viewfinder frame

### 8.5 Responsive Design
- Mobile-responsive layout adapting to different screen sizes
- Touch-friendly interface elements for mobile devices
- Optimized camera scanner for mobile devices
- Full-screen camera view for better QR code scanning experience